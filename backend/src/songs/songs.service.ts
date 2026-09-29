import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateSongDto } from './dto/create-song.dto';
import { UpdateSongDto } from './dto/update-song.dto';

@Injectable()
export class SongsService {
  constructor(private prisma: PrismaService) {}

  create(createSongDto: CreateSongDto, userId: number) {
    return this.prisma.song.create({
      data: { ...createSongDto, userId },
    });
  }

  async findAll(userId: number, params: { page?: number; limit?: number; search?: string }) {
    const page = Math.max(1, Number(params.page) || 1);
    const limit = Math.max(1, Number(params.limit) || 10);
    const search = params.search?.trim();

    const where = {
      userId,
      ...(search ? { name: { contains: search } } : {}),
    };

    const [data, total] = await Promise.all([
      this.prisma.song.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { id: 'desc' },
      }),
      this.prisma.song.count({ where }),
    ]);

    return {
      data,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.max(1, Math.ceil(total / limit)),
      },
    };
  }

  async findOne(id: number, userId: number) {
    const song = await this.prisma.song.findUnique({ where: { id } });
    if (!song || song.userId !== userId) {
      throw new NotFoundException(`Canción ${id} no encontrada`);
    }
    return song;
  }

  async update(id: number, userId: number, updateSongDto: UpdateSongDto) {
    await this.findOne(id, userId);
    return this.prisma.song.update({ where: { id }, data: updateSongDto });
  }

  async remove(id: number, userId: number) {
    await this.findOne(id, userId);
    return this.prisma.song.delete({ where: { id } });
  }
}