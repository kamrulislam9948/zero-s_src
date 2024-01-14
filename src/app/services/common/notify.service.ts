import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class NotifyService {

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  
  constructor(
    private snackBar: MatSnackBar
  ) { }
  message(message:string, action:string = 'DISMISS'){
    let config: MatSnackBarConfig = {
      duration: 3000,
      panelClass: [],
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    };
    this.snackBar.open(message, action,config);
  }
}

