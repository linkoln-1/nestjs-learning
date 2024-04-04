import { Repository } from 'typeorm';
import { Book } from '../entity/book.entity';

export class BookRepository extends Repository<Book> {}
