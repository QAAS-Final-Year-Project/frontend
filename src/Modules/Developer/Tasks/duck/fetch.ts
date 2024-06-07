import { AxiosDataService } from "Shared/utils/axios"
import { IGetFilter } from "data/index.types"

export const doCreateTask = async (values: any) => {
    return AxiosDataService.post('/api/tasks', values)
}



export const getTasks = async (filter: IGetFilter) => {
    // await new Promise((resolve) => setTimeout(resolve, 10000000))
    return AxiosDataService.get(`/api/tasks`, filter)
}

export const getTask = async (id: string | number) => {
    return AxiosDataService.get("/api/tasks/" + id)
}
