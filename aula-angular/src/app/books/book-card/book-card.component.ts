import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-book-card',
  imports: [MatCardModule],
  standalone : true,
  templateUrl: './book-card.component.html',
  styleUrl: './book-card.component.scss'
})
export class BookCard {
  /*book = {title: "Game of thrones",
          author: "Georgie",
          year: 2015}*/
  

  @Input() book!: {
    title: string;
    author: string;
    year: number
  };

  message = 'Hello World!!!'
}
