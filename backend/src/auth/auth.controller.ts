import { Body, Controller, Post } from '@nestjs/common';
import { UserCreateDto } from 'src/dto//User/UserCreate.dto';
import { UserLoginDto } from 'src/dto/User/UserLogin.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService){}

    @Post('signup')
    async signup(@Body()  userCreatedto : UserCreateDto){
        return this.authService.signUp(userCreatedto);
    }
    
    @Post('login')
    async login(@Body() userLoginDto: UserLoginDto){
        return this.authService.login(userLoginDto);
    }
    // @Post('login')
    // async login(
    //     @Body ('username') username:string,
    //     @Body ('password') password:string,
    //     ){
    //     return this.authService.login(username, password)
    // }
    // @Post('signup')
    // async signup(
    // @Body ('username') username:string,
    // @Body ('password') password:string,){
    //     return this.authService.signUp(username, password)
    // }
}
