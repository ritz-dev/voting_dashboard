/* eslint-disable react-hooks/exhaustive-deps */
import Avatar from "@/components/common/avatar";
import { siteSettings } from "@/settings/site.setting";
import { Menu, MenuButton, MenuItem, MenuItems, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import cn from 'classnames';
import Link from "next/link";
import { getIcon } from "@/utils/get-icon";
import * as sidebarIcons from '@/components/icons/sidebar';
import { useMeQuery } from "@/data/user";
import { User } from "@/types";
import { useUser } from "@/contexts/me.context";

export default function AuthorizedMenu () {
    const { data } = useMeQuery();
    const { updateUser } = useUser();

    useEffect(()=> {
        data && updateUser(data)
    },[data])

    return (
        <Menu
            as="div"
            className="relative inline-block shrink-0 grow-0 basic-auto py-2 text-left ps-1.5 sm:border-solid sm:border-gray-200 sm:py-3 sm:ps-6 sm:border-s lg:py-4 xl:py-2"
        >
            <MenuButton className="flex max-w-[300px] items-center gap-2 focus:outline-none lg:py-0.5 xl:py:2.5">
                <Avatar
                    src={
                        data?.imageUrl?.thumbnail ??
                        siteSettings?.avatar?.placeholder
                    }
                    rounded="full"
                    name="avatar"
                    className="shrink-0 grow-0 basis-auto drop-shadow"
                />        
                <div className="hidden w-[calc(100%-48px)] flex-col items-start space-y-0.5 truncate text-sm text-left xl:flex">
                    <span className="w-full trancate font-semibold capitalize text-black">
                        {data ? data.name : ""}
                    </span>
                    <span className="w-full truncate text-xs capitalize text-gray-400">
                        {data ? data.role : ""}
                    </span>
                </div>
            </MenuButton>

            <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <MenuItems
                    as="ul"
                    className="authorized-menu absolute mt-3 w-56 rounded-lg border border-gray-200 bg-white shadow-box end-0 origin-top-end focus:outline-none lg:mt-4 xl:mt-2"
                >
                    <MenuItem>
                        <li className="border-b border-dashed border-gray-200 p-2 focus:outline-none">
                            <div className="flex items-center gap-2 rounded-md bg-gray-100 px-3 py-2">
                                <Avatar
                                src={
                                    
                                    siteSettings?.avatar?.placeholder
                                }
                                name="avatar"
                                className="shrink-0 grow-0 basis-auto drop-shadow"
                                />
                                <div className="flex w-[calc(100%-40px)] flex-col items-start space-y-0.5 text-sm">
                                <span className="w-full truncate font-semibold capitalize text-black">
                                    {data?.name}
                                </span>
                                <span className="break-all text-xs text-gray-400">
                                    {data?.email}
                                </span>
                                </div>
                            </div>
                        </li>
                    </MenuItem>
                    <div className="space-y-0.5 py-2">
                        {siteSettings.authorizedLinks?.map(
                            ({ href, labelTransKey, icon }, index) => {
                                // const hasPermission = permission?.includes(userRoll);                                
                                return (
                                    <Fragment key={index}>
                                        <MenuItem key={`${href}${labelTransKey}`}>
                                            {({focus})=> (
                                                <>
                                                    <li
                                                        className={cn(
                                                            'cursor-pointer border-dashed border-gray-200 px-2 last:!mt-2.5 last:border-t last:pt-2'
                                                        )}
                                                    >
                                                        <Link
                                                            href={href}
                                                            className={cn(
                                                                'group flex items-center gap-2 rounded-md py-2.5 px-3 text-sm capitalize transition duration-200 hover:text-light hover:bg-accent',
                                                                focus ? 'border-transparent bg-red-500 text-accent' : 'text-heading'
                                                            )}
                                                        >
                                                            <span className="text-gray-600 transition duration-200 group-hover:text-light">
                                                                {getIcon({
                                                                    iconList: sidebarIcons,
                                                                    iconName: icon,
                                                                    className: 'w-5 h-5'
                                                                })}
                                                            </span>
                                                            {labelTransKey}
                                                        </Link>
                                                    </li>
                                                </>
                                            )}
                                        </MenuItem>
                                    </Fragment>
                                )
                            }
                        )}
                    </div>
                </MenuItems>
            </Transition>
        </Menu>
    )
}