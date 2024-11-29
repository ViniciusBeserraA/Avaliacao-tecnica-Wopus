import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserService } from '../user/user.service';
import { AuthResponseDto } from './auth.dto';

@Injectable()
export class AuthService {
  private jtwExpirationTimeInSeconds: number;
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {
    this.jtwExpirationTimeInSeconds = +this.configService.get<number>(
      'JWT_EXPIRATION_TIME',
    );
  }

  async signIn(email: string, password: string): Promise<AuthResponseDto> {
    const foundUser = await this.userService.findByEmail(email);
    if (!foundUser) {
      throw new NotFoundException(
        `Usuário com o email ${email} não encontrado`,
      );
    }
    if (!foundUser || !bcrypt.compareSync(password, foundUser.password)) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    const payload = { sub: foundUser.id, email: foundUser.email };
    const token = this.jwtService.sign(payload);

    return { token, expiresIn: this.jtwExpirationTimeInSeconds };
  }
}
