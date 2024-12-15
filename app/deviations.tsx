import GameBoard from "@/components/GameBoard";
import { BlackjackCard, GameValue, Rank } from "@/util/blackjack";
import { randomArrayElem, randomInt } from "@/util/utils";
import { ImageSource } from "expo-image";
import { useState } from "react";
import { View, Text, StyleSheet } from "react-native";

enum PlayerAction {
  Stand = "Stand",
  Hit = "Hit",
  DoubleDown = "Double Down",
  Split = "Split",
}

const { Stand, Hit, DoubleDown, Split } = PlayerAction;

const deviations: {
  playerValue: number;
  dealerRank: Rank;
  count: number;
  correctAction: PlayerAction;
}[] = [
  {
    playerValue: 16,
    dealerRank: 9,
    count: 5,
    correctAction: Stand,
  },
  {
    playerValue: 16,
    dealerRank: 10,
    count: 0,
    correctAction: Stand,
  },
  {
    playerValue: 15,
    dealerRank: 10,
    count: 4,
    correctAction: Stand,
  },
  {
    playerValue: 13,
    dealerRank: 2,
    count: -1,
    correctAction: Stand,
  },
  {
    playerValue: 13,
    dealerRank: 2,
    count: 0,
    correctAction: Hit,
  },
  {
    playerValue: 13,
    dealerRank: 3,
    count: -2,
    correctAction: Stand,
  },
  {
    playerValue: 13,
    dealerRank: 3,
    count: -1,
    correctAction: Hit,
  },
  {
    playerValue: 12,
    dealerRank: 2,
    count: 4,
    correctAction: Stand,
  },
  {
    playerValue: 12,
    dealerRank: 3,
    count: 2,
    correctAction: Stand,
  },
  {
    playerValue: 12,
    dealerRank: 4,
    count: 0,
    correctAction: Stand,
  },
  {
    playerValue: 12,
    dealerRank: 5,
    count: -1,
    correctAction: Stand,
  },
  {
    playerValue: 12,
    dealerRank: 5,
    count: 0,
    correctAction: Hit,
  },
  {
    playerValue: 10,
    dealerRank: 10,
    count: 4,
    correctAction: DoubleDown,
  },
  {
    playerValue: 9,
    dealerRank: 2,
    count: 1,
    correctAction: DoubleDown,
  },
  {
    playerValue: 9,
    dealerRank: 7,
    count: 4,
    correctAction: DoubleDown,
  },
  {
    playerValue: 20,
    dealerRank: 5,
    count: 5,
    correctAction: Split,
  },
  {
    playerValue: 20,
    dealerRank: 6,
    count: 5,
    correctAction: Split,
  },
];

type BoardState = {
  playerCards: { card1: ImageSource; card2?: ImageSource };
  dealerCard: ImageSource;
  count: string;
  correctAction: PlayerAction;
};

function genDevation(): BoardState {
  function playerValueToCards(
    playerValue: number,
    correctAction: PlayerAction
  ): { card1: ImageSource; card2?: ImageSource } {
    if (correctAction === Split) {
      const val = (playerValue / 2) as GameValue;
      const c1 = BlackjackCard.getCard({ gameValue: val });
      const c2 = BlackjackCard.getCard({ gameValue: val });
      return { card1: c1.img, card2: c2.img };
    }

    let vals = [];
    for (let i = 2; i <= 10; i++) {
      for (let j = 0; j <= 10; j++) {
        if (j === 1) continue;
        if (i + j === playerValue) vals.push([i, j]);
      }
    }

    const v = randomArrayElem(vals);
    const c1 = BlackjackCard.getCard({ gameValue: v[0] as GameValue }).img;
    if (v[1] !== 0)
      return {
        card1: c1,
        card2: BlackjackCard.getCard({ gameValue: v[1] as GameValue }).img,
      };
    return { card1: c1 };
  }

  const { correctAction, count, dealerRank, playerValue } =
    randomArrayElem(deviations);

  return {
    count: count.toString(),
    correctAction,
    dealerCard: BlackjackCard.getCard({ rank: dealerRank }).img,
    playerCards: playerValueToCards(playerValue, correctAction),
  };
}

export default function Deviations() {
  const [boardState, setBoardState] = useState(() => ({
    overlay: "",
    ...genDevation(),
  }));

  function handlePress(choice: string) {
    console.log("setting choice");

    if (choice == boardState.correctAction) {
      setBoardState((s) => ({ ...s, overlay: "✅" }));
      setTimeout(() => {
        setBoardState({
          overlay: "",
          ...genDevation(),
        });
      }, 250);
    } else {
      setBoardState((s) => ({ ...s, overlay: "❌" }));
      setTimeout(() => {
        setBoardState((s) => ({ ...s, overlay: "" }));
      }, 250);
    }
  }

  return (
    <View style={styles.container}>
      <GameBoard
        setPlayerChoice={handlePress}
        playerActions={[Hit, Stand, DoubleDown, Split]}
        dealerCard={boardState.dealerCard}
        playerCards={boardState.playerCards}
        count={boardState.count}
      />

      <View style={styles.overlay}>
        <Text style={{ fontSize: 50 }}>{boardState.overlay}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
    height: "100%",
  },
  overlay: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateX: "-50%" }, { translateY: "-50%" }],
  },
});
