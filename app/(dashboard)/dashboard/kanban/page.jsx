import BreadCrumb from '@/components/breadcrumb';
import { KanbanBoard } from '@/components/kanban/kanban-board';
import NewTaskDialog from '@/components/kanban/new-task-dialog';
import { Heading } from '@/components/ui/heading';
import { ScrollArea } from '@/components/ui/scroll-area';
import PropertiesPage from '@/components/properties'

const breadcrumbItems = [{ title: 'Rentals', link: '/dashboard/kanban' }];
export default function page() {
  return (
    <>
    <ScrollArea className="h-full">
      <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
        <BreadCrumb items={breadcrumbItems} />
       
       <PropertiesPage />
      </div>
      </ScrollArea>
    </>
  );
}
