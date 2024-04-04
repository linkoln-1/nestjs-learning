import { Injectable, NotFoundException } from '@nestjs/common';
import { BookRepository } from './book-repository';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Injectable()
export class BookService {
  constructor(private readonly bookRepository: BookRepository) {}

  async create(bookDto: CreateBookDto) {
    const book = this.bookRepository.create(bookDto);
    await this.bookRepository.save(book);
    return book;
  }

  async findAll() {
    return await this.bookRepository.find();
  }

  async findOne(id: number) {
    const book = await this.bookRepository.findOne({ where: { id } });
    if (!book) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }
    return book;
  }
  async update(id: number, updateBookDto: UpdateBookDto) {
    const book = await this.findOne(id);
    const updatedBook = this.bookRepository.merge(book, updateBookDto);
    return await this.bookRepository.save(updatedBook);
  }

  async remove(id: number) {
    const book = await this.findOne(id);
    return await this.bookRepository.remove(book);
  }
}
