import { ConflictException, UnauthorizedException, UsePipes } from "@nestjs/common";
import { Body, Controller, HttpCode, Post } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { compare, hash } from "bcryptjs";
import { ZodValidationPipe } from "src/pipes/zod-validation-pipe";
import { PrismaService } from "src/prisma/prisma.service";
import { z } from "zod";

const AuthenticateBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6).max(100),
});

type authenticateBody = z.infer<typeof AuthenticateBodySchema>;

@Controller('/sessions')
export class AuthenticateController {
    constructor(
        private prisma: PrismaService,
        private jwt: JwtService
    ) {}

    @Post()
    // @HttpCode(201)
    @UsePipes(new ZodValidationPipe(AuthenticateBodySchema))
    async handle(@Body() body: authenticateBody) {
        const {email, password} = body;

        const user = await this.prisma.user.findUnique({
            where: {
                email,
            }
        })

        if(!user) {
            throw new UnauthorizedException('User credentials do not match.')
        }

        const isPasswordValid = await compare(password, user.password);
        if(!isPasswordValid) {
            throw new UnauthorizedException('User credentials do not match.')
        }

        const accessToken = this.jwt.sign({ sub: user.id});

        return {
            access_token: accessToken
        };
    }
}