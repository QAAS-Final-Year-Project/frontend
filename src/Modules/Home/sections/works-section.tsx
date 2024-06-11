import PrimaryButton from "Shared/components/buttons/primary-button";
import PrimaryChip from "Shared/components/chips/primary-chip";
import TextInput from "Shared/components/input/text-input";
import Container from "Shared/components/layout/container";
import { classNames } from "Shared/utils/ui";
import { HomeBackgroundImage } from "assets";
import React, { FC } from "react";
import SectionTitle from "../components/section-title";
import jobCategories from "../data/sample-data";
import CategoryTile from "../components/category-tile";

export const WorksSection: FC = () => {
  return (
    <section className=''>
      <Container className=' pt-[65px] pb-[75px]'>
        <SectionTitle text={"How it works?"} />
        <div className='grid grid-cols-3 mt-[15px]'></div>
      </Container>
    </section>
  );
};

export default WorksSection;
