'use client';

import * as React from 'react';
import Link from 'next/link';

import { cn } from '@/lib/utils';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';

import navigation from '@/constants/navigation';
import { NavItemType } from '@/types/NavItem';
import Logo from '../ui/logo';
import useScroll from '@/hooks/use-scroll';
import MenuMob from './menu-mob';

const ListItem = React.forwardRef<
  React.ElementRef<'a'>,
  React.ComponentPropsWithoutRef<'a'>
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = 'ListItem';

export function Navigation() {
  const { scrolled } = useScroll();
  const [isMobileOpen, setIsMobileOpen] = React.useState<boolean>(false);

  return (
    <>
      {isMobileOpen && <MenuMob onClick={() => setIsMobileOpen(false)} />}
      <div className="fixed left-[50%] translate-x-[-50%] h-24 w-full px-2 md:px-4 z-40">
        <div className="flex items-center justify-center w-full h-full">
          <div
            className={`md:px-6 py-4 rounded-xl transition-all duration-500 container ${
              scrolled
                ? ' bg-white bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-70'
                : 'bg-white'
            }`}
          >
            <div className="flex items-center justify-between h-full">
              <div className="flex items-center justify-center px-4 h-[32px]">
                <Logo />
              </div>
              <NavigationMenu className="hidden md:flex">
                <NavigationMenuList>
                  {navigation &&
                    navigation.map((navItem: NavItemType, index: number) => (
                      <NavigationMenuItem key={index}>
                        {navItem.dropdown ? (
                          <>
                            <NavigationMenuTrigger>
                              {navItem.title}
                            </NavigationMenuTrigger>
                            <NavigationMenuContent>
                              <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                                {navItem.dropdown.map((component) => (
                                  <ListItem
                                    key={component.title}
                                    title={component.title}
                                    href={component.url}
                                  ></ListItem>
                                ))}
                              </ul>
                            </NavigationMenuContent>
                          </>
                        ) : (
                          <NavigationMenuLink asChild>
                            <Link
                              href={navItem.url}
                              className={navigationMenuTriggerStyle()}
                            >
                              {navItem.title}
                            </Link>
                          </NavigationMenuLink>
                        )}
                      </NavigationMenuItem>
                    ))}
                </NavigationMenuList>
              </NavigationMenu>
              <div
                className={`flex md:hidden items-center justify-center px-4 h-full`}
              >
                <div
                  onClick={() => setIsMobileOpen(true)}
                  className="flex flex-col items-center justify-center focus:outline-none focus:shadow-outline cursor-pointer"
                >
                  <div className="w-10 h-[3px] bg-black mb-3 rounded-full"></div>
                  <div className="w-10 h-[3px] bg-black rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
