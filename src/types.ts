export type DataItem = { id: string; label: string };

//Simplified Open Library response, only the fields we need
export type OpenLibraryResponse = {
  docs: { key: string; title: string }[];
};
