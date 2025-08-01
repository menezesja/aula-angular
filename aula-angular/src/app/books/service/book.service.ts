import{ environment } from '../../../../environments/environments'
import { Injectable, signal, computed } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { of, tap } from 'rxjs';
import { Observable } from 'rxjs';
import { AbstractBookService } from './abstract-book.service';
import { Book } from '../model/book.model';
import { OperationResult } from '../../models/operation-result.model';
import { map, catchError } from 'rxjs/operators';


@Injectable()
export class BookService extends AbstractBookService{
    private _books = signal<Book[]>([]);

    books = computed(()=>this._books());

    constructor(private http: HttpClient){
        super();
        this.refresh();
    }

    override refresh(): void {
        this.http.get<Book[]>
            (`${environment.apiUrl}/book/list`,
            {observe: 'response'}
            )
        .subscribe(response=>{
            if(response.status === 201 && response.body){
                this._books.set(response.body)
            }
        });
    }

    override add(book: Omit<Book, 'id'>) {
        const user_id = 1
        return this.http.post<Book>(
            `${environment.apiUrl}/book/user/${user_id}`,
            book,
            {observe: 'response'}
        ).pipe(
            map(response=>({
                success: response.status >= 200 && response.status < 300,
                data: response.body,
                status: response.status
            })),
            catchError((error: HttpErrorResponse)=>
                of({
                    success: false,
                    status: error.status,
                    data: error.message
                })
            )
        )
    }

    override remove(id: number) {
        return this.http.delete(
            `${environment.apiUrl}/book/${id}`,
            {observe: 'response'}
        ).pipe(
            map(response=>({
                success: response.status >= 200 && response.status < 300,
                data: response.body,
                status: response.status
            })),
            catchError((error: HttpErrorResponse)=>
                of({
                    success: false,
                    status: error.status,
                    data: error.message
                })
            )
        )
    }

    override update(book: Book) {
        return this.http.put<Book>(
            `${environment.apiUrl}/book/${book.id}`,
            book,
            {observe: 'response'}
        ).pipe(
            map(response=>({
                success: response.status >= 200 && response.status < 300,
                data: response.body,
                status: response.status
            })),
            catchError((error: HttpErrorResponse)=>
                of({
                    success: false,
                    status: error.status,
                    data: error.message
                })
            )
        )      
    }

    override search(query: string): Observable<OperationResult> {
        return this.http.get(
            `${environment.apiUrl}/book/search`,
            {observe: 'response',
            params: { query }
            }
        ).pipe(
            map(response=>({
                success: response.status >= 200 && response.status < 300,
                data: response.body,
                status: response.status
            })),
            catchError((error: HttpErrorResponse)=>
                of({
                    success: false,
                    status: error.status,
                    data: error.message
                })
            )
        )
    }

    override search_by_id(id: number): Observable<OperationResult> {
        return this.http.get<Book>(
            `${environment.apiUrl}/book/${id}`,
            {observe: 'response'}
        ).pipe(
            map(response=>({
                success: response.status >= 200 && response.status < 300,
                data: response.body,
                status: response.status
            })),
            catchError((error: HttpErrorResponse)=>
                of({
                    success: false,
                    status: error.status,
                    data: error.message
                })
            )
        )
    }
}