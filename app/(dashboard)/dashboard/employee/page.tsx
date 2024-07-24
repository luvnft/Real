import BreadCrumb from '@/components/breadcrumb';

import { ScrollArea } from '@/components/ui/scroll-area';
import LeadsPage from '@/components/leads';

const breadcrumbItems = [{ title: 'Leads', link: '/dashboard/employee' }];

type paramsProps = {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
};

export default async function page({ searchParams }: paramsProps) {

  return (
    <>
     <ScrollArea className="h-full">
      <div className="flex-1 space-y-4  p-4 pt-6 md:p-8">
        <BreadCrumb items={breadcrumbItems} />
       <LeadsPage />
      </div>
      </ScrollArea>
    </>
  );
}
