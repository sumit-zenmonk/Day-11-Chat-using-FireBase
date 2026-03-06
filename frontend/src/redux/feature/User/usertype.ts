export interface User {
    uid: string
    email: string | null
    name: string | null
    photo: string | null
}

export interface UsersState {
    users: User[]
    loading: boolean
    error: string | null
}