import { Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private authSrvice: AuthService){}
        @Post('login')
        login(){
            
        }
        @Post('logout')
        logout(){
            
        }
}
