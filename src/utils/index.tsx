import { Fragment } from 'react';
export { debounce } from './debounce';
export const escapeRegex = (str: string) =>
  str.replace(/[|\\{}()[\]^$+*?.]/g, '\\$&');

export const createHighlightTextFn = (highlight: string) => {
  const highlightWords = highlight.toLowerCase().split(' ');
  const highlightWordsDict = highlightWords.reduce<{ [key: string]: boolean }>(
    (acc, word) => {
      acc[word] = true;
      return acc;
    },
    {}
  );
  return (text: string) => {
    const words = text.split(' ');

    return words.map((word, index) => {
      if (highlightWordsDict[word.toLowerCase()]) {
        return (
          <Fragment key={index}>
            <mark>{word}</mark>{' '}
          </Fragment>
        );
      }
      return (
        <Fragment key={index}>
          <span key={index}>{word}</span>{' '}
        </Fragment>
      );
    });
  };
};
