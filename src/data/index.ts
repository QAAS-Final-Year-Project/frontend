export { default as Nationalities } from "./nationalities.json";

export const TesterUserAccountTypes = [
    { value: "Starter", title: "Starter", description: "A developer is a person who writes code to create software programs, applications, and systems." },
    { value: "Professional", title: "Professional", description: "A tester checks software for defects and verifies it meets requirements." },
] as const;
export const AccountTypes = [
    { value: "Developer", title: "Developer", },
    { value: "Tester", title: "Tester", },
] as const;
export const YesNo = [
    { value: "yes", title:"Yes", },
{ value: "no", title: "No", },
] as const;


export { default as IdentityCardTypes } from "./identity-card-types";
export { default as VerificationDocumentTypes } from "./verifcation-document-types";
