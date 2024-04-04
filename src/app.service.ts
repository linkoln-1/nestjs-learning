import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entity/user.entity';
import { Book } from './entity/book.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}
}

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book)
    private booksRepository: Repository<Book>,
  ) {}
}
