import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import fetchEvents from "../../utils/fetchEvents";
import { Container, Image, Details, Title } from "./styles";
import { MetaAchievedText, ProgressBar, ProgressBarContainer } from "../Events/styles";
import ClipLoader from "react-spinners/ClipLoader"; 

const EventDetails = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    const fetchEventData = async () => {
      const eventsData = await fetchEvents();
      const selectedEvent = eventsData.find((event) => event.id === id);
      setEvent(selectedEvent);
    };

    fetchEventData();
  }, [id]);

  if (!event) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <ClipLoader color="#000" size={70} />
      </div>
    );
  }

  const progress = event.meta && event.meta_current 
    ? Math.min((event.meta_current / event.meta) * 100, 100) 
    : 0;

  return (
    <Container>
      <Image src={event.image || "path/to/default-image.jpg"} alt={event.name} />
      <Details>
        <Title>{event.name}</Title>
        <p><strong>Data e Hora:</strong> {event.datetime}</p>
        <p><strong>Meta:</strong> {event.meta} apoios</p>
        <p><strong>Apoios atuais:</strong> {event.meta_current} apoios</p>
        <ProgressBarContainer>
          <ProgressBar progress={progress} />
          <MetaAchievedText>
            {progress.toFixed(2)}% {progress === 100 && "(META ATINGIDA)"}
          </MetaAchievedText>
        </ProgressBarContainer>
        <p style={{ textAlign: "center", marginTop: "10px" }}>
          {progress.toFixed(2)}% ({event.meta_current} de {event.meta} apoios)
        </p>
      </Details>
    </Container>
  );
};

export default EventDetails;
