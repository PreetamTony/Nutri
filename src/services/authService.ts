import { getAuth } from '../firebase/config';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, GoogleAuthProvider, signInWithPopup, sendPasswordResetEmail } from 'firebase/auth';

export const signup = async (email: string, password: string) => {
  try {
    const auth = await getAuth();
    if (!auth) throw new Error('Firebase Auth is not available in this environment.');
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const login = async (email: string, password: string) => {
  try {
    const auth = await getAuth();
    if (!auth) throw new Error('Firebase Auth is not available in this environment.');
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const logout = async () => {
  try {
    const auth = await getAuth();
    if (!auth) throw new Error('Firebase Auth is not available in this environment.');
    await signOut(auth);
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const googleLogin = async () => {
  const provider = new GoogleAuthProvider();
  try {
    const auth = await getAuth();
    if (!auth) throw new Error('Firebase Auth is not available in this environment.');
    const result = await signInWithPopup(auth, provider);
    return result.user;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const resetPassword = async (email: string) => {
  try {
    const auth = await getAuth();
    if (!auth) throw new Error('Firebase Auth is not available in this environment.');
    await sendPasswordResetEmail(auth, email);
  } catch (error: any) {
    throw new Error(error.message);
  }
};
