import React from 'react';
import TeamCard from '../cards/TeamCard';
import MainButton from '../common/MainButton';

function TeamSection() {
  const teamMembers = [
    {
      name: 'John Smith',
      position: 'Real Estate Broker',
      experience:
        '10+ years of experience in real estate sales and property management. Expertise in market analysis and client relations.',
      image: '/images/t_1.png'
    },
    {
      name: 'Jane Doe',
      position: 'Real Estate Agent',
      experience:
        '7+ years of experience in residential and commercial real estate. Strong negotiation skills and extensive knowledge of local markets.',
      image: '/images/t_2.png'
    },
    {
      name: 'Michael Brown',
      position: 'Property Manager',
      experience:
        '5+ years of experience in property management. Proficient in tenant relations, lease agreements, and maintenance coordination.',
      image: '/images/t_3.png'
    },
    {
      name: 'Emily Johnson',
      position: 'Real Estate Marketing Specialist',
      experience:
        '3+ years of experience in real estate marketing. Skilled in digital marketing strategies, property listings, and lead generation.',
      image: '/images/t_4.png'
    },
    {
      name: 'Brian Williams',
      position: 'Real Estate Photographer',
      experience:
        '4+ years of experience in real estate photography. Proficient in capturing properties to highlight their best features and attract potential buyers.',
      image: '/images/t_5.png'
    },
    {
      name: 'Sarah Kim',
      position: 'Real Estate Legal Advisor',
      experience:
        '2+ years of experience in real estate law. Skilled in legal aspects of property transactions, contracts, and compliance.',
      image: '/images/t_6.png'
    }
  ];

  return (
    <section className="mb-8 md:mt-[110px] ">
      <div className="flex flex-col items-center gap-8 md:flex-row md:gap-[40px]">
        <div className="inline-block rounded-md bg-primary px-2 text-h2 font-medium">
          Team
        </div>
        <p className="text-p">
          Meet the dedicated professionals who ensure smooth real estate
          transactions and client satisfaction.
        </p>
      </div>

      <div className="mt-[80px] grid grid-cols-1 gap-[40px] md:grid-cols-3">
        {teamMembers.map((member, index) => (
          <TeamCard {...member} key={index} />
        ))}
      </div>

      <div className="mt-[40px] flex justify-end">
        <MainButton
          text="See all team members"
          classes="bg-secondary text-white text-[18px] w-full md:w-[231px] hover:text-black"
        />
      </div>
    </section>
  );
}

export default TeamSection;
