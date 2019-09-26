import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ReplaySubject, Subject} from 'rxjs';
import {FormControl, Validators} from '@angular/forms';
import {Cafedra, CAFEDRAS} from "../shared/model/cafedra";
import {MatSelect} from "@angular/material";
import {take, takeUntil} from "rxjs/operators";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy, AfterViewInit {

  state = 5;
  name = new FormControl('', [Validators.required]);
  age = 16;
  univerInfo = '1';
  private unsubscribeAll: Subject<any>;
  cafedraList: Cafedra[] = CAFEDRAS;
  public cafedraCtrl: FormControl = new FormControl();
  public cafedraFilterCtrl: FormControl = new FormControl();
  public filteredCafedras: ReplaySubject<Cafedra[]> = new ReplaySubject<Cafedra[]>(1);
  @ViewChild('singleSelect', {static: false}) singleSelect: MatSelect;

  constructor() {
    this.unsubscribeAll = new Subject();
  }

  ngOnInit(): void {
    /*
      6 state
     */
    console.log('oninit');
    this.cafedraCtrl.setValue(this.cafedraList[2]);
    this.filteredCafedras.next(this.cafedraList.slice());
    this.cafedraFilterCtrl.valueChanges
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe(() => {
        this.filterCafedras();
      });
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }

  ngAfterViewInit() {
    console.log('view init');
    this.setInitialValue();
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

  /*
    6. На кого вы учились?
   */
  protected setInitialValue() {
    this.filteredCafedras
      .pipe(take(1), takeUntil(this.unsubscribeAll))
      .subscribe(() => {
        this.singleSelect.compareWith = (a: Cafedra, b: Cafedra) => a && b && a.id === b.id;
      });
  }

  protected filterCafedras() {
    if (!this.cafedraList) {
      return;
    }
    let search = this.cafedraFilterCtrl.value;
    if (!search) {
      this.filteredCafedras.next(this.cafedraList.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    this.filteredCafedras.next(
      this.cafedraList.filter(cafedra => cafedra.name.toLowerCase().indexOf(search) > -1)
    );
  }

}
