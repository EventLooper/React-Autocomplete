import React, {
  ChangeEvent,
  FC,
  useRef,
  useCallback,
  useState,
  useMemo,
} from 'react';
import loader from '../../assets/loader.svg';
import { debounce } from '../../utils';
import { DataItem } from '../../types';
import { useClickOutside } from '../../hooks';
import { SuggestionsList } from './SuggestionsList';
import { Loader } from './Loader';
import { ClearButton } from './ClearButton';
import { AutocompleteProps } from './types';
import './AutoComplete.css';

export const AutoComplete: FC<AutocompleteProps> = ({
  label,
  loading,
  suggestions,
  onSearch,
  onSelect,
  onClear,
}) => {
  const autoCompleteRef = useRef<HTMLDivElement | null>(null);
  const [value, setValue] = useState<DataItem | null>(null);
  const [userInput, setUserInput] = useState('');
  const [showSuggestion, setShowSuggestion] = useState(false);

  const debouncedSearch = useMemo(() => debounce(onSearch, 200), [onSearch]);

  const handleBlur = useCallback(() => {
    setShowSuggestion(false);
  }, [setShowSuggestion]);

  useClickOutside(autoCompleteRef, handleBlur);

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const searchText = e.target.value;
      setValue(null);
      setUserInput(searchText);
      debouncedSearch(searchText);
    },
    [onSearch, debouncedSearch]
  );

  const handleSelect = useCallback(
    (item: DataItem) => {
      setUserInput(item.label);
      setShowSuggestion(false);
      setValue(item);
      onSelect(item);
      // requirements aren't specify behavior after selecting item, should it be select component or simple input with suggestions
      // in order to continue search after selecting item, user need to invoke search again.
    },
    [onSelect, setUserInput]
  );

  const handleFocus = useCallback(() => {
    setShowSuggestion(true);
  }, [setShowSuggestion]);
  //Keyboard event handling isn't implemented due to time constraints

  const handleClear = useCallback(() => {
    setUserInput('');
    setValue(null);
    onClear();
  }, [setUserInput, setValue, onClear]);

  return (
    <div className="auto-complete" ref={autoCompleteRef}>
      <label htmlFor="search">{label}</label>
      <div className="auto-complete-input-container">
        <input
          value={userInput}
          className="auto-complete-input"
          type="text"
          id="search"
          autoComplete="off"
          onChange={handleChange}
          onFocus={handleFocus}
        />
        {loading && <Loader />}
        {userInput && !loading ? <ClearButton onClear={handleClear} /> : null}
      </div>
      {showSuggestion && !value ? (
        <SuggestionsList
          userInput={userInput}
          suggestions={suggestions}
          onSelect={handleSelect}
        />
      ) : null}
    </div>
  );
};
