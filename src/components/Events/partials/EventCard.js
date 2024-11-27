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
      <div style={{ marginTop: '5px' }}>
        <p style={{ fontSize: '15px', textTransform: 'capitalize' }}>{event.name}</p>
        <div style={{ marginTop: '7px' }}>
          <p style={{ fontSize: '12px' }}><strong>Data e Hora:</strong> {new Date(event.datetime).toLocaleString()}</p>
          <p style={{ fontSize: '12px', marginTop: '3px' }}><strong>Categoria:</strong> {event.category}</p>
        </div>
      </div>
      <ProgressBarContainer>
        <ProgressBar progress={progress} />
        {progress === 100 && <MetaAchievedText>META ATINGIDA</MetaAchievedText>}
      </ProgressBarContainer>
      <p style={{ textAlign: "center", marginTop: "10px" }}>
        {event.meta_current} de {event.meta} 💵
      </p>
    </Card>
  );
};

export default EventCard;
