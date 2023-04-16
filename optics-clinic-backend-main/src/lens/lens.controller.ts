import { Controller } from '@nestjs/common';
import {
  Body,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common/decorators';
import { JwtGuard } from 'src/auth/guard';
import { CreateLensDto, EditLensDto } from './dto';
import { LensService } from './lens.service';

@UseGuards(JwtGuard)
@Controller('lenses')
export class LensController {
  constructor(private lens: LensService) {}

  @Get()
  getAll() {
    return this.lens.readAll();
  }

  @Get(':id')
  getById(@Param('id') id: string) {
    const lensId = parseInt(id);
    return this.lens.read(lensId);
  }

  @Post()
  createLens(@Body() dto: CreateLensDto) {
    return this.lens.create(dto);
  }

  @Patch(':id')
  editLens(@Param('id') id: string, @Body() dto: EditLensDto) {
    const lensId = parseInt(id);
    return this.lens.update(lensId, dto);
  }

  @Delete(':id')
  deleteLens(@Param('id') id: string) {
    const lensId = parseInt(id);
    return this.lens.delete(lensId);
  }
}
