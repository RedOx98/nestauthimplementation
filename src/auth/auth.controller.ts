import { Body, Controller, Get, Post } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';
import { Tokens } from './types';

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService
        ) {}

    @Post('/local/signup')
    signupLocal(
        @Body() dto: AuthDto
    ): Promise<Tokens> {
        return this.authService.signupLocal(dto);
    };

    @Post('/local/signin')
    signinLocal(
        @Body() dto: AuthDto
    ): Promise<Tokens> {
        return this.authService.signinLocal(dto);
    };

    @Post('/local/logout')
    logout() {
        return this.authService.logout();
    };

    @Post('/local/refresh')
    refreshTokens(){
        return this.authService.refreshTokens();
    };


}
