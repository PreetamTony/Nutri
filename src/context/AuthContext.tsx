import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut,
  onAuthStateChanged,
  updateProfile,
  User as FirebaseUser
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { getAuth, db } from '../firebase/config';
import { User } from '../types';

interface AuthContextType {
  currentUser: FirebaseUser | null;
  userProfile: User | null;
  loading: boolean;
  signup: (email: string, password: string, name: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  updateUserProfile: (data: Partial<User>) => Promise<void>;
  googleLogin: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<FirebaseUser | null>(null);
  const [userProfile, setUserProfile] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  let unsubscribe: (() => void) | undefined;
  (async () => {
    const auth = await getAuth();
    if (!auth) return;
    unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user) {
        const userDocRef = doc(db, 'users', user.uid);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          setUserProfile(userDoc.data() as User);
        } else {
          // Create a basic profile if it doesn't exist
          const newUserProfile: User = {
            uid: user.uid,
            displayName: user.displayName,
            email: user.email,
            photoURL: user.photoURL,
            dietaryPreferences: [],
            allergies: [],
            healthGoals: [],
          };
          await setDoc(userDocRef, newUserProfile);
          setUserProfile(newUserProfile);
        }
      } else {
        setUserProfile(null);
      }
      setLoading(false);
    });
  })();
  return () => {
    if (unsubscribe) unsubscribe();
  };
}, []);

  const signup = async (email: string, password: string, name: string) => {
    const auth = await getAuth();
    if (!auth) return;
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    
    // Update the user's display name
    if (auth.currentUser) {
      await updateProfile(auth.currentUser, {
        displayName: name
      });
    }
    
    // Create user profile in Firestore
    const newUser: User = {
      uid: userCredential.user.uid,
      displayName: name,
      email: userCredential.user.email,
      photoURL: null,
      dietaryPreferences: [],
      allergies: [],
      healthGoals: [],
    };
    
    await setDoc(doc(db, 'users', userCredential.user.uid), newUser);
    setUserProfile(newUser);
  };

  const login = async (email: string, password: string) => {
    const auth = await getAuth();
    if (!auth) throw new Error('Firebase Auth is not available in this environment.');
    await signInWithEmailAndPassword(auth, email, password);
  };

  const logout = async () => {
    const auth = await getAuth();
    if (!auth) throw new Error('Firebase Auth is not available in this environment.');
    await signOut(auth);
  };

  const updateUserProfile = async (data: Partial<User>) => {
    if (!currentUser) return;
    
    const userDocRef = doc(db, 'users', currentUser.uid);
    await setDoc(userDocRef, data, { merge: true });
    
    // Update local state
    if (userProfile) {
      setUserProfile({ ...userProfile, ...data });
    }
  };

  // Google login implementation
  const googleLogin = async () => {
    const auth = await getAuth();
    if (!auth) throw new Error('Firebase Auth is not available in this environment.');
    const { GoogleAuthProvider, signInWithPopup } = await import('firebase/auth');
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    // Optionally create/update user profile in Firestore
    const user = result.user;
    if (user) {
      const userDocRef = doc(db, 'users', user.uid);
      const userDoc = await getDoc(userDocRef);
      if (!userDoc.exists()) {
        const newUser: User = {
          uid: user.uid,
          displayName: user.displayName || '',
          email: user.email || '',
          photoURL: user.photoURL || null,
          dietaryPreferences: [],
          allergies: [],
          healthGoals: [],
        };
        await setDoc(userDocRef, newUser);
        setUserProfile(newUser);
      }
    }
  };

  const value = {
    currentUser,
    userProfile,
    loading,
    signup,
    login,
    logout,
    updateUserProfile,
    googleLogin
  };


  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};