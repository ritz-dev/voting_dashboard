import { RESPONSIVE_WIDTH } from "@/utils/constants";
import { useWindowSize } from "react-use";
import { motion,AnimatePresence } from 'framer-motion';
import cn from 'classnames';
import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import { getIcon } from "@/utils/get-icon";
import { getAuthCredentials,hasAccess} from '@/utils/auth-utils';
import * as sidebarIcons from '@/components/icons/sidebar';
import { ChevronRight } from '@/components/icons/chevron-right';
import Link from "@/components/ui/link";
import { useUI } from "@/contexts/ui.context";
import AdvancePopover from "@/components/ui/advance-popover";


function SidebarShortItem({
    childMenu,
    shop,
    label,
    currentUserPermissions,
    icon,
    miniSidebar,
  }: {
    childMenu: any;
    shop: any;
    label: string;
    currentUserPermissions: any;
    icon: string;
    miniSidebar: boolean;
  }) {
    const { closeSidebar } = useUI();
    const [dropdown, setDropdown] = useState(false);
    const router = useRouter();
    const sanitizedPath = router.asPath.split('#')[0].split('?')[0];
    return (
      <AdvancePopover
        onMouseEnter={() => setDropdown(true)}
        onMouseLeave={() => setDropdown(false)}
        content={() => (
          <>
            {childMenu?.map((item: any, index: number) => {
              if (shop && !hasAccess(item?.permissions, currentUserPermissions))
                return null;
              return (
                <div key={index}>
                  <Link
                    passHref
                    as={shop ? item?.href(shop?.toString()!) : item?.href}
                    href={{
                      pathname: `${
                        shop ? item?.href(shop?.toString()!) : item?.href
                      }`,
                      query: { parents: label },
                    }}
                    className={cn(
                      'relative flex w-full cursor-pointer items-center rounded-lg py-2 text-sm text-start focus:text-accent',
                      (
                        shop
                          ? sanitizedPath === item?.href(shop?.toString()!)
                          : sanitizedPath === item?.href
                      )
                        ? 'bg-transparent font-medium text-accent-hover'
                        : 'text-body-dark hover:text-accent focus:text-accent',
                    )}
                    title={(item?.label)}
                    onClick={() => closeSidebar()}
                  >
                    {(item?.label)}
                  </Link>
                </div>
              );
            })}
          </>
        )}
        isPopover={true}
        isOpen={dropdown}
        placement="left"
      >
        <div
          className={cn(
            'relative flex w-full cursor-pointer items-center px-3 py-2.5 text-sm text-gray-600 before:absolute before:-right-5 before:top-0 before:h-full before:w-5 before:content-[""]',
            miniSidebar ? 'hover:text-accent ltr:pl-3 rtl:pr-3' : null,
          )}
        >
          {getIcon({
            iconList: sidebarIcons,
            iconName: icon,
            className: 'w-5 h-5',
          })}
        </div>
      </AdvancePopover>
    );
}



const SidebarItem = ({
    href,
    icon,
    label,
    childMenu,
    miniSidebar,
} : {
    href: any;
    icon: any;
    label: string;
    childMenu: [];
    miniSidebar?: boolean;
}) => {
    const { closeSidebar } = useUI();
    const router = useRouter();
    const { width } = useWindowSize();
    const { permissions: currentUserPermissions } = getAuthCredentials();
    
    const {
        query : {shop},
    } = useRouter();

    const sanitizedPath = router?.asPath?.split('#')[0]?.split('?')[0];
    const isParents = router?.query?.parents;

    const isActive = useMemo(() => {
        
        if (isParents) {
            return isParents === label;
        }

        let lastIndex = router?.asPath.lastIndexOf('/');
        if( label !== 'Settings') {
            return(
                router.asPath
                ?.substring(lastIndex + 1)
                ?.replace(/[^a-zA-z]/g, ' ')
                ?.trim()
                ?.toUpperCase() === label?.trim()?.toUpperCase()
            );
        }
        return router?.asPath
            ?.trim()
            ?.toUpperCase()
            ?.includes(label?.trim()?.toUpperCase());
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[router?.asPath,isParents]);

    href = href && href !== '/' && href?.endsWith('/') ? href?.slice(0, -1) : href;

    const [isOpen,setOpen] = useState<boolean>(isActive);

    useEffect(()=> {
        setOpen(isActive);
    },[isActive]);

    const toggleCollapse = useCallback(()=> {
        setOpen((prevValue) => !prevValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[isOpen]);

    const onClick = useCallback(()=>{
        if(Array.isArray(childMenu) && !!childMenu.length){
            toggleCollapse();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[isOpen]);

    return childMenu && childMenu?.length ? (
        miniSidebar && width >= RESPONSIVE_WIDTH ? (
            <SidebarShortItem
                currentUserPermissions={currentUserPermissions}
                shop={shop}
                label={label}
                childMenu={childMenu}
                icon={icon}
                miniSidebar={miniSidebar && width >= RESPONSIVE_WIDTH}
            />
        ) : (
            <>
                <motion.div
                    initial={false}
                    className={cn(
                        'group cursor-pointer rounded-md px-3 py-2.5 text-body-dark hover:bg-gray-100 focus:text-accent',
                        isOpen ? 'bg-gray-100 font-medium' : '',
                    )}
                    onClick={onClick}
                >
                    <div className={cn('flex w-full items-center text-sm')}>
                        <span className="text-grey-600 pr-2.5">
                            {getIcon({
                                iconList: sidebarIcons,
                                iconName: icon,
                                className: 'w-5 h-5',
                            })}
                        </span>
                        <span
                            className={
                                width >= RESPONSIVE_WIDTH && miniSidebar ? 'hidden' : ''
                            }
                        >
                            { label }
                        </span>

                        <ChevronRight 
                            className={cn(
                                'h-3.5 w-3.5 shrink-0 opacity-75 transition-transform duration-300 ml-auto mr-0',
                                isOpen ? 'rotate-90 transform' : '',
                                width >= RESPONSIVE_WIDTH && miniSidebar ? 'hidden' : '',
                            )}
                        />
                    </div>
                </motion.div>
                <AnimatePresence initial={false}>
                    { isOpen ? (
                        <motion.div
                            key="content"
                            initial="collapsed"
                            animate="open"
                            exit="collapsed"
                            variants={{
                                open: { opacity: 1,height: 'auto'},
                                collapsed: {opacity: 0, height: 0}
                            }}
                            transition={{
                                duration:0.35,
                                ease:[0.35,1,0.68,1]
                            }}
                            className={miniSidebar ? 'relative' : '!mt-0'}
                        >
                            <div className="pt-2 pl-5">
                                <div className="space-y-1 border-0 border-l border-dashed border-slate-300 pl-1">
                                    {childMenu?.map((item: any, index: number) => {
                                        if( shop && !hasAccess(item?.permissions, currentUserPermissions))
                                            return null;
                                        return (
                                            <div key={index}>
                                                <Link
                                                    passHref
                                                    href={{
                                                        pathname: `${
                                                            shop ? item?.href(shop?.toString()!) : item?.href
                                                        }`,
                                                        query: {
                                                            parents: label,
                                                        }
                                                    }}
                                                    as= {shop ? item?.href(shop?.toString()!) : item?.href}
                                                    className={cn(
                                                        'relative flex w-full cursor-pointer items-center rounded-lg py-2 px-5 text-sm text-start before:absolute before:-left-0.5 before:top-[18px] before:h-px before:w-3 before:border-t before:border-dashed before:border-gray-300 before:content-[""] focus:text-accent',
                                                        (
                                                          shop
                                                            ? sanitizedPath ===
                                                              item?.href(shop?.toString()!)
                                                            : sanitizedPath === item?.href
                                                        )
                                                          ? 'bg-transparent font-medium text-accent-hover'
                                                          : 'text-body-dark hover:text-accent focus:text-accent',
                                                      )}
                                                      title={item.label}
                                                      onClick={() => closeSidebar()}
                                                >
                                                    <span>{item.label}</span>
                                                </Link>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </motion.div>
                    ) : null}
                </AnimatePresence>
            </>
        )
    ) : (
        <Link
            href={href}
            className={cn(
                `group flex w-full items-center gap-2.5 rounded-md px-3 py-2.5 text-sm text-gray-700 text-start focus:text-accent ${
                    miniSidebar && width >= RESPONSIVE_WIDTH
                     ? 'hover:text-accent-hover pl-3'
                     : 'hover:bg-gray-100'
                }`,
                sanitizedPath === href 
                    ? `font-medium !text-accent-hover ${
                        !miniSidebar ? 'bg-accent/20 hover:!bg-accent/20' : ''
                      }`
                    : '',
            )}
            title={label}
            onClick={() => closeSidebar()}
        >
            {
                icon ? (
                    <span
                        className={cn(
                        'transition',
                        sanitizedPath === href
                          ? 'text-accent-hover'
                          : 'text-gray-600 group-focus:text-accent',
                        miniSidebar && width >= RESPONSIVE_WIDTH
                          ? 'group-hover:text-accent'
                          : null,
                      )}
                    >
                        {getIcon({
                            iconList: sidebarIcons,
                            iconName: icon,
                            className: 'w-5 h-5',
                        })}
                    </span>
                ) : null }
                <span
                    className={cn(miniSidebar && width >= RESPONSIVE_WIDTH ? 'hidden' : '')}
                >
                    {label}
                </span>
        </Link>
    );
};

export default SidebarItem;

