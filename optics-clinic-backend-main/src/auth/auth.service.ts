import { Injectable, ForbiddenException } from '@nestjs/common';
import { AuthDto } from 'src/auth/dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import * as argon from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  async signup(dto: AuthDto) {
    const hash = await argon.hash(dto.password);
    try {
      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          hash,
        },
      });

      const token = await this.signToken(user.id, user.email);

      return [{ accessToken: token }];
    } catch (error) {
      if (error.code === 'P2002') {
        throw new ForbiddenException('user is already  exist');
      }
      throw error;
    }
  }

  async signin(dto: AuthDto) {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          email: dto.email,
        },
      });

      if (!user) {
        throw new ForbiddenException('Credentials are incorrect');
      }

      const pwMatchs = await argon.verify(user.hash, dto.password);

      if (!pwMatchs) {
        throw new ForbiddenException('Credentials are incorrect');
      }

      const token = await this.signToken(user.id, user.email);

      return [{ accessToken: token }];
    } catch (error) {
      throw error;
    }
  }

  async signToken(userId: number, email: string): Promise<string> {
    const payload = {
      sub: userId,
      email,
    };

    const secret = this.config.get('JWT_SECRET');

    const token = await this.jwt.signAsync(payload, {
      expiresIn: `5m`,
      secret: secret,
    });

    return token;
  }
}
