import { Separator } from "@/components/ui/separator";
import Link from "next/link";

export default function CaseStudySection() {
  const studies = [
    {
      title:
        "Our platform facilitated a seamless real estate transaction, connecting buyers, sellers, and brokers, resulting in increased efficiency and satisfaction.",
    },
    {
      title:
        "With our innovative tools, we helped streamline property listings, enhancing visibility and engagement for sellers and buyers alike.",
    },
    {
      title:
        "Our integrated approach optimized real estate marketing efforts, driving significant growth in leads and sales across diverse property types.",
    },
  ];
  return (
    <section className="mt-8 mb-8">
      <div className="flex flex-col md:flex-row gap-8 md:gap-[40px] items-center ">
        <div className="px-2 bg-primary inline-block font-medium text-h2 rounded-md">
          Case Studies
        </div>
        <p className="text-p">
          Explore Real-Life Examples of How Our Platform Transformed Real Estate Transactions
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 items-center justify-center rounded-[45px] gap-[40px] mt-[80px] bg-secondary text-white p-8 md:p-[50px]">
        {studies.map((study, index) => (
          <div className="flex justify-center items-center" key={index}>
            <div>
              <p className="pb-[20px]">{study.title}</p>
              <Link href="/">
                <div className="flex gap-2 items-center">
                  <p className="text-primary">Learn more</p>
                  <div>
                    <img src="/images/arrow_rotate.png" />
                  </div>
                </div>
              </Link>
            </div>
            {index !== 2 && (
              <div className="mx-4 xl:mx-[64px] hidden md:block">
                <Separator orientation="vertical" className="h-[186px]" />
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
