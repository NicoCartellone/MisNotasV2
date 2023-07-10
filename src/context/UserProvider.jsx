import { createContext, useState, useEffect } from 'react'
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithRedirect,
  signOut
} from 'firebase/auth'
import { auth, db } from '../config/firebase'
import { getDoc, setDoc, doc } from 'firebase/firestore/lite'

import { erroresFirebase } from '../utils/erroresFirebase'
import { toast } from 'sonner'
import LoadingBtn from '../components/Layout/LoadingBtn'

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(false)
  const [userData, setUserData] = useState({})
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    console.log('useEffect en acción')
    const unsuscribe = onAuthStateChanged(auth, (user) => {
      console.log(user)
      setUser(user)
    })
    return unsuscribe
  }, [])

  if (user === false) return <LoadingBtn />

  const registerUser = async (email, password, nombre) => {
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      )
      const docRef = doc(db, 'users', user.uid)
      const docSpan = await getDoc(docRef)
      if (docSpan.exists()) {
        setUserData({ ...docSpan.data() })
      } else {
        await setDoc(docRef, {
          email: user.email,
          uid: user.uid,
          displayName: nombre,
          photoURL: user.photoURL
        })
        setUser(true)
        setUserData({
          email: user.email,
          uid: user.uid,
          displayName: nombre,
          photoURL: user.photoURL
        })
      }
    } catch (error) {
      console.log(error)
    }
  }

  const loginUser = async (email, password) => {
    try {
      setLoading(true)
      await signInWithEmailAndPassword(auth, email, password)
    } catch (error) {
      const { message } = erroresFirebase(error.code)
      toast.error(message)
    } finally {
      setLoading(false)
    }
  }

  const signOutUser = () => {
    try {
      signOut(auth)
    } catch (error) {
      console.log(error)
    }
  }

  const GoogleSignIn = async () => {
    try {
      setLoading(true)
      const provider = new GoogleAuthProvider()
      const { user } = await signInWithRedirect(auth, provider)
      const docRef = doc(db, 'users', user.uid)
      const docSpan = await getDoc(docRef)
      if (docSpan.exists()) {
        setUserData({ ...docSpan.data() })
      } else {
        await setDoc(docRef, {
          email: user.email,
          uid: user.uid,
          displayName: user.displayName,
          photoURL: user.photoURL
        })
        setUser(true)
        setUserData({
          email: user.email,
          uid: user.uid,
          displayName: user.displayName,
          photoURL: user.photoURL
        })
      }
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(true)
    }
  }

  const ResetPassword = async () => {
    await sendPasswordResetEmail(auth, auth.currentUser.email)
  }

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        registerUser,
        loginUser,
        signOutUser,
        GoogleSignIn,
        userData,
        setUserData,
        ResetPassword,
        loading
      }}
    >
      {children}
    </UserContext.Provider>
  )
}
export default UserProvider

export const UserContext = createContext()
