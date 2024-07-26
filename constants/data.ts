import { Icons } from '@/components/icons';
import { NavItem, SidebarNavItem } from '@/types';

export type User = {
  id: number;
  name: string;
  company: string;
  total_sales_volume: number;
  properties_sold: number;
  total_rental_volume: number;
};

export type Employee = {
  id: number;
  name: string;
  company: string;
  total_sales_volume: number;
  properties_sold: number;
  total_rental_volume: number;
};

export const navItems: NavItem[] = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: 'dashboard',
    label: 'Dashboard'
  },
  {
    title: 'Rentals',
    href: '/dashboard/kanban',
    icon: 'kanban',
    label: 'kanban'
  },
  {
    title: 'Add Rental',
    href: '/dashboard/profile',
    icon: 'plus',
    label: 'profile'
  },
  {
    title: 'Tools',
    href: '/dashboard/tools',
    icon: 'tools',
    label: 'user'
  },
  {
    title: 'Leads',
    href: '/dashboard/employee',
    icon: 'employee',
    label: 'employee'
  },
  {
    title: 'Professionals',
    href: '/dashboard/task',
    icon: 'professionals',
    label: 'professionals'
  },
  {
    title: 'Investment',
    href: '/dashboard/crm',
    icon: 'investment',
    label: 'investment'
  },
  {
    title: 'Profile',
    href: '/dashboard/userpage',
    icon: 'profile',
    label: 'employee'
  },
  {
    title: 'Chat',
    href: '/dashboard/chat',
    icon: 'chat',
    label: 'employee'
  }
];
