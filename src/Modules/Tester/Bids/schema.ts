import * as yup from "yup";

export interface IUpdateTaskBidSchema {
    notes: string;
    amount: string;
}




export const UpdateTaskBidSchema = yup.object().shape({
    notes: yup.string().required("Kindly provide notes to update bid"),
})