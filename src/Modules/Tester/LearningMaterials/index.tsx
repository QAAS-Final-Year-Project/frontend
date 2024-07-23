import { FC, useEffect, useRef, useState } from "react";
import Header from "Shared/components/layout/header";
import LearningMaterialsVideoSection from "./sections/videos-section";
import ArticlesSection from "./sections/articles-section";

const LearningMaterialsPage: FC = () => {
  const [slideWidth, setSlideWidth] = useState<number>(0);
  const divRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleResize = () => {
      if (divRef.current) {
        setSlideWidth(divRef.current.offsetWidth);
      }
    };

    // Initial width set
    handleResize();

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Clean up the event listener
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <section>
      <div className='p-2.5' ref={divRef}>
        <Header
          title='Learning Materials'
          subtitle={"Video Content"}
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
              title: "Learning Materials",
              to: "#",
            },
          ]}
        />
      </div>
      <div className='w-full h-5'></div>
      <LearningMaterialsVideoSection slideWidth={slideWidth} />
      <h3 className='start mb-4 mt-20 text-zinc-800 text-[26px] font-medium  leading-9'>
        Articles
      </h3>
      <ArticlesSection />

    </section>
  );
};

export default LearningMaterialsPage;
