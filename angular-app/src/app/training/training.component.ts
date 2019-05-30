import { Component, OnInit } from '@angular/core';
import { TrainingService } from './training.service';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
})
export class TrainingComponent implements OnInit {

  showTraining;
  excerciseType='';

  constructor(private trainingService: TrainingService) { }

  ngOnInit() {
  this.showTraining=false;

  this.trainingService.onGoingEx.subscribe( excercise => {
          if(excercise != null) {
            this.showTraining = true;  
          }  else {
            this.showTraining = false;
          }
          
     });
  }
 
  /* startTraining(excerciseType: string) {
    console.log('captured the event ' + excerciseType);
    this.showTraining = true;
    this.excerciseType = excerciseType;

  } */
}
