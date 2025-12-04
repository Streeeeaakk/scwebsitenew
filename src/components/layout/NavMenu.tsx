
'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import * as NavigationMenuPrimitive from '@radix-ui/react-navigation-menu';
import { cva } from 'class-variance-authority';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { getAcademicPrograms } from '@/app/actions';
import type { AcademicProgram } from '@/lib/schemas';
import { Logo } from '../Logo';
import Image from 'next/image';
import { useStoredImage } from '@/components/admin/ImageManager';

const NavigationMenu = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Root>
>(({ className, children, ...props }, ref) => (
  <NavigationMenuPrimitive.Root
    ref={ref}
    className={cn(
      'relative z-10 flex max-w-max flex-1 items-center justify-center',
      className
    )}
    {...props}
  >
    {children}
    <NavigationMenuViewport />
  </NavigationMenuPrimitive.Root>
));
NavigationMenu.displayName = NavigationMenuPrimitive.Root.displayName;

const NavigationMenuList = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.List>
>(({ className, ...props }, ref) => (
  <NavigationMenuPrimitive.List
    ref={ref}
    className={cn(
      'group flex flex-1 list-none items-center justify-center space-x-1',
      className
    )}
    {...props}
  />
));
NavigationMenuList.displayName = NavigationMenuPrimitive.List.displayName;

const NavigationMenuItem = NavigationMenuPrimitive.Item;

const navigationMenuTriggerStyle = cva(
  "group inline-flex h-10 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-base font-medium transition-colors hover:bg-accent/10 focus:bg-accent/10 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/10 data-[state=open]:bg-accent/10"
);

const NavigationMenuTrigger = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Trigger>
>(({ className, children, ...props }, ref) => {
  return (
    <NavigationMenuPrimitive.Trigger
      ref={ref}
      className={cn(navigationMenuTriggerStyle(), 'group', 'text-foreground', className)}
      {...props}
    >
      {children}{' '}
      <ChevronDown
        className="relative top-[1px] ml-1 h-3 w-3 transition duration-200 group-data-[state=open]:rotate-180"
        aria-hidden="true"
      />
    </NavigationMenuPrimitive.Trigger>
  )
});
NavigationMenuTrigger.displayName = NavigationMenuPrimitive.Trigger.displayName;

const NavigationMenuContent = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Content>
>(({ className, ...props }, ref) => (
  <NavigationMenuPrimitive.Content
    ref={ref}
    className={cn(
      'left-0 top-0 w-full data-[motion^=from-]:animate-in data-[motion^=to-]:animate-out data-[motion=from-end]:slide-in-from-right-52 data-[motion=from-start]:slide-in-from-left-52 data-[motion=to-end]:slide-out-to-right-52 data-[motion=to-start]:slide-out-to-left-52 md:absolute md:w-auto ',
      className
    )}
    {...props}
  />
));
NavigationMenuContent.displayName = NavigationMenuPrimitive.Content.displayName;

const NavigationMenuLink = NavigationMenuPrimitive.Link;

const NavigationMenuViewport = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Viewport>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Viewport>
>(({ className, ...props }, ref) => (
  <div className={cn('absolute left-0 top-full flex justify-center')}>
    <NavigationMenuPrimitive.Viewport
      className={cn(
        'origin-top-center relative mt-1.5 h-[var(--radix-navigation-menu-viewport-height)] w-full overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-90 md:w-[var(--radix-navigation-menu-viewport-width)]',
        className
      )}
      ref={ref}
      {...props}
    />
  </div>
));
NavigationMenuViewport.displayName =
  NavigationMenuPrimitive.Viewport.displayName;

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
          <div className="text-sm font-bold leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = 'ListItem';

const aboutComponents: { title: string; href: string; description: string }[] = [
  {
    title: 'About Us',
    href: '/about',
    description:
      'Discover our history, mission, and vision.',
  },
  {
    title: 'Administration',
    href: '/administration',
    description: 'Meet the leadership team guiding our college.',
  },
   {
    title: 'News & Events',
    href: '/news',
    description:
      'Stay up-to-date with the latest campus happenings.',
  },
];

const AboutNavContent = () => {
    const aboutCampusImage = useStoredImage('aboutCampus', 'https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=2086&auto=format&fit=crop');

    return (
        <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <a
                    className="relative group flex h-full w-full select-none flex-col justify-end rounded-md p-6 no-underline outline-none focus:shadow-md overflow-hidden"
                    href="/about"
                  >
                    <Image
                      src={aboutCampusImage}
                      alt="About Southland"
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                    <div className="relative z-10">
                        <div className="w-40">
                           <Logo className="invert brightness-0" isUnlinked={true} />
                        </div>
                        <p className="mt-4 text-sm leading-tight text-white/90">
                          A tradition of excellence, a future of promise.
                        </p>
                    </div>
                  </a>
                </NavigationMenuLink>
              </li>
              {aboutComponents.map((component) => (
                <ListItem
                  key={component.title}
                  title={component.title}
                  href={component.href}
                >
                  {component.description}
                </ListItem>
              ))}
            </ul>
        </NavigationMenuContent>
    )
}

const AcademicsNavContent = ({ programs }: { programs: AcademicProgram[] }) => {
  const academicsComponents = [
    {
      title: 'All Programs',
      href: '/academics',
      description: 'Explore our diverse range of undergraduate and graduate programs.',
    },
    ...programs.map(program => ({
        title: program.school,
        href: `/academics/${program.slug}`,
        description: program.description
    }))
  ];
  return (
    <NavigationMenuContent>
       <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
        {academicsComponents.slice(0, 8).map((component) => (
          <ListItem
            key={component.title}
            title={component.title}
            href={component.href}
          >
            {component.description}
          </ListItem>
        ))}
      </ul>
    </NavigationMenuContent>
  );
}


export function NavMenu() {
  const pathname = usePathname();
  const [academicPrograms, setAcademicPrograms] = React.useState<AcademicProgram[]>([]);

  React.useEffect(() => {
    async function fetchPrograms() {
      try {
        const dbPrograms = await getAcademicPrograms();
        setAcademicPrograms(dbPrograms);
      } catch (error) {
        console.error("Failed to fetch academic programs for nav:", error);
      }
    }
    fetchPrograms();
  }, []);
  
  const getLinkClass = (path: string) => {
    const isActive = pathname === path || (path !== '/' && pathname.startsWith(path));
    return cn(
      'group inline-flex h-10 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-base font-medium transition-colors hover:bg-accent/10 focus:outline-none disabled:pointer-events-none disabled:opacity-50',
      'text-foreground',
      isActive ? 'bg-accent/10' : ''
    );
  };
  
  const getTriggerClass = (path: string) => {
    const isActive = pathname.startsWith(path);
     return cn(
      isActive ? 'bg-accent/10' : ''
    );
  };

  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className={getTriggerClass('/about')}>About</NavigationMenuTrigger>
          <AboutNavContent />
        </NavigationMenuItem>
        
        <NavigationMenuItem>
          <NavigationMenuTrigger className={getTriggerClass('/academics')}>Academics</NavigationMenuTrigger>
          <AcademicsNavContent programs={academicPrograms} />
        </NavigationMenuItem>
        
        <NavigationMenuItem>
            <NavigationMenuLink asChild>
                <Link href="/admissions" className={getLinkClass('/admissions')}>
                    Admissions
                </Link>
            </NavigationMenuLink>
        </NavigationMenuItem>

        <NavigationMenuItem>
            <NavigationMenuLink asChild>
                <Link href="/scholarships" className={getLinkClass('/scholarships')}>
                    Scholarships
                </Link>
            </NavigationMenuLink>
        </NavigationMenuItem>

        <NavigationMenuItem>
            <NavigationMenuLink asChild>
                <Link href="/student-life" className={getLinkClass('/student-life')}>
                    Student Life
                </Link>
            </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
            <NavigationMenuLink asChild>
                <Link href="/alumni" className={getLinkClass('/alumni')}>
                    Alumni
                </Link>
            </NavigationMenuLink>
        </NavigationMenuItem>
         <NavigationMenuItem>
            <NavigationMenuLink asChild>
                <Link href="/news" className={getLinkClass('/news')}>
                    News
                </Link>
            </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
            <NavigationMenuLink asChild>
                <Link href="/careers" className={getLinkClass('/careers')}>
                    Careers
                </Link>
            </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
