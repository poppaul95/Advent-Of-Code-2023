// const input = `seeds: 79 14 55 13

// seed-to-soil map:
// 50 98 2
// 52 50 48

// soil-to-fertilizer map:
// 0 15 37
// 37 52 2
// 39 0 15

// fertilizer-to-water map:
// 49 53 8
// 0 11 42
// 42 0 7
// 57 7 4

// water-to-light map:
// 88 18 7
// 18 25 70

// light-to-temperature map:
// 45 77 23
// 81 45 19
// 68 64 13

// temperature-to-humidity map:
// 0 69 1
// 1 0 69

// humidity-to-location map:
// 60 56 37
// 56 93 4`

const readFileSync = require('fs').readFileSync;
const input = readFileSync('./input.txt', 'utf8');

const linesOne = input.split('\n\n')
const seeds = linesOne[0].split(': ')[1].split(' ').map(Number)
linesOne.shift()
const dataOne = linesOne.map(line => {
	  const [key, ...values] = line.split('\n')
  return {
	key: key.replace(/ map:/, ''),
	values: values.map(row => row.split(' ').map(Number))
  }
})

const mappedData = dataOne.reduce((acc, { key, values }) => {
	const mappedValues = values.map(row =>  {
		const mappedRow = {
			start: row[1],
			end: row[0],
			step: row[2],
			diff: row[0] - row[1]
		}
		return mappedRow
	})
	return {...acc, [key]: mappedValues}
}, {})

const findLocation = (seed) => {
	const seedSoilDiff = mappedData['seed-to-soil'].find(({ start, step }) =>  seed >= start && seed <= start + step)?.diff || 0
	const seedSoil = seed + seedSoilDiff
	const soilFertilizerDiff = mappedData['soil-to-fertilizer'].find(({ start, step }) => seedSoil >= start && seedSoil <= start + step)?.diff || 0
	const soilFertilizer = seedSoil + soilFertilizerDiff
	const fertilizerWaterDiff = mappedData['fertilizer-to-water'].find(({ start, step }) => soilFertilizer >= start && soilFertilizer <= start + step)?.diff || 0
	const fertilizerWater = soilFertilizer + fertilizerWaterDiff
	const waterLightDiff = mappedData['water-to-light'].find(({ start, step }) => fertilizerWater >= start && fertilizerWater <= start + step)?.diff || 0
	const waterLight = fertilizerWater + waterLightDiff
	const lightTemperatureDiff = mappedData['light-to-temperature'].find(({ start, step }) => waterLight >= start && waterLight <= start + step)?.diff || 0
	const lightTemperature = waterLight + lightTemperatureDiff
	const temperatureHumidityDiff = mappedData['temperature-to-humidity'].find(({ start, step }) => lightTemperature >= start && lightTemperature <= start + step)?.diff || 0
	const temperatureHumidity = lightTemperature + temperatureHumidityDiff
	const humidityLocationDiff = mappedData['humidity-to-location'].find(({ start, step }) => temperatureHumidity >= start && temperatureHumidity <= start + step)?.diff || 0
	const humidityLocation = temperatureHumidity + humidityLocationDiff
	return humidityLocation
}

// Part One

const seedLocations = seeds.map(findLocation)
const part1Min = Math.min(...seedLocations)
console.log(`Part 1 min distance: ${part1Min}`);

// Part Two

const linesTwo = input.split('\n');

let dataTwo = {
  converters: [],
  seeds: [],
};

let currentConverter = null;
for (const line of linesTwo) {
  if (line.startsWith("seeds: ")) {
    const [_, seeds] = line.split(': ');
    const seedValues = seeds.split(' ');

    for (let i = 0; i < seedValues.length; i += 2) {
      const length = parseInt(seedValues[i + 1]);
      const start = parseInt(seedValues[i]);
      const end = start + length - 1;

      dataTwo.seeds.push({
        start,
        end,
      });
    }

    continue;
  }

  const matches = line.match(/^([a-z]+)-to-([a-z]+) map:$/)
  if (matches !== null) {
    currentConverter = {
      from: matches[1],
      to: matches[2],
      ranges: [],
    };

    dataTwo.converters.push(currentConverter);
  }

  if (line.match(/^[0-9]/) !== null) {
    let [destStart, srcStart, length] = line.split(" ");
    length = parseInt(length);

    srcStart = parseInt(srcStart);
    srcEnd = srcStart + length - 1;

    destStart = parseInt(destStart);
    destEnd = destStart + length - 1;

    currentConverter.ranges.push({
      src: {
        start: srcStart,
        end: srcEnd,
      },
      dest: {
        start: destStart,
        end: destEnd,
      },
      modifier: destStart - srcStart,
      length,
    });
  }
}

const stateRanges = [];
for (const seed of dataTwo.seeds) {
  const startState = "seed";

  stateRanges.push({
    state: startState,
    range: seed,
  });
}

for (const stateRange of stateRanges) {
  const converter = dataTwo.converters.find(converter => converter.from === stateRange.state);
  if (converter === undefined) {
    break;
  }
  console.log(stateRange)
  let currentRange = stateRange.range;
  const nextRanges = [];

  for (const converterRange of converter.ranges) {

    if (converterRange.src.start > currentRange.end || converterRange.src.end < currentRange.start) {
      continue;
    }

    if (converterRange.src.start <= currentRange.start && converterRange.src.end >= currentRange.end) {
      const convertedRange = {
        start: currentRange.start + converterRange.modifier,
        end: currentRange.end + converterRange.modifier,
      };

      nextRanges.push({
        state: converter.to,
        range: convertedRange
      });

      currentRange = null;
      break;
    }

    if (converterRange.src.start <= currentRange.start && converterRange.src.end >= currentRange.start) {
      const convertedRange = {
        start: currentRange.start + converterRange.modifier,
        end: converterRange.src.end + converterRange.modifier,
      };

      nextRanges.push({
        state: converter.to,
        range: convertedRange
      });

      currentRange = {
        start: converterRange.src.end + 1,
        end: currentRange.end,
      };


      continue;
    }

    if (converterRange.src.start <= currentRange.end && converterRange.src.end >= currentRange.end) {
      const convertedRange = {
        start: converterRange.src.start + converterRange.modifier,
        end: currentRange.end + converterRange.modifier,
      };

      nextRanges.push({
        state: converter.to,
        range: convertedRange
      });

      currentRange = {
        start: currentRange.start,
        end: converterRange.src.start - 1,
      };

      continue;
    }
  }

  if (currentRange !== null) {
    nextRanges.push({
      state: converter.to,
      range: currentRange,
    });
  }

  stateRanges.push(...nextRanges);
}

const part2Min = stateRanges.filter((stateRange) => stateRange.state === "location").sort((a, b) => a.range.start - b.range.start)[0].range.start
console.log(`Part 2 min distance: ${part2Min}`);