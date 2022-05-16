/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class RoleAuthDto {
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
    description: 'Name',
    example: 'Central Admin',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  name: string;

}

export class PermissionDto {
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
        description: 'Name',
        example: 'Central Admin',
        required: true,
      })
      @IsNotEmpty()
      @IsString()
      name: string;

      @ApiProperty({
        type: String,
        description: 'Description',
        example: 'Central Admin',
        required: true,
      })
      @IsNotEmpty()
      @IsString()
      description: string;

    }
      
    export class RolePermissionDto {
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
            description: 'PermissionId',
            example: 1,
            required: true,
          })
          @IsNotEmpty()
          permissionId: number;
        
          @ApiProperty({
            type: Intl,
            description: 'RoleId',
            example: 1,
            required: true,
          })
          @IsNotEmpty()
          roleId: number;
}
