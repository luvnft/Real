import React from "react";
import MainButton from "../common/MainButton";

function LetMakeThingsHappenSection() {
  return (
    <section className="bg-accent rounded-[45px] p-[50px] md:p-[60px] relative mb-8 mt-8">
      <div className="md:pr-[22rem]">
        <p className="text-h3Mobile md:text-h3 font-medium">
          Let&apos;s make things happen
        </p>

        <p className="my-[26px]">
        Join us today to discover how our platform can simplify your real estate transactions and connect you with buyers, sellers, and brokers seamlessly. Lets optimize your real estate experience together!
        </p>

        <MainButton
          text="Let's get Started Today"
          classes="bg-secondary text-white text-[18px] w-full md:w-[231px] hover:text-black"
        />
      </div>
      <div className="absolute -top-8 right-8 hidden md:block">
        <img
          src="/images/proposal_illustration.png"
          alt="proposal illustration"
        />
      </div>
    </section>
  );
}

export default LetMakeThingsHappenSection;
