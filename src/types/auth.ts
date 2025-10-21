export interface AuthCredentials {
    email: string;
    login: string;
    password: string;
}

export interface AuthState {
    isAuthenticated: boolean;
    user: string | null;
}