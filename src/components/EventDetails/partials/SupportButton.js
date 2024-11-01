import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { ButtonSupport, ButtonChat } from "../styles";
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
      Swal.fire("Saldo Insuficiente", "Você não possui saldo suficiente para apoiar este evento.", "error");
      return;
    }

    const amountNeeded = event.meta - event.meta_current;

    const { value: supportAmount } = await Swal.fire({
      title: "Insira o valor do apoio",
      input: "number",
      inputLabel: `Valor na carteira: ${parseFloat(wallet).toFixed(2)} - Meta restante: ${parseFloat(amountNeeded).toFixed(2)}`,
      inputPlaceholder: "1",
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value || isNaN(value) || value <= 0) {
          return "Por favor, insira um valor válido!";
        }
        if (value > wallet) {
          return "Saldo insuficiente!";
        }
        return null;
      },
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

      Swal.fire(
        "Sucesso!",
        finalSupportAmount < supportAmount
          ? `Apoio realizado com sucesso! Apenas ${finalSupportAmount.toFixed(2)} foi usado para completar a meta.`
          : "Apoio realizado com sucesso!",
        "success"
      );
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "10px", marginTop: "50px" }}>
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
    </div>
  );
};

export default SupportButton;