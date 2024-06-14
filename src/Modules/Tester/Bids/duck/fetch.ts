import { AxiosDataService } from "Shared/utils/axios"
import { IGetFilter } from "data/index.types"

export const getTesterTaskBids = async (filter: IGetFilter) => {
    // await new Promise((resolve) => setTimeout(resolve, 10000000))
    return AxiosDataService.get(`/api/tasks/bids`, {
        ...filter,
        populate: ["bidders.bidder"]
    })
}

export const doUpdateBid = async (params: { id: string, values: any }) => {
    return AxiosDataService.put(`/api/tasks/${params.id}/bid`, params.values)
}
export const doCancelBid = async (id: string) => {
    return AxiosDataService.delete(`/api/tasks/${id}/bid`)
}