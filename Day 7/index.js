const input = `32T3K 765
T55J5 684
KK677 28
KTJJT 220
QQQJA 483`;

// const readFileSync = require('fs').readFileSync;
// const input = readFileSync('./input.txt', 'utf8');

let lines = input.split("\n");
const data = lines.map((line) => {
  const [hand, bid] = line.split(" ");
  return {
    hand,
    bid: parseInt(bid),
  };
});

const cards = {
  A: 13,
  K: 12,
  Q: 11,
  J: 10,
  T: 9,
  9: 8,
  8: 7,
  7: 6,
  6: 5,
  5: 4,
  4: 3,
  3: 2,
  2: 1,
};

const countCharactes = (string) => {
  const counts = new Map();
  for (let i = 0; i < string.length; i++) {
    const char = string[i];
    if (counts.has(char)) {
      counts.set(char, counts.get(char) + 1);
    } else {
      counts.set(char, 1);
    }
  }
  return counts;
};

const highCard = (a, b, strengths) => {
  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) {
      return strengths[a[i]] - strengths[b[i]];
    }
  }
  return 0;
};

const totalWins = (data) => {
  const score = (cardCounts) =>
    Number(
      [...cardCounts.values()]
        .sort((a, b) => b - a)
        .join("")
        .padEnd(5, "0")
    );
  const scores = data.reduce(
    (acc, line) => acc.set(line.hand, score(countCharactes(line.hand))),
    new Map()
  );
  const sorted = [...data].sort((a, b) => {
    const aScore = scores.get(a.hand);
    const bScore = scores.get(b.hand);
    if (aScore < bScore) {
      return -1;
    } else if (aScore > bScore) {
      return 1;
    }
    return highCard(a.hand, b.hand, cards);
  });
  const sum = sorted
    .map((hand, i) => hand.bid * (i + 1))
    .reduce((a, b) => a + b, 0);
  console.log(sum);
};

const countCards = (cards) => {
    const counts = countCharactes(cards);
    // no need to modify if no jokers in hand or hand of all jokers.
    if (counts.has("J") && counts.size !== 1) {
      let maxCount = 0;
      let maxFace;
      for (const [face, count] of counts.entries()) {
        if (face !== "J" && count > maxCount) {
          maxCount = count;
          maxFace = face;
        }
      }
      // use the joker cards to increase the count of the card with highest count.
      counts.set(maxFace, counts.get(maxFace) + counts.get("J"));
      counts.delete("J");
    }
    return counts;
  };

totalWins(data);

const totalWinsTwo = (data) => {
	const score = (cardCounts) =>
	  Number(
		[...cardCounts.values()]
		  .sort((a, b) => b - a)
		  .join("")
		  .padEnd(5, "0")
	  );
	const scores = data.reduce(
	  (acc, line) => acc.set(line.hand, score(countCards(line.hand))),
	  new Map()
	);
	const sorted = [...data].sort((a, b) => {
	  const aScore = scores.get(a.hand);
	  const bScore = scores.get(b.hand);
	  if (aScore < bScore) {
		return -1;
	  } else if (aScore > bScore) {
		return 1;
	  }
	  return highCard(a.hand, b.hand, {...cards, J: 0});
	});
	const sum = sorted
	  .map((hand, i) => hand.bid * (i + 1))
	  .reduce((a, b) => a + b, 0);
	console.log(sum);
  };

  console.log("Part 2");
  totalWinsTwo(data);
