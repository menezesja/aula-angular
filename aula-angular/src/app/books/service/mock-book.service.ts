import { Injectable, signal, computed } from '@angular/core';
import { Signal } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AbstractBookService } from './abstract-book.service';
import { Book } from '../model/book.model';
import { OperationResult } from '../../models/operation-result.model';

@Injectable()
export class MockBookService extends AbstractBookService{
    //save database
    private _books = signal<Book[]>([
        {id: 1, title: 'Clean Code', author: 'Eu', year: 2021},
        {id: 2, title: 'Cristiane F', author: 'Cristiane F', year: 2000},
        {id: 3, title: 'Senhor dos Aneis', author: 'Eu também', year: 2011},
      ])
      //object Book
      books: Signal<Book[]> = computed(()=>this._books())
      
      override refresh(): void {
          // Nada a fazer
      }

      override add(book: Omit<Book, 'id'>): Observable<OperationResult> {
          try{
                const currentBooks = this._books();
                const maxId = currentBooks.length > 0 
                    ? Math.max(...currentBooks.map((b: Book) => b.id)) : 0;
                const newBook: Book = {...book, id: maxId+1}
                this._books.update(list=>[...list, newBook])
                return of({success: true, status: 201})
            }catch(error){
                return of({success: false, error, status: 500})
            }
        }

        override update(book: Book): Observable<OperationResult> {
            try{
                let updated = false

                this._books.update(list => list.map(b=> {
                    if(b.id === book.id){
                        updated = true
                        return { ...book}
                    }
                    return b
                }))

                if(!updated)
                    return of({success: false, status: 304, data:'Error to update book'})

                return of({success: true, status: 200})
            } catch(error){
                return of({success: false, error, status: 500})
            }
        }

        override remove(id: number) : Observable<OperationResult>{
            try{
                this._books.update(list=>list.filter((b: Book)=>b.id !== id))
                return of({success: true, status: 200})
            }catch(error){
                return of({success: false,error, status:500})
            }
        }

        override search(query: string): Observable<OperationResult> {
            try{
                //USUÁRIO É IDIOTA
                //AbRaCaFEQ13%8 !== Abracafeq13%8
                const lowerQuery = query.trim().toLowerCase()

                const filtered = this._books().filter(book=>
                    book.title.toLowerCase().includes(lowerQuery) ||
                    book.author.toLowerCase().includes(lowerQuery) ||
                    book.year.toString().includes(lowerQuery)
                )

                return of({success: true, status: 200, data: filtered})
            }catch(error){
                return of({success: false, error, status: 500})
            }
        }

        override search_by_id(id: number): Observable<OperationResult> {
            try{
                const found = this._books().find(b=>b.id === id)

                if(!found) 
                    return of({success: false, status:404, data:'Book not found'})
                
                return of({success:true, status:200, data: found})
            
            } catch(error){
                return of({success: false, error, status: 500})
            }
        }
}