import { useCallback, FC } from 'react';
import { SuggestionProps } from './types';
export const Suggestion: FC<SuggestionProps> = ({
  label,
  id,
  onSelect,
  highlightFn,
}) => {
  const handleSelect = useCallback(() => {
    onSelect({ label, id });
  }, [label, id, onSelect]);

  return (
    <li className="suggestion-item" onClick={handleSelect}>
      {highlightFn(label)}
    </li>
  );
};
