import { FC, useEffect, useState } from "react";
import PrimaryButton from "Shared/components/buttons/primary-button";
import RangeInput from "Shared/components/input/range-input";
import SearchSelectInput from "Shared/components/input/search-select-input";
import TagsInput from "Shared/components/input/tags-input";
import TextInput from "Shared/components/input/text-input";
import { useFormik } from "formik";
import useUrlState from "Shared/hooks/use-url-state";
import MultiRangeSlider from "multi-range-slider-react";
import CustomMultiRangeSlider from "Shared/components/input/multi-range-input";
import SecondaryButton from "Shared/components/buttons/secondary-button";
import { wrapClick } from "Shared/utils/ui";

const HomeTasksFilterSection: FC = () => {
  const [search, setSearch] = useUrlState("search");
  const [minAmount, setMinAmount] = useUrlState<number>("minAmount", 1);
  const [minBiddersCount, setMinBiddersCount] = useUrlState<number>(
    "minBiddersCount",
    0
  );
  const [maxBiddersCount, setMaxBiddersCount] = useUrlState<number>(
    "maxBiddersCount",
    5000
  );
  const [maxAmount, setMaxAmount] = useUrlState<number>("maxAmount", 1000);

  const handleAmountChange = (e) => {
    if (e.minValue != minAmount) {
      setMinAmount(e.minValue);
    }
    if (e.maxValue != maxAmount) {
      setMaxAmount(e.maxValue);
    }
  };
  const handleBiddersChange = (e) => {
    if (e.minValue != minBiddersCount) {
      setMinBiddersCount(e.minValue);
    }
    if (e.maxValue != maxBiddersCount) {
      setMaxBiddersCount(e.maxValue);
    }
  };
  const form = useFormik<any>({
    initialValues: {
      keyword: "",
    },
    onSubmit: async (values) => {
      setSearch(values?.keyword);
    },
    onReset: () => {
      setMinAmount(1);
      setMaxAmount(1000);
      setMaxBiddersCount(0);
      setMaxBiddersCount(5000);
      setSearch("");
    },
  });
  useEffect(() => {
    form.setValues({
      keyword: search,
    });
  }, [search]);
  return (
    <aside className='w-[360px] p-10 bg-neutral-50 h-[calc(100%-80px)] sticky top-0'>
      <form onSubmit={form.handleSubmit}>
        <div className='space-y-[50px]'>
          <div>
            <div className='mb-5'>
              <TextInput
                id='keyword'
                label='Keywords'
                type='text'
                // icon='uil:search'
                required
                {...form}
              />
            </div>

            <div className='flex items-center w-full gap-x-2.5'>
              <SecondaryButton
                text='Clear'
                className='flex-1'
                size='md'
                onClick={wrapClick(form.resetForm)}
                icon={"ic:baseline-clear"}
                // loading={mutation.isPending}
                type='reset'
              />
              <PrimaryButton
                text='Search'
                className='flex-1'
                size='md'
                icon={"ic:outline-search"}
                // loading={mutation.isPending}
                type='submit'
              />
            </div>
          </div>

          <div className=''>
            <CustomMultiRangeSlider
              id='task-price-slider'
              label='Fixed Price'
              min={1}
              max={1000}
              step={5}
              minValue={minAmount}
              renderMaxValue={(value) => `$${value}`}
              renderMinValue={(value) => `$${value}`}
              maxValue={maxAmount}
              onInput={(e) => {
                handleAmountChange(e);
              }}
            />
          </div>
          <div className=''>
            <CustomMultiRangeSlider
              id='task-bidders-slider'
              label='Bidders'
              min={0}
              max={5000}
              step={2}
              minValue={minBiddersCount}
              renderMaxValue={(value) => ` ${value} `}
              renderMinValue={(value) => ` ${value} Bidders`}
              maxValue={maxBiddersCount}
              onInput={(e) => {
                handleBiddersChange(e);
              }}
            />
          </div>

          <div className='h-40'></div>
        </div>
      </form>
    </aside>
  );
};

export default HomeTasksFilterSection;
