import React from "react";
import { Details, Title } from "../styles";

const EventInfo = ({ event }) => (
  <>
    <Details>
      <Title>{event.name}</Title>
      <p><strong>Data e Hora:</strong> {new Date(event.datetime).toLocaleString()}</p>
      <p><strong>Meta:</strong> R${event.meta} 💵</p>
      <p><strong>Apoios atuais:</strong> R${event.meta_current} 💵</p>
    </Details>
  </>
);

export default EventInfo;
