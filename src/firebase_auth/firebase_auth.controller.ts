import { Body, Controller, Param, Post } from '@nestjs/common';
import { FirebaseAuthService } from './firebase_auth.service';
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

import { FirebaseProvider } from '@alpha018/nestjs-firebase-auth';
import { Roles } from './roles.enum';
import { SetRolesDto } from './dto/set-roles.dto';

// enum Roles {
//   ADMIN = 'ADMIN',
//   USER = 'USER',
//   RECEPTION = 'RECEPTION',
//   HOTEL_ADMIN = 'HOTEL_ADMIN',
// }


 function getRolesEnumDescription(): string {
  // Get all string values from the enum
  const values = Object.values(Roles); 

  // Format the list with line breaks
  const list = values.map((role, index) => `${index + 1}. ${role}`).join('\n');

  return `
    Available Roles:
    ---
    ${list}
    ---
  `;
}

@ApiTags('Firebase-Auth')
@Controller('firebase-auth')
export class FirebaseAuthController {
  constructor(private readonly firebaseAuthService: FirebaseAuthService,private readonly firebaseProvider: FirebaseProvider) {}

  //  // --- ADMIN Role Endpoint ---
  //   @Post('/set-admin-role/:uid')
  //   @ApiOperation({ summary: 'Assigns the ADMIN role to a Firebase user' })
  //   @ApiParam({ name: 'uid', description: 'The Firebase User ID (UID)', type: String })
  //   @ApiResponse({ status: 200, description: 'Admin role assigned successfully.' })
  //   @ApiResponse({ status: 400, description: 'Invalid UID format or Firebase error.' })
  //   async setAdminRole(@Param('uid') uid: string) {
  //     try{
  //     await this.firebaseProvider.setClaimsRoleBase<Roles>(uid, [Roles.ADMIN]);
  //     return { status: `Admin role assigned to UID: ${uid}` };
  //     }catch(e){
  //         throw e;
  //     }
      
  //   }

   

     // --- MULTI-ROLE Endpoint ---
  @Post('/set-roles/:uid')
  @ApiOperation({ summary: 'Assigns multiple roles to a single Firebase user ID' })
  @ApiParam({ 
    name: 'uid', 
    description: 'The Firebase User ID (UID) to receive the roles', 
    type: String 
  })
  @ApiBody({ 
    type: SetRolesDto, 
    description: 'List of roles to assign. Any existing roles not in this list will be removed (overwrite semantics).\n' + getRolesEnumDescription()
  })
  @ApiResponse({ status: 200, description: 'Roles assigned successfully.' })
  @ApiResponse({ status: 400, description: 'Invalid UID, roles, or Firebase error.' })
  async setMultipleRoles(
    @Param('uid') uid: string,
    @Body() body: SetRolesDto, // Get the roles array from the request body
  ) {
    // Note: this implementation assumes setClaimsRoleBase overwrites existing claims
    const rolesToAssign = body.roles; 
    
    try {
      await this.firebaseProvider.setClaimsRoleBase<Roles>(uid, rolesToAssign);

      return { 
        status: `Roles assigned to UID: ${uid}`,
        roles: rolesToAssign,
      };
    } catch (e) {
      throw e;
    }
  }
  
  // --------------------------------------------------------------------------------
  
  //   // --- USER Role Endpoint ---
  //   @Post('/set-user-role/:uid')
  //   @ApiOperation({ summary: 'Assigns the standard USER role to a Firebase user' })
  //   @ApiParam({ name: 'uid', description: 'The Firebase User ID (UID)', type: String })
  //   @ApiResponse({ status: 200, description: 'User role assigned successfully.' })
  //   async setUserRole(@Param('uid') uid: string) {
  //     await this.firebaseProvider.setClaimsRoleBase<Roles>(uid, [Roles.USER]);
  //     return { status: `User role assigned to UID: ${uid}` };
  //   }
  
  // // --------------------------------------------------------------------------------
  
  //   // --- RECEPTION Role Endpoint ---
  //   @Post('/set-reception-role/:uid')
  //   @ApiOperation({ summary: 'Assigns the RECEPTION role to a Firebase user' })
  //   @ApiParam({ name: 'uid', description: 'The Firebase User ID (UID)', type: String })
  //   @ApiResponse({ status: 200, description: 'Reception role assigned successfully.' })
  //   async setReceptionRole(@Param('uid') uid: string) {
  //     await this.firebaseProvider.setClaimsRoleBase<Roles>(uid, [Roles.RECEPTION]);
  //     return { status: `Reception role assigned to UID: ${uid}` };
  //   }
  
  // // --------------------------------------------------------------------------------
  
  //   // --- HOTEL_ADMIN Role Endpoint ---
  //   @Post('/set-hotel-admin-role/:uid')
  //   @ApiOperation({ summary: 'Assigns the HOTEL_ADMIN role to a Firebase user' })
  //   @ApiParam({ name: 'uid', description: 'The Firebase User ID (UID)', type: String })
  //   @ApiResponse({ status: 200, description: 'Hotel Admin role assigned successfully.' })
  //   async setHotelAdminRole(@Param('uid') uid: string) {
  //     await this.firebaseProvider.setClaimsRoleBase<Roles>(uid, [Roles.HOTEL_ADMIN]);
  //     return { status: `Hotel Admin role assigned to UID: ${uid}` };
  //   }
}
