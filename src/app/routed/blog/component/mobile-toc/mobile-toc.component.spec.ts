import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileTocComponent } from './mobile-toc.component';

describe('MobileTocComponent', () => {
  let component: MobileTocComponent;
  let fixture: ComponentFixture<MobileTocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MobileTocComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MobileTocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
