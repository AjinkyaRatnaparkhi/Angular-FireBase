import { Component, OnInit, OnDestroy } from "@angular/core";
import { TrainingService } from "../training.service";
import { ExcerciseModel } from "../excercise.model";
import {
  AngularFirestore,
  AngularFirestoreCollection
} from "@angular/fire/firestore";
import { Observable, Subscription } from "rxjs";
import { map } from "rxjs/operators";

@Component({
  selector: "app-new-training",
  templateUrl: "./new-training.component.html",
  styleUrls: ["./new-training.component.css"]
})
export class NewTrainingComponent implements OnInit, OnDestroy {
  excercises: ExcerciseModel[];
  selected = "";
  exSubscription: Subscription;
  // excerciseCollection: AngularFirestoreCollection<ExcerciseModel>;

  constructor(
    private trainingService: TrainingService,
    private db: AngularFirestore
  ) {}

  ngOnInit() {
    /* this.types = [
      {id:'1', name: 'Crunches'},
      {id:'2', name: 'Burpees'},
      {id:'3', name: 'Lunges'},
      {id:'4', name: 'Running'}
    ] */

    // this.excercises = this.trainingService.getExcercises();

    // using value changes , a simple way to get collection from firestore , it does not return any metadata ,
    // so ID will not be availabel
    // this.excercises = this.db.collection("Excercises").valueChanges();

    // to get metadata with collection , using snapshotchnages
    // this.excerciseCollection = this.db.collection('Excercises');
    /* 
    this.db.collection('Excercises').snapshotChanges().subscribe( result => {
      console.log(result);
    })
 */

    this.exSubscription = this.trainingService.onExReceived.subscribe(ex => {
      this.excercises = ex;
    });
    this.trainingService.getExcercises();
    /* 
    this.db
      .collection("Excercises")
      .valueChanges()
      .subscribe(result => {
        console.log(result);
      }); */
  }
  onClick(excercise: string) {
    console.log("on click !!" + excercise);

    // this.startTraining.emit(excercise);

    this.trainingService.startExcercise(excercise);
  }

  ngOnDestroy(): void {
    this.exSubscription.unsubscribe();
  }
}
