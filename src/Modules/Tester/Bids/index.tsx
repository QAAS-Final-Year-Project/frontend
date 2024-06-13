import Header from "Shared/components/layout/header";
import CardSectionWrapper from "Shared/components/wrapper/CardSectionWrapper";
import { FC } from "react";
import BidRow from "./components/bid-row";

const sampleData = [
  {
    title: "Build a Personal Portfolio Website",
    _id: "1",
    date: "2023-05-01T10:00:00Z",
    biddersCount: 12,
    amount: 500,
  },
  {
    title: "Develop a Mobile App for Expense Tracking",
    _id: "2",
    date: "2023-04-15T14:30:00Z",
    biddersCount: 8,
    amount: 1200,
  },
  {
    title: "Design a Logo and Branding Kit",
    _id: "3",
    date: "2023-06-10T09:15:00Z",
    biddersCount: 6,
    amount: 300,
  },
  {
    title: "Write SEO-Optimized Blog Articles",
    _id: "4",
    date: "2023-05-20T16:45:00Z",
    biddersCount: 15,
    amount: 800,
  },
];

const TesterBidsPage: FC = () => {
  return (
    <section>
      <div className='p-2.5 mb-8'>
        <Header
          title='My Active Bids'
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
              title: "My Active Bids",
              to: "#",
            },
          ]}
        />
      </div>
      <div className='space-y-[30px] mb-4'>
        <CardSectionWrapper icon={"ic:outline-gavel"} title='My Bid List'>
          {sampleData.map((bid) => (
            <BidRow
              key={bid._id}
              title={bid.title}
              _id={bid._id}
              date={bid.date}
              biddersCount={bid.biddersCount}
              amount={bid.amount}
              onDelete={() => console.log(`Delete bid ${bid._id}`)}
              onUpdate={() => console.log(`Update bid ${bid._id}`)}
            />
          ))}
        </CardSectionWrapper>
      </div>
    </section>
  );
};

export default TesterBidsPage;
