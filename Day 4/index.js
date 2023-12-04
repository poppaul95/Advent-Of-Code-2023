/*
--- Day 4: Scratchcards ---
https://adventofcode.com/2023/day/4
*/

const input = `Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11`

// const readFileSync = require('fs').readFileSync;
// const input = readFileSync('./input.txt', 'utf8');

// Part One
const dataOne = input.split('\n').map(line => line.split(': ')[1].split(' | ')).reduce((acc, val) => {
  return [...acc, {
	win: val[0].trim().split((/\s+/)).map(Number),
	numbers: val[1].trim().split((/\s+/)).map(Number)
  }]
}, [])

const points = dataOne.reduce((acc, val) => {
	let points = 0
	val.numbers.forEach(number => {
		if (val.win.includes(number)) {
			if(points === 0) points ++
			else points *= 2
		}
	})

	return acc + points
}, 0)

console.log("Part One(points):", points)
// Part 2

const dataTwo = input.split('\n').reduce((acc, val) => {
	const number = parseInt(val.split(': ')[0].trim().split((/\s+/))[1].trim())
	const values = val.split(': ')[1].split(' | ')
	return [...acc, {
		number,
		win: values[0].trim().split((/\s+/)).map(Number),
		numbers: values[1].trim().split((/\s+/)).map(Number),
		wins: 1
	}]
}, [])

const cardWins = dataTwo.reduce((acc, val) => {
	let points = parseInt(val.number) + 1
	cardsWon = []
	val.numbers.forEach(number => {
		if (val.win.includes(number)) {
			cardsWon.push(points)
			points++
		}
	})
	return [...acc, {
		number: val.number,
		cards: cardsWon
	}]
}, [])

dataTwo.map((card, index) => {
	const wins = cardWins.find(card => card.number === index + 1).cards
	wins.map(cardNumber => {
		dataTwo.find(card => card.number === cardNumber).wins = dataTwo.find(card => card.number === cardNumber).wins + card.wins
	})
})


const total = dataTwo.reduce((acc, val) => {
	return acc + val.wins
}, 0)

console.log("Part Two(cards won):",total)