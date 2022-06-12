export type billType = {
    id: string
    client: string
    date?: string
    seller: string
    total: number
    productsSold: IProductsSold[]
}

export interface IBillState {
    bills: billType[]
    status: fetchBillStatus
    error: string | null
}

export interface IProductsSold {
    id: string
    name: string
    price: number
    units: number
}

export enum fetchBillStatus {
    IDLE = 'idle',
    COMPLETED = 'completed',
    FAILED = 'failed',
    PENDING = 'pending',
}