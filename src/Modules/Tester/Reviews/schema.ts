import * as yup from "yup";

export interface ITesterRatingSchema {
    rating: string;
    review: string;
}




export const TesterRatingSchema = yup.object().shape({
    review: yup.string().required("Kindly leave a review"),
    rating: yup.number().required("Kindly rate developer"),
})