import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ReplaySubject, Subject} from 'rxjs';
import {FormControl, Validators} from '@angular/forms';
import {Cafedra, CAFEDRAS} from '../shared/model/cafedra';
import {MatSelect} from '@angular/material';
import {take, takeUntil} from 'rxjs/operators';
import {HOBBIES, Hobby} from '../shared/model/hobby';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy, AfterViewInit {

  state = 9;
  name = new FormControl('', [Validators.required]);
  mail = new FormControl('', [Validators.required, Validators.email]);
  phone = new FormControl('', [Validators.required]);
  age = 16;
  univerInfo = '1';
  cafedraList: Cafedra[] = CAFEDRAS;
  public cafedraCtrl: FormControl = new FormControl();
  public cafedraFilterCtrl: FormControl = new FormControl();
  public filteredCafedras: ReplaySubject<Cafedra[]> = new ReplaySubject<Cafedra[]>(1);
  @ViewChild('cafedraSelect', {static: false}) cafedraSelect: MatSelect;
  hobbyList: Hobby[] = HOBBIES;
  public hobbyCtrl: FormControl = new FormControl();
  public hobbyFilterCtrl: FormControl = new FormControl();
  public filteredHobbies: ReplaySubject<Hobby[]> = new ReplaySubject<Hobby[]>(1);
  @ViewChild('hobbySelect', {static: false}) hobbySelect: MatSelect;
  private unsubscribeAll: Subject<any>;

  constructor() {
    this.unsubscribeAll = new Subject();
  }

  ngOnInit(): void {
    /*
      6 state
     */
    console.log('oninit');
    this.cafedraCtrl.setValue(this.cafedraList[0]);
    this.filteredCafedras.next(this.cafedraList.slice());
    this.cafedraFilterCtrl.valueChanges
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe(() => {
        this.filterCafedras();
      });
    /*
      7 state
     */
    this.hobbyCtrl.setValue(this.hobbyList[0]);
    this.filteredHobbies.next(this.hobbyList.slice());
    this.hobbyFilterCtrl.valueChanges
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe(() => {
        this.filterHobbies();
      });
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }

  ngAfterViewInit() {
    this.setInitialCafedraValue();
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
  protected setInitialCafedraValue() {
    this.filteredCafedras
      .pipe(take(1), takeUntil(this.unsubscribeAll))
      .subscribe(() => {
        this.cafedraSelect.compareWith = (a: Cafedra, b: Cafedra) => a && b && a.id === b.id;
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

  /*
    7. Чем вы занимаетесь сейчас?
   */
  protected setInitialValue() {
    this.filteredCafedras
      .pipe(take(1), takeUntil(this.unsubscribeAll))
      .subscribe(() => {
        this.hobbySelect.compareWith = (a: Hobby, b: Hobby) => a && b && a.id === b.id;
      });
  }

  protected filterHobbies() {
    if (!this.hobbyList) {
      return;
    }
    let search = this.hobbyFilterCtrl.value;
    if (!search) {
      this.filteredHobbies.next(this.hobbyList.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    this.filteredHobbies.next(
      this.hobbyList.filter(hobby => hobby.name.toLowerCase().indexOf(search) > -1)
    );
  }

}
