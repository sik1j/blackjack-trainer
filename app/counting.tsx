import { Image } from "expo-image";
import { router } from "expo-router";
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

  const intialCard = randomCard();
  const [gameState, setGameState] = useState({
    img: intialCard.img,
    count: intialCard.value,
  });

  const initialSeconds = 10;
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
        const card = randomCard(gameState.img);
        setGameState((prevState) => ({
          count: prevState.count + card.value,
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
      <Text style={styles.title}>Count: {gameState.count}</Text>
      <Button
        title="Repeat"
        onPress={() => {
          const intialCard = randomCard();
          setGameState({
            count: intialCard.value,
            img: intialCard.img,
          });
          setIsRunning(true);
          setSeconds(initialSeconds);
        }}
      />
    </View>
  );
}

function randomArrayElem<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomCard(currentCard?: any) {
  const cardImages = {
    clubs_02: require("@/assets/images/cards/clubs_02.png"),
    clubs_03: require("@/assets/images/cards/clubs_03.png"),
    clubs_04: require("@/assets/images/cards/clubs_04.png"),
    clubs_05: require("@/assets/images/cards/clubs_05.png"),
    clubs_06: require("@/assets/images/cards/clubs_06.png"),
    clubs_07: require("@/assets/images/cards/clubs_07.png"),
    clubs_08: require("@/assets/images/cards/clubs_08.png"),
    clubs_09: require("@/assets/images/cards/clubs_09.png"),
    clubs_10: require("@/assets/images/cards/clubs_10.png"),
    clubs_jack: require("@/assets/images/cards/clubs_jack.png"),
    clubs_queen: require("@/assets/images/cards/clubs_queen.png"),
    clubs_king: require("@/assets/images/cards/clubs_king.png"),
    clubs_ace: require("@/assets/images/cards/clubs_ace.png"),
    diamonds_02: require("@/assets/images/cards/diamonds_02.png"),
    diamonds_03: require("@/assets/images/cards/diamonds_03.png"),
    diamonds_04: require("@/assets/images/cards/diamonds_04.png"),
    diamonds_05: require("@/assets/images/cards/diamonds_05.png"),
    diamonds_06: require("@/assets/images/cards/diamonds_06.png"),
    diamonds_07: require("@/assets/images/cards/diamonds_07.png"),
    diamonds_08: require("@/assets/images/cards/diamonds_08.png"),
    diamonds_09: require("@/assets/images/cards/diamonds_09.png"),
    diamonds_10: require("@/assets/images/cards/diamonds_10.png"),
    diamonds_jack: require("@/assets/images/cards/diamonds_jack.png"),
    diamonds_queen: require("@/assets/images/cards/diamonds_queen.png"),
    diamonds_king: require("@/assets/images/cards/diamonds_king.png"),
    diamonds_ace: require("@/assets/images/cards/diamonds_ace.png"),
    hearts_02: require("@/assets/images/cards/hearts_02.png"),
    hearts_03: require("@/assets/images/cards/hearts_03.png"),
    hearts_04: require("@/assets/images/cards/hearts_04.png"),
    hearts_05: require("@/assets/images/cards/hearts_05.png"),
    hearts_06: require("@/assets/images/cards/hearts_06.png"),
    hearts_07: require("@/assets/images/cards/hearts_07.png"),
    hearts_08: require("@/assets/images/cards/hearts_08.png"),
    hearts_09: require("@/assets/images/cards/hearts_09.png"),
    hearts_10: require("@/assets/images/cards/hearts_10.png"),
    hearts_jack: require("@/assets/images/cards/hearts_jack.png"),
    hearts_queen: require("@/assets/images/cards/hearts_queen.png"),
    hearts_king: require("@/assets/images/cards/hearts_king.png"),
    hearts_ace: require("@/assets/images/cards/hearts_ace.png"),
    spades_02: require("@/assets/images/cards/spades_02.png"),
    spades_03: require("@/assets/images/cards/spades_03.png"),
    spades_04: require("@/assets/images/cards/spades_04.png"),
    spades_05: require("@/assets/images/cards/spades_05.png"),
    spades_06: require("@/assets/images/cards/spades_06.png"),
    spades_07: require("@/assets/images/cards/spades_07.png"),
    spades_08: require("@/assets/images/cards/spades_08.png"),
    spades_09: require("@/assets/images/cards/spades_09.png"),
    spades_10: require("@/assets/images/cards/spades_10.png"),
    spades_jack: require("@/assets/images/cards/spades_jack.png"),
    spades_queen: require("@/assets/images/cards/spades_queen.png"),
    spades_king: require("@/assets/images/cards/spades_king.png"),
    spades_ace: require("@/assets/images/cards/spades_ace.png"),
  } as const;

  const key = randomArrayElem(Object.keys(cardImages));
  const img = cardImages[key as keyof typeof cardImages];
  const cardFace = key.split("_")[1].split(".")[0];

  let value;
  if (["10", "jack", "queen", "king", "ace"].includes(cardFace)) {
    value = -1;
  } else if (["07", "08", "09"].includes(cardFace)) {
    value = 0;
  } else {
    value = 1;
  }

  // avoid returning the same card as is currently displayed
  if (img == currentCard) {
    return randomCard(currentCard);
  }

  return { img, value };
}
