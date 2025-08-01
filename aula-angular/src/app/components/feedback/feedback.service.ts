import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SuccessDialog } from './success-dialog.component';
import { ErrorDialog } from './error-dialog.component';

@Injectable({providedIn: 'root'})
export class FeedbackService{
    constructor(private dialog: MatDialog){}
    success(message: string): void{
        this.dialog.open(SuccessDialog,
            {data: { message }}
        )
    }
    error(message: string): void{
        this.dialog.open(ErrorDialog,
            {data: { message }}
        )
    }
}