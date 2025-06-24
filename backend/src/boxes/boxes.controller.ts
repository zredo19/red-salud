import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, ParseIntPipe } from '@nestjs/common';
import { BoxesService } from './boxes.service';
import { CreateBoxDto } from './dto/create-box.dto';
import { UpdateBoxDto } from './dto/update-box.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('boxes')
export class BoxesController {
  constructor(private readonly boxesService: BoxesService) {}

  @Post()
  create(@Body() createBoxDto: CreateBoxDto) {
    return this.boxesService.create(createBoxDto);
  }

  @Get()
  findAll() {
    return this.boxesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.boxesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateBoxDto: UpdateBoxDto) {
    return this.boxesService.update(id, updateBoxDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.boxesService.remove(id);
  }
}