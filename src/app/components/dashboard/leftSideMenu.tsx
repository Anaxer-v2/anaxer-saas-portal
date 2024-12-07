import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  HomeIcon,
  UsersIcon,
  ShieldCheckIcon,
  ClockIcon,
  Cog6ToothIcon,
  BookOpenIcon,
  QuestionMarkCircleIcon,
  ChevronDownIcon,
  ChevronRightIcon,
} from '@heroicons/react/24/outline';

export const navigation = [
  { name: 'Overview', href: '/workspace', icon: HomeIcon },
  { name: 'Clients', href: '/workspace/clients', icon: UsersIcon },
  { name: 'Verification', href: '/workspace/verification', icon: ShieldCheckIcon },
  { name: 'Activity', href: '/workspace/activity', icon: ClockIcon },
  {
    name: 'Settings',
    icon: Cog6ToothIcon,
    children: [
      { name: 'Requirement templates', href: '/workspace/settings/requirement-templates' },
      { name: 'Journey templates', href: '/workspace/settings/journey-templates' },
      //{ name: 'Brand configuration', href: '/workspace/settings/brand' },
      { name: 'Email configuration', href: '/workspace/settings/email' },
      //{ name: 'Payment gateway', href: '/workspace/settings/payment' },
      { name: 'API configuration', href: '/workspace/settings/api' },
      { name: 'Installation', href: '/workspace/settings/installation' },
      { name: 'Account and billing', href: '/workspace/settings/account' },
    ],
  },
];

function classNames(...classes: string[]): string {
  return classes.filter(Boolean).join(' ');
}

interface NavItemProps {
  item: {
    name: string;
    href?: string;
    icon: React.ElementType;
    children?: { name: string; href: string }[];
  };
  pathname: string;
}

function NavItem({ item, pathname }: NavItemProps) {
  const [isOpen, setIsOpen] = useState(item.name === 'Settings');
  const isActive = item.href === pathname || (item.href === '/workspace/clients' && pathname.startsWith('/workspace/clients/'));
  const hasActiveChild = item.children && item.children.some(child => child.href === pathname || (child.href === '/workspace/clients' && pathname.startsWith('/workspace/clients/')));

  useEffect(() => {
    if (item.name === 'Settings' && hasActiveChild) {
      setIsOpen(true);
    }
  }, [pathname, item.name, hasActiveChild]);

  if (!item.children) {
    return (
      <Link
        href={item.href || '#'}
        className={classNames(
          isActive
            ? 'bg-gray-800 text-white border-l-4 border-blue-500'
            : 'text-gray-100 hover:bg-gray-800 hover:text-white',
          'group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 tracking-wide'
        )}
      >
        <item.icon className="h-6 w-6 shrink-0" aria-hidden="true" />
        {item.name}
      </Link>
    );
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={classNames(
          hasActiveChild ? 'bg-gray-800 text-white' : 'text-gray-100 hover:bg-gray-800 hover:text-white',
          'flex items-center justify-between w-full text-left rounded-md p-2 gap-x-3 text-sm font-semibold leading-6 tracking-wide'
        )}
      >
        <div className="flex items-center gap-x-3">
          <item.icon className="h-6 w-6 shrink-0" aria-hidden="true" />
          {item.name}
        </div>
        {isOpen ? (
          <ChevronDownIcon className="h-5 w-5" aria-hidden="true" />
        ) : (
          <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
        )}
      </button>
      <div className={`mt-1 space-y-1 overflow-hidden transition-all duration-200 ${isOpen ? 'max-h-96' : 'max-h-0'}`}>
        {item.children.map((subItem) => (
          <Link
            key={subItem.name}
            href={subItem.href}
            className={classNames(
              subItem.href === pathname
                ? 'bg-gray-800 text-white border-l-4 border-blue-500'
                : 'text-gray-100 hover:bg-gray-800 hover:text-white',
              'block rounded-md py-2 pr-2 pl-11 text-sm leading-6 tracking-wide'
            )}
          >
            {subItem.name}
          </Link>
        ))}
      </div>
    </>
  );
}

interface LeftSideMenuProps {
  pathname: string;
}

export default function LeftSideMenu({ pathname }: LeftSideMenuProps) {
  return (
    <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6 pb-4 shadow-[4px_0_10px_rgba(0,0,0,0.3)]">
      <div className="flex h-16 shrink-0 items-center">
        <img
          alt="Anaxer Logo"
          src="/assets/Anaxer_white.svg"
          className="h-8 w-auto"
        />
      </div>
      <nav className="flex flex-1 flex-col">
        <ul role="list" className="flex flex-1 flex-col gap-y-7">
          <li>
            <ul role="list" className="-mx-2 space-y-1">
              {navigation.map((item) => (
                <li key={item.name}>
                  <NavItem item={item} pathname={pathname} />
                </li>
              ))}
            </ul>
          </li>
          <li className="mt-auto">
            <div className="border-t border-gray-700 pt-3">
              <ul role="list" className="-mx-2 space-y-1 mt-2">
                <li>
                  <Link
                    href="/documentation"
                    className="group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-100 hover:bg-gray-800 hover:text-white tracking-wide"
                  >
                    <BookOpenIcon className="h-6 w-6 shrink-0" aria-hidden="true" />
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link
                    href="/support"
                    className="group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-100 hover:bg-gray-800 hover:text-white tracking-wide"
                  >
                    <QuestionMarkCircleIcon className="h-6 w-6 shrink-0" aria-hidden="true" />
                    Support
                  </Link>
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </nav>
    </div>
  );
}