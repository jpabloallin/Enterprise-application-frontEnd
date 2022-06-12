import { providerType } from './providerTypes';
export type productType = {
    id: string
    name: string
    description:string
    currentUnits: number
    minimumUnits: number
    maximumUnits: number
    price: number
    provider: providerType
}

export interface IProductState {
    products: productType[]
    status: fetchProductStatus
    error: string | null
}

export interface IProductToBeSold {
    id: string
    name: string
    units: number
    currentUnits: number
    maximumUnits: number
    minimumUnits: number
    price: number
}

export enum fetchProductStatus {
    IDLE = 'idle',
    COMPLETED = 'completed',
    FAILED = 'failed',
    PENDING = 'pending',
}