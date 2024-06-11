import { FC } from "react";
import HeroSection from "./sections/hero-section";
import JobCategoriesSection from "./sections/job-categories";
import GetStartedSection from "./sections/get-started";

const HomeLandingPage: FC = () => {
  return (
    <div className="">

      <HeroSection />
      <JobCategoriesSection />
      <GetStartedSection />
    </div>
  );
};

export default HomeLandingPage;
