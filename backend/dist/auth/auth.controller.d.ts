import { UserCreateDto } from 'src/dto/User/UserCreate.dto';
import { UserLoginDto } from 'src/dto/User/UserLogin.dto';
import { UserDocument } from 'src/schemas/User.schema';
import { AuthService } from './auth.service';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    signup(userCreatedto: UserCreateDto): Promise<{
        access_token: string;
        refresh_token: string;
    }>;
    login(userLoginDto: UserLoginDto): Promise<{
        access_token: string;
        refresh_token: string;
        isAdmin: boolean;
    }>;
    refresh(user: UserDocument): Promise<{
        access_token: string;
    }>;
}
