import React from "react";
import { MetaAchievedText, ProgressBar, ProgressBarContainer } from "../../Events/styles";

const ProgressSection = ({ event, progress }) => (
  <ProgressBarContainer>
    <ProgressBar progress={progress} />
    <MetaAchievedText>
      {progress.toFixed(2)}% {progress === 100 && "(META ATINGIDA)"}
    </MetaAchievedText>
    <p style={{ textAlign: "center", marginTop: "10px" }}>
      {progress.toFixed(2)}% (R${event.meta_current ? event.meta_current : 0} de R${event.meta} 💵)
    </p>
  </ProgressBarContainer>
);

export default ProgressSection;