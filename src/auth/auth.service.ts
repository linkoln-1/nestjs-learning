import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { LoginUserDto } from '../user/dto/login-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.userService.findUserByEmail(email);
    if (user && (await bcrypt.compare(pass, user.password))) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: LoginUserDto) {
    const validUser = await this.validateUser(user.email, user.password);
    if (!validUser) {
      throw new UnauthorizedException();
    }
    const payload = { email: validUser.email, sub: validUser.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(user: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    const newUser = await this.userService.register({
      ...user,
      password: hashedPassword,
    });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...result } = newUser;
    return result;
  }
}
