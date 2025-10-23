import { ApiProperty } from '@nestjs/swagger';

export class CreateUploadedFileDto {
  @ApiProperty({ description: 'Unique identifier for the file' })
  id: number;

  @ApiProperty({ description: 'Name of the uploaded file' })
  filename: string;

  @ApiProperty({ description: 'Path where the file is stored' })
  path: string;

  @ApiProperty({ description: 'MIME type of the file' })
  mimetype: string;

  @ApiProperty({ description: 'Size of the file in bytes', type: 'integer' })
  size: number;
}
