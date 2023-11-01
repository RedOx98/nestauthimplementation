import { Body, Controller, Get, HttpCode, HttpStatus, Post, Req, UseGuards } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';
import { Tokens } from './types';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { RtGuard } from 'src/common/guards';
import { GetCurrentUser, GetCurrentUserId, Public } from 'src/common/decorators';

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService
        ) {}

    @Public()
    @Post('signup')
    @HttpCode(HttpStatus.CREATED)
    signupLocal(
        @Body() dto: AuthDto
    ): Promise<Tokens> {
        return this.authService.signupLocal(dto);
    };

    @Public()
    @Post('signin')
    @HttpCode(HttpStatus.OK)
    signinLocal(
        @Body() dto: AuthDto
    ): Promise<Tokens> {
        return this.authService.signinLocal(dto);
    };

    // @UseGuards(AuthGuard('jwt'))
    @Post('logout')
    @HttpCode(HttpStatus.OK)
    logout(@GetCurrentUserId() userId: number) {
        
        // return this.authService.logout(user['sub']);
        return this.authService.logout(userId);
    };

    // @Req() req: Request
    // const user = req.user;

    // @UseGuards(AuthGuard('jwt-refresh'))
    @Public()
    @UseGuards(RtGuard)
    @Post('refresh')
    @HttpCode(HttpStatus.CREATED)
    refreshTokens(@GetCurrentUserId() userId: number,
    @GetCurrentUser('refreshToken') refreshToken: string
    ){
        // return this.authService.refreshTokens();
        console.log({
            userId,
            refreshToken,
        })
        return this.authService.refreshTokens(userId, refreshToken);
    };


}
