
import { FC } from "react";
import TestersListFilterSection from "./sections/filter-section";
import TestersListListSection from "./sections/list-section";

const TestersListPage: FC = () => {

  return (
    <section className='-m-8 flex '>
     <TestersListFilterSection />
     <TestersListListSection />
    </section>
  );
};

export default TestersListPage;
