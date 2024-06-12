import PrimaryButton from "Shared/components/buttons/primary-button";
import Container from "Shared/components/layout/container";
import { GetStartedSectionImage } from "assets";
import { FC } from "react";

const GetStartedSection: FC = () => {
  return (
      <section className='get-started-section' style={{
        backgroundImage: `url(${GetStartedSectionImage})`,
      }}>
        <div className={`py-[110px] z-[100] relative`}>
          <Container>
            <div className='max-w-[50%] space-y-6'>
              <h3 className=' text-white text-[34px] font-medium  leading-[46px]'>
                Hire experts or be hired. For any job, any time.
              </h3>
              <h6 className=' text-white text-lg font-light  leading-[31px]'>
                Bring to the table win-win survival strategies to ensure
                proactive domination. At the end of the day, going forward, a
                new normal that has evolved from generation is on the runway
                towards.
              </h6>
              <PrimaryButton text='Get Started' />
            </div>
          </Container>
        </div>
      </section>
  );
};

export default GetStartedSection;
