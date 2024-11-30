import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { ButtonSupport, ButtonChat, WrapperButton } from "../styles";
import { db } from "../../../services/firebase";
import { useNavigate } from "react-router-dom";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const SupportButton = ({ user, wallet, setWallet, event, setEvent }) => {
  const [hasSupported, setHasSupported] = useState(false);
  const navigate = useNavigate();
  const [isGoalReached, setIsGoalReached] = useState(false);

  useEffect(() => {
    const checkIfSupported = async () => {
      if (user && event) {
        const supportDoc = await db
          .collection("users")
          .doc(user.uid)
          .collection("supportedEvents")
          .doc(event.id)
          .get();

        setHasSupported(supportDoc.exists);
      }
    };
    checkIfSupported();
  }, [user, event]);

  useEffect(() => {
      const percentage = ((event.meta_current / event.meta) * 100).toFixed(2);
 
      if (Number(percentage) >= Number(event.goalPercentage)) {
        setIsGoalReached(true);
      }
  }, [event]);

  const handleSupportClick = async () => {
    if (wallet <= 0) {
      Swal.fire({
        title: "Saldo Insuficiente",
        text: "Você não possui saldo suficiente para apoiar este evento.",
        icon: "error",
        customClass: {
          title: "custom-title",
          confirmButton: "custom-confirm-btn",
        },
        width: "430px",
      });
      return;
    }

    const { value: supportAmount } = await Swal.fire({
      title: "Insira o valor do apoio",
      input: "number",
      inputLabel: `Valor na carteira: ${parseFloat(wallet).toFixed(2)}`,
      inputPlaceholder: "1",
      showCancelButton: false,
      showCloseButton: true,
      inputValidator: (value) => {
        if (!value || isNaN(value) || value <= 0) {
          return "Por favor, insira um valor válido!";
        }
        if (value > wallet) {
          return "Saldo insuficiente!";
        }
        if (value < event.minSupport) {
          return `O valor mínimo de apoio é ${event.minSupport}`;
        }
        return null;
      },
      customClass: {
        title: "custom-title",
        confirmButton: "custom-confirm-btn",
      },
      width: "430px",
    });
  
    if (supportAmount) {
      const finalSupportAmount = Number(supportAmount);
      const newWallet = wallet - finalSupportAmount;
  
      await db.collection("users").doc(user.uid).update({
        wallet: newWallet,
      });
      setWallet(newWallet);
  
      await db
        .collection("users")
        .doc(user.uid)
        .collection("supportedEvents")
        .doc(event.id)
        .set({ supported: true, supportAmount: finalSupportAmount });
  
      const newMetaCurrent = event.meta_current + finalSupportAmount;
  
      setEvent((prevEvent) => ({
        ...prevEvent,
        meta_current: newMetaCurrent,
      }));
  
      await db.collection("events").doc(event.id).update({
        meta_current: newMetaCurrent,
        supportersCount: firebase.firestore.FieldValue.increment(1),
      });
  
      setHasSupported(true);

      if (newMetaCurrent >= event.meta) {
        setIsGoalReached(true);
        Swal.fire({
          title: "Meta Alcançada!",
          text: "O evento atingiu o percentual necessário para ser concluído!",
          icon: "success",
          customClass: {
            title: "custom-title",
            confirmButton: "custom-confirm-btn",
          },
          width: "430px",
        });
      } else {
        Swal.fire({
          title: "Sucesso!",
          text: "Você apoiou o evento com sucesso!",
          icon: "success",
          customClass: {
            title: "custom-title",
            confirmButton: "custom-confirm-btn",
          },
          width: "430px",
        });
      }
    }
  };

  return (
    <WrapperButton>
      {isGoalReached && (
        <p style={{ color: "green", fontWeight: "bold", textAlign: "center" }}>
          A porcentagem minima foi batida! Os apoios foram desativados...
        </p>
      )}
      {user ? (
        <>
          {!isGoalReached && <ButtonSupport onClick={handleSupportClick}>APOIE</ButtonSupport>}
          
          {hasSupported && (
            <ButtonChat onClick={() => navigate(`/chat/${event.id}`)}>
              CHAT
            </ButtonChat>
          )}
        </>
      ) : (
        <p style={{ color: "red", textAlign: "center" }}>
          Você precisa estar logado para apoiar este evento!
        </p>
      )}
    </WrapperButton>
  );
};

export default SupportButton;