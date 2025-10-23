import { Controller, Get, Param, Post } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';

// Assuming this enum and provider are defined elsewhere
enum Roles {
  ADMIN = 'ADMIN',
  USER = 'USER',
  RECEPTION = 'RECEPTION',
  HOTEL_ADMIN = 'HOTEL_ADMIN',
}

// Placeholder for the FirebaseProvider
class FirebaseProvider {
  async setClaimsRoleBase<T>(uid: string, roles: T[]) {
    console.log(`Setting claims for UID: ${uid} to roles: ${roles.join(', ')}`);
    // Actual Firebase logic goes here
    return true;
  }
}

@ApiTags('Set-Roles')
@Controller('set_roles')
export class AppController {
  constructor(private readonly firebaseProvider: FirebaseProvider) {}

  // --- ADMIN Role Endpoint ---
  @Post('/set-admin-role/:uid')
  @ApiOperation({ summary: 'Assigns the ADMIN role to a Firebase user' })
  @ApiParam({ name: 'uid', description: 'The Firebase User ID (UID)', type: String })
  @ApiResponse({ status: 200, description: 'Admin role assigned successfully.' })
  @ApiResponse({ status: 400, description: 'Invalid UID format or Firebase error.' })
  async setAdminRole(@Param('uid') uid: string) {
    await this.firebaseProvider.setClaimsRoleBase<Roles>(uid, [Roles.ADMIN]);
    return { status: `Admin role assigned to UID: ${uid}` };
  }

// --------------------------------------------------------------------------------

  // --- USER Role Endpoint ---
  @Post('/set-user-role/:uid')
  @ApiOperation({ summary: 'Assigns the standard USER role to a Firebase user' })
  @ApiParam({ name: 'uid', description: 'The Firebase User ID (UID)', type: String })
  @ApiResponse({ status: 200, description: 'User role assigned successfully.' })
  async setUserRole(@Param('uid') uid: string) {
    await this.firebaseProvider.setClaimsRoleBase<Roles>(uid, [Roles.USER]);
    return { status: `User role assigned to UID: ${uid}` };
  }

// --------------------------------------------------------------------------------

  // --- RECEPTION Role Endpoint ---
  @Post('/set-reception-role/:uid')
  @ApiOperation({ summary: 'Assigns the RECEPTION role to a Firebase user' })
  @ApiParam({ name: 'uid', description: 'The Firebase User ID (UID)', type: String })
  @ApiResponse({ status: 200, description: 'Reception role assigned successfully.' })
  async setReceptionRole(@Param('uid') uid: string) {
    await this.firebaseProvider.setClaimsRoleBase<Roles>(uid, [Roles.RECEPTION]);
    return { status: `Reception role assigned to UID: ${uid}` };
  }

// --------------------------------------------------------------------------------

  // --- HOTEL_ADMIN Role Endpoint ---
  @Post('/set-hotel-admin-role/:uid')
  @ApiOperation({ summary: 'Assigns the HOTEL_ADMIN role to a Firebase user' })
  @ApiParam({ name: 'uid', description: 'The Firebase User ID (UID)', type: String })
  @ApiResponse({ status: 200, description: 'Hotel Admin role assigned successfully.' })
  async setHotelAdminRole(@Param('uid') uid: string) {
    await this.firebaseProvider.setClaimsRoleBase<Roles>(uid, [Roles.HOTEL_ADMIN]);
    return { status: `Hotel Admin role assigned to UID: ${uid}` };
  }
}