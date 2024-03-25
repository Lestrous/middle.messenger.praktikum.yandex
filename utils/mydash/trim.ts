export function trim(str: string, delChars: string = ' ') {
  const delCharsArr = delChars.split('');

  return str.split('').reduce((acc, char) => {
    return `${acc}${delCharsArr.includes(char) ? '' : char}`;
  }, '');
}
