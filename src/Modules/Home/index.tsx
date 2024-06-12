import { FC } from "react";
import HeroSection from "./sections/hero-section";
import JobCategoriesSection from "./sections/job-categories";
import GetStartedSection from "./sections/get-started";
import WorksSection from "./sections/works-section";
import TestimonialsSection from "./sections/testimonials-section";
import StatsSection from "./sections/app-stats-section";
import HomeTasksSection from "./sections/tasks-section";

const HomeLandingPage: FC = () => {
  return (
    <div className=''>
      <HeroSection />
      <JobCategoriesSection />
      <GetStartedSection />
      <HomeTasksSection />
      <WorksSection />
      <TestimonialsSection />
      <StatsSection />
    </div>
  );
};

export default HomeLandingPage;
