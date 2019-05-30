import { Component, OnInit, AfterViewInit, ViewChild, OnDestroy } from '@angular/core';
import { TrainingService } from '../training.service';
import { ExcerciseModel } from '../excercise.model';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-past-training',
  templateUrl: './past-training.component.html',
  styleUrls: ['./past-training.component.css']
})
export class PastTrainingComponent implements OnInit , AfterViewInit , OnDestroy {
  

  displayedColumns: string[] = ['date' , 'name' ,'status'];
  
  dataSource = new MatTableDataSource<ExcerciseModel>();
  excSubscription: Subscription;

  @ViewChild(MatSort) sort: MatSort ;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private trainingService: TrainingService) { }

  ngOnInit() {

    this.trainingService.getPastExcercises();
    this.excSubscription = this.trainingService.onPastExReceived.subscribe(pastExc => {
      this.dataSource.data = pastExc;
    });
  }

  ngAfterViewInit(): void {
   
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  doFilter(filterValue) {
    this.dataSource.filter = filterValue.trim();
  }

  ngOnDestroy(): void {
    this.excSubscription.unsubscribe();
  }
}
