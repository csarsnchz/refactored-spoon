import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class RefreshJwtGuard implements CanActivate {
    constructor(private readonly jwtService: JwtService) {}
    async canActivate(context: ExecutionContext): Promise<boolean>{
        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);
        if (!token) throw new UnauthorizedException('Token not found');
        try {
            const payload = await this.jwtService.verifyAsync(token, {secret: process.env.jwtRefreshTokenKey});
            request['user'] = payload;
        } catch (error) {
            throw new UnauthorizedException('Invalid token');
        }
        return true;
    };
    
    private extractTokenFromHeader(request: Request) {
        const headers = request.headers as { authorization?: string };
        const [type, token] = headers.authorization?.split(' ') ?? [];
        return type === 'Refresh' ? token : undefined;
    }
}