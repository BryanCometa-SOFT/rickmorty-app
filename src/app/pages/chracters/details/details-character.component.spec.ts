import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsCharacterComponent } from './details-character.component';

xdescribe('CharactersEpisodeComponent', () => {
  let component: DetailsCharacterComponent;
  let fixture: ComponentFixture<DetailsCharacterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsCharacterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailsCharacterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
