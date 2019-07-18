import { Token } from './token.interface';

export interface User {
    id: string;
    userName: string;
    accessToken: Token;
    refreshToken: Token;
    roles: string[];
}