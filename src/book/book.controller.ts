import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';

@ApiTags('books')
@Controller('books')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new book' })
  @ApiResponse({
    status: 201,
    description: 'The book has been successfully created.',
  })
  @ApiBody({ type: CreateBookDto })
  async create(@Body() bookDto: CreateBookDto) {
    return this.bookService.create(bookDto);
  }

  @Get()
  @ApiOperation({ summary: 'Find all books' })
  @ApiResponse({ status: 200, description: 'List of all books.' })
  async findAll() {
    return this.bookService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Find one book' })
  @ApiResponse({ status: 200, description: 'The book with the given id.' })
  async findOne(@Param('id') id: string) {
    return this.bookService.findOne(+id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a book' })
  @ApiResponse({
    status: 200,
    description: 'The book has been successfully updated.',
  })
  @ApiBody({ type: UpdateBookDto })
  async update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
    return this.bookService.update(+id, updateBookDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remove a book' })
  @ApiResponse({
    status: 200,
    description: 'The book has been successfully removed.',
  })
  async remove(@Param('id') id: string) {
    return this.bookService.remove(+id);
  }
}
