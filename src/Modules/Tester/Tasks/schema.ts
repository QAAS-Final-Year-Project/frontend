import * as yup from "yup";

export interface IResolveTaskSchema {
    notes: string;
    supportingDocuments: any[];
    supportingDocumentUrls: any[];
}




export const ResolveTaskSchema = yup.object().shape({
    notes: yup.string().required("Kindly leave  notes for developer"),
})