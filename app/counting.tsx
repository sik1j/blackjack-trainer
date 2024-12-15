import { BlackjackCard } from "@/util/blackjack";
import { Image } from "expo-image";
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Pressable, Button } from "react-native";

export default function counting() {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
      alignItems: "center",
      justifyContent: "center",
    },
    imgContainer: {
      aspectRatio: 352 / 512,
      width: "50%",
      maxWidth: 300,
      userSelect: "none",
    },
    image: {
      flex: 1,
      width: "100%",
      userSelect: "none",
    },
    timer: {
      userSelect: "none",
    },
    title: {
      fontSize: 24,
      fontWeight: "bold",
      marginBottom: 20,
    },
  });

  const intialCard = BlackjackCard.getCard();
  const [gameState, setGameState] = useState({
    img: intialCard.img,
    count: intialCard.countValue as number,
  });

  const initialSeconds = 30;
  const [seconds, setSeconds] = useState(initialSeconds);
  const [isRunning, setIsRunning] = useState(true);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isRunning) {
      timer = setInterval(() => {
        setSeconds((prevSeconds) => Math.max(prevSeconds - 1, 0));
      }, 1000);
    }
    return () => clearInterval(timer); // Cleanup on unmount or when isRunning changes
  }, [isRunning]);

  useEffect(() => {
    if (seconds === 0) {
      setIsRunning(false);
    }
  }, [seconds]);

  return isRunning ? (
    <Pressable
      style={styles.container}
      onPress={() => {
        let card = BlackjackCard.getCard();
        while (card.img == gameState.img) card = BlackjackCard.getCard();

        setGameState((prevState) => ({
          count: prevState.count + card.countValue,
          img: card.img,
        }));
      }}
    >
      <View style={styles.imgContainer}>
        <Image style={styles.image} source={gameState.img} contentFit="cover" />
      </View>
      <Text style={styles.timer}>{seconds}</Text>
    </Pressable>
  ) : (
    <View style={styles.container}>
      <Text style={styles.title}>True Count: {gameState.count}</Text>
      <Button
        title="Repeat"
        onPress={() => {
          const intialCard = BlackjackCard.getCard();
          setGameState({
            count: intialCard.countValue,
            img: intialCard.img,
          });
          setIsRunning(true);
          setSeconds(initialSeconds);
        }}
      />
    </View>
  );
}
