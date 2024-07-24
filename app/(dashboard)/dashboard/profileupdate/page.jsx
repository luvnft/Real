import BreadCrumb from '@/components/breadcrumb';
import { ScrollArea } from '@/components/ui/scroll-area';
import ProfessionaUpdate from '../../../../components/professionalformupdate'

const breadcrumbItems = [{ title: 'Professional', link: '/dashboard/task' }];
export default function page() {
  return (
    <ScrollArea className="h-full">
      <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
        <BreadCrumb items={breadcrumbItems} />
        <ProfessionaUpdate />
      </div>
    </ScrollArea>
  );
}
