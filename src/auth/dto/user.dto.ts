/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UserAuthDto {
  @ApiProperty({
    type: Intl,
    description: 'Id',
    example: 1,
    required: true,
  })
  @IsNotEmpty()
  id: number;

  @ApiProperty({
    type: String,
    description: 'Email',
    example: 'leos@gmail.com',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  email: string;

  @ApiProperty({
    type: String,
    description: 'PhoneNumber',
    example: '0123456789',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  phoneNumber: string;
}

export class UserRoleDto {
  @ApiProperty({
    type: Intl,
    description: 'Id',
    example: 1,
    required: true,
  })
  @IsNotEmpty()
  id: number;

  @ApiProperty({
    type: Intl,
    description: 'UserId',
    example: 1,
    required: true,
  })
  @IsNotEmpty()
  userId: number;

  @ApiProperty({
    type: Intl,
    description: 'RoleId',
    example: 1,
    required: true,
  })
  @IsNotEmpty()
  roleId: number;
}
