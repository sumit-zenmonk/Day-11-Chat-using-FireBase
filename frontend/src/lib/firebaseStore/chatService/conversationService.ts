import { db } from "@/lib/firebase"
import { doc, setDoc } from "firebase/firestore"

export const saveConversationToDB = async (sender_uid: string, reciever_uid: string, message: string) => {
    const ref = doc(db, "conversation");

    const conversation_id = await setDoc(ref, {
        participants: [sender_uid, reciever_uid],
    }, { merge: true });

    return conversation_id;
}