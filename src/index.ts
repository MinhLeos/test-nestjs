/* eslint-disable prettier/prettier */
import { PrismaClient } from '@prisma/client';
import { ForbiddenException } from '@nestjs/common';
const prisma = new PrismaClient();
async function main() {
  // ... you will write your Prisma Client queries here
  /*
  await prisma.users.create({
    data: {
      id: 7,
      email: 'aaae@prisma.io',
      phoneNumber: '0125456789',
    },
  });
  */
 /*
  await prisma.roles_permissions.create({
    data: {
      id: 6,
      permissionsId: 4,
      roleId: 3,
    },
  });
  const allUsers = await prisma.users.findMany()
  console.log('user table: \n', allUsers);

  const allCompany = await prisma.company.findMany()
  console.log('company table: \n', allCompany);

  const allRoles = await prisma.roles.findMany()
  console.log('roles table: \n', allRoles);

  const allUserRoles = await prisma.users_roles.findMany()
  console.log('users_roles table: \n', allUserRoles);

  const allPermission = await prisma.permissions.findMany()
  console.log('permissions table: \n', allPermission);

  const allRolesPermission = await prisma.roles_permissions.findMany()
  console.log('roles_permissions table: \n', allRolesPermission);
  */

  const companyId = 4;
  const userId = 4;

  const uniqeUserId = await prisma.company.findMany({
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
  console.log('uniqeUserId: ', uniqeUserId);
  

  // find userRole by userId
  const userRoles = await prisma.users_roles.findMany({
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
  console.log('userRoles: ', userRoles);

  const roleIds = userRoles.map((userRole) => userRole.roleId );
  console.log('roleIds: ', roleIds);
  // find role by roleId >>> userRole.roleId
  const roles = await prisma.roles.findMany({
    where: {
      id: {in: roleIds},      //id: Number(roleIds),
    },
  });
  // if role does not exists throw exception
  if (roles.length == 0) {
    throw new ForbiddenException('RoleID does not exist');
  }
  console.log('roles: ', roles);
  
  // find rolePermissions by roleId >>> userRole.roleId
  const rolePermissions = await prisma.roles_permissions.findMany({
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
  console.log('rolePermissions: ', rolePermissions);

  const permissionIds = rolePermissions.map((rolePermission) => rolePermission.permissionsId);
  // find Permissions by rolePermissions >>> userRole.roleId
  const permissions = await prisma.permissions.findMany({
    where: {
      id: {in: permissionIds},      //id: Number(permissionIds),
    },
  });
   // if permissions does not exists throw exception
   if (rolePermissions.length == 0) {
    throw new ForbiddenException('PermissionId does not exist');
  }
  console.log('permissions: ', permissions);

  const result = {
    'roles': roles,
    'permissions': permissions,
  };

  console.log('\nresult: \n', result);
  
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
