import { DataItem } from '../../types';

export type AutocompleteProps = {
  label: string;
  loading: boolean;
  suggestions: DataItem[];
  onSelect: (item: DataItem) => void;
  onSearch: (text: string) => void;
  onClear: () => void;
};

export type SuggestionsListProps = {
  userInput: string;
  suggestions: DataItem[];

  onSelect: (item: DataItem) => void;
};

export type SuggestionProps = DataItem & {
  highlightFn: (text: string) => string | JSX.Element[];
  onSelect: (item: DataItem) => void;
};

export type ClearButtonProps = {
  onClear: () => void;
};
