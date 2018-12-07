import { Author } from './author';

export class Book {
    id: number;
    title: string;
    author: Author;
    isbn: number;
    url: string;

    constructor(title: string, author: Author, isbn: number, url: string,) {
        this.title=title;
        this.author=author;
        this.isbn=isbn;
        this.url=url;
    }
}