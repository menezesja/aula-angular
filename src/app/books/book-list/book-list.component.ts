import { Component, Input, computed, effect, signal, inject } from '@angular/core';
import { BookCard } from '../book-card/book-card.component';
import { CommonModule } from '@angular/common';
import { AbstractBookService } from '../service/abstract-book.service';
import { Book } from '../model/book.model';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [CommonModule, BookCard],
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.scss'
})
export class BookList {
  private service = inject(AbstractBookService);

  @Input() searchQuery: string = '';

  books = this.service.books;
  filteredBooks = signal<Book[]>([]);

  constructor() {
    effect(() => {
      const query = this.searchQuery.toLowerCase().trim();
      const allBooks = this.books();

      this.filteredBooks.set(
        allBooks.filter(book =>
          book.title.toLowerCase().includes(query) ||
          book.author.toLowerCase().includes(query) ||
          book.year.toString().includes(query)
        )
      );
    });
  }

  trackById = (_: number, item: Book) => item.id;

  async remove(id: number): Promise<void> {
    const result = await firstValueFrom(this.service.remove(id));
    // A lista será atualizada automaticamente via sinal
  }
}
