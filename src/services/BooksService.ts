import { DataItem, OpenLibraryResponse } from '../types';
export class BooksService {
  private static apiUrl = 'https://openlibrary.org/search.json';
  static async getBooksByTitle(query: string): Promise<DataItem[]> {
    if (query?.length < 3) {
      //We need to have meaningful query
      return [];
    }
    try {
      const response = await fetch(
        `${BooksService.apiUrl}?title=${query}&limit=10&fields=key,title`
      );
      const { docs } = (await response.json()) as OpenLibraryResponse; //casting because json() won't accept generic response

      return docs.map(({ key, title }) => ({ id: key, label: title }));
    } catch (e) {
      return [];
    }
  }
}
