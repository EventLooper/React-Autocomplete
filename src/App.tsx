import { useState, useCallback } from 'react';

import { AutoComplete } from './components';
import { BooksService } from './services';
import { DataItem } from './types';

import './App.css';
function App() {
  const [booksList, setBooksList] = useState<DataItem[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = useCallback(
    async (text: string) => {
      setLoading(true);
      const data = await BooksService.getBooksByTitle(text);
      setLoading(false);
      setBooksList(data);
    },
    [setBooksList, setLoading]
  );

  const handleClear = useCallback(() => {
    setBooksList([]);
  }, [setBooksList]);

  return (
    <div className="book-search-container">
      <AutoComplete
        label={'Books search'}
        loading={loading}
        suggestions={booksList}
        onSelect={() => {}}
        onSearch={handleSearch}
        onClear={handleClear}
      />
    </div>
  );
}

export default App;
