import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  @ApiOperation({ summary: 'Register a new user' })
  @ApiResponse({
    status: 201,
    description: 'The user has been successfully created.',
  })
  @ApiBody({ type: CreateUserDto })
  async register(@Body() userDto: CreateUserDto) {
    return this.userService.register(userDto);
  }

  @Post('login')
  @ApiOperation({ summary: 'Log in' })
  @ApiResponse({
    status: 200,
    description: 'The user has been successfully logged in.',
  })
  @ApiBody({ type: LoginUserDto })
  async login(@Body() loginDto: LoginUserDto) {
    return this.userService.login(loginDto);
  }
}
