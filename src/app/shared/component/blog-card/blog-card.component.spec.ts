import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BlogApiService } from '../../service/blog.api.service';
import { BrowserSupportService } from '../../service/browser-support.service';

import { BlogCardComponent } from './blog-card.component';

describe('BlogCardComponent', () => {
  let component: BlogCardComponent;
  let fixture: ComponentFixture<BlogCardComponent>;

  const blogApiServiceStub = {

  }

  const browserSupportServiceStub = {
    isSupportWebp: true
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlogCardComponent ],
      providers: [
        {
          provide: BlogApiService,
          useValue: blogApiServiceStub
        }, {
          provide: BrowserSupportService,
          useValue: browserSupportServiceStub
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
