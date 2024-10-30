import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import fetchEvents from "../../utils/fetchEvents";
import { Card, MetaAchievedText, ProgressBarContainer, ProgressBar } from "./styles/index";

const Events = () => {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getEventsData = async () => {
      const eventsData = await fetchEvents();
      setEvents(eventsData);
    };

    getEventsData();
  }, []);

  const handleCardClick = (id) => {
    navigate(`/event/${id}`);
  };

  return (
    <div style={{ margin: "0 auto", maxWidth: "1400px", zIndex: 2 }}>
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "20px", padding: "20px" }}>
        {events.map((event) => {
          const progress = event.meta && event.meta_current 
            ? Math.min((event.meta_current / event.meta) * 100, 100) 
            : 0;

          return (
            <Card key={event.id} onClick={() => handleCardClick(event.id)} style={{ cursor: "pointer" }}>
              {event.image && (
                <img
                  src={event.image}
                  alt={event.name}
                  style={{ width: "100%", height: "350px", objectFit: "cover", borderRadius: "8px" }}
                />
              )}
              <ProgressBarContainer>
                <ProgressBar progress={progress} />
                {progress === 100 && (
                  <MetaAchievedText>
                    META ATINGIDA
                  </MetaAchievedText>
                )}
              </ProgressBarContainer>
              <p style={{ textAlign: "center", marginTop: "10px" }}>
                {event.meta_current} de {event.meta} apoios
              </p>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default Events;
