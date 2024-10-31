import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../services/firebase";
import fetchEvents from "../../utils/fetchEvents";
import LoadingScreen from "./partials/LoadingScreen";
import EventInfo from "./partials/EventInfo";
import ProgressSection from "./partials/ProgressSection";
import SupportButton from "./partials/SupportButton";
import { Container } from "./styles";
import { Image } from "./styles";

const EventDetails = () => {
  const { id } = useParams();
  const [user] = useAuthState(auth);
  const [event, setEvent] = useState(null);
  const [wallet, setWallet] = useState(0);

  useEffect(() => {
    if (user) {
      const getUserData = async () => {
        const userDoc = await db.collection("users").doc(user.uid).get();
        if (userDoc.exists) {
          setWallet(userDoc.data().wallet || 50);
        }
      };
      getUserData();
    }
  }, [user]);

  useEffect(() => {
    const fetchEventData = async () => {
      const eventsData = await fetchEvents();
      const selectedEvent = eventsData.find((event) => event.id === id);
      setEvent(selectedEvent);
    };
    fetchEventData();
  }, [id]);

  if (!event) return <LoadingScreen />;

  const progress = event.meta && event.meta_current
    ? Math.min((event.meta_current / event.meta) * 100, 100)
    : 0;

  return (
    <Container>
      <Image src={event.image || "path/to/default-image.jpg"} alt={event.name} />
      <div style={{ display: "flex", flexDirection: "column", gap: "20px", padding: "40px 30px" }}>
        <EventInfo event={event} />
        <ProgressSection event={event} progress={progress} />
        <SupportButton 
          user={user} 
          wallet={wallet} 
          setWallet={setWallet} 
          eventId={event.id} 
          event={event} 
          setEvent={setEvent} 
          progress={progress} 
        />
      </div>
    </Container>
  );
};

export default EventDetails;