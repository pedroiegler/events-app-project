import React, { useEffect, useState } from "react";
import { Alert, View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { db } from "../services/firebase";
import { useNavigation } from "@react-navigation/native";

const SupportButton = ({ user, wallet, setWallet, event, setEvent, progress }) => {
  const [hasSupported, setHasSupported] = useState(false);
  const navigation = useNavigation();

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
      Alert.alert("Saldo Insuficiente", "Você não possui saldo suficiente para apoiar este evento.");
      return;
    }

    const amountNeeded = event.meta - event.meta_current;

    Alert.prompt(
      "Insira o valor do apoio",
      `Valor na carteira: ${parseFloat(wallet).toFixed(2)} - Meta restante: ${parseFloat(amountNeeded).toFixed(2)}`,
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "OK",
          onPress: async (supportAmount) => {
            if (!supportAmount || isNaN(supportAmount) || supportAmount <= 0) {
              Alert.alert("Erro", "Por favor, insira um valor válido!");
              return;
            }
            if (supportAmount > wallet) {
              Alert.alert("Erro", "Saldo insuficiente!");
              return;
            }

            const finalSupportAmount = Math.min(Number(supportAmount), amountNeeded);
            const newWallet = wallet - finalSupportAmount;

            await db.collection("users").doc(user.uid).update({ wallet: newWallet });
            setWallet(newWallet);

            await db.collection("users").doc(user.uid).collection("supportedEvents").doc(event.id).set({ supported: true });

            const newMetaCurrent = event.meta_current + finalSupportAmount;
            setEvent((prevEvent) => ({ ...prevEvent, meta_current: newMetaCurrent }));

            await db.collection("events").doc(event.id).update({ meta_current: newMetaCurrent });

            setHasSupported(true);

            Alert.alert(
              "Sucesso!",
              finalSupportAmount < supportAmount
                ? `Apoio realizado com sucesso! Apenas ${finalSupportAmount.toFixed(2)} foi usado para completar a meta.`
                : "Apoio realizado com sucesso!"
            );
          },
        },
      ],
      "plain-text",
      ""
    );
  };

  return (
    <View style={styles.container}>
      {user ? (
        <>
          {progress < 100 && (
            <TouchableOpacity style={styles.buttonSupport} onPress={handleSupportClick}>
              <Text style={styles.buttonText}>APOIE</Text>
            </TouchableOpacity>
          )}
          {hasSupported && (
            <TouchableOpacity style={styles.buttonChat} onPress={() => navigation.navigate("Chat", { eventId: event.id })}>
              <Text style={styles.buttonText}>CHAT</Text>
            </TouchableOpacity>
          )}
        </>
      ) : (
        <Text style={styles.alertText}>
          Você precisa estar logado para apoiar este evento!
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginTop: 50,
  },
  buttonSupport: {
    backgroundColor: "#c5eb4a",
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 25,
    marginRight: 10,
  },
  buttonChat: {
    backgroundColor: "#b2b2b2",
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 25,
  },
  buttonText: {
    color: "#000",
    textTransform: "uppercase",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
  alertText: {
    color: "red",
    textAlign: "center",
  },
});

export default SupportButton;