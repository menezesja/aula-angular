import { Component, Input } from '@angular/core';

@Component({ //injenção de dependência, é uma classe e passa um dicionário 
  selector: 'app-book-card',
  imports: [],
  templateUrl: './book-card.component.html',
  styleUrl: './book-card.component.scss'
})
export class BookCard {
  message = "hello world de dentro do TypeScript"
 
  @Input() book!: {title: string,
                  author: string,
                  year: number}
}
