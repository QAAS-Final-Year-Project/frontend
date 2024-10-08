import Header from "Shared/components/layout/header";
import { useCookies } from "react-cookie";
import { FC } from "react";
import ProfileViewsCard from "./components/profile-views-card";
import DashboardNotificationsOverviewList from "./components/notification-overview";
import PaymentsOverviewList from "./components/payments-overview";
import OverviewSection from "./sections/overview-section";
import DeveloperTasksOverviewSection from "./sections/payments-overview-section";
import { mockPayments } from "./data/sample-data";

const DeveloperDashboard: FC = () => {
  const [cookies, setCookies, removeCookies] = useCookies(["user", "token"], {
    doNotParse: true,
  });  
  const parsedUser = cookies.user ? JSON.parse(cookies.user) : null;

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
            <DeveloperTasksOverviewSection  />
            <div></div>
          </div>
          <div className='grid grid-cols-2 gap-x-[30px]'>
            <DashboardNotificationsOverviewList />
            <PaymentsOverviewList />
          </div>
        </div>
      </div>
    </section>
  );
};

export default DeveloperDashboard;
