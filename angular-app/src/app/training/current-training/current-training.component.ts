import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { MatDialog } from "@angular/material";
import { StopTrainingDialogComponent } from "./stop-training-dialog.components";
import { TrainingService } from '../training.service';
import { ExcerciseModel } from '../excercise.model';

@Component({
  selector: "app-current-training",
  templateUrl: "./current-training.component.html",
  styleUrls: ["./current-training.component.css"]
})
export class CurrentTrainingComponent implements OnInit {
  excerciseType: string;
  excercise: ExcerciseModel;
  @Output() trainingSection = new EventEmitter();

  progress = 0;
  timer: any;
  constructor(public dialog: MatDialog , private trainingService: TrainingService) {}

  ngOnInit() {
    
    this.excercise = this.trainingService.getCurrentExcercise();
    this.excerciseType = this.excercise.id;
    this.startOrResumeTraining();
  }

  startOrResumeTraining() {
    const step = this.excercise.duration / 100 * 1000;
    this.timer = setInterval(() => {
      if (this.progress < 100) {
        this.progress = this.progress + 2;
      } else {

        clearInterval(this.timer);
        this.trainingService.completeExcercise();
      }
    }, step);
  }

  openDialog() {
    // stops the setInterval method
    clearInterval(this.timer);

    const dialog = this.dialog.open(StopTrainingDialogComponent, {
      data: { progress: this.progress }
    });

    dialog.afterClosed().subscribe(result => {
      console.log(result);

      if (result) {
        //this.backToTraining();
        this.trainingService.cancelExcercise(this.progress);
      } else {
        this.startOrResumeTraining();
      }
    });
  }
}
