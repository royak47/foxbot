import { doc, setDoc } from "firebase/firestore";
import { db } from "./firebase";

const saveMiningData = async (userId, miningData) => {
  await setDoc(doc(db, "users", userId), { ...miningData }, { merge: true });
};
