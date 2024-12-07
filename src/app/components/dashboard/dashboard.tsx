'use client'

import { Fragment } from 'react'
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  TransitionChild,
} from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import LeftSideMenu, { navigation } from './leftSideMenu'
import TopMenu from './topMenu'

interface DashboardProps {
  children: React.ReactNode;
  sidebarOpen: boolean;
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
  pathname: string;
}

export default function Dashboard({ children, sidebarOpen, setSidebarOpen, pathname }: DashboardProps) {
  const getPageTitle = (path: string) => {
    if (path.startsWith('/workspace/clients/') && path !== '/workspace/clients') {
      return 'Client detail';
    }
    const route = navigation.find(item => item.href === path) || 
                  navigation.flatMap(item => item.children || []).find(child => child.href === path)
    return route ? route.name : 'Overview'
  }

  const isFullScreenPage = pathname.includes('/workspace/form-builder') || pathname.includes('/workspace/journey-builder')

  return (
    <div className="flex h-screen overflow-hidden">
      {!isFullScreenPage && (
        <>
          {/* Mobile sidebar */}
          <Dialog open={sidebarOpen} onClose={setSidebarOpen} className="relative z-50 lg:hidden">
            <DialogBackdrop
              transition
              className="fixed inset-0 bg-gray-900/80 transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
            />

            <div className="fixed inset-0 flex">
              <DialogPanel
                transition
                className="relative mr-16 flex w-full max-w-xs flex-1 transform transition duration-300 ease-in-out data-[closed]:-translate-x-full"
              >
                <TransitionChild>
                  <div className="absolute left-full top-0 flex w-16 justify-center pt-5 duration-300 ease-in-out data-[closed]:opacity-0">
                    <button type="button" onClick={() => setSidebarOpen(false)} className="-m-2.5 p-2.5">
                      <span className="sr-only">Close sidebar</span>
                      <XMarkIcon aria-hidden="true" className="h-6 w-6 text-white" />
                    </button>
                  </div>
                </TransitionChild>
                <LeftSideMenu pathname={pathname} />
              </DialogPanel>
            </div>
          </Dialog>

          {/* Static sidebar for desktop */}
          <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
            <LeftSideMenu pathname={pathname} />
          </div>
        </>
      )}

      {/* Main content area */}
      <div className={`flex flex-col flex-1 ${!isFullScreenPage ? 'lg:pl-72' : ''}`}>
        {!isFullScreenPage && (
          <TopMenu setSidebarOpen={setSidebarOpen} pageTitle={getPageTitle(pathname)} />
        )}

        <main className="flex-1 overflow-y-auto bg-[#F9FAFB]">
          <div className={`${isFullScreenPage ? 'py-0' : 'py-10'} ${isFullScreenPage ? 'px-0' : 'px-4 sm:px-6 lg:px-8'}`}>
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
