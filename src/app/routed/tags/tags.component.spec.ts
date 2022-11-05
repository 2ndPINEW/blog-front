import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { SeoService } from 'src/app/shared/service/seo.service';
import { TagsApiService } from 'src/app/shared/service/tags.api.service';

import { TagsComponent } from './tags.component';

describe('TagsComponent', () => {
  let component: TagsComponent;
  let fixture: ComponentFixture<TagsComponent>;

  const tagsApiServiceStub = {
    getTags: () => of(undefined),
    getListFromTag: () => of(undefined)
  }

  const seoServiceStub = {
    update: () => {}
  }

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

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TagsComponent ],
      providers: [
        {
          provide: TagsApiService,
          useValue: tagsApiServiceStub
        }, {
          provide: SeoService,
          useValue: seoServiceStub
        }, {
          provide: ActivatedRoute,
          useValue: activatedRouteStub
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TagsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
