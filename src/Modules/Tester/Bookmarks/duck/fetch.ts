import { AxiosDataService } from "Shared/utils/axios"
import { IGetFilter } from "data/index.types"

export const getBookMarks = async (filter: IGetFilter) => {
    // await new Promise((resolve) => setTimeout(resolve, 10000000))
    return AxiosDataService.get(`/api/bookmarks`, filter)
}


export const doAddBookMark = async (values: any) => {
    return AxiosDataService.post('/api/bookmarks', values)
}


export const doDeleteBookmark = async (id: string) => {
    return AxiosDataService.delete(`/api/bookmarks/${id}`)
}