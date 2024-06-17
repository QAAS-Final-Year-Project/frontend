import { AxiosDataService } from "Shared/utils/axios";
import { IGetFilter } from "data/index.types";

export const getUnReview = async (filter: IGetFilter) => {
  // await new Promise((resolve) => setTimeout(resolve, 10000000))
  return AxiosDataService.get(`/api/tasks`, filter);
};


export const doReviewTask = async (params: { id: any; values: any }) => {
  return AxiosDataService.post(`/api/tasks/${params.id}/review`, params.values);
};



