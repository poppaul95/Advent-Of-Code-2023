// const input = `Time:      7  15   30
// Distance:  9  40  200`;

const readFileSync = require('fs').readFileSync;
const input = readFileSync('./input.txt', 'utf8');

const lines = input.split('\n');
const times = lines[0].split(':')[1].trim().split(/\s+/).map(Number);
const time = parseInt(lines[0].split(':')[1].replace(/\s+/g, ''));
const distance = parseInt(lines[1].split(':')[1].replace(/\s+/g, ''))
const distances = lines[1].split(':')[1].trim().split(/\s+/).map(Number);

console.log(times);
console.log(distances);

const acceleration = 1;

const totalWins = []

for(i in times) {
	let remainingTime = times[i]
	let currentAcceleration = 0;
	let firstWin = 0;
	let lastWin = 0;

	while (remainingTime > 0) {
		if(remainingTime * currentAcceleration > distances[i]) {
			firstWin = currentAcceleration;
			lastWin = remainingTime;
		}
		remainingTime--;
		currentAcceleration += acceleration;
	}
	totalWins.push(Math.abs(lastWin - firstWin) + 1);
}
console.log(`Part One, ways to beat the time: ${totalWins.reduce((a, b) => a * b, 1)}`);

let remainingTime = time
let currentAcceleration = 0;
let lastWin = 0;
let firstWin = 0;
while (remainingTime > 0) {
	if(remainingTime * currentAcceleration > distance) {
		firstWin = currentAcceleration;
		lastWin = remainingTime;
		break;
	}
	remainingTime--;
	currentAcceleration += acceleration;
}

console.log(`Part Two, ways to beat the time: ${Math.abs(lastWin - firstWin) + 1}`);
