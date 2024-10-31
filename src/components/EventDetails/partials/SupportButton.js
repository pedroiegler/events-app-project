import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { ButtonSupport, ButtonChat } from "../styles";
import { db } from "../../../services/firebase";

const SupportButton = ({ user, wallet, setWallet, event, setEvent, progress }) => {
    const [hasSupported, setHasSupported] = useState(false);

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

        const { value: supportAmount } = await Swal.fire({
          title: "Insira o valor do apoio",
          input: "number",
          inputLabel: `Valor na carteira: ${parseFloat(wallet).toFixed(2)}`,
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
          const newWallet = wallet - Number(supportAmount || 0);
          setWallet(newWallet);

          await db.collection("users").doc(user.uid).update({
              wallet: newWallet,
          });

          await db
            .collection("users")
            .doc(user.uid)
            .collection("supportedEvents")
            .doc(event.id)
            .set({ supported: true });

          const newMetaCurrent = Number(event.meta_current || 0) + Number(supportAmount || 0);
          setEvent((prevEvent) => ({ ...prevEvent, meta_current: newMetaCurrent }));

          await db.collection("events").doc(event.id).update({ meta_current: newMetaCurrent });
  
          setHasSupported(true);
          Swal.fire("Sucesso!", "Apoio realizado com sucesso!", "success");
        }
    };

    return (
        <div style={{ display: "flex", gap: "10px", marginTop: "50px" }}>
            {progress < 100 && (
              user ? (
                <>
                  <ButtonSupport onClick={handleSupportClick}>
                    APOIE
                  </ButtonSupport>
                  {hasSupported && <ButtonChat>CHAT</ButtonChat>}
                </>
              ) : (
                <p style={{ color: 'red', textAlign: "center" }}>
                  Você precisa estar logado para apoiar este evento!
                </p>
              )
            )}
        </div>
    );
};

export default SupportButton;