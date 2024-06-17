import Header from "Shared/components/layout/header";
import CardSectionWrapper from "Shared/components/wrapper/CardSectionWrapper";
import { FC } from "react";
import { sampleReviewData } from "./data/sample-data";
import ReviewRow from "./components/review-row";
import RateDevelopersSection from "./sections/rate-developers-section";
import ReviewedSection from "./sections/my-ratings-section";

const TestersReviewsPage: FC = () => {
  return (
    <div>
      <section>
        <div className='p-2.5 mb-8'>
          <Header
            title='Reviews'
            breadCrumps={[
              {
                title: "Home",
                to: "/",
              },
              {
                title: "Dashboard",
                to: "/",
              },
              {
                title: "Reviews",
                to: "#",
              },
            ]}
          />
        </div>
        <div className='grid grid-cols-2 gap-x-[30px]'>
          <RateDevelopersSection />

          <ReviewedSection />
        </div>
      </section>
    </div>
  );
};
export default TestersReviewsPage;
