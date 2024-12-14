export function randomInt(min: number, max: number) {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled); // The maximum is inclusive and the minimum is inclusive
}

export function randomArrayElem<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export enum CardNumber {
  One,
  Two,
  Three,
  Four,
  Five,
  Six,
  Seven,
  Eight,
  Nine,
  Ten,
  Jack,
  Queen,
  King,
  Ace,
}

export function cardNumberToEnum(cardNum: string) {
  try {
    let n = Number(cardNum);
    switch (n) {
      case 1:
        return CardNumber.One;
      case 2:
        return CardNumber.Two;
      case 3:
        return CardNumber.Three;
      case 4:
        return CardNumber.Four;
      case 5:
        return CardNumber.Five;
      case 6:
        return CardNumber.Six;
      case 7:
        return CardNumber.Seven;
      case 8:
        return CardNumber.Eight;
      case 9:
        return CardNumber.Nine;
      case 10:
        return CardNumber.Ten;
      default:
        throw cardNum + "is not a valid card number";
    }
  } catch (e) {
    switch (cardNum.toLowerCase()) {
      case "jack":
        return CardNumber.Jack;
      case "queen":
        return CardNumber.Queen;
      case "king":
        return CardNumber.King;
      case "ace":
        return CardNumber.Ace;
    }
  }
}

export enum Suit {
  Hearts,
  Spades,
  Clubs,
  Diamonds,
}

export function suitToEnum(suit: string) {
  switch (suit.toLowerCase()) {
    case "clubs":
      return Suit.Clubs;
    case "hearts":
      return Suit.Clubs;
    case "diamonds":
      return Suit.Clubs;
    case "spades":
      return Suit.Clubs;
    default:
      throw "cannot recognize" + suit;
  }
}

export function randomCardOfType({
  number,
  suit,
}: {
  number?: CardNumber;
  suit?: Suit;
}) {
  const card = randomCard();

  if (number && suit && card.number == number && card.suit == suit) {
    return card;
  }

  if (number && card.number == number) {
    return card;
  }

  if (suit && card.suit == suit) {
    return card;
  }

  if (!number && !suit) {
    return card;
  }

  return randomCardOfType({ number, suit });
}

export function randomCard() {
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
  const cardSuit = suitToEnum(key.split("_")[0]);
  const cardNumber = cardNumberToEnum(key.split("_")[1])!;

  const {
    One,
    Two,
    Three,
    Four,
    Five,
    Six,
    Seven,
    Eight,
    Nine,
    Ten,
    Jack,
    Queen,
    King,
    Ace,
  } = CardNumber;

  let value;
  if ([Ten, Jack, Queen, King, Ace].includes(cardNumber!)) {
    value = -1;
  } else if ([Seven, Eight, Nine].includes(cardNumber!)) {
    value = 0;
  } else {
    value = 1;
  }

  return { img, value, number: cardNumber, suit: cardSuit };
}
