import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
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
  padding: 40px 30px;
  color: #2b2a2a;
  text-align: left;
`;

export const Title = styled.h2`
  font-size: 30px;
  font-weight: 600;
  margin-bottom: 20px;
`;