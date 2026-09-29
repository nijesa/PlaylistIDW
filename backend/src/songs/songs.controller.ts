import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { SongsService } from './songs.service';
import { CreateSongDto } from './dto/create-song.dto';
import { UpdateSongDto } from './dto/update-song.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorators';

@UseGuards(JwtAuthGuard)
@Controller('songs')
export class SongsController {
  constructor(private readonly songsService: SongsService) {}

  @Post()
  create(@CurrentUser() user, @Body() createSongDto: CreateSongDto) {
    return this.songsService.create(createSongDto, user.userId);
  }

  @Get()
  findAll(
    @CurrentUser() user,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
    @Query('search') search?: string,
  ) {
    return this.songsService.findAll(user.userId, {
      page: page ? Number(page) : undefined,
      limit: limit ? Number(limit) : undefined,
      search,
    });
  }

  @Get(':id')
  findOne(@CurrentUser() user, @Param('id', ParseIntPipe) id: number) {
    return this.songsService.findOne(id, user.userId);
  }

  @Patch(':id')
  update(
    @CurrentUser() user,
    @Param('id', ParseIntPipe) id: number,
    @Body() updateSongDto: UpdateSongDto,
  ) {
    return this.songsService.update(id, user.userId, updateSongDto);
  }

  @Delete(':id')
  remove(@CurrentUser() user, @Param('id', ParseIntPipe) id: number) {
    return this.songsService.remove(id, user.userId);
  }
}