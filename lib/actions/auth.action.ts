'use server';
import { db,auth } from '@/firebase/admin';
import { cookies } from 'next/headers';


export async function signUp(params : SignUpParams){
    const {uid,name,email}=params;

    try{
        const userRecord = await db.collection('users').doc(uid).get();
        if(userRecord.exists){
            return {
                success:false,
                message:"User already exists. please sign in instead"
            }
        }

        await db.collection('users').doc(uid).set({
            name,
            email
        })

        return{
            success:true,
            message:"User created successfully"
        }


    }catch(e:any){
        console.error("error creating user",e);

        if(e.code === 'auth/email-already-exits'){
            return{
                success:false,
                message:"Email already exists"
            }
        }
        return{
            success:false,
            message:"Failed to create user"
        }
    }

}

export async function signIn(params: SignInParams) {
   const { email, idToken } = params;
   try {
        const userRecord = await auth.getUserByEmail(email);
        if(!userRecord){
            return{
            success: false,
            message: "User does not exist. Please sign up first."   
        }}
        await setSessionCookie(idToken);
   } catch (e){
    console.log(e);
    return{
        success: false,
        message: "Failed to log into an user account."
    }
   } 
}

export async function setSessionCookie(idToken: string) {
 const cookieStore = await cookies();   
 const sessionCookie = await auth.createSessionCookie(idToken, {
    expiresIn: 60 * 60 * 24 * 7 * 1000 // 7 days    
    })
    cookieStore.set('session',sessionCookie,{
        maxAge: 60 * 60 * 24 * 7 ,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        path: '/',
        sameSite: 'lax',
    })
    ;
}

export async function getCurrentUser(): Promise<User |null>{
    const cookieStore = await cookies();

    const sessionCookie = cookieStore.get('session')?.value;
    if(!sessionCookie){
        return null;
    }
    try {
        const decodedClaims = await auth.verifySessionCookie(sessionCookie, true);
        const userRecord = await db.collection('users').doc(decodedClaims.uid).get();
        if (!userRecord.exists) {
            return null; // User not found in Firestore
        }
        return {
            ... userRecord.data(),
            id: userRecord.id,
        }as User;
    } catch (error) {
        console.error("Error verifying session cookie:", error);
        return null;
    }
}

export async function isAuthenticated(){
    const user = await getCurrentUser();

    return !!user;
}