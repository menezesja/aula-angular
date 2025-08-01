import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BookList } from '../books/book-list/book-list.component';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Search } from './search/search.components';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,
     MatIconModule, 
     MatToolbarModule, 
     MatMenuModule,
     MatButtonModule, 
     RouterModule, 
     BookList, 
     Search],
  templateUrl: './home.components.html',
  styleUrl: './home.components.scss'
})

export class Home {
  isLoggedIn = false
}
