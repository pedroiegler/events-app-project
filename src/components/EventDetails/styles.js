import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  padding: 20px;
  max-width: 800px;
  margin: 30px auto;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 28px;

  @media (max-width: 768px) {
    margin: 0 auto;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 30px 70px;
  }
`;

export const Image = styled.img`
  width: 300px;
  height: auto;
  max-height: 500px;
  object-fit: cover;
  object-position: center;
  border-radius: 8px;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    width: 100%;
    max-height: 300px;
  }
`;

export const Details = styled.div`
  color: #2b2a2a;
  text-align: left;
`;

export const Title = styled.h2`
  font-size: 30px;
  font-weight: 600;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    text-align: center;
    font-size: 25px;
  }
`;

export const ButtonSupport = styled.button`
  background-color: #c5eb4a;
  text-transform: uppercase;
  color: #000;
  border: 0;
  font-size: 16px;
  font-weight: 600;
  padding: 8px 25px;
  border-radius: 20px;
  cursor: pointer;
  transition: .1s;

  &:hover{
    background-color: #b4d93f;
    transform: scale(1.01);
  }
`;

export const ButtonChat = styled.button`
  background-color: #b2b2b2;
  text-transform: uppercase;
  color: #000;
  border: 0;
  font-size: 16px;
  font-weight: 600;
  padding: 8px 25px;
  border-radius: 20px;
  cursor: pointer;
  transition: .1s;

  &:hover{
    background-color: #a3a2a2;
    transform: scale(1.01);
  }
`;

export const WraperInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 30px 30px;

  @media (max-width: 768px) {
    padding: 5px 0;
  }
`;

export const WrapperButton = styled.div`
  display: flex;
  flex-direction: row;
  alignItems: center;
  gap: 10px;
  margin-top: 40px;

  @media (max-width: 768px) {
    justify-content: center;
  }
`;