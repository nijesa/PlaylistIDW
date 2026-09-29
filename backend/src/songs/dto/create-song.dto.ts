import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateSongDto {
  @IsString()
  @IsNotEmpty({ message: 'El nombre de la canción es obligatorio' })
  @MaxLength(150)
  name: string;

  @IsString()
  @IsNotEmpty({ message: 'El cantante es obligatorio' })
  @MaxLength(150)
  singer: string;
}
