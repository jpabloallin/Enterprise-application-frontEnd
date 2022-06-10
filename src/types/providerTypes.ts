export type providerType = {
    id: number | string
    name: string
    passport: string
    email: string 
}

export interface IProviderState {
    providers: providerType[]
    status: fetchProviderStatus
    error: string | null
}

export enum fetchProviderStatus {
    IDLE = 'idle',
    COMPLETED = 'completed',
    FAILED = 'failed',
    PENDING = 'pending',
}