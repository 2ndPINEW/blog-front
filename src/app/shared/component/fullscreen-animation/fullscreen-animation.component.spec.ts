import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ThemeSwitchService } from '../../service/theme-switch.service';

import { FullscreenAnimationComponent } from './fullscreen-animation.component';

describe('FullscreenAnimationComponent', () => {
  let component: FullscreenAnimationComponent;
  let fixture: ComponentFixture<FullscreenAnimationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FullscreenAnimationComponent ],
      providers: [
        {
          provide: ThemeSwitchService,
          useFactory: () => {
            theme: ''
          }
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FullscreenAnimationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
