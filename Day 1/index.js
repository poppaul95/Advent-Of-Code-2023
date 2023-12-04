/*
--- Day 1: Trebuchet?! ---
https://adventofcode.com/2023/day/1
*/

const inputP1 = `1abc2
pqr3stu8vwx
a1b2c3d4e5f
treb7uchet`

const inputP2 = `two1nine
eightwothree
abcone2threexyz
xtwone3four
4nineeightseven2
zoneight234
7pqrstsixteen`

// const readFileSync = require('fs').readFileSync;
// const input = readFileSync('./input.txt', 'utf8');

// Part One
const sum = inputP1.split('\n')
.map(b => {
	const matches = b.length >= 1 
		? Array.from(b.matchAll(/[0-9]/ig), match => match[0])
		: ['0']
	const firstMatch = matches[0]
	const lastMatch = matches[matches.length-1]
	const num = `${firstMatch}${lastMatch}`
	return parseInt(num);
})
.reduce((sum, val) => sum + val)
console.log('PartOne:',sum);

// Part Two

const sum2 = inputP2.split('\n')
.map(b => {
	const matches = b.length >= 1 
		? Array.from(b.matchAll(/(?=([0-9]|one|two|three|four|five|six|seven|eight|nine))/g), match => match[1])
		: ['0']
	const numbers = {
		one: 1,
		two: 2,
		three: 3,
		four: 4,
		five: 5,
		six: 6,
		seven: 7,
		eight: 8,
		nine: 9
	};
	const firstMatch = isNaN(parseInt(matches[0])) 
		? numbers[matches[0]] 
		: matches[0]
	const lastMatch = isNaN(parseInt(matches[matches.length-1])) 
		? numbers[matches[matches.length-1]] 
		: matches[matches.length-1]
	const num = `${firstMatch}${lastMatch}`
	return parseInt(num);
})
.reduce((sum, val) => sum + val)

console.log("Part Two:", sum2);