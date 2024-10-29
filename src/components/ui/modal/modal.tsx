import { Dialog, DialogPanel, Transition, TransitionChild } from "@headlessui/react";
import { Fragment, useRef } from "react";
import { useAtom } from 'jotai';
import cn from 'classnames';
import { searchModalInitialValues } from "@/utils/constants";
import { CloseIcon } from "@/components/icons/close-icon";

export default function Modal({ open, onClose, children }: any) {
    const cancelButtonRef = useRef(null);
    const [searchModal] = useAtom(searchModalInitialValues);
    
    return(
        <Transition show={open} as={Fragment}>
            <Dialog
                as="div"
                className="fixed inset-0 z-50 overflow-y-auto"
                initialFocus={cancelButtonRef}
                static
                open={open}
                onClose={onClose}
            >
                <div
                    className={cn(
                        'min-h-full text-center md:p-5',
                        searchModal ? 'pt-3 md:pt-2.5 lg:pt-4' : ''
                    )}
                >
                    <TransitionChild
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 h-full w-full bg-gray-900 bg-opacity-50" />
                    </TransitionChild>

                    {/* This element is to trick the browser into centering the modal contents. */}
                    <span
                        className={cn(
                        'inline-block h-screen',
                        searchModal ? 'mt-16 align-top' : 'align-middle'
                        )}
                        aria-hidden="true"
                    >
                        &#8203;
                    </span>
                    <TransitionChild
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 scale-95"
                        enterTo="opacity-100 scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-95"
                    >
                        <DialogPanel className="min-w-content relative inline-block max-w-full align-middle transition-all ltr:text-left rtl:text-right">
                        <button
                            onClick={onClose}
                            aria-label="Close panel"
                            ref={cancelButtonRef}
                            className={cn(
                            'absolute top-4 z-[60] inline-block outline-none focus:outline-none ltr:right-4 rtl:left-4 lg:hidden',
                            searchModal ? 'hidden' : ''
                            )}
                        >
                            <span className="sr-only">{('Close')}</span>
                            <CloseIcon className="h-4 w-4" />
                        </button>
                        {children}
                        </DialogPanel>
                    </TransitionChild>
                </div>
            </Dialog>
        </Transition>
    )
}