import fs from 'fs';
import path from 'path';

interface IElf {
  elfIndex: number;
  calories: number[];
  totalCalories: number;
}

const INPUT_TEXT_LOCATION = path.join(__dirname, './input.txt');

const countCalories = (calories: number[]) => {
  let total = 0;
  calories.forEach((calory) => (total += calory));
  return total;
};

const inputToElves = (input: string[]): IElf[] => {
  let elves: IElf[] = [];
  let currentElfCalories = [];
  let elfIndex = 1;

  input.forEach((item, i) => {
    if (item.length > 0 || i + 1 === input.length) {
      currentElfCalories.push(Number(item));
    } else {
      elves.push({
        elfIndex,
        calories: currentElfCalories,
        totalCalories: countCalories(currentElfCalories),
      });
      currentElfCalories = [];
      elfIndex++;
    }
  });

  return elves;
};

const getInputAsElves = () => {
  let inputData = '';
  try {
    const data = fs.readFileSync(INPUT_TEXT_LOCATION, 'utf8');
    inputData = data;
  } catch (err) {
    console.error(err);
  }

  return inputToElves(inputData.split('\n'));
};

const getElfWithMostCalories = () => {
  const elves = getInputAsElves();
  let mostCalories = 0;
  let chosenOne: Partial<IElf> = {};

  elves.forEach((elf) => {
    if (elf.totalCalories > mostCalories) {
      mostCalories = elf.totalCalories;
      chosenOne = elf;
    }
  });

  return chosenOne;
};

const elfWithMostCalories = getElfWithMostCalories()

console.log(elfWithMostCalories);
