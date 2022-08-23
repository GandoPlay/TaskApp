import { AuthService } from './auth.service';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(username: string, password: string): Promise<{
        access_token: string;
    }>;
    signup(username: string, password: string): Promise<{
        access_token: string;
    }>;
}
