import {
    collection,
    addDoc,
    getDocs,
    doc,
    updateDoc,
    deleteDoc,
    query,
    where
} from "firebase/firestore";
import { db } from "../firebase";
import { UserType } from "./userType";

const usersCollection = collection(db, "users");

export const createUser = async (userData: UserType) => {
    return await addDoc(usersCollection, userData);
};

export const getAllUsers = async (): Promise<UserType[]> => {
    const snapshot = await getDocs(usersCollection);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as UserType));
};

export const updateUser = async (id: string, updatedData: Partial<UserType>) => {
    const userDoc = doc(db, "users", id);
    return await updateDoc(userDoc, updatedData);
};

export const deleteUser = async (id: string) => {
    const userDoc = doc(db, "users", id);
    return await deleteDoc(userDoc);
};
