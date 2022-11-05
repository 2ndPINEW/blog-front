import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BlogApiService } from '../../service/blog.api.service';

import { BlogCardComponent } from './blog-card.component';

describe('BlogCardComponent', () => {
  let component: BlogCardComponent;
  let fixture: ComponentFixture<BlogCardComponent>;

  const blogApiServiceStub = {

  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlogCardComponent ],
      providers: [
        {
          provide: BlogApiService,
          useValue: blogApiServiceStub
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlogCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
