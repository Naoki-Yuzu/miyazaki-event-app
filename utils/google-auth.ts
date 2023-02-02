import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { useRouter } from 'next/router';
import { auth, db } from '../firebase/client-app';

export const signUpWithGoogle = () : Promise<void> => {

  const provider = new GoogleAuthProvider();
  
  return signInWithPopup(auth, provider).then((result) => {
    console.log("初めまして", result.user.displayName, "さん");
    if (result.user) {
      const ref = doc(db, `users/${result.user.uid}`)
      setDoc(ref, {
        uid: result.user.uid,
        name: result.user.displayName,
        profileImage: result.user.photoURL,
      }).then(() => {
      }).catch((err) => {
      })
    }
    
  }).catch((err) => {
    console.log("エラーメッセージ : ", err);
    
  })
}

export const loginWithGoogle = () => {
  const provider = new GoogleAuthProvider();
  
  return signInWithPopup(auth, provider).then((result) => {
    console.log("こんにちは", result.user.displayName, "さん");
  }).catch((err) => {
    console.log("エラーメッセージ : ", err);
  })
}

export const logout = () => {
  return signOut(auth).then(() => {
    console.log("ログアウトが完了しました")
  }).catch((err) => {
    console.log("エラーメッセージ : ", err);
  });
}