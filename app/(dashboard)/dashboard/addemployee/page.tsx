import BreadCrumb from '@/components/breadcrumb';
import { EmployeForm } from '@/components/forms/employee-form';
import { ScrollArea } from '@/components/ui/scroll-area';
import React from 'react';

export default function Page() {
  const breadcrumbItems = [
    { title: 'Buyer', link: '/dashboard/employee' },
    { title: 'Create', link: '/dashboard/employee/create' }
  ];
  return (
    <ScrollArea className="h-full">
      <div className="flex-1 space-y-4 p-8">
        <BreadCrumb items={breadcrumbItems} />
        <EmployeForm
          initialData={null}
          key={null}
        />
      </div>
    </ScrollArea>
  );
}
