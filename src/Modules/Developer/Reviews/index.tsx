import Header from "Shared/components/layout/header";
import CardSectionWrapper from "Shared/components/wrapper/CardSectionWrapper";
import { FC } from "react";
import { sampleReviewData } from "./data/sample-data";
import ReviewRow from "./components/review-row";

const DeveloperReviewsPage: FC = () => {
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
          <CardSectionWrapper
            className='col-span-1'
            title='Pending Reviews'
            icon={"ic:outline-face"}
          >

            {
                sampleReviewData.map((task, index) => (
                    <ReviewRow
                      key={index}
                      taskName={task.taskName}
                      isRated={task.isRated}
                      review={task.review}
                      rating={task.rating}
                      date={task.date}
                    />
                  ))
            }
          </CardSectionWrapper>
          <CardSectionWrapper
            className='col-span-1'
            title='Reviewed Tasks'
            icon={"ic:outline-face"}
          ></CardSectionWrapper>
        </div>
      </section>
    </div>
  );
};
export default DeveloperReviewsPage;
