import BreadCrumb from '@/components/breadcrumb';
import { ScrollArea } from '@/components/ui/scroll-area';
import RealEstatePage from '@/components/toolcomp';

const breadcrumbItems = [{ title: 'Tools', link: '/dashboard/tools' }];
export default function page() {
  return (
    <ScrollArea className="h-full">
      <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
        <BreadCrumb items={breadcrumbItems} />
      <RealEstatePage />
      </div>
    </ScrollArea>
  );
}
