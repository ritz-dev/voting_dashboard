import { checkIsMaintenanceModeComing, checkIsMaintenanceModeStart, miniSidebarInitialValue, RESPONSIVE_WIDTH } from "@/utils/constants";
import { useWindowSize } from "react-use";
import { motion } from "framer-motion";
import cn from 'classnames';
import Logo from "@/components/ui/logo";
import { useState } from "react";
import { SearchIcon } from "@/components/icons/search-icon";
import AuthorizedMenu from "./authorized-menu";
import { getAuthCredentials } from "@/utils/auth-utils";
import { useUI } from "@/contexts/ui.context";
import { useMeQuery } from "@/data/user";
import { useModalAction } from "@/components/ui/modal/modal.context";
import { useAtom } from "jotai";

const Navbar = () => {

    const { width } = useWindowSize();
    const { toggleSidebar } = useUI();
    const { permissions } = getAuthCredentials();
    const { data } = useMeQuery();
    const { openModal } = useModalAction();
    const [miniSidebar, setMiniSidebar] = useAtom(miniSidebarInitialValue);
    const [isMaintenanceMode, setUnderMaintenance] = useAtom(
        checkIsMaintenanceModeComing,
    );
    const [isMaintenanceModeStart, setUnderMaintenanceStart] = useAtom(
        checkIsMaintenanceModeStart,
    );

    return (
        <div className="fixed top-0 z-40 w-full bg-white shadow">
            {/* {width >= RESPONSIVE_WIDTH && isMaintenanceMode ? (
                <Alert
                message={t('text-maintenance-mode-title')}
                variant="info"
                className="sticky top-0 left-0 z-50"
                childClassName="flex justify-center items-center w-full gap-4 font-bold"
                >
                <CountdownTimer
                    date={new Date(options?.maintenance?.start)}
                    className="text-blue-600 [&>p]:bg-blue-200 [&>p]:p-2 [&>p]:text-xs [&>p]:text-blue-600"
                />
                </Alert>
            ) : (
                ''
            )}
            {width >= RESPONSIVE_WIDTH && isMaintenanceModeStart ? (
                <Alert
                message={t('text-maintenance-mode-start-title')}
                className="py-[1.375rem]"
                childClassName="text-center w-full font-bold"
                />
            ) : (
                ''
            )} */}
            <div className="relative flex w-full flex-1 items-center">
                <nav className="flex items-center px-5 md:px-8">
                    <div className="flex items-center">
                        {/* <motion.button
                            whileTap={{ scale: 0.38 }}
                            onClick ={toggleSidebar}
                            className="group flex h-5 w-5 shrink-0 cursor-pointer flex-col justify-center space-y-1 me-4 focus:text-accent focus:outline-none lg:hidden"
                        >   
                            <span className="h-0.5 w-full rounded-full bg-gray-600 group-hover:bg-accent" />
                            <span
                                className={cn(
                                    'h-0.5 rounded-full bg-gray-600 transition-[width] group-hover:bg-accent',
                                    miniSidebar ? 'w-full' :
                                    'w-2/4',
                                )}
                            />
                            <span className="h-0.5 w-full rounded-full bg-gray-600 group-hover:bg-accent" />
                        </motion.button> */}
                        <div
                            className={cn(
                                'flex items-center h-16 shrink-0 transition-[width] duration-300 me-4 lg:h-[76px]',
                                miniSidebar ? 'lg:w-[70px]' :
                                'lg:w-[257px]'
                            )}
                        >
                            <Logo />
                        </div>
                        {/* <button
                            className="group hidden h-5 w-5 shrink-0 cursor-pointer flex-col justify-center space-y-1 me-6 lg:flex"
                            onClick={() => setMiniSidebar(!miniSidebar)}
                        >
                        <span
                            className={cn(
                            'h-0.5 rounded-full bg-gray-600 transition-[width] group-hover:bg-accent',
                            miniSidebar ? 'w-full' : 'w-2/4',
                            )}
                        />
                        <span className="h-0.5 w-full rounded-full bg-gray-600 group-hover:bg-accent" />
                        <span
                            className={cn(
                            'h-0.5 rounded-full bg-gray-600 transition-[width] group-hover:bg-accent',
                            miniSidebar ? 'w-full' : 'w-3/4',
                            )}
                        />
                        </button> */}
                         {/* <div
                            className="relative ml-auto mr-1.5 flex h-9 w-9 shrink-0 cursor-pointer item-center justify-center rounded-full border border-gray-200 bg-gray-50 py-4 text-gray-600 hover:border-transparent hover:border-gray-200 hover:bg-white hover:text-accent sm:mr-6 lg:hidden xl:hidden"
                            onClick={handleClick}
                        >
                            <SearchIcon className="h-4 w-4"/>
                        </div>
                        <div className="relative hidden w-full max-w-[710px] py-4 me-6 lg:block 2xl:me-auto">
                            <SearchBar />
                        </div> */}
                        <div className="fixed right-10">
                            <AuthorizedMenu/>
                        </div>
                    </div>
                   
                </nav>
            </div>
            
        </div>
    )
};

export default Navbar;