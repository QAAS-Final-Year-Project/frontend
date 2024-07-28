import Header from "Shared/components/layout/header";
import useCookies from "Shared/hooks/cookies";
import { FC } from "react";
import ProfileViewsCard from "./components/profile-views-card";
import DashboardNotificationsOverviewList from "./components/notification-overview";
import PaymentsOverviewList from "./components/payments-overview";
import OverviewSection from "./sections/overview-section";
import PaymentOverViewSection from "./sections/payments-overview-section";
import { mockPayments } from "./data/sample-data";

const TesterDashboard: FC = () => {
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
          <OverviewSection />
          <div className='grid grid-cols-2 gap-x-[30px]'>
            <PaymentOverViewSection />
            <div></div>
          </div>
          <div className='grid grid-cols-2 gap-x-[30px] items-start'>
            <DashboardNotificationsOverviewList />
            <PaymentsOverviewList />
          </div>
        </div>
      </div>
    </section>
  );
};

export default TesterDashboard;
