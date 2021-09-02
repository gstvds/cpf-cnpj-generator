'use strict';
import alfy from 'alfy';

const hint = '[⌘ to remove punctuation]';

/**
 * Function to generate a random number between a minimum and maximum value
 * @param {number} min Minimum range to generate a random number
 * @param {number} max Maximum range to generate a random number
 * @returns {number} Random number
 */
function generateRandomNumberBetweenRange(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function generateArrayOfRandomNumbers(amount) {
  const randomNumbers = [];
  for (let current = 0; current < amount; current++) {
    randomNumbers.push(generateRandomNumberBetweenRange(0, 9))
  }

  return randomNumbers;
}

/**
 * Function to round a number using 11 as divider
 * @param {number} dirtyNumber Number to round
 * @returns {number} Rounded number
 */
function roundNumber(dirtyNumber) {
  return Math.round(dirtyNumber - (Math.floor(dirtyNumber / 11) * 11));
}

/**
 * Function to change a value bigger than ten to zero
 * @param {number} value Value to be changed
 * @returns {number} Changed value
 */
function changeValueBiggerThanTenToZero(value) {
  if (value >= 10) return 0;
  return value;
}

/**
 * Function to generate a document with random numbers;
 * @param {'cpf' | 'cnpj'} type Type of the generated document
 * @returns {string} The generated document
 */
function generateDocument(type = 'cpf') {
  const [firstNumber, secondNumber, thirdNumber, fourthNumber, fifthNumber, sixthNumber, seventhNumber, eighthNumber] = generateArrayOfRandomNumbers(8);
  const ninthNumber = type === 'cpf' ? generateRandomNumberBetweenRange(0, 9) : 0;

  if (type === 'cpf') {
    const firstDigitDirty = 11 - roundNumber(
      ninthNumber * 2 +
      eighthNumber * 3 +
      seventhNumber * 4 +
      sixthNumber * 5 +
      fifthNumber * 6 +
      fourthNumber * 7 +
      thirdNumber * 8 +
      secondNumber * 9 +
      firstNumber * 10
    );
    const firstDigit = changeValueBiggerThanTenToZero(firstDigitDirty);

    const secondDigitDirty = 11 - roundNumber(
      firstDigit * 2 +
      ninthNumber * 3 +
      eighthNumber * 4 +
      seventhNumber * 5 +
      sixthNumber * 6 +
      fifthNumber * 7 +
      fourthNumber * 8 +
      thirdNumber * 9 +
      secondNumber * 10 +
      firstNumber * 11
    );
    const secondDigit = changeValueBiggerThanTenToZero(secondDigitDirty);

    const firstPart = `${firstNumber}${secondNumber}${thirdNumber}`;
    const secondPart = `${fourthNumber}${fifthNumber}${sixthNumber}`;
    const thirdPart = `${seventhNumber}${eighthNumber}${ninthNumber}`;
    const digits = `${firstDigit}${secondDigit}`;

    return `${firstPart}.${secondPart}.${thirdPart}-${digits}`;
  }

  const tenthNumber = 0, eleventhNumber = 0, twelfthNumber = 0;

  const firstDigitDirty = 11 - roundNumber(
    twelfthNumber * 2 +
    eleventhNumber * 3 +
    tenthNumber * 4 +
    ninthNumber * 5 +
    eighthNumber * 6 +
    seventhNumber * 7 +
    sixthNumber * 8 +
    fifthNumber * 9 +
    fourthNumber * 2 +
    thirdNumber * 3 +
    secondNumber * 4 +
    firstNumber * 5
  );
  const firstDigit = changeValueBiggerThanTenToZero(firstDigitDirty);

  const secondDigitDirty = 11 - roundNumber(
    firstDigit * 2 +
    twelfthNumber * 3 +
    eleventhNumber * 4 +
    tenthNumber * 5 +
    ninthNumber * 6 +
    eighthNumber * 7 +
    seventhNumber * 8 +
    sixthNumber * 9 +
    fifthNumber * 2 +
    fourthNumber * 3 +
    thirdNumber * 4 +
    secondNumber * 5 +
    firstNumber * 6
  );
  const secondDigit = changeValueBiggerThanTenToZero(secondDigitDirty);

  const firstPart = `${firstNumber}${secondNumber}`;
  const secondPart = `${thirdNumber}${fourthNumber}${fifthNumber}`
  const thirdPart = `${sixthNumber}${seventhNumber}${eighthNumber}`;
  const fourthPart = `${ninthNumber}${tenthNumber}${eleventhNumber}${twelfthNumber}`;
  const digits = `${firstDigit}${secondDigit}`;

  return `${firstPart}.${secondPart}.${thirdPart}/${fourthPart}-${digits}`;
}

const cpf = generateDocument('cpf');
const cnpj = generateDocument('cnpj');

/**
 * Function to generate a new output for Alfred
 * @param {{ title: string; subtitle: string; arg: string; }} params Params to generate an Alfred's output 
 * @returns {{ title: string; subtitle: string; arg: string; valid: boolean }}
 */
function alfredOutput({ title, subtitle, arg }) {
  return {
    title,
    subtitle: `${hint} ${subtitle}`,
    arg,
    valid: true,
    mods: {
      cmd: {
        subtitle: `${hint} ${subtitle.replace(/[\.-]+/g, '')}`,
        arg: arg.replace(/[\.-]+/g, ''),
      }
    }
  };
}

alfy.output([
  alfredOutput({
    title: 'Generate CPF',
    subtitle: cpf,
    arg: cpf,
  }),
  alfredOutput({
    title: 'Generate CNPJ',
    subtitle: cnpj,
    arg: cnpj,
  }),
]);
