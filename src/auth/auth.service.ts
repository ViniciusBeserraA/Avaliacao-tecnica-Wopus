import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { compareSync as bcryptCompareSync } from 'bcrypt';
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

  signIn(email: string, password: string): AuthResponseDto {
    const x = 'viniciusbeserra1341@gmail.com';
    const foundUser = this.userService.findByEmail(x);
    // const foundUser = this.userService.findByEmail(email);

    if (!foundUser || !bcryptCompareSync(password, foundUser.password)) {
      throw new UnauthorizedException();
    }

    const payload = { sub: foundUser.id, email: foundUser.email };
    const token = this.jwtService.sign(payload);

    return { token, expiresIn: this.jtwExpirationTimeInSeconds };
  }
}
