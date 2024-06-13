import { AxiosDataService } from "Shared/utils/axios"

export const getRecommendedTasks = async () => {
    // await new Promise((resolve) => setTimeout(resolve, 10000000))
    return AxiosDataService.get(`/api/home/recommended-tasks`)
}
export const getSingleHomeTask = async (id: string | number) => {
    // await new Promise((resolve) => setTimeout(resolve, 10000000))
    return AxiosDataService.get(`/api/home/task/` + id, {
        populate: ["createdBy", "bidders.bidder"]
    })
}

export const doBidTask = async (params: { id: string, values: any }) => {
    return AxiosDataService.post(`/api/home/task/${params.id}/bid`, params.values)
}
