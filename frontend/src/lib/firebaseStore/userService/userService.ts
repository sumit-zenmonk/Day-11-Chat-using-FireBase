import { db } from "@/lib/firebase"
import { User } from "@/redux/feature/User/usertype"
import { doc, setDoc, serverTimestamp, collection, getDocs } from "firebase/firestore"

export const saveUserToDB = async (user: any) => {
    const ref = doc(db, "users", user.uid)

    await setDoc(ref, {
        uid: user.uid,
        email: user.email,
        name: user.displayName || null,
        photo: user.photoURL || null,
        createdAt: serverTimestamp()
    }, { merge: true })
}

export const getAllUsers = async (currentUid: string): Promise<User[]> => {
    const snapshot = await getDocs(collection(db, "users"))
    const users: User[] = snapshot.docs.map(doc => doc.data() as User)
    return users.filter(user => user.uid && user.uid !== currentUid)
}