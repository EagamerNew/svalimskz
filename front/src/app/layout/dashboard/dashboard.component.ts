import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject} from 'rxjs';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {

  state = 3;
  personData: any = {
    name: '',
  };
  name = new FormControl('', [Validators.required]);
  age = 16;
  private unsubscribeAll: Subject<any>;

  constructor() {
    this.unsubscribeAll = new Subject();
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }

  start() {
    this.state = 1;
  }

  next(): void {
    this.state++;
  }

  prev() {
    this.state--;
  }

  setState(state) {
    this.state = state;
  }
}
