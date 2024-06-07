
import { IdentityCardTypes, Nationalities, TesterUserAccountTypes, VerificationDocumentTypes } from "data";
import lodash from "lodash";
import moment from "moment";
import * as Yup from "yup";
export type IdentityCardType = (typeof IdentityCardTypes)[number];


export type TesterUserAccountType =
    (typeof TesterUserAccountTypes)[number]["value"];
export type VerificationDocumentType =
    (typeof VerificationDocumentTypes)[number]["value"];
export interface IVerifyUserFormSchema {
    accountType: {
        accountType: TesterUserAccountType;
    }
    identificationInfo: {
        identityCardType: IdentityCardType,
        identityCardNumber: string;
        identityCardIssueDate: string;
        identityCardExpiryDate: string;
        identityCardFrontImageUrl: string
        identityCardBackImageUrl: string
        dateOfBirth: string;
        nationality: string;
        profileImageUrl: string;
    };
    verificationDocuments: {
        verificationDocuments: { type: VerificationDocumentType, uploadUrl: string }[]
    };
}

export const AccountTypeSchema = Yup.object().shape({
    accountType: Yup.string().oneOf([...TesterUserAccountTypes.map(item => item.value)]).required("Account Type is required"),
});
export const IdentificationInfoSchema = Yup.object().shape({
    identityCardType: Yup.string()
        .oneOf([...IdentityCardTypes])
        .required("Kindly select ID Card type"),
    identityCardNumber: Yup.string().required("Kindly enter ID Card number"),
    identityCardIssueDate: Yup.date().required("Kindly enter ID Card issue date"),
    identityCardExpiryDate: Yup.date()
        .when("identityCardType", {
            is: (value) => !["VotersIdentificationCard"].includes(
                value
            ),
            then: (schema) =>
            schema.required("Kindly enter ID Card expiry date"),
            otherwise: (schema) => schema.nullable().notRequired(),
        }),
    identityCardFrontImageUrl: Yup.string().required("Kindly attach front image of ID Card"),
    identityCardBackImageUrl: Yup.string()
        .url()
        .when("identityCardType", {
            is: (value) => !["DriversLicense", "VotersIdentificationCard"].includes(
                value
            ),
            then: (schema) =>
                schema.required("Kindly attach rear image of ID Card"),
            otherwise: (schema) => schema.nullable().notRequired(),
        }),
    dateOfBirth: Yup.date()
        .max(moment().toDate(), 'Date of Birth cannot be in the future').required('Date of Birth is required'),
    nationality: Yup.string()
        .oneOf(lodash.map(Nationalities, "nationality"))
        .required("Kindly select nationality"),
    profileImageUrl: Yup.string().url().nullable().required("Kindly upload a profile image"),
});


export const VerificationDocumentsSchema = (accountType: TesterUserAccountType) =>
    Yup.object().shape({
        verificationDocuments: accountType === "Professional"
            ? Yup.array()
                .of(
                    Yup.object().shape({
                        type: Yup.string()
                            .oneOf([...VerificationDocumentTypes.map((item) => item.value)])
                            .required("Document type is required"),
                        uploadUrl: Yup.string().required("Kindly upload the document"),
                    })
                )
                .required("Kindly upload the required documents")
            : Yup.array().notRequired(),
    });



