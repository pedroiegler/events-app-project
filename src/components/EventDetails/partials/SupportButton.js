import React from "react";
import { ButtonSupport, ButtonChat } from "../styles";
import { db } from "../../../services/firebase";

const SupportButton = ({ user, wallet, setWallet, event, setEvent, progress }) => {
    const handleSupportClick = async () => {
    if (wallet <= 0) {
        alert("Você não possui saldo suficiente para apoiar este evento.");
        return;
    }
    
    const supportAmount = 10;
    
    if (wallet >= supportAmount) {
        const newWallet = wallet - supportAmount;
        setWallet(newWallet);
    
        await db.collection("users").doc(user.uid).update({ wallet: newWallet });
    
        const newMetaCurrent = Number(event.meta_current || 0) + supportAmount;
        setEvent((prevEvent) => ({ ...prevEvent, meta_current: newMetaCurrent }));
    
        await db.collection("events").doc(event.id).update({ meta_current: newMetaCurrent });
    
        alert("Apoio realizado com sucesso!");
    } else {
        alert("Saldo insuficiente para apoiar este evento.");
    }
    };
      

  return (
    <div style={{ display: "flex", gap: "10px", marginTop: "50px" }}>
      {progress < 100 && (
        user ? (
          <ButtonSupport onClick={handleSupportClick}>
            APOIE
          </ButtonSupport>
        ) : (
          <p style={{ color: 'red', textAlign: "center" }}>Você precisa estar logado para apoiar este evento!</p>
        )
      )}
      {user && <ButtonChat>CHAT</ButtonChat>}
    </div>
  );
};

export default SupportButton;
