import { Routes } from '@angular/router';
import { BookList } from '../books/book-list/book-list.component';
import { BookForm } from '../books/book-form/book-form.component';
import { Home } from '../home/home.components';

export const routes: Routes = [
    {path:'', component: Home, pathMatch: 'full'},
    {path:'books', component: BookList},
    {path:'add-book', component:BookForm},
    {path:'edit-book/:id', component:BookForm}
];
