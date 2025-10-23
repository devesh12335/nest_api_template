import { ApiProperty } from '@nestjs/swagger';


export class CreateCustomerDto {
  @ApiProperty({ example: 'Mr.' })
  social_title: string;

  @ApiProperty({ example: 'John' })
  first_name: string;

  @ApiProperty({ example: 'Doe' })
  last_name: string;

  @ApiProperty({ example: 'john@example.com' })
  email: string;

  @ApiProperty({ example: '+911234567890', required: false })
  phone?: string;

  @ApiProperty({ example: 'securepassword123' })
  password: string;

  @ApiProperty({ example: '1995-05-10', required: false })
  birthday?: Date;

  @ApiProperty({ example: true, required: false })
  enabled?: boolean;

  @ApiProperty({ example: false, required: false })
  newsletter?: boolean;

  @ApiProperty({ example: false, required: false })
  opt_in?: boolean;
}
