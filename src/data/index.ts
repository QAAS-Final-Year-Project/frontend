export { default as Nationalities } from "./nationalities.json";

export const TesterUserAccountTypes = [
    { value: "Starter", title: "Starter", description: "New to QA testing and looking to gain experience and find work." },
    { value: "Professional", title: "Professional", description: "Experienced QA testers with a strong background in the field." },
] as const;
export const AccountTypes = [
    { value: "Developer", title: "Developer", },
    { value: "Tester", title: "Tester", },
] as const;
export const YesNo = [
    { value: "yes", title: "Yes", },
    { value: "no", title: "No", },
] as const;


export { default as IdentityCardTypes } from "./identity-card-types";
export { default as VerificationDocumentTypes } from "./verifcation-document-types";
