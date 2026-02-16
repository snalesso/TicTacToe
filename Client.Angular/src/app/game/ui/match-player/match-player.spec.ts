import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchPlayer } from './match-player';

describe('MatchPlayer', () => {
  let component: MatchPlayer;
  let fixture: ComponentFixture<MatchPlayer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatchPlayer]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MatchPlayer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
