import { FC, useMemo } from 'react';
import { createHighlightTextFn } from '../../utils';
import { Suggestion } from './Suggestion';
import { SuggestionsListProps } from './types';

export const SuggestionsList: FC<SuggestionsListProps> = ({
  userInput,
  suggestions,
  onSelect,
}) => {
  const highlightFn = useMemo(() => {
    return createHighlightTextFn(userInput);
  }, [userInput]);

  return (
    <ul className="suggestions">
      {suggestions.map(({ label, id }, index) => (
        <Suggestion
          key={id}
          id={id}
          label={label}
          onSelect={onSelect}
          highlightFn={highlightFn}
        />
      ))}
    </ul>
  );
};
