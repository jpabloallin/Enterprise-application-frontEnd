import { providerType } from './providerTypes';
export type receiptType = {
    id?: number | string
    date?: Date
    provider: providerType
    productId: string,
    units: number
}

export interface IReceiptState {
    receipts: receiptType[]
    status: fetchReceiptStatus
    error: string | null
}

export enum fetchReceiptStatus {
    IDLE = 'idle',
    COMPLETED = 'completed',
    FAILED = 'failed',
    PENDING = 'pending',
}