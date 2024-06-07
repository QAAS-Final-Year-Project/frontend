import StepWizard from "../components/step-wizard";
import { FormikProps } from "formik";
import { FC, useMemo, useState } from "react";
import SummaryPage from "./summary";
import formSteps from "./form-steps";
import { IVerifyUserFormSchema } from "./schema";

interface VerifyUserFormProps {
  form: FormikProps<IVerifyUserFormSchema>;
  isSubmitLoading: boolean;
}

const VerifyUserForm: FC<VerifyUserFormProps> = ({ form, isSubmitLoading }) => {
  const filteredFormSteps = useMemo(
    () =>
      formSteps
        .filter((_step) => Object.keys(form.values).includes(_step.accessor))
        .map((_step, href) => ({ ..._step, href })),
    [Object.keys(form.values)]
  );

  const steps = useMemo(
    () =>
      [
        ...filteredFormSteps,
        {
          name: "Preview",
          FormComponent: SummaryPage,
          accessor: "summary",
          description: "Summary of everything added so far",
        },
      ].map((rawStep, href) => ({ ...rawStep, href })),
    [filteredFormSteps]
  );

  const [step, setStep] = useState(0);
  const [lastStep, setLastStep] = useState(0);

  const handleNextStep = (_step: string) => (_values: any) => {
    // check if last step
    form.setFieldValue(_step, _values);
    setStep(step + 1);
    setLastStep(step === lastStep ? lastStep + 1 : lastStep);
  };

  const handlePreviousStep = () => {
    setStep(step - 1);
  };

  const handleCancel = () => {
    setStep(0);
    setLastStep(0);
    form.resetForm();
  };

  const renderForm = () => {
    const { FormComponent, accessor } = steps[step || 0];
    return (
      <FormComponent
        handleNext={handleNextStep(accessor)}
        initialValues={(form.values as any)[accessor]}
        values={form.values}
        parentForm={form}
        handlePrevious={handlePreviousStep}
        handleCancel={handleCancel}
        handleStep={setStep}
        handleSubmit={form.handleSubmit}
        submitLoading={form.isSubmitting || isSubmitLoading}
        steps={filteredFormSteps}
        step={step || 0}
        lastStep={lastStep || 0}
      />
    );
  };

  return (
    <div className='bg-gray-100 flex-1 flex flex-col overflow-hidden relative max-w-7xl mx-auto'>
      <StepWizard
        steps={steps}
        step={step}
        setStep={setStep}
        lastStep={lastStep}
      />
      <div className='flex flex-1 overflow-hidden bg-white'>{renderForm()}</div>
    </div>
  );
};

export default VerifyUserForm;
