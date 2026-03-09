import { db } from "@/lib/firebase"
<<<<<<< HEAD
import { User } from "@/redux/feature/User-List/usertype"
import { doc, setDoc, collection, getDocs } from "firebase/firestore"
=======
import { User } from "@/redux/feature/User/usertype"
import { doc, setDoc, serverTimestamp, collection, getDocs } from "firebase/firestore"
>>>>>>> 26131aa5fe27c928cadac00decb7587a1f19c6b2

export const saveUserToDB = async (user: any) => {
    const ref = doc(db, "users", user.uid)

    await setDoc(ref, {
        uid: user.uid,
        email: user.email,
        name: user.displayName || null,
        photo: user.photoURL || null,
<<<<<<< HEAD
        createdAt: Date.now()
=======
        createdAt: serverTimestamp()
>>>>>>> 26131aa5fe27c928cadac00decb7587a1f19c6b2
    }, { merge: true })
}

export const getAllUsers = async (currentUid: string): Promise<User[]> => {
    const snapshot = await getDocs(collection(db, "users"))
    const users: User[] = snapshot.docs.map(doc => doc.data() as User)
    return users.filter(user => user.uid && user.uid !== currentUid)
}