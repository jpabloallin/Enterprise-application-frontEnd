export type providerType = {
    id: number | string
    name: string
    passport: string
    email: string 
}

export interface IProviderState {
    providers: providerType[]
}
