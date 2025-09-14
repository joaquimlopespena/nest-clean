import { ConflictException, UsePipes } from "@nestjs/common";
import { Body, Controller, HttpCode, Post } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { hash } from "bcryptjs";
import { ZodValidationPipe } from "src/pipes/zod-validation-pipe";
import { PrismaService } from "src/prisma/prisma.service";
import { z } from "zod";

// const createAccountBodySchema = z.object({
//     name: z.string().min(3).max(100),
//     email: z.string().email(),
//     password: z.string().min(6).max(100),
// });

// type CreateAccountBody = z.infer<typeof createAccountBodySchema>;

@Controller('/sessions')
export class AuthenticateController {
    constructor(private jwt: JwtService) {}

    @Post()
    // @HttpCode(201)
    // @UsePipes(new ZodValidationPipe(createAccountBodySchema))
    async handle() {
        const token = this.jwt.sign({ sub: 'user-id'});
    }
}