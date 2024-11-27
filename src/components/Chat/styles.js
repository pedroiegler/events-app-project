import styled from "styled-components";

export const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 96vh;
  width: 100%;
  margin: auto;
`;

export const Messages = styled.div`
  flex-grow: 1;
  padding: 10px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
`;

export const Message = styled.div`
  max-width: 60%;
  margin: 5px 0;
  padding: 10px;
  border-radius: 10px;
  position: relative;
  align-self: ${({ sent }) => (sent ? "flex-end" : "flex-start")};
  background-color: ${({ sent }) => (sent ? "#dcf8c6" : "#ffffff")};
  border: ${({ sent }) => (sent ? "none" : "1px solid #ccc")};
`;

export const MessageContent = styled.div`
  display: flex;
  flex-direction: column;

  strong {
    font-size: 0.9em;
    color: #555;
  }

  p {
    margin: 5px 0 0;
    font-size: 1em;
  }
`;

export const Timestamp = styled.span`
  font-size: 0.75em;
  color: #999;
  text-align: right;
`;

export const InputContainer = styled.div`
  display: flex;
  padding: 10px;
  border-top: 1px solid #ccc;
  
  input:focus {
    outline: none;
  }
`;

export const Input = styled.input`
  flex-grow: 1;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-right: 5px;
`;

export const Button = styled.button`
  padding: 10px 15px;
  border: none;
  background-color: #128c7e;
  color: white;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #0a6f5e;
  }
`;