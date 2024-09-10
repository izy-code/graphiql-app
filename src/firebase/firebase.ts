import { FirebaseError, getApp, getApps, initializeApp } from 'firebase/app';
import {
  AuthErrorCodes,
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';
import { toast } from 'react-toastify';

import { type ErrorsFirebase } from '@/contexts/auth-context';

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

const showErrorToast = (error: unknown, errors: ErrorsFirebase): void => {
  if (error instanceof FirebaseError) {
    switch (error.code) {
      case AuthErrorCodes.USER_DISABLED:
        toast.error(errors.USER_DISABLED);
        break;
      case AuthErrorCodes.INVALID_LOGIN_CREDENTIALS:
        toast.error(errors.INVALID_LOGIN_CREDENTIALS);
        break;
      case AuthErrorCodes.EMAIL_EXISTS:
        toast.error(errors.EMAIL_EXISTS);
        break;
      case AuthErrorCodes.TOO_MANY_ATTEMPTS_TRY_LATER:
        toast.error(errors.TOO_MANY_ATTEMPTS_TRY_LATER);
        break;
      default:
        toast.error(error.code);
    }
  }
};

export const signIn = async (
  email: string,
  password: string,
  success: string,
  errors: ErrorsFirebase,
): Promise<boolean> => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    toast.success(success);

    return true;
  } catch (error) {
    showErrorToast(error, errors);

    return false;
  }
};

export const signUp = async (
  name: string,
  email: string,
  password: string,
  success: string,
  errors: ErrorsFirebase,
): Promise<boolean> => {
  try {
    const { user } = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(user, { displayName: name });
    toast.success(success);

    return true;
  } catch (error) {
    showErrorToast(error, errors);

    return false;
  }
};

export const logOut = async (success: string, errors: ErrorsFirebase): Promise<void> => {
  try {
    await auth.signOut();
    toast.success(success);
  } catch (error) {
    showErrorToast(error, errors);
  }
};
