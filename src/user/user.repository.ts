import { Repository } from 'typeorm';
import { User } from '../entity/user.entity';
import { CreateUserDto } from './dto/create-user.dto';

export class UserRepository extends Repository<User> {
  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const { username, email, password } = createUserDto;

    const user = new User();
    user.username = username;
    user.email = email;
    user.password = password;

    await this.save(user);

    return user;
  }

  async findUserByEmail(email: string): Promise<User | null> {
    const user = await this.findOne({ where: { email } });

    if (!user) {
      return null;
    }

    return user;
  }
}
