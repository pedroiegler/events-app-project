import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { db } from "../../services/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../services/firebase";
import { 
  ChatContainer, 
  Messages, 
  Message, 
  MessageContent, 
  Timestamp, 
  InputContainer, 
  Input, 
  Button 
} from "./styles";
import firebase from "firebase/compat/app";
import { FaArrowLeft } from "react-icons/fa";

const Chat = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const [user] = useAuthState(auth);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    const unsubscribe = db
      .collection("chats")
      .doc(eventId)
      .collection("messages")
      .orderBy("timestamp", "asc")
      .onSnapshot((snapshot) =>
        setMessages(snapshot.docs.map((doc) => doc.data()))
      );

    return () => unsubscribe();
  }, [eventId]);

  const sendMessage = async () => {
    if (newMessage.trim() !== "") {
      await db.collection("chats").doc(eventId).collection("messages").add({
        userId: user.uid,
        displayName: user.displayName || user.email,
        message: newMessage,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });
      setNewMessage("");
    }
  };

  return (
    <>
      <FaArrowLeft 
        style={{ 
          fontSize: '30px', 
          color: '#fff', 
          cursor: 'pointer', 
          position: 'relative', 
          left: '15px',
          top: '15px'
        }} 
        onClick={() => navigate(-1)} 
      />
      <ChatContainer>
        <Messages>
          {messages.map((msg, index) => (
            <Message key={index} sent={msg.userId === user.uid}>
              <MessageContent>
                <strong>{msg.displayName}</strong>
                <p>{msg.message}</p>
                <Timestamp>{new Date(msg.timestamp?.toDate()).toLocaleTimeString()}</Timestamp>
              </MessageContent>
            </Message>
          ))}
        </Messages>
        <InputContainer>
          <Input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Digite sua mensagem"
          />
          <Button onClick={sendMessage}>Enviar</Button>
        </InputContainer>
      </ChatContainer>
    </>
  );
};

export default Chat;