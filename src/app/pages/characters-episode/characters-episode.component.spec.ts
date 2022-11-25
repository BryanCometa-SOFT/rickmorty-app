import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharactersEpisodeComponent } from './characters-episode.component';

describe('CharactersEpisodeComponent', () => {
  let component: CharactersEpisodeComponent;
  let fixture: ComponentFixture<CharactersEpisodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CharactersEpisodeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CharactersEpisodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
