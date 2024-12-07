import { Fragment } from 'react'
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition
} from '@headlessui/react'
import {
  Bars3Icon,
  BellIcon,
} from '@heroicons/react/24/outline'
import { useRouter } from 'next/navigation'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

const supabase = createClientComponentClient()

const userNavigation = [
  { name: 'Your profile', href: '#' },
  { name: 'Sign out', href: '#' },
]

function classNames(...classes: string[]): string {
  return classes.filter(Boolean).join(' ')
}

interface TopMenuProps {
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
  pageTitle: string;
}

export default function TopMenu({ setSidebarOpen, pageTitle }: TopMenuProps) {
  const router = useRouter()

  async function handleSignOut() {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) {
        console.error('Error signing out:', error.message)
      } else {
        // Redirect to login page or home page after successful sign out
        router.push('/login') // or wherever you want to redirect
      }
    } catch (error) {
      console.error('Unexpected error during sign out:', error)
    }
  }

  return (
    <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
      <button type="button" onClick={() => setSidebarOpen(true)} className="-m-2.5 p-2.5 text-gray-700 lg:hidden">
        <span className="sr-only">Open sidebar</span>
        <Bars3Icon aria-hidden="true" className="h-6 w-6" />
      </button>

      <div className="flex flex-1 items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">{pageTitle}</h1>
      </div>

      <div className="flex items-center gap-x-4 lg:gap-x-6">
        <button type="button" className="-m-2.5 p-2.5 text-gray-400 hover:text-gray-500">
          <span className="sr-only">View notifications</span>
          <BellIcon aria-hidden="true" className="h-6 w-6" />
        </button>

        <div aria-hidden="true" className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-900/10" />

        <Menu as="div" className="relative">
          <MenuButton className="-m-1.5 flex items-center p-1.5">
            <span className="sr-only">Open user menu</span>
            <div className="flex items-center justify-center h-8 w-8 rounded-full bg-gray-200 text-sm font-medium text-gray-600">
              CR
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
            <MenuItems className="absolute right-0 z-10 mt-2.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
              {userNavigation.map((item) => (
                <MenuItem key={item.name}>
                  {({ active }) => (
                    <a
                      href={item.href}
                      onClick={item.name === 'Sign out' ? handleSignOut : undefined}
                      className={classNames(
                        active ? 'bg-gray-50' : '',
                        'block px-3 py-1 text-sm leading-6 text-gray-900'
                      )}
                    >
                      {item.name}
                    </a>
                  )}
                </MenuItem>
              ))}
            </MenuItems>
          </Transition>
        </Menu>
      </div>
    </div>
  )
}