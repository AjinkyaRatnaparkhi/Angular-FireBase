import { ExcerciseModel } from "./excercise.model";
import { Subject, Observable, Subscription } from "rxjs";
import { Injectable } from "@angular/core";
import {
    AngularFirestore,
    AngularFirestoreCollection
} from "@angular/fire/firestore";
import { map } from "rxjs/operators";

@Injectable()
export class TrainingService {
    currentExcercise: ExcerciseModel;

    onGoingEx = new Subject<ExcerciseModel>();
    onExReceived = new Subject<ExcerciseModel[]>();

    excercises: ExcerciseModel[];
    pastExcercises: ExcerciseModel[];

    onPastExReceived = new Subject<ExcerciseModel[]>();

    excerciseCollection: AngularFirestoreCollection<ExcerciseModel>;
    finishedExcCollection: AngularFirestoreCollection<ExcerciseModel>;

    fsSubs: Subscription[] = [];

    constructor(private db: AngularFirestore) { }


    getExcercises() {
        this.excerciseCollection = this.db.collection("Excercises");
        this.fsSubs.push(this.excerciseCollection
            .snapshotChanges()
            .pipe(
                map(docArray => {
                    return docArray.map(doc => {
                        return {
                            id: doc.payload.doc.id,
                            ...doc.payload.doc.data()
                        };
                    });
                })
            )
            .subscribe((ex: ExcerciseModel[]) => {
                this.excercises = ex;
                this.onExReceived.next(this.excercises.slice());
            }));
    }

    getPastExcercises() {
        this.finishedExcCollection = this.db.collection("finishedExcercises");
        this.fsSubs.push(this.finishedExcCollection
            .snapshotChanges()
            .pipe(
                map(docArray => {
                    return docArray.map(doc => {
                        return {
                            id: doc.payload.doc.id,
                            ...doc.payload.doc.data()
                        };
                    });
                })
            )
            .subscribe((ex: ExcerciseModel[]) => {
                this.pastExcercises = ex;
                this.onPastExReceived.next(this.pastExcercises.slice());
            }));
    }

    startExcercise(exId: string) {
        this.currentExcercise = this.excercises.find(
            excercise => excercise.id === exId
        );
        this.onGoingEx.next({ ...this.currentExcercise });
    }

    getCurrentExcercise() {
        return { ...this.currentExcercise };
    }

    completeExcercise() {
        // after creting a copy of object using ...  spread operator , we are overriding other properties
        this.addFinishedExcercises({
            ...this.currentExcercise,
            status: "completed",
            date: new Date()
        });

        this.currentExcercise = null;
        this.onGoingEx.next(null);
    }

    cancelExcercise(progress: number) {
        // after creting a copy of object using ...  spread operator , we are overriding other properties
        this.addFinishedExcercises({
            ...this.currentExcercise,
            status: "cancelled",
            date: new Date(),
            duration: this.currentExcercise.duration * (progress / 100),
            calories: this.currentExcercise.calories * (progress / 100)
        });

        this.currentExcercise = null;
        this.onGoingEx.next(null);
    }

    private addFinishedExcercises(exc: ExcerciseModel) {
        this.db.collection("finishedExcercises").add(exc);
    }

    cancelSubscriptions() {
        this.fsSubs.forEach(sub => sub.unsubscribe());
    }

}
