import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../services/firebase";
import fetchEvents from "../../utils/fetchEvents";
import LoadingScreen from "./partials/LoadingScreen";
import EventInfo from "./partials/EventInfo";
import ProgressSection from "./partials/ProgressSection";
import SupportButton from "./partials/SupportButton";
import { Container, WraperInfo } from "./styles";
import { Image } from "./styles";
import { FaArrowLeft } from "react-icons/fa";

const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
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
    <>
      <FaArrowLeft 
        style={{ 
          fontSize: '30px', 
          color: '#fff', 
          cursor: 'pointer', 
          position: 'absolute', 
          left: '15px',
          top: '15px'
        }} 
        onClick={() => navigate(-1)} 
      />
      <Container>
        <Image src={event.image || "path/to/default-image.jpg"} alt={event.name} />
        <WraperInfo>
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
        </WraperInfo>
    </Container>
    </>
  );
};

export default EventDetails;