/* eslint-disable prettier/prettier */
import { Controller, Get, Request, Query, Param } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth-validation')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get(':companyId/:userId')
  async validationAuth(@Param('companyId') companyId: string, @Param('userId') userId: string): Promise<object>{
    return this.authService.validationAuth(Number(userId), Number(companyId)); 
  }
}
