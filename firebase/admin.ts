import { cert, getApps ,initializeApp} from "firebase-admin/app"
import { getAuth } from "firebase-admin/auth"
import { getFirestore } from "firebase-admin/firestore";
// ✅ Server-side only usage
import fs from 'fs';

export async function getServerSideProps() {
  const data = fs.readFileSync('path/to/file');
  return { props: { data } };
}


const initFirebaseAdmin = () => {
    const apps = getApps();
    
    if(!apps.length){
        initializeApp({
            credential: cert({
                projectId: process.env.FIREBASE_PROJECT_ID,
                clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
                privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
            })
        })
    }
    return {
        auth:getAuth(),
        db:getFirestore()
    }

}

export const {auth,db} = initFirebaseAdmin();