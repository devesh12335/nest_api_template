// import { FirebaseGuard, FirebaseProvider } from "@alpha018/nestjs-firebase-auth";
// import { FirebaseConstructorInterface } from "@alpha018/nestjs-firebase-auth/dist/firebase/interface/firebase-constructor.interface";
// import { ExecutionContext } from "@nestjs/common";
// import { Reflector } from "@nestjs/core";
// import admin from 'firebase-admin';

// export class FirebaseAuthGuard extends FirebaseGuard{
    
   

//     constructor(
//     firebaseProvider: FirebaseProvider,
//     config: FirebaseConstructorInterface,
//     reflector: Reflector,
//   ) {
    
//     super(firebaseProvider, config, reflector);
//   }
  
//   async canActivate(context: ExecutionContext): Promise<boolean> {
//      // 1. Run the parent's logic first to verify the Firebase token
//     // This handles extracting the token, verifying it, and attaching the user/claims to the request.

   

//        admin.auth().verifyIdToken('eyJhbGciOiJSUzI1NiIsImtpZCI6ImE1YTAwNWU5N2NiMWU0MjczMDBlNTJjZGQ1MGYwYjM2Y2Q4MDYyOWIiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vbHVkby0xMjMzNSIsImF1ZCI6Imx1ZG8tMTIzMzUiLCJhdXRoX3RpbWUiOjE3NjA0NDEwNzYsInVzZXJfaWQiOiJUVXJjRkpMYnl0Vjd6ZlVabTd0Q0ZLdnlkVTQyIiwic3ViIjoiVFVyY0ZKTGJ5dFY3emZVWm03dENGS3Z5ZFU0MiIsImlhdCI6MTc2MDQ0MTA3NiwiZXhwIjoxNzYwNDQ0Njc2LCJlbWFpbCI6ImRldmVzaDEyMzM1QGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJlbWFpbCI6WyJkZXZlc2gxMjMzNUBnbWFpbC5jb20iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJwYXNzd29yZCJ9fQ.ZK_EGP_Dc8mLhMWYiQFSivrzhlpC4CQN_-B9qmdiwq2QtK5icPYu30ccQERaMFAHL-d_lDwvdWEfSMMXufSvwer9hzFrr4h2akhwaqnva1pP9xGZVHNIYDmpxu6_14c2Zhb7W-gP9XN9Dev4n0b7CiNKm4q5wAgf36OYUzlUG04Cf6DT9jJ948WsTqGcWape1R-FG5CJ7VzqxId5Oowvl5kMYUvRjUWrjRhGu_XjtTNNapYDgQDBzSBuJny63cd07w2F5Xuvxwem-h3YFN6i1oVpcRTa5AYGHJQX-RVNtUiQnBtJTRA_oBYz6e7kVE1DjXnolqMC1wDXEuEqbvoU4Q').then(console.log).catch(console.error);

//     const isFirebaseAuthenticated = await super.canActivate(context);

    
    
//     console.log('Is Firebse ');

//     // if (!isFirebaseAuthenticated) {
//     //   return Promise.resolve(false); // Firebase validation failed
//     // }

//     // 2. Add your custom authorization logic here
//     const request = context.switchToHttp().getRequest();
//     // console.log(request);
//     // const token = 
//     // Example: Check if the user is active in your database
//     // Assuming 'request.user' now contains the Firebase user data attached by the parent guard
//     const firebaseUser = request.user; 

//     // --- YOUR CUSTOM LOGIC START ---

//     // Example 1: Check a custom claim or property
//     if (firebaseUser.disabled) {
//       console.log(`User ${firebaseUser.uid} is disabled.`);
//       return Promise.resolve(false);
//     }
    
//     // Example 2: Check roles defined by a custom decorator (similar to FirebaseGuard's handleRoleValidation)
//     // You can access method metadata using this.reflector
//     // const requiredPermissions = this.reflector.get<string[]>(
//     //   'permissions',
//     //   context.getHandler(),
//     // );
    
//     // if (requiredPermissions && requiredPermissions.length > 0) {
//     //     // Implement custom permission/role check here
//     //     // if (!userHasRequiredPermissions) { return false; }
//     // }

//     // --- YOUR CUSTOM LOG END ---

//     // 3. If the parent passed AND your custom logic passed, return true.
//     return Promise.resolve(true);
//   }
// }
