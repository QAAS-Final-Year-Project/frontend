import _ from "lodash";
import moment from "moment";
import { FC, useEffect, useState, useMemo } from "react";

import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import BasicKnowledgeTest from "./basic-knowledge-test";
import Loader from "Shared/components/suspense/loader";
import StepWizardStatus from "Shared/components/layout/step-wizard-status";
import { useQuery } from "@tanstack/react-query";
import { getAssessment } from "./duck/fetch";
import { AxiosError } from "axios";
import { formatAndShowAxiosError } from "Shared/utils/errors";
import AppConfig from "config";
import TechnicalKnowledgeTest from "./technical-knowledge-test";
import VirtualInterview from "./virtual-interview";

const AssessmentSteps = [
  {
    name: "Basic Knowledge Test",
    description: "Test your basic knowledge",
    Component: BasicKnowledgeTest,
  },
  {
    name: "Technical Knowledge Test",
    description: "Test your technical knowledge",
    Component: TechnicalKnowledgeTest,
  },
  // {
  //   name: "Virtual Interview",
  //   description: "Virtual Interview",
  //   Component: VirtualInterview,
  // },
];

const updateItem = (
  array: any[],
  condition: (item: any) => boolean,
  updateFunction: (item: any) => void
): any[] => {
  const index = array.findIndex(condition);

  if (index !== -1) {
    _.update(array, `[${index}]`, updateFunction);
  }
  return array;
};
const processStep = (condition: any) => (data: any[]) => {
  if (condition) {
    return updateItem(
      data,
      //TODO: update this condition
      (item) => item.name === "Escalation",
      (item) => ({
        ...item,
        status: "Skipped",
      })
    );
  }

  return data;
};

const AssesmentPage: FC = () => {
  const query = useQuery({
    queryKey: ["assessment"],
    queryFn: () => getAssessment(),
    throwOnError: (error: AxiosError | any) => {
      formatAndShowAxiosError(error);
      return false;
    },
  });
  const [step, setStep] = useState(0);
  const [lastStep, setLastStep] = useState(0);

  const filteredFormSteps = useMemo(
    () => processStep(false)(AssessmentSteps.filter((_stpe) => true)),
    [query.data?.data]
  );

  const steps = useMemo(
    () => [...filteredFormSteps].map((rawStep, href) => ({ ...rawStep, href })),
    [filteredFormSteps]
  );

  useEffect(() => {
    switch (query?.data?.data?.status) {
      case "BasicTestTaken":
      case "Completed":
      case "Approved":
        setStep(1);
        setLastStep(1);
        break;

      // case "TechnicalTestTaken": {
      //   setStep(2);
      //   setLastStep(2);
      //   break;
      // }
      default:
        setStep(0);
        setLastStep(0);
        break;
    }
  }, [query?.data?.data]);

  const renderView = () => {
    const { Component } = steps[step || 0];
    return (
      <Component
        parentValue={query.data?.data}
        id={_.get(query.data?.data, "_id")}
        data={query.data?.data}
        refetch={query.refetch}
      />
    );
  };

  return (
    <main className='flex-1 flex flex-col overflow-hidden bg-gray-50'>
      {/* <Header /> */}
      <div className='flex flex-1 overflow-hidden'>
        {query.isLoading ? (
          // {loading ? (
          <div className='min-h-[600px] w-full flex flex-1 items-center justify-center'>
            <Loader text='Loading Assessment Details...' />
          </div>
        ) : (
          <div className='bg-gray-100 shadow-xl flex-1 flex p-8 overflow-hidden relative'>
            <div className='w-1/3 flex flex-col space-y-6 overflow-y-auto no-scrollbar'>
              <div className='p-6 border border-dashed border-gray-300 rounded grid grid-cols-2 gap-6 mr-12'>
                <div>
                  <span className='block text-md font-light text-gray-700'>
                    Code
                  </span>
                  <div className='mt-1 block w-full text-md'>
                    {query.data?.data?.code}
                  </div>
                </div>
                <div className=''>
                  <span className='block text-md font-light text-gray-700'>
                    Date
                  </span>
                  <div className='mt-1 block w-full text-md'>
                    {query.data?.data?.createdAt
                      ? moment(query.data?.data?.createdAt).format(
                          AppConfig.date.format
                        )
                      : "N/A"}
                  </div>
                </div>
              </div>

              <StepWizardStatus
                steps={steps}
                step={step}
                setStep={setStep}
                lastStep={lastStep}
                //TODO: status
                status={"STATUS HERE"}
              />
            </div>
            <div className='flex flex-1 overflow-hidden bg-white rounded-lg'>
              {renderView()}
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default AssesmentPage;
