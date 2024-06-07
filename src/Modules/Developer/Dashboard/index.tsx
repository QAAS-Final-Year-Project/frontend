import Header from "Shared/components/layout/header";
import useCookies from "Shared/hooks/cookies";
import { FC } from "react";
import OverviewCard from "./components/overview-card";
import CardSectionWrapper from "Shared/components/wrapper/CardSectionWrapper";
import ProfileViewsCard from "./components/profile-views-card";
import NotificationsOverviewList from "./components/notification-overview";
import PaymentsOverviewList from "./components/payments-overview";

const DeveloperDashboard: FC = () => {
  const [user] = useCookies("user");
  const parsedUser = user ? JSON.parse(user) : null;
  return (
    <section>
      <div className='p-2.5 mb-8'>
        <Header
          title={`Howdy, ${parsedUser?.fullName}`}
          subtitle='We are glad to see you again!          '
          breadCrumps={[
            {
              title: "Home",
              to: "/",
            },
            {
              title: "Dashboard",
              to: "#",
            },
          ]}
        />
        <div className='space-y-[30px]'>
          {/* OVerview section */}
          <div className='grid grid-cols-4 gap-[30px]'>
            <OverviewCard
              bgColor='bg-green-500'
              textColor='text-green-500'
              icon='ic:outline-gavel'
              title={"Task Bids Won"}
              value={5}
            />
            <OverviewCard
              bgColor='bg-pink-500'
              textColor='text-pink-500'
              icon='ic:outline-business-center'
              title={"Jobs Applied"}
              value={0}
            />
            <OverviewCard
              bgColor='bg-amber-500'
              textColor='text-amber-500'
              icon='ic:outline-rate-review'
              title={"Reviews"}
              value={4}
            />
            <OverviewCard
              bgColor='bg-blue-500'
              textColor='text-blue-500'
              icon='ic:baseline-trending-up'
              title={"This month Views"}
              value={148}
            />
          </div>

          <div className='grid grid-cols-3 gap-x-[30px]'>
            <ProfileViewsCard />
            <div></div>
          </div>
          <div className='grid grid-cols-2 gap-x-[30px]'>
            <NotificationsOverviewList />
            <PaymentsOverviewList />

          </div>
        </div>
      </div>
    </section>
  );
};

export default DeveloperDashboard;
