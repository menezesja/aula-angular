import { Signal } from '@angular/core'
import { Book } from '../model/book.model';
import { Observable } from 'rxjs';
import { OperationResult } from '../../models/operation-result.model';
export abstract class AbstractBookService{
    abstract books: Signal<Book[]>;
    abstract refresh(): void;
    abstract add(book: Omit<Book, 'id'>) : Observable<OperationResult>;
    abstract update(book: Book): Observable<OperationResult>;
    abstract remove(id: number): Observable<OperationResult>;
    abstract search(query: string): Observable<OperationResult>;
    abstract search_by_id(id: number): Observable<OperationResult>;
}