import { providerType } from "./providerTypes"

export type billType = {
    id: string
    client: string
    date?: string
    seller: string
    total: number
    productsSold: productSoldType[]
}


export type soldProductsType = {
    id: number | string,
    name: string,
    price: number,
    units: number,
}

export type productSoldType = {
    id: number | string,
    name: string,
    description: string,
    minimumUnits: number,
    maximumUnits: number,
    currentUnits: number,
    price: number,
    subTotal: number,
    balance: number
    provider: providerType
     
}


export interface IBillState {
    bills: billType[],
    status: fetchBillStatus,
    error: string | null
}

export enum fetchBillStatus {
    IDLE = 'idle',
    COMPLETED = 'completed',
    FAILED = 'failed',
    PENDING = 'pending',
}