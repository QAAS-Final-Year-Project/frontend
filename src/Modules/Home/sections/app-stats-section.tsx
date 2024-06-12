import PrimaryButton from "Shared/components/buttons/primary-button";
import PrimaryChip from "Shared/components/chips/primary-chip";
import TextInput from "Shared/components/input/text-input";
import Container from "Shared/components/layout/container";
import { classNames } from "Shared/utils/ui";
import { HomeBackgroundImage } from "assets";
import React, { FC } from "react";
import SectionTitle from "../components/section-title";
import jobCategories, { featureData, stats } from "../data/sample-data";
import CategoryTile from "../components/category-tile";
import FeatureTile from "../components/feature-tile";
import StatTile from "../components/stat-tile";

export const StatsSection: FC = () => {
  return (
    <section className=''>
      <Container className=' pt-[65px] pb-[75px]'>
        <div className='grid grid-cols-4 mt-[15px]'>
          {stats.map((stat, index) => (
            <StatTile key={index} {...stat} />
          ))}
        </div>
      </Container>
    </section>
  );
};

export default StatsSection;
