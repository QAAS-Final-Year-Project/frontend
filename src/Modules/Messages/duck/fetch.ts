import { IGetFilter } from "data/index.types"
import { AxiosDataService } from "Shared/utils/axios"

export const getTesterUser = async (id: string, filter?: IGetFilter) => {
    // await new Promise((resolve) => setTimeout(resolve, 10000000))
    return AxiosDataService.get(`/api/tester-users/` + id, filter)
}
export const getDeveloperUser = async (id: string, filter?: IGetFilter) => {
    // await new Promise((resolve) => setTimeout(resolve, 10000000))
    return AxiosDataService.get(`/api/developer-users/` + id, filter)
}


