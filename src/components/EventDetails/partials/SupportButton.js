import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { ButtonSupport, ButtonChat, WrapperButton } from "../styles";
import { db } from "../../../services/firebase";
import { useNavigate } from "react-router-dom";

const SupportButton = ({ user, wallet, setWallet, event, setEvent, progress }) => {
  const [hasSupported, setHasSupported] = useState(false);
  const navigate = useNavigate();

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

  const handleSupportClick = async () => {
    if (wallet <= 0) {
      Swal.fire({
        title: "Saldo Insuficiente",
        text: "Você não possui saldo suficiente para apoiar este evento.",
        icon: "error",
        customClass: {
            title: 'custom-title',
            confirmButton: 'custom-confirm-btn',
        },
        width: '430px'
      });      
      return;
    }

    const amountNeeded = event.meta - event.meta_current;

    const { value: supportAmount } = await Swal.fire({
      title: "Insira o valor do apoio",
      input: "number",
      inputLabel: `Valor na carteira: ${parseFloat(wallet).toFixed(2)} - Meta restante: ${parseFloat(amountNeeded).toFixed(2)}`,
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
          return null;
      },
      customClass: {
        title: 'custom-title',
        confirmButton: 'custom-confirm-btn',
      },
      width: '430px'
    });

    if (supportAmount) {
      const finalSupportAmount = Math.min(Number(supportAmount), amountNeeded);
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
        .set({ supported: true });

      const newMetaCurrent = event.meta_current + finalSupportAmount;
      setEvent((prevEvent) => ({ ...prevEvent, meta_current: newMetaCurrent }));

      await db.collection("events").doc(event.id).update({ meta_current: newMetaCurrent });

      setHasSupported(true);

      Swal.fire({
        title: "Sucesso!",
        text: finalSupportAmount < supportAmount
            ? `Apoio realizado com sucesso! Apenas ${finalSupportAmount.toFixed(2)} foi usado para completar a meta.`
            : "Apoio realizado com sucesso!",
        icon: "success",
        customClass: {
            title: 'custom-title',
            confirmButton: 'custom-confirm-btn',
        },
        width: '430px'
      });
    }
  };

  return (
    <WrapperButton>
      {user ? (
        <>
          {progress < 100 && (
            <ButtonSupport onClick={handleSupportClick}>
              APOIE
            </ButtonSupport>
          )}
          {hasSupported && (
            <ButtonChat onClick={() => navigate(`/chat/${event.id}`)}>
              CHAT
            </ButtonChat>
          )}
        </>
      ) : (
        <p style={{ color: 'red', textAlign: "center" }}>
          Você precisa estar logado para apoiar este evento!
        </p>
      )}
    </WrapperButton>
  );
};

export default SupportButton;