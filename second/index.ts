import fs from 'fs';
import path from 'path';

enum EOpponentsSelection {
  ROCK = 'A',
  PAPER = 'B',
  SCISSORS = 'C',
}

enum EMyResponse {
  ROCK = 'X',
  PAPER = 'Y',
  SCISSORS = 'Z',
}

const SCORES = {
  basic: {
    win: 6,
    draw: 3,
    lose: 0,
  },
  additional: {
    rock: 1,
    paper: 2,
    scissors: 3,
  },
};

const INPUT_TEXT_LOCATION = path.join(__dirname, './input.txt');

const splitInputIntoRounds = (input: string[]) => {
  let rounds = [];
  input.forEach((round) => {
    const toArray = round.split(' ');
    rounds.push(toArray);
  });
  return rounds;
};

const getInputAsRounds = () => {
  let inputData = '';
  try {
    const data = fs.readFileSync(INPUT_TEXT_LOCATION, 'utf8');
    inputData = data;
  } catch (err) {
    console.error(err);
  }

  return splitInputIntoRounds(inputData.split('\n'));
};

const isDraw = (round: string[]) => {
  const opponent = round[0] as EOpponentsSelection;
  const myResponse = round[1] as EMyResponse;

  const opponentType = Object.entries(EOpponentsSelection).find(
    ([_key, value]) => value === opponent
  );
  const myResponseType = Object.entries(EMyResponse).find(
    ([_key, value]) => value === myResponse
  );

  return opponentType[0] === myResponseType[0];
};

const responseNeededForWin = (selection: EOpponentsSelection) => {
  switch (selection) {
    case EOpponentsSelection.ROCK:
      return EMyResponse.PAPER;
    case EOpponentsSelection.PAPER:
      return EMyResponse.SCISSORS;
    case EOpponentsSelection.SCISSORS:
      return EMyResponse.ROCK;
  }
};

const isWin = (result: string[]) =>
  responseNeededForWin(result[0] as EOpponentsSelection) === result[1];

const responseToScore = (response: EMyResponse) => {
  switch (response) {
    case EMyResponse.ROCK:
      return SCORES.additional.rock;
    case EMyResponse.PAPER:
      return SCORES.additional.paper;
    case EMyResponse.SCISSORS:
      return SCORES.additional.scissors;
    default:
      return 0;
  }
};

const getRoundScore = (round: string[]) => {
  const response = round[1] as EMyResponse;

  const winningPoints = isWin(round) ? 6 : 0;
  const drawPoints = isDraw(round) ? 3 : 0;
  const additionalPoints = responseToScore(response);

  return winningPoints + drawPoints + additionalPoints;
};

const getScore = (rounds: string[][]) => {
  let totalScore = 0;
  rounds.forEach((round) => {
    totalScore += getRoundScore(round);
  });
  console.log(totalScore);
};

getScore(getInputAsRounds());
