import { db } from "@/lib/firebase"
import {
    addDoc,
    collection,
    doc,
    setDoc,
    query,
    orderBy,
    onSnapshot
} from "firebase/firestore"

export const sendMessage = async (
    conversationId: string,
    senderId: string,
    receiverId: string,
    text: string
) => {
    const conversationRef = doc(db, "conversations", conversationId)

    // create conversation if not exists
    await setDoc(
        conversationRef,
        {
            participants: [senderId, receiverId],
            lastMessage: text,
            lastMessageAt: Date.now()
        },
        { merge: true }
    )

    // add message
    await addDoc(
        collection(db, "conversations", conversationId, "messages"),
        {
            senderId,
            text,
            createdAt: Date.now()
        }
    )
}

export const listenMessages = (
    conversationId: string,
    callback: (messages: any[]) => void
) => {
    const q = query(
        collection(db, "conversations", conversationId, "messages"),
        orderBy("createdAt")
    )

    const unsubscribe = onSnapshot(q, snapshot => {
        const messages = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }))
        callback(messages)
    })
    return unsubscribe
}