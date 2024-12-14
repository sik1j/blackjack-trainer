import React from "react";
import { View, Text, Image, StyleSheet, Pressable } from "react-native";

type Props = {
  setPlayerChoice: (value: string) => void;
  playerActions: readonly string[];
  dealerCard: any;
  playerCards: any[];
  count: number;
};

const GameBoard = ({
  setPlayerChoice,
  playerActions,
  dealerCard,
  playerCards,
  count,
}: Props) => {
  return (
    <View style={styles.container}>
      {/* Dealer's Cards */}
      <View style={styles.dealerContainer}>
        <Text style={styles.sectionTitle}>Dealer's Cards</Text>
        <View style={styles.cardsContainer}>
          <Image
            source={dealerCard} // Update path to match your assets
            style={styles.cardImage}
          />
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
        {playerActions.map((name) => {
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
    paddingHorizontal: 10,
    paddingVertical: 20,
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
