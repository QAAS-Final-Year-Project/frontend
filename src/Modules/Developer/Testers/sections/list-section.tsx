import SelectInput from "Shared/components/input/select-input";
import { FC } from "react";
import TesterGridCard from "../components/tester-grid-card";
import { sampleTesterList } from "../data/sample-data";
import PaginationComponent from "Shared/components/nav/pagination";
const testPaginationRows = {
  rows: [
    { id: 1, name: "John Doe", email: "john.doe@example.com" },
    { id: 2, name: "Jane Smith", email: "jane.smith@example.com" },
    { id: 3, name: "Alice Johnson", email: "alice.johnson@example.com" },
    { id: 4, name: "Bob Brown", email: "bob.brown@example.com" },
    { id: 5, name: "Charlie Davis", email: "charlie.davis@example.com" },
    { id: 6, name: "Diana Evans", email: "diana.evans@example.com" },
    { id: 7, name: "Evan Harris", email: "evan.harris@example.com" },
    { id: 8, name: "Fiona Lee", email: "fiona.lee@example.com" },
    { id: 9, name: "George King", email: "george.king@example.com" },
    { id: 10, name: "Hannah Moore", email: "hannah.moore@example.com" },
  ],
  total: 50,
  page: 1,
  pageSize: 10,
  totalPages: 5,
};

const TestersListListSection: FC = () => {
  return (
    <div className='flex-1 bg-white p-10 '>
      <h4 className='text-zinc-800 text-xl font-medium  leading-loose mb-[15px]'>
        Search Results
      </h4>
      <div className='px-[25px] pt-[15px] pb-4 bg-zinc-100 rounded justify-between flex items-center mb-[30px]'>
        <div className="text-stone-500 text-base font-normal  leading-snug">
          Turn on email alerts for this search
        </div>{" "}
        <SelectInput
          id='identityCardType'
          isFilter={true}
          label='Sort By'
          options={[{ label: "Relevance", value: "" }]}
          handleChange={() => {}}
          handleBlur={() => {}}
          values={{ identityCardType: "" }}
          //   {...form}
        />
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[30px] mb-[50px] '>
        {sampleTesterList.map((tester, index) => (
          <TesterGridCard key={index} {...tester} />
        ))}
      </div>
      <PaginationComponent data={testPaginationRows} />
    </div>
  );
};

export default TestersListListSection;
