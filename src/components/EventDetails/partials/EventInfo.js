import React from "react";
import { Details, Title } from "../styles";

const EventInfo = ({ event }) => (
  <>
    <Details>
      <Title>{event.name}</Title>
      <p><strong>Data e Hora:</strong> {new Date(event.datetime).toLocaleString()}</p>
      <p><strong>Meta:</strong> {event.meta} apoios</p>
      <p><strong>Apoios atuais:</strong> {event.meta_current} apoios</p>
    </Details>
  </>
);

export default EventInfo;
