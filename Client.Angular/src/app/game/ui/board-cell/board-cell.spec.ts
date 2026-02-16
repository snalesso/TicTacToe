import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardCell } from './board-cell';

describe('BoardCell', () => {
  let component: BoardCell;
  let fixture: ComponentFixture<BoardCell>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BoardCell]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoardCell);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
