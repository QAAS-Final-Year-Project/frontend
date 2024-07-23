import useCookies from "Shared/hooks/cookies";
import { FC } from "react";

import PrimaryButton from "Shared/components/buttons/primary-button";
import MinimalFooter from "Shared/layout/footer/minimal-footer";
import Header from "Shared/components/layout/header";
import AccountSettings from "./account-settings";
import SocialSettings from "./social-settings";
import SecuritySettings from "./security-settings";

const DeveloperSettings: FC = () => {
  const [user] = useCookies("user");
  const parsedUser = user ? JSON.parse(user) : null;

  return (
    <section>
      <div className='p-2.5 mb-8'>
        <Header
          title='Settings'
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
              title: "Settings",
              to: "#",
            },
          ]}
        />
        <div className='space-y-[30px]'>
          <AccountSettings user={parsedUser} />

          <SocialSettings user={parsedUser} />
          <SecuritySettings user={parsedUser} />

          <PrimaryButton
            text='Save Changes'
            size='lg'
            // loading={mutation.isPending}
            type='submit'
          />
        </div>
      </div>
      <MinimalFooter />
    </section>
  );
};

export default DeveloperSettings;
