import { Provider } from '@angular/core';
import { AbstractBookService } from './abstract-book.service';
import { environment } from '../../../../environments/environments';
import { MockBookService } from './mock-book.service';
import { BookService } from './book.service';

export const bookServiceProvider: Provider = {
    provide: AbstractBookService,
    useClass: environment.useMockService ? MockBookService : BookService
}