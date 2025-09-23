import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PptGenerator } from './ppt-generator';

describe('PptGenerator', () => {
  let component: PptGenerator;
  let fixture: ComponentFixture<PptGenerator>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PptGenerator]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PptGenerator);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
