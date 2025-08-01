import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
    selector: 'app-success-dialog',
    imports: [MatDialogModule, MatButtonModule],
    template: `
        <h2 mat-dialog-title>Sucesso</h2>
        <div mat-dialog-content>
            <p>{{ data.message }} </p>
        </div>
        <div mat-dialog-actions align="end">
            <button mat-button mat-dialog-close>OK</button>
        </div>
    `
})
export class SuccessDialog{
    constructor(@Inject(MAT_DIALOG_DATA) public data: {message: string}){}
}