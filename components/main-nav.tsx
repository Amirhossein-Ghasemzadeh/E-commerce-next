'use client';

import {cn} from '@/lib/utils';
import Link from 'next/link';
import {useParams, usePathname} from 'next/navigation';

export const MainNav = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) => {
  const pathname = usePathname();
  const params = useParams();

  const routes = [
    {
      href: `/${params.storeId}`,
      label: 'Overview',
      active: pathname === `/${params.storeId}`,
    },
    {
      href: `/${params.storeId}/settings`,
      label: 'Setting',
      active: pathname === `/${params.storeId}/settings`,
    },
  ];

  return (
    <div className={cn('flex items-center space-x-4 lg:space-x-4', className)}>
      {routes.map((route) => (
        <Link
          href={route.href}
          key={route.href}
          className={cn(
            'text-sm font-medium hover:text-primary',
            route.active
              ? 'text-black dark:text-white'
              : 'text-muted-foreground'
          )}>
          {route.label}
        </Link>
      ))}
    </div>
  );
};
