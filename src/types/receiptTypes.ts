export type receiptType = {
    id: string
    date: string
    providerId: string
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