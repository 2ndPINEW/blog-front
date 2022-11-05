import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { BlogApiService } from 'src/app/shared/service/blog.api.service';
import { IndexApiService } from 'src/app/shared/service/index.api.service';

import { BlogComponent } from './blog.component';

describe('BlogComponent', () => {
  let component: BlogComponent;
  let fixture: ComponentFixture<BlogComponent>;

  const activatedRouteStub = {
    paramMap: of({
      get: () => undefined
    }),
    snapshot: {
      paramMap: {
        get: () => undefined
      }
    }
  }

  const blogApiServiceStub = {
    getBlogContent: () => of(undefined)
  }

  const indexApiServiceStub = {
    getList: () => of(undefined)
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlogComponent ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: activatedRouteStub
        }, {
          provide: BlogApiService,
          useValue: blogApiServiceStub
        }, {
          provide: IndexApiService,
          useValue: indexApiServiceStub
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
