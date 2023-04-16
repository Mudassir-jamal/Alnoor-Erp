import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtGuard } from 'src/auth/guard';
import { CreateFrameDto, EditFrameDto } from './dto';
import { FrameService } from './frame.service';

@UseGuards(JwtGuard)
@Controller('frames')
export class FrameController {
  constructor(private frame: FrameService) {}

  @Get()
  getAll() {
    return this.frame.readAll();
  }

  @Get(':id')
  getById(@Param('id') id: string) {
    const frameId = parseInt(id);
    return this.frame.read(frameId);
  }

  @Post()
  createFrame(@Body() dto: CreateFrameDto) {
    return this.frame.create(dto);
  }

  @Patch(':id')
  editFrame(@Param('id') id: string, @Body() dto: EditFrameDto) {
    const frameId = parseInt(id);
    return this.frame.update(frameId, dto);
  }

  @Delete(':id')
  deleteFrame(@Param('id') id: string) {
    const frameId = parseInt(id);
    return this.frame.delete(frameId);
  }
}
