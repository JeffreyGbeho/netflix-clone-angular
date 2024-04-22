import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrontpageMovieComponent } from './frontpage-movie.component';

describe('FrontpageMovieComponent', () => {
  let component: FrontpageMovieComponent;
  let fixture: ComponentFixture<FrontpageMovieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FrontpageMovieComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FrontpageMovieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
