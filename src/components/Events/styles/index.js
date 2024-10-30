import styled from "styled-components";

export const Card = styled.div`
  border: 1px solid #ccc;
  border-radius: 28px;
  padding: 16px 16px 25px 16px;
  width: 250px;
  cursor: pointer;
  transition: transform 0.3s;
  background-color: #fff;

  &:hover {
    transform: scale(1.01);
  }
`;

export const ProgressBarContainer = styled.div`
  width: 100%;
  background-color: #fff;
  border-radius: 8px;
  margin-top: 10px;
  height: 25px;
  padding: 3px;
  border: 1px solid #000;
  position: relative;
`;

export const ProgressBar = styled.div`
  height: 100%;
  background-color: #000;
  border-radius: 8px;
  width: ${({ progress }) => progress}%;
  transition: width 0.3s ease;
`;

export const MetaAchievedText = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  border-radius: 8px;
  height: 100%;
  font-size: 10px;
`;