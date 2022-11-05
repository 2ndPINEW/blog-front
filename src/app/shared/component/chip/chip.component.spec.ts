import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TagsApiService } from '../../service/tags.api.service';

import { ChipComponent } from './chip.component';

describe('ChipComponent', () => {
  let component: ChipComponent;
  let fixture: ComponentFixture<ChipComponent>;

  const tagsApiServiceStub = {

  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChipComponent ],
      providers: [
        {
          provide: TagsApiService,
          useValue: tagsApiServiceStub
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
