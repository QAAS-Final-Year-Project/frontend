import * as yup from "yup";

export interface ISendMessageSchema {
    message: string;
}




export const SendMessageSchema = yup.object().shape({
// message: yup.string().required("Kindly input message"),
})