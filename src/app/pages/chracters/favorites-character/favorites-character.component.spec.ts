import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoritesCharacterComponent } from './favorites-character.component';

xdescribe('FavoritesComponent', () => {
  let component: FavoritesCharacterComponent;
  let fixture: ComponentFixture<FavoritesCharacterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FavoritesCharacterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FavoritesCharacterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
