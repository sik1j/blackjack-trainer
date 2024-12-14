import GameBoard from "@/components/GameBoard";
import {
  CardNumber,
  cardNumberToEnum,
  randomArrayElem,
  randomCard,
  randomCardOfType,
  randomInt,
} from "@/util/utils";
import { useState } from "react";
import { View, Text, StyleSheet } from "react-native";

enum PlayerActions {
  Stand = "Stand",
  Hit = "Hit",
  Double = "Double",
  Split = "Split",
  //   Insurance = "Insurance",
}
const { Double, Hit, Split, Stand } = PlayerActions;

enum DeviationAction {
  InsuranceAtOrHigher,
  StandAtOrHigher,
  StandAtOrHigherElseHit,
  DoubleDown,
  SplitAtOrHigher,
}
const {
  InsuranceAtOrHigher,
  StandAtOrHigher,
  StandAtOrHigherElseHit,
  DoubleDown: DoubleDownAtOrHigher,
  SplitAtOrHigher,
} = DeviationAction;

function genDeviation() {
  const deviation = randomArrayElem([
    {
      playerValue: 16,
      dealerCard: CardNumber.Nine,
      count: 5,
      action: StandAtOrHigher,
    },
    {
      playerValue: 16,
      dealerCard: CardNumber.Ten,
      count: 0,
      action: StandAtOrHigher,
    },
    {
      playerValue: 15,
      dealerCard: CardNumber.Ten,
      count: 4,
      action: StandAtOrHigher,
    },
    {
      playerValue: 13,
      dealerCard: CardNumber.Two,
      count: -1,
      action: StandAtOrHigherElseHit,
    },
    {
      playerValue: 13,
      dealerCard: CardNumber.Three,
      count: -2,
      action: StandAtOrHigherElseHit,
    },
    {
      playerValue: 12,
      dealerCard: CardNumber.Two,
      count: 4,
      action: StandAtOrHigher,
    },
    {
      playerValue: 12,
      dealerCard: CardNumber.Three,
      count: 2,
      action: StandAtOrHigher,
    },
    {
      playerValue: 12,
      dealerCard: CardNumber.Four,
      count: 0,
      action: StandAtOrHigher,
    },
    {
      playerValue: 12,
      dealerCard: CardNumber.Five,
      count: -1,
      action: StandAtOrHigherElseHit,
    },
    {
      playerValue: 10,
      dealerCard: CardNumber.Ten,
      count: 4,
      action: DoubleDownAtOrHigher,
    },
    {
      playerValue: 9,
      dealerCard: CardNumber.Two,
      count: 1,
      action: DoubleDownAtOrHigher,
    },
    {
      playerValue: 9,
      dealerCard: CardNumber.Seven,
      count: 4,
      action: DoubleDownAtOrHigher,
    },
    {
      playerValue: 10,
      dealerCard: CardNumber.Five,
      count: 5,
      action: SplitAtOrHigher,
    },
    {
      playerValue: 10,
      dealerCard: CardNumber.Six,
      count: 5,
      action: SplitAtOrHigher,
    },
  ]);

  console.log("dev", deviation);

  const card1Val = randomInt(
    Math.max(1, deviation.playerValue - 10),
    Math.min(deviation.playerValue, 9)
  );
  let playerCards = [
    randomCardOfType({
      number: cardNumberToEnum(card1Val.toString()),
    }).img,
  ];

  if (card1Val != deviation.playerValue) {
    playerCards.push(
      randomCardOfType({
        number: cardNumberToEnum((deviation.playerValue - card1Val).toString()),
      }).img
    );

    console.log(card1Val, deviation.playerValue - card1Val);
  }

  let correctAction = Stand;
  let count = randomInt(deviation.count, deviation.count + 5);
  switch (deviation.action) {
    case StandAtOrHigher:
      break;
    case StandAtOrHigherElseHit:
      count = randomInt(deviation.count - 5, deviation.count + 5);
      correctAction = count >= deviation.count ? Stand : Hit;
      break;
    case DoubleDownAtOrHigher:
      correctAction = Double;
      break;
    case SplitAtOrHigher:
      let v = cardNumberToEnum(deviation.playerValue.toString());
      playerCards = [
        randomCardOfType({ number: v }).img,
        randomCardOfType({ number: v }).img,
      ];
      correctAction = Split;
      break;
  }

  return {
    dealerCard: randomCardOfType({ number: deviation.dealerCard }).img,
    count,
    playerCards,
    correctAction,
  };
}

export default function Deviations() {
  const [boardState, setBoardState] = useState(() => ({
    overlay: "",
    ...genDeviation(),
  }));
  const [playerChoice, setPlayerChoice] = useState("");

  function handlePress(choice: string) {
    console.log("setting choice");

    if (choice == boardState.correctAction) {
      setBoardState((s) => ({ ...s, overlay: "✅" }));
      setTimeout(() => {
        setBoardState({ overlay: "", ...genDeviation() });
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
        playerActions={[Hit, Stand, Double, Split]}
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
