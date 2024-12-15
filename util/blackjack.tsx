import { randomArrayElem } from "@/util/utils";
import { ImageSource } from "expo-image";

export type Suit = "clubs" | "diamonds" | "hearts" | "spades";
export type Rank = //#region
  2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | "jack" | "queen" | "king" | "ace";
//#endregion
type CountValue = -1 | 0 | 1;
export type GameValue = 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11;

export class BlackjackCard {
  public img: ImageSource;
  public suit: Suit;
  public rank: Rank;
  public countValue: CountValue;
  public gameValue: GameValue;

  private static cardsImages = {
    clubs: {
      2: require("@/assets/images/cards/clubs_02.png"),
      3: require("@/assets/images/cards/clubs_03.png"),
      4: require("@/assets/images/cards/clubs_04.png"),
      5: require("@/assets/images/cards/clubs_05.png"),
      6: require("@/assets/images/cards/clubs_06.png"),
      7: require("@/assets/images/cards/clubs_07.png"),
      8: require("@/assets/images/cards/clubs_08.png"),
      9: require("@/assets/images/cards/clubs_09.png"),
      10: require("@/assets/images/cards/clubs_10.png"),
      jack: require("@/assets/images/cards/clubs_jack.png"),
      queen: require("@/assets/images/cards/clubs_queen.png"),
      king: require("@/assets/images/cards/clubs_king.png"),
      ace: require("@/assets/images/cards/clubs_ace.png"),
    },
    diamonds: {
      2: require("@/assets/images/cards/diamonds_02.png"),
      3: require("@/assets/images/cards/diamonds_03.png"),
      4: require("@/assets/images/cards/diamonds_04.png"),
      5: require("@/assets/images/cards/diamonds_05.png"),
      6: require("@/assets/images/cards/diamonds_06.png"),
      7: require("@/assets/images/cards/diamonds_07.png"),
      8: require("@/assets/images/cards/diamonds_08.png"),
      9: require("@/assets/images/cards/diamonds_09.png"),
      10: require("@/assets/images/cards/diamonds_10.png"),
      jack: require("@/assets/images/cards/diamonds_jack.png"),
      queen: require("@/assets/images/cards/diamonds_queen.png"),
      king: require("@/assets/images/cards/diamonds_king.png"),
      ace: require("@/assets/images/cards/diamonds_ace.png"),
    },
    hearts: {
      2: require("@/assets/images/cards/hearts_02.png"),
      3: require("@/assets/images/cards/hearts_03.png"),
      4: require("@/assets/images/cards/hearts_04.png"),
      5: require("@/assets/images/cards/hearts_05.png"),
      6: require("@/assets/images/cards/hearts_06.png"),
      7: require("@/assets/images/cards/hearts_07.png"),
      8: require("@/assets/images/cards/hearts_08.png"),
      9: require("@/assets/images/cards/hearts_09.png"),
      10: require("@/assets/images/cards/hearts_10.png"),
      jack: require("@/assets/images/cards/hearts_jack.png"),
      queen: require("@/assets/images/cards/hearts_queen.png"),
      king: require("@/assets/images/cards/hearts_king.png"),
      ace: require("@/assets/images/cards/hearts_ace.png"),
    },
    spades: {
      2: require("@/assets/images/cards/spades_02.png"),
      3: require("@/assets/images/cards/spades_03.png"),
      4: require("@/assets/images/cards/spades_04.png"),
      5: require("@/assets/images/cards/spades_05.png"),
      6: require("@/assets/images/cards/spades_06.png"),
      7: require("@/assets/images/cards/spades_07.png"),
      8: require("@/assets/images/cards/spades_08.png"),
      9: require("@/assets/images/cards/spades_09.png"),
      10: require("@/assets/images/cards/spades_10.png"),
      jack: require("@/assets/images/cards/spades_jack.png"),
      queen: require("@/assets/images/cards/spades_queen.png"),
      king: require("@/assets/images/cards/spades_king.png"),
      ace: require("@/assets/images/cards/spades_ace.png"),
    },
  } as const;

  constructor(
    img: ImageSource,
    suit: Suit,
    rank: Rank,
    countValue: CountValue,
    gameValue: GameValue
  ) {
    this.img = img;
    this.suit = suit;
    this.rank = rank;
    this.countValue = countValue;
    this.gameValue = gameValue;
  }

  private static rankToGameValues(rank: Rank): {
    countValue: CountValue;
    gameValue: GameValue;
  } {
    const countValue =
      typeof rank === "string" || rank === 10 ? -1 : rank <= 6 ? 1 : 0;
    const gameValue =
      typeof rank === "number" ? rank : rank === "ace" ? 11 : 10;

    return { countValue, gameValue };
  }

  public static getCard({
    rank: r,
    suit: s,
    gameValue: gv,
  }: { rank?: Rank; suit?: Suit; gameValue?: GameValue } = {}): BlackjackCard {
    const suit: Suit = s
      ? s
      : randomArrayElem(["clubs", "diamonds", "hearts", "spades"]);
    let rank: Rank;
    if (r) {
      rank = r;
    } else if (gv) {
      if (gv === 10) {
        rank = randomArrayElem([10, "jack", "queen", "king"]);
      } else if (gv === 11) {
        rank = "ace";
      } else {
        rank = gv;
      }
    } else {
      rank = randomArrayElem([
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        "jack",
        "queen",
        "king",
        "ace",
      ]);
    }

    const { countValue, gameValue } = this.rankToGameValues(rank);

    return new BlackjackCard(
      this.cardsImages[suit][rank],
      suit,
      rank,
      countValue,
      gameValue
    );
  }
}
