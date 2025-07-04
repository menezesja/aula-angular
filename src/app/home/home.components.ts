import { Component } from '@angular/core';
import { BookList } from "../books/book-list/book-list.component";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MockBookService } from '../books/service/mock-book.service';

@Component({
  selector: 'app-home.components',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, BookList],
  templateUrl: './home.components.html',
  styleUrl: './home.components.scss',
  providers: [MockBookService]
})

export class Home {
  searchQuery: string = '';
  submittedQuery: string = '';
  showSuggestions: boolean = false;
  filteredSuggestions: string[] = [];

  constructor(private bookService: MockBookService) {}

  onSearchChange(query: string): void {
    this.searchQuery = query.trim();

    const books = this.bookService.books(); //sempre atualizado

    if (!this.searchQuery) {
      this.filteredSuggestions = [];
      this.showSuggestions = false;
      return;
    }

    const lowerQuery = this.searchQuery.toLowerCase();

    this.filteredSuggestions = books
      .filter(book =>
        book.title.toLowerCase().includes(lowerQuery) ||
        book.author.toLowerCase().includes(lowerQuery) ||
        book.year.toString().includes(lowerQuery)
      )
      .map(book => `${book.title} – ${book.author}, ${book.year}`)
      .filter((value, index, self) => self.indexOf(value) === index)
      .slice(0, 5);

    this.showSuggestions = this.filteredSuggestions.length > 0;
  }

  submitSearch(): void {
    this.submittedQuery = this.searchQuery;
    this.showSuggestions = false;
  }

  selectSuggestion(suggestion: string): void {
    this.searchQuery = suggestion;
    this.submitSearch();
  }

  hideSuggestionsWithDelay(): void {
    setTimeout(() => this.showSuggestions = false, 200);
  }
}
