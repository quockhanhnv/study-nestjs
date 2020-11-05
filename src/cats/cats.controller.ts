import { Controller, Get, Post, Body, HttpException, HttpStatus, UseFilters, ForbiddenException } from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { CatsService } from './cats.service';
import { Cat } from './interfaces/cat.interface';
import { HttpExceptionFilter } from 'src/exception-filters/http-exception.filter';

@Controller('cats')
export class CatsController {
  constructor(private catsService: CatsService) {}

  // https://docs.nestjs.com/exception-filters sao nó có cái http HttpExceptionFilter kia rồi nó lại ko ra cái fobbiden 
  @Post()
  @UseFilters(new HttpExceptionFilter())
  async create(@Body() createCatDto: CreateCatDto) {
    throw new ForbiddenException();
    this.catsService.create(createCatDto);
  }

  @Get()
  async findAll(): Promise<Cat[]> {
    throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    return this.catsService.findAll();
  }
}