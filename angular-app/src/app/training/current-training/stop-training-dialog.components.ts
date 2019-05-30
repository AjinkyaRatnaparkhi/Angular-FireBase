import { Component, Inject } from '@angular/core'; 
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: "app-custop-training-dialog",
  template: `<h2 mat-dialog-title> Are you sure ? </h2> 
              <div mat-dialog-content>
              Your current progress is - {{data.progress}}%
              </div>
              <div mat-dialog-actions>
              <button mat-button [mat-dialog-close]='true'> YES </button> 
              <button mat-button [mat-dialog-close]='false'> NO </button>
              </div> `
})
export class StopTrainingDialogComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data) {

  }

} 