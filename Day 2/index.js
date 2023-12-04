/*
--- Day 2: Cube Conundrum ---
https://adventofcode.com/2023/day/2
*/

const input = `Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green`

// const readFileSync = require('fs').readFileSync;
// const input = readFileSync('./input.txt', 'utf8');

const games = input.split('\n').map(game => {
	  const [name, rounds] = game.split(':')
	  const sets  = rounds.split(';')
	  const cubes = sets.map(set => {
			const colorSets = set.split(',')
			const colors = colorSets.map(colorSet => {
				const [count, color] = colorSet.trim().split(' ')
				return {
					color: color,
					count: parseInt(count)
				}
			})
			return colors
	  })
  return {
	name: name.trim().split(' ')[1],
	cubes: cubes
  }
})
// Part One
const sumIDs = games.reduce((acc, game) => {
	const enoughCubes = game.cubes.every(set => {
		return set.every(color => {
			if(color.color === 'red') {
				return color.count <= 12
			}
			if(color.color === 'green') {
				return color.count <= 13
			}
			if(color.color === 'blue') {
				return color.count <= 14
			}
		})
	})
	if (enoughCubes) {
		acc += parseInt(game.name)
	}
	return acc
}, 0)

// Part Two
const cubePower = games.reduce((acc, game) => {
	const redMax = Math.max(...game.cubes.map(set => {
		return set.filter(color => color.color === 'red')
	}).map(set => {
		return set.reduce((acc, color) => {
			return color.count
		}, 0)
	}))
	const greenMax = Math.max(...game.cubes.map(set => {
		return set.filter(color => color.color === 'green')
	}).map(set => {
		return set.reduce((acc, color) => {
			return color.count
		}, 0)
	}))
	const blueMax = Math.max(...game.cubes.map(set => {
		return set.filter(color => color.color === 'blue')
	}).map(set => {
		return set.reduce((acc, color) => {
			return color.count
		}, 0)
	}))
	return acc + (redMax * greenMax * blueMax)
}, 0)

console.log('Part One(sum fo Ids): ', sumIDs)
console.log('Part Two(cube power): ', cubePower)