import { FC } from "react";
import PrimaryButton from "Shared/components/buttons/primary-button";
import RangeInput from "Shared/components/input/range-input";
import SearchSelectInput from "Shared/components/input/search-select-input";
import TagsInput from "Shared/components/input/tags-input";
import TextInput from "Shared/components/input/text-input";
import { useFormik } from "formik";

const TesterGridCard: FC = () => {
  const form = useFormik<any>({
    initialValues: {
      skills: [],
      rate: 0,
      //   password: "",
      //   confirmPassword: "",
    },
    // validationSchema: TesterUserSchema,
    onSubmit: async (values) => {
      //   mutation.mutate(values);
    },
    onReset: () => {
      // setOpen(false);
    },
  });
  return (
    <aside className='w-[360px] p-10 '>
      <form onSubmit={form.handleSubmit}>
        <div className='space-y-[50px]'>
          <div className=''>
            <TextInput
              id='location'
              label='Location'
              type='text'
              //   required
              {...form}
            />
          </div>
          <div>
            <SearchSelectInput
              id='category'
              label={`Category`}
              placeholder='Select Category'
              options={
                [
                  // ...lodash.map(Countries).map((nationality) => ({
                  //   label: {
                  //     title: nationality,
                  //   },
                  //   value: nationality,
                  // })),
                ]
              }
              required={true}
              {...form}
            />
          </div>
          <div className=''>
            <TagsInput
              id='keywords'
              label={"Keywords"}
              //   required
              placeholder='e.g. Unit Testing,'
              {...form}
            />
          </div>
          <div>
            <RangeInput
              id='rate'
              min={1}
              max={100}
              {...form}
              label='Hourly Rate'
            />
          </div>
          <div className=''>
            <TagsInput
              id='Skills'
              label={"Keywords"}
              //   required
              placeholder='e.g. Add more skills'
              {...form}
            />
          </div>
          <PrimaryButton
            text='Search'
            className=''
            size='md'
            // loading={mutation.isPending}
            type='submit'
          />
          <div className='h-40'></div>
        </div>
      </form>
    </aside>
  );
};

export default TesterGridCard;
