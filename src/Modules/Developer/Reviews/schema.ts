import * as yup from "yup";

export interface IDeveloperRatingSchema {
    rating: string;
    review: string;
    isCompletedOnTime: boolean;
}




export const DeveloperRatingSchema = yup.object().shape({
    review: yup.string().required("Kindly leave a review"),
    rating: yup.number().required("Kindly rate tester"),
    isCompletedOnTime: yup.boolean().required("Was task completed on time?"),
})