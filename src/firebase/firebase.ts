import { FirebaseError, getApp, getApps, initializeApp } from 'firebase/app';
import {
  AuthErrorCodes,
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';
import { toast } from 'react-toastify';

import { LOCAL_STORAGE_KEY } from '@/hooks/useLocalStorage';

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
      case AuthErrorCodes.USER_DISABLED:
        toast.error('User disabled');
        break;
      case AuthErrorCodes.INVALID_LOGIN_CREDENTIALS:
        toast.error('Invalid credentials');
        break;
      case AuthErrorCodes.EMAIL_EXISTS:
        toast.error('Email already in use');
        break;
      case AuthErrorCodes.TOO_MANY_ATTEMPTS_TRY_LATER:
        toast.error('Too many authentication requests');
        break;
      default:
        toast.error(error.code);
    }
  }
};

export const signIn = async (email: string, password: string): Promise<boolean> => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    toast.success(`Successfully signed in with ${email}!`);

    return true;
  } catch (error) {
    showErrorToast(error);

    return false;
  }
};

export const signUp = async (name: string, email: string, password: string): Promise<boolean> => {
  try {
    const { user } = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(user, { displayName: name });
    toast.success(`Successfully signed up ${name}!`);

    return true;
  } catch (error) {
    showErrorToast(error);

    return false;
  }
};

export const logOut = async (): Promise<void> => {
  try {
    await auth.signOut();
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    toast.success('You have been signed out. Local storage and Redux state cleared!');
  } catch (error) {
    showErrorToast(error);
  }
};
