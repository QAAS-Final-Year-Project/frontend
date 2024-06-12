import { AxiosDataService } from "Shared/utils/axios"

export const getRecommendedTasks = async () => {
    // await new Promise((resolve) => setTimeout(resolve, 10000000))
    return AxiosDataService.get(`/api/home/recommended-tasks`)
}