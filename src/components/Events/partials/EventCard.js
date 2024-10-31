import React from "react";
import { Card, ProgressBarContainer, ProgressBar, MetaAchievedText } from "../styles";

const EventCard = ({ event, onClick }) => {
  const progress = event.meta && event.meta_current 
    ? Math.min((event.meta_current / event.meta) * 100, 100) 
    : 0;

  return (
    <Card onClick={() => onClick(event.id)} style={{ cursor: "pointer" }}>
      {event.image && (
        <img
          src={event.image}
          alt={event.name}
          style={{ width: "100%", height: "350px", objectFit: "cover", borderRadius: "8px" }}
        />
      )}
      <ProgressBarContainer>
        <ProgressBar progress={progress} />
        {progress === 100 && <MetaAchievedText>META ATINGIDA</MetaAchievedText>}
      </ProgressBarContainer>
      <p style={{ textAlign: "center", marginTop: "10px" }}>
        {event.meta_current} de {event.meta} apoios
      </p>
    </Card>
  );
};

export default EventCard;
