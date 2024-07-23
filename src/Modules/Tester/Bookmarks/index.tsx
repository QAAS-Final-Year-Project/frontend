import Header from "Shared/components/layout/header";
import { FC } from "react";
import BookmarkedTasksSection from "./sections/bookmarked-tasks-section";

const TesterBookMarksPage: FC = () => {

  return (
    <div>
      <section>
        <div className='p-2.5 mb-8'>
          <Header
            title='Bookmarks'
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
                title: "Bookmarks",
                to: "#",
              },
            ]}
          />
        </div>
        <div className='space-y-[30px] mb-4'>
          <BookmarkedTasksSection />
        </div>
      </section>
    </div>
  );
};
export default TesterBookMarksPage;
