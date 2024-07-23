import AccountTypeForm from "./account-type-form";
import AccountTypeSummary from "./account-type-summary";
import IdentificationInfoForm from "./identification-info-form";
import IdentificationInfoSummary from "./identification-info-summary";
import VerificationDocumentsForm from "./verification-documents-form";
import VerificationDocumentsSummary from "./verification-documents-summary";

const formSteps = [
  {
    name: "Account Type",
    description: "Type of account to be created.",
    accessor: "accountType",
    FormComponent: AccountTypeForm,
    SummaryComponent: AccountTypeSummary,
  },
  {
    name: "Identification Info",
    description: "Identification Information",
    accessor: "identificationInfo",
    FormComponent: IdentificationInfoForm,
    SummaryComponent: IdentificationInfoSummary,
  },
  {
    name: "Verification Documents",
    description: "Uploaded verification documents",
    accessor: "verificationDocuments",
    FormComponent: VerificationDocumentsForm,
    SummaryComponent: VerificationDocumentsSummary,
  },
];

export default formSteps;
