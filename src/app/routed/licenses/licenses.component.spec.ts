import { HttpClient } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { LicensesComponent } from './licenses.component';

describe('LicensesComponent', () => {
  let component: LicensesComponent;
  let fixture: ComponentFixture<LicensesComponent>;

  const httpClientStub = {
    get: () => of('hoge')
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LicensesComponent ],
      providers: [
        {
          provide: HttpClient,
          useValue: httpClientStub
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LicensesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
