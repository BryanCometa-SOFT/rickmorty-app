import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeCharacterComponent } from './home-character.component';

xdescribe('CharactersEpisodeComponent', () => {
  let component: HomeCharacterComponent;
  let fixture: ComponentFixture<HomeCharacterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeCharacterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeCharacterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
