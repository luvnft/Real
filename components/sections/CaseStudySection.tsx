import { Separator } from '@/components/ui/separator';
import Link from 'next/link';
import { MarqueeDemo } from './InfinitySection';

export default function CaseStudySection() {
  const studies = [
    {
      title:
        'Our platform facilitated a seamless real estate transaction, connecting buyers, sellers, and brokers, resulting in increased efficiency and satisfaction.'
    },
    {
      title:
        'With our innovative tools, we helped streamline property listings, enhancing visibility and engagement for sellers and buyers alike.'
    },
    {
      title:
        'Our integrated approach optimized real estate marketing efforts, driving significant growth in leads and sales across diverse property types.'
    }
  ];
  return (
    <section className="mb-8" style={{ marginTop: '110px' }}>
      <div className="flex flex-col items-center gap-8 md:flex-row md:gap-[40px] ">
        <div className="inline-block rounded-md bg-primary px-2 text-h2 font-medium">
          Case Studies
        </div>
        <p className="text-p" style={{ textAlign: 'center' }}>
          Explore Real-Life Examples of How Our Platform Transformed Real Estate
          Transactions
        </p>
      </div>

      <MarqueeDemo />
    </section>
  );
}
