import { randomCard } from "@/util/utils";
import React, { useState } from "react";
import { View, Text, Image, StyleSheet, Pressable } from "react-native";

type Props = {
  setPlayerChoice: (value: string) => void;
};

const GameBoard = ({ setPlayerChoice }: Props) => {
  const [dealerCards, setDealerCards] = useState([randomCard().img]); // Dealer's cards
  const [playerCards, setPlayerCards] = useState([randomCard().img]); // Player's cards
  const [count, setCount] = useState(0); // Card counting value

  // Function to simulate dealing a card
  const dealCard = () => {
    // Mock card and value logic (replace with real logic)
    const randCard = randomCard();
    setPlayerCards([...playerCards, randCard.img]);
    setCount(count + randCard.value);
  };

  return (
    <View style={styles.container}>
      {/* Dealer's Cards */}
      <View style={styles.dealerContainer}>
        <Text style={styles.sectionTitle}>Dealer's Cards</Text>
        <View style={styles.cardsContainer}>
          {dealerCards.map((card, index) => (
            <Image
              key={index}
              source={card} // Update path to match your assets
              style={styles.cardImage}
            />
          ))}
        </View>
      </View>

      {/* Player's Cards and Count */}
      <View style={styles.playerContainer}>
        <Text style={styles.sectionTitle}>Card Count: {count}</Text>
        <Text style={styles.sectionTitle}>Player's Cards</Text>
        <View style={styles.cardsContainer}>
          {playerCards.map((card, index) => (
            <Image
              key={index}
              source={card} // Update path to match your assets
              style={styles.cardImage}
            />
          ))}
        </View>
      </View>

      {/* Player Actions */}
      <View style={styles.actionsContainer}>
        {["Hit", "Stand", "Double", "Split", "Insurace"].map((name) => {
          return (
            <Pressable
              key={name}
              style={styles.button}
              onPress={() => setPlayerChoice(name)}
            >
              <Text style={styles.buttonText}>{name}</Text>
            </Pressable>
          );
        })}
        {/* <Pressable style={styles.button} onPress={dealCard}>
          <Text style={styles.buttonText}>Hit</Text>
        </Pressable>
        <Pressable style={styles.button}>
          <Text style={styles.buttonText}>Stand</Text>
        </Pressable>
        <Pressable style={styles.button}>
          <Text style={styles.buttonText}>Double</Text>
        </Pressable>
        <Pressable style={styles.button}>
          <Text style={styles.buttonText}>Split</Text>
        </Pressable>
        <Pressable style={styles.button}>
          <Text style={styles.buttonText}>Insurace</Text>
        </Pressable> */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#228B22",
  },
  dealerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#fff",
    padding: 10,
  },
  playerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#fff",
    padding: 10,
  },
  actionsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 10,
  },
  cardsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  cardImage: {
    width: 50,
    height: 75,
    margin: 5,
  },
  button: {
    backgroundColor: "#1E90FF",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    userSelect: "none",
  },
});

export default GameBoard;
