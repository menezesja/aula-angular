import { Component, Inject } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MAT_DIALOG_DATA, MatDialogModule } from "@angular/material/dialog";

@Component({
    selector: 'app-error-dialog',
    imports: [MatDialogModule, MatButtonModule],
    template: `
        <h2 mat-dialog-title>Erro</h2>
        <div mat-dialog-content>
            <p>{{ data.message }}</p>
        </div>
        <div mat-dialog-actions align="end">
            <button mat-button mat-dialog-close>OK</button>
        </div>
    `
})
export class ErrorDialog{
    constructor(@Inject(MAT_DIALOG_DATA) public data: {message: string}){}
}