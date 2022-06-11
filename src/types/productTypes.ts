import { providerType } from './providerTypes';
export type productType = {
    id: number | string
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

export enum fetchProductStatus {
    IDLE = 'idle',
    COMPLETED = 'completed',
    FAILED = 'failed',
    PENDING = 'pending',
}