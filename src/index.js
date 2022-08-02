module.exports = function toReadable (number = 0) {
  const numbersMap = {
    '0': 'zero',
    '1': 'one',
    '2': 'two',
    '3': 'three',
    '4': 'four',
    '5': 'five',
    '6': 'six',
    '7': 'seven',
    '8': 'eight',
    '9': 'nine',
  };

  const fromEleven = {
    '11': 'eleven',
    '12': 'twelve',
    '13': 'thirteen',
    '14': 'fourteen',
    '15': 'fifteen',
    '16': 'sixteen',
    '17': 'seventeen',
    '18': 'eighteen',
    '19': 'nineteen',
  };

  const dozensMap = {
    '1': 'ten' ,
    '2': 'twenty' ,
    '3': 'thirty' ,
    '4': 'forty' ,
    '5': 'fifty' ,
    '6': 'sixty' ,
    '7': 'seventy' ,
    '8': 'eighty' ,
    '9': 'ninety' ,
  };

  const hundred = 'hundred';
  const thousand = 'thousand';

  const numberLenght = `${+number}`.length;
  const numbers = `${+number}`.split('');

  // from 0 to 9
  if (numberLenght === 1) {
    return numbersMap[number];
  }

  // from 10 to 99
  const getToHundred = (num, numArr, len) => {
    if (`${+num}`.length === 1) {
      return num ? numbersMap[+num] : null;
    }

    if (len === 2) {
      if (num < 20) {
        if (num === 10) {
          return dozensMap[numArr[0]];
        }
        return fromEleven[num];
      }
  
      return `${dozensMap[numArr[0]]}${+numArr[1] === 0 ? '' : ` ${numbersMap[numArr[1]]}` }`;
    }
    return null;
  }

  const firstTry = getToHundred(number, numbers, numberLenght);
  if (firstTry) {
    return firstTry;
  }

  const getToThouthen = (numArr, len) => {
    if (len === 3) {
      const toHundred = getToHundred(+`${+numArr[1]}${+numArr[2]}`,[numArr[1], numArr[2]], 2);
      return `${numbersMap[numArr[0]]} ${hundred}${toHundred ? ` ${toHundred}` : ''}`;
    }
  
    return null;
  }
  const secondTry = getToThouthen(numbers, numberLenght);
  if (secondTry) {
    return secondTry;
  }

  if (numberLenght === 4) {
    const toThouthen = getToThouthen([numbers[1], numbers[2], numbers[3]], 3);
    return `${numbersMap[numbers[0]]} ${thousand} ${toThouthen ? toThouthen : ''}`;
  }

  return null;
}
