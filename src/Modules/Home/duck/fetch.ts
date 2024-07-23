import { AxiosDataService } from "Shared/utils/axios"
import { IGetFilter } from "data/index.types"

export const getRecommendedTasks = async () => {
    // await new Promise((resolve) => setTimeout(resolve, 10000000))
    return AxiosDataService.get(`/api/home/recommended-tasks`)
}
export const getSingleHomeTask = async (id: string | number, extra?: {}) => {
    // await new Promise((resolve) => setTimeout(resolve, 10000000))
    return AxiosDataService.get(`/api/home/task/` + id, {
        populate: ["createdBy", "bidders.bidder"],
        ...extra
    })
}


export const getSingleTester = async (id: string | number, extra?: {}) => {
    // await new Promise((resolve) => setTimeout(resolve, 10000000))
    return AxiosDataService.get(`/api/home/testers/` + id, {
        populate: [],
        ...extra
    })
}


export const getSingleTesterTaskAndReviews = async (id: string | number,filter: IGetFilter) => {
    // await new Promise((resolve) => setTimeout(resolve, 10000000))
    return AxiosDataService.get(`/api/home/testers/` + id + "/tasks",filter)
}


export const getHomeTasks = async (filter: IGetFilter) => {
    // await new Promise((resolve) => setTimeout(resolve, 10000000))
    return AxiosDataService.get(`/api/home/tasks`, filter)
}

export const doBidTask = async (params: { id: string, values: any }) => {
    return AxiosDataService.post(`/api/home/task/${params.id}/bid`, params.values)
}
