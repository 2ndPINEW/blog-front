import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { IndexApiService } from 'src/app/shared/service/index.api.service';
import { SeoService } from 'src/app/shared/service/seo.service';
import { TagsApiService } from 'src/app/shared/service/tags.api.service';

import { IndexComponent } from './index.component';

describe('IndexComponent', () => {
  let component: IndexComponent;
  let fixture: ComponentFixture<IndexComponent>;

  const indexApiServiceStub = {
    getList: () => of(undefined)
  }

  const tagsApiServiceStub = {
    getTags: () => of(undefined)
  }

  const seoServiceStub = {
    update: () => {}
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndexComponent ],
      providers: [
        {
          provide: IndexApiService,
          useValue: indexApiServiceStub
        }, {
          provide: TagsApiService,
          useValue: tagsApiServiceStub
        }, {
          provide: SeoService,
          useValue: seoServiceStub
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
