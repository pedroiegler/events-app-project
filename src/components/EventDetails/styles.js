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
`;

export const Image = styled.img`
  width: 300px;
  height: auto;
  max-height: 500px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 20px;
`;

export const Details = styled.div`
  color: #2b2a2a;
  text-align: left;
`;

export const Title = styled.h2`
  font-size: 30px;
  font-weight: 600;
  margin-bottom: 20px;
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