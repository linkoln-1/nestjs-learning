import { ConflictException, Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async findUserByEmail(email: string) {
    return this.userRepository.findOne({ where: { email } });
  }

  async register(userDto: CreateUserDto) {
    const { email } = userDto;

    const existingUser = await this.findUserByEmail(email);

    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    return await this.userRepository.createUser(userDto);
  }

  async login(loginDto: LoginUserDto) {
    const { email, password } = loginDto;

    const user = await this.findUserByEmail(email);

    if (!user) {
      throw new Error('User not found');
    }

    if (user.password !== password) {
      throw new Error('Password is incorrect');
    }

    return user;
  }
}
