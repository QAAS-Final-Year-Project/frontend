import { AxiosDataService } from "Shared/utils/axios"
import { IGetFilter } from "data/index.types"

export const doResolveTask = async (params: { id: string, values: any }) => {
    return AxiosDataService.post(`/api/tasks/${params.id}/resolve`, params.values)
}



export const doAddNote = async ({
    values,
    id,
}) => {
    return AxiosDataService.post(`/api/tasks/${id}/add-note`, values)
}


export const getTasks = async (filter: IGetFilter) => {
    // await new Promise((resolve) => setTimeout(resolve, 10000000))
    return AxiosDataService.get(`/api/tasks`, filter)
}


export const getTask = async (id: any, populate?: string[]) => {
    return AxiosDataService.get("/api/tasks/" + id, {
        populate: populate || ["history.actor", "bidders.bidder", "createdBy"]
    })
}


export const deleteTaskNote = async (taskId, noteId) => {
    return AxiosDataService.delete(`/api/tasks/${taskId}/notes/${noteId}`)
}


export const doAssignTask = async (params: { id: string, values: any }) => {
    return AxiosDataService.post(`/api/tasks/${params.id}/assign`, params.values)
}
export const doStartTask = async (params: { id: string, values: any }) => {
    return AxiosDataService.post(`/api/tasks/${params.id}/start`, params.values)
}
export const doCancelTask = async (params: { id: string, }) => {
    return AxiosDataService.post(`/api/tasks/${params.id}/cancel`)
}