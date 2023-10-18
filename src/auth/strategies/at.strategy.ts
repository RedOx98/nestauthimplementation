import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from 'passport-jwt'

@Injectable()
export class AtStrategy extends PassportStrategy(Strategy, 'jwt') { 
    constructor(config: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken,
            // ignoreExpiration: false,
            secretOrKey: 'at-secret',
        });
    }

    async validate(payload: any) {
        return payload;
    }
 };