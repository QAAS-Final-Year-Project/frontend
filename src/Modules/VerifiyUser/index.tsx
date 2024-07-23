import { CheckIcon } from "@heroicons/react/24/solid";
import { useMutation } from "@tanstack/react-query";
import { showToast } from "Shared/utils/alert";
import { isAxiosError } from "axios";
import { useFormik } from "formik";
import { FC } from "react";
import VerifyUserForm from "./form";
import { IVerifyUserFormSchema } from "./form/schema";
import { doSubmitVerification } from "./duck/fetch";
import { setMe } from "Shared/utils/auth";

const VerifyUserPage: FC = () => {
  const mutation = useMutation({
    mutationFn: doSubmitVerification,
    onSuccess: (response) => {
      showToast({
        type: "success",
        title: "Details Submitted Successfully, Awaiting Verification",
      });
      setMe({ ...response?.data, accountType: "TesterUser" });
      setTimeout(() => {
        window.location.replace("/");
      }, 1000);
    },
    onError: (error) => {
      if (
        isAxiosError(error) &&
        error?.response?.data &&
        error.response?.data?.message
      ) {
        showToast({
          type: "error",
          title: error.response?.data?.message,
        });
        if (error.response?.data?.errors) {
          // form.setErrors(error.response?.data?.errors);
        }
      } else {
        showToast({
          type: "error",
          title: error?.message,
        });
      }
    },
  });

  const form = useFormik<IVerifyUserFormSchema>({
    initialValues: {
      accountType: {
        accountType: "Starter",
      },
      identificationInfo: {
        identityCardBackImageUrl: "",
        identityCardFrontImageUrl: "",
        identityCardExpiryDate: "",
        identityCardIssueDate: "",
        identityCardNumber: "",
        identityCardType: "DriversLicense",
        profileImageUrl: "",
        dateOfBirth: "",
        nationality: "",
      },
      verificationDocuments: {
        verificationDocuments: [
          {
            type: "",
            uploadUrl: "",
          },
        ],
      },
    },
    // validationSchema: LoginTesterUserSchema,
    onSubmit: async (values) => {
      mutation.mutate({
        accountType: values.accountType.accountType,
        identificationInfo: values.identificationInfo,
        verificationDocuments: values.verificationDocuments
          .verificationDocuments[0].type
          ? values.verificationDocuments.verificationDocuments
          : undefined,
      });
    },
    onReset: () => {
      // setOpen(false);
    },
  });
  return (
    <main className='isolate flex-1 flex flex-col overflow-hidden h-full'>
      <header className='x'>
        <h3 className=' text-center text-zinc-800 mb-[42px]  text-[26px] font-bold leading-[27px] '>
          Submit Details to Verify Account
        </h3>
      </header>
      <div className='flex flex-1 overflow-hidden'>
        <VerifyUserForm
          form={form}
          // isSubmitLoading={loading || form.isSubmitting}
          isSubmitLoading={mutation.isPending}
        />
      </div>
    </main>
  );
};

export default VerifyUserPage;
