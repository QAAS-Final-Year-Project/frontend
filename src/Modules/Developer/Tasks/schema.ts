import moment from "moment";
import * as yup from "yup";

export interface ICreateTaskSchema {
    title: string;
    description: string;
    amount: number;
    deadlineDate: string;
    tags: any[]
    supportingDocumentUrls: any[];
    supportingDocuments: any[];
}

export interface ITaskDeadlineSchema {
    deadlineDate: Date;

}


export const TaskDeadlineSchema = yup.object().shape({
    deadlineDate: yup.date().min(moment().toDate(), "Must be later than now").required("Kindly indicate new deadline date")
})




export const CreateTaskSchema = yup.object().shape({
    title: yup.string().required("Kindly provide a title"),
    description: yup.string().required("Kindly provide a description"),
    amount: yup.number().required("Kindly provide an amount"),
    deadlineDate: yup.string().required("Kindly provide a deadline"),
    tags: yup.array().required("Kindly provide tags").min(1, "Kindly provide at least one tag"),
})