import BreadCrumb from '@/components/breadcrumb';
import { ScrollArea } from '@/components/ui/scroll-area';
import BlogPost from '@/components/blogpost';

const breadcrumbItems = [{ title: 'Rental', link: '/dashboard/profile' }];

export default function page() {
  return (
    <ScrollArea className="h-full">
      <BlogPost />
    </ScrollArea>
  );
}
