import { FirebaseError, getApp, getApps, initializeApp } from 'firebase/app';
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { toast } from 'react-toastify';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const firebaseApp = !getApps().length ? initializeApp(firebaseConfig) : getApp();
export const auth = getAuth(firebaseApp);

const showErrorToast = (error: unknown): void => {
  if (error instanceof FirebaseError) {
    switch (error.code) {
      case 'auth/user-not-found':
        toast.error('User not found');
        break;
      case 'auth/invalid-password':
        toast.error('Wrong password');
        break;
      case 'auth/invalid-credential':
        toast.error('Invalid credential');
        break;
      case 'auth/email-already-exists':
        toast.error('E-mail already exists');
        break;
      case 'auth/email-already-in-use':
        toast.error('E-mail already in use');
        break;
      case 'auth/too-many-requests':
        toast.error('Too many requests');
        break;
      default:
        toast.error(error.code);
    }
  }
};

export const signIn = async (email: string, password: string): Promise<boolean> => {
  try {
    await signInWithEmailAndPassword(auth, email, password);

    return true;
  } catch (error) {
    showErrorToast(error);

    return false;
  }
};

export const signUp = async (name: string, email: string, password: string): Promise<boolean> => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const { user } = userCredential;

    await updateProfile(user, {
      displayName: name,
    });

    return true;
  } catch (error) {
    showErrorToast(error);

    return false;
  }
};

export const logOut = async (): Promise<void> => {
  try {
    await auth.signOut();
  } catch (error: unknown) {
    showErrorToast(error);
  }
};
