import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReanimationComponent } from './reanimation.component';

describe('ReanimationComponent', () => {
  let component: ReanimationComponent;
  let fixture: ComponentFixture<ReanimationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReanimationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReanimationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
