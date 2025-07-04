import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AbstractBookService } from '../service/abstract-book.service';
import { FeedbackService } from '../../components/feedback/feedback.service';
import { Router } from '@angular/router';
import { Book } from '../model/book.model';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-book-form.component',
  standalone: true,
  imports: 
  [CommonModule, FormsModule, ReactiveFormsModule,
  MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './book-form.component.html',
  styleUrl: './book-form.component.scss'
})
export class BookForm {
  form = new FormGroup({
    id     : new FormControl<number | null>(null),
    title  : new FormControl('', {nonNullable: true}),
    author : new FormControl('', {nonNullable: true}),
    year   : new FormControl(2020, {nonNullable: true})
  })

  private service = inject(AbstractBookService)
  private feedback = inject(FeedbackService)
  private router = inject(Router)

  async onSubmit(): Promise<void>{
    const book: Omit<Book, 'id'> = this.form.getRawValue()
    const result = await firstValueFrom(this.service.add(book))

    if(result.success){
      this.feedback.success("Livro adicionado com sucesso")
      this.router.navigate(['/'])
    }else{
      this.feedback.error(`Error ${result.error}`)
    }
  }

  onCancel(): void {
    this.router.navigate(['/']);
  }
}
