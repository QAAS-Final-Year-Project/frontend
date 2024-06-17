import { AxiosDataService } from "Shared/utils/axios"
import { IGetFilter } from "data/index.types"

export const doCreateTask = async (values: any) => {
    return AxiosDataService.post('/api/tasks', values)
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

export const getTask = async (id:any, populate?: string[]) => {
    // await new Promise((resolve) => setTimeout(resolve, 10000000))

    return AxiosDataService.get("/api/tasks/" + id, {
        populate: populate || ["history.actor", "bidders.bidder", "assignee"]
    })
}

export const getMinimalTask = async (id: string | number) => {
    return AxiosDataService.get("/api/tasks/" + id);
};



export const deleteTaskNote = async (taskId, noteId) => {
    return AxiosDataService.delete(`/api/tasks/${taskId}/notes/${noteId}`)
}


export const doAssignTask = async (params: { id: string, values: any }) => {
    return AxiosDataService.post(`/api/tasks/${params.id}/assign`, params.values)
}


export const doCompleteTask = async (params: { id: string, values: any }) => {
    return AxiosDataService.post(`/api/tasks/${params.id}/complete`, params.values)
}