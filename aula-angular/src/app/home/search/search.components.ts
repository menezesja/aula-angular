import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AbstractBookService } from '../../books/service/abstract-book.service';
import { Book } from '../../books/model/book.model';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './search.components.html',
  styleUrl: './search.components.scss'
})
export class Search {
  private service = inject(AbstractBookService)
  filteredBooks: Book[] = []
  searchQuery: string = ''
  showSuggestions = true

  async onSearchChange(query: string): Promise<void>{
    this.searchQuery = query
    const result = await firstValueFrom(
      this.service.search(query)
    )
    this.filteredBooks = result.success && result.data ? result.data : [];
    this.showSuggestions = query.length <=0;
  }

  highlightMatch(text: string, query: string): string {
    if(!query) return text
    const regex = new RegExp(`(${query})`,'gi')
    return text.replace(regex,'<strong>$1</strong>')
  }
}
