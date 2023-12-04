/*
--- Day 3: Gear Ratios ---
https://adventofcode.com/2023/day/3
*/

const input = `467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..`

// const readFileSync = require('fs').readFileSync;
// const input = readFileSync('./input.txt', 'utf8');

const directions = [
	[-1, -1], [-1, 0], [-1, 1],
	[0, -1], [0, 1],
	[1, -1], [1, 0], [1, 1]
];

const data = input
	.split('\n')
	.map(row => row.split(''))

const symbols = data.map(row => row.map(cell => cell === '.' ? 0 : cell)).flat().filter(cell => isNaN(cell))

let sum = 0;
let sum2 = 0;

// Part One
for (let i = 0; i < data.length; i++) {
	for (let j = 0; j < data[i].length; j++) {
		let number = ''
		let startPointer = j
		let endPointer = j
		if(isNaN(data[i][j])) {
			continue
		}
		while (!isNaN(data[i][j])) {
			number += data[i][j]
			endPointer = j
			j++
		}
		for (let k = startPointer; k <= endPointer; k++) {
			data[i][k] = parseInt(number)
		}
	}
}


// Part Two
for (let i = 0; i < data.length; i++) {
	for (let j = 0; j < data[i].length; j++) {
		let flag = false
		const numberIndex = j
		while (!isNaN(data[i][j])) {
			for(const [dx, dy] of directions) {
				if (i+dx < 0 || j+dy < 0 || i+dx >= data.length || j+dy >= data[i].length) {
					continue
				}
				if(data[i+dx][j+dy] && symbols.includes(data[i+dx][j+dy])) {
					flag = true
				}
			}
			j++
		}

		if(flag) {
			sum += data[i][numberIndex]
		}
	}
}

for (let i = 0; i < data.length; i++) {
	for (let j = 0; j < data[i].length; j++) {
		let numberArray = []
		if (data[i][j] === '*') {
			for(const [dx, dy] of directions) {
				if (i+dx < 0 || j+dy < 0 || i+dx >= data.length || j+dy >= data[i].length) {
					continue
				}
				if(data[i+dx][j+dy] && !isNaN(data[i+dx][j+dy])) {
					numberArray.push(data[i+dx][j+dy])
				}
			}
			j++
		}
		if(numberArray.length) {
			numberArray = [...new Set(numberArray)]
		}
		if(numberArray.length === 2) {
			sum2 += numberArray[0] * numberArray[1]
		}
	}
}

console.log('Part One:', sum)
console.log('Part Two:', sum2)