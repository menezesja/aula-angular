import { computed, Injectable, Signal, signal } from "@angular/core";
import { AbstractBookService } from "./abstract-book.service";
import { Book } from "../model/book.model";
import { Observable, of } from "rxjs";
import { OperationResult } from "../../models/operation-result.models";

@Injectable()
export class MockBookService extends AbstractBookService {
    private _books = signal<Book[]>([
        {id: 1, title: 'Chainsaw Man', author: 'Tatsuki Fujimoto', year: 2020},
        {id: 2, title: 'Gladiadora', author: 'Catarina Silva', year: 2021},
        {id: 3, title: 'O Livro de Azrael', author: 'Amber V. Nicole', year: 2025},
        {id: 4, title: 'Eu e eu', author: 'Maria', year: 2025}
    ])

    books: Signal<Book[]> = computed(()=>this._books())

    override refresh(): void {
        //nada a fazer
    }

    override add(book: Omit<Book, 'id'>): Observable<OperationResult> {
        try{
            const currentBooks = this._books();
            const maxId = currentBooks.length > 0 ?
                        Math.max(...currentBooks.map((b:Book)=>b.id)):
                        0;
            const newBook: Book = {...book, id: maxId+1}
            this._books.update(list=>[...list, newBook])
            return of({success: true, status: 201})
        }catch(error){
            return of({success: false, error, status: 500})
        }
    }

    override remove(id: number): Observable<OperationResult> {
        try{
            this._books.update(list=>list.filter((b: Book)=>b.id !== id))
            return of({success: true, status: 200})
        }catch(error){
            return of({success: false, error, status: 500})
        }
    }
}