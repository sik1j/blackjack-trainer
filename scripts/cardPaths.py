suits = ["clubs", "diamonds", "hearts", "spades"]
faces = [
"02",
"03",
"04",
"05",
"06",
"07",
"08",
"09",
"10",
"jack",
"queen",
"king",
"ace",
]

for suit in suits:
    for face in faces:
        cardName = f"{suit}_{face}"
        print(f"{cardName} : require('@/assets/images/cards/{cardName}'),")