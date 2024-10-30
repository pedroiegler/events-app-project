import { collection, getDocs } from "firebase/firestore";
import { db } from "../services/firebase";

const fetchEvents = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "events"));
    return querySnapshot.docs.map((doc) => {
      const data = doc.data();
      const datetime = data.datetime ? data.datetime.toDate().toLocaleString() : null;
      return {
        id: doc.id,
        ...data,
        datetime,
      };
    });
  } catch (error) {
    console.error("Erro ao buscar eventos:", error);
    return [];
  }
};

export default fetchEvents;
