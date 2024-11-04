import cn from 'classnames';
import { useWindowSize } from "react-use";
import { checkIsMaintenanceModeComing, checkIsMaintenanceModeStart, miniSidebarInitialValue, RESPONSIVE_WIDTH } from "@/utils/constants";
import Navbar from '../navigation/top-navbar';
import { useAtom } from 'jotai';


const UserLayout: React.FC<{ children?: React.ReactNode }> = ({
    children
}) => {

    const { width } = useWindowSize();
    const [underMaintenance] = useAtom(checkIsMaintenanceModeComing);
    const [underMaintenanceStart] = useAtom(checkIsMaintenanceModeStart);
    const [ miniSidebar, _] = useAtom(miniSidebarInitialValue);

    return(
        <div className="flex min-h-screen flex-col bg-gray-100 transition-colors duration-150">
            <Navbar/>
            <div className="flex flex-1">
                <main
                    className={cn(
                        'relative flex w-full flex-col justify-start transition-[padding] duration-300',
                        width >= RESPONSIVE_WIDTH && 
                        (underMaintenance || underMaintenanceStart) ? 'lg:pt-[8.75rem]' :
                        'pt-[72px] lg:pt-20',
                        miniSidebar && width >= RESPONSIVE_WIDTH ? 'lg:pl-24' :
                        '',
                        miniSidebar && width >= RESPONSIVE_WIDTH ? 'lg:pl-24 ' : 
                        ''
                    )}
                >
                    <div className='h-full p-5 md:p-8'>
                        {children}
                    </div>
                </main>
            </div>
        </div>
    )
}

export default UserLayout;