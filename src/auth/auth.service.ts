/* eslint-disable prettier/prettier */
import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
  ){}

  public async validationAuth(userId: number, companyId: number) {
 
    //const prisma = new PrismaClient();

    //find userId in a company by userId and companyId
    const uniqeUserId = await this.prisma.company.findMany({
      where: {
        AND: [
          {
            id: companyId,
          },
          {
            userId: userId,
          }
        ]
      },
      select: {
        userId: true,
      }
    });
    if (uniqeUserId.length == 0) {
      throw new ForbiddenException('UserID or companyID does not exist');
    } 
  
    // find userRole by userId
    const userRoles = await this.prisma.users_roles.findMany({
      where: {
        userId: uniqeUserId[0].userId,
      },
      select: {
        roleId: true,
      }
    });  
    // if userRole does not exists throw exception
    if (userRoles.length == 0) {
      throw new ForbiddenException('UserID does not exist');
    }

    const roleIds = userRoles.map((userRole) => userRole.roleId );

    // find role by roleId >>> userRole.roleId
    const roles = await this.prisma.roles.findMany({
      where: {
        id: {in: roleIds},      //id: Number(roleIds),
      },
    });
    // if role does not exists throw exception
    if (roles.length == 0) {
      throw new ForbiddenException('RoleID does not exist');
    }
    
    // find rolePermissions by roleId >>> userRole.roleId
    const rolePermissions = await this.prisma.roles_permissions.findMany({
      where: {
        roleId: {in: roleIds},      //id: Number(roleIds),
      },
      select:{
        permissionsId: true,
      },
      distinct: ['permissionsId'],
    });
    // if rolePermissions does not exists throw exception
    if (rolePermissions.length == 0) {
      throw new ForbiddenException('RoleID find rolePermission does not exist');
    }
    
  
    const permissionIds = rolePermissions.map((rolePermission) => rolePermission.permissionsId);
    // find Permissions by rolePermissions >>> userRole.roleId
    const permissions = await this.prisma.permissions.findMany({
      where: {
        id: {in: permissionIds},      //id: Number(permissionIds),
      },
    });
     // if permissions does not exists throw exception
     if (rolePermissions.length == 0) {
      throw new ForbiddenException('PermissionId does not exist');
    }  

    const result = {
      'roles': roles,
      'permissions': permissions,
    };
    return result;
  }
}
