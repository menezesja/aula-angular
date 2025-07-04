import { computed, Injectable, signal } from '@angular/core';
import { environment } from '../../../../environments/environments';
import { AbstractBookService } from './abstract-book.service';
import { Book } from '../model/book.model';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { OperationResult } from '../../models/operation-result.models';

@Injectable()
export class BookService extends AbstractBookService{
    private _books = signal<Book[]>([]);

    books = computed(()=>this._books());

    constructor(private http: HttpClient){
        super();
        this.refresh();
    }

    override refresh(): void {
        this.http.get<Book[]>(`${environment.apiUrl}/books`)
        .subscribe(data=> this._books.set(data))
    }

    override add(book: Omit<Book, 'id'>) {
        return of()
    }

    override remove(id: number): Observable<OperationResult> {
        return of()
    }
}