import { ConflictException, UnauthorizedException, UsePipes } from "@nestjs/common";
import { Body, Controller, HttpCode, Post } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { compare, hash } from "bcryptjs";
import { ZodValidationPipe } from "src/pipes/zod-validation-pipe";
import { PrismaService } from "src/prisma/prisma.service";
import { z } from "zod";

// const AuthenticateBodySchema = z.object({
//     email: z.string().email(),
//     password: z.string().min(6).max(100),
// });

// type authenticateBody = z.infer<typeof AuthenticateBodySchema>;

@Controller('/question')
export class CreateQuestionController {
    constructor(
    ) {}

    @Post()
    // @HttpCode(201)
    // @UsePipes(new ZodValidationPipe())
    async handle() {
        return "OK"
    }
}