import BreadCrumb from '@/components/breadcrumb';
import BuyerUpdate from '../../../../components/buyerprofile'
import { ScrollArea } from '@/components/ui/scroll-area';

const breadcrumbItems = [{ title: 'Seller', link: '/dashboard/sellerprofile' }];
export default function page() {
  return (
    <>
    <ScrollArea className="h-full">
      <div className="flex-1 space-y-4  p-4 pt-6 md:p-8">
        <BreadCrumb items={breadcrumbItems} />
       <BuyerUpdate />
      </div>
      </ScrollArea>
    </>
  );
}