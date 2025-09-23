import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PptEditor } from './ppt-editor';

describe('PptEditor', () => {
  let component: PptEditor;
  let fixture: ComponentFixture<PptEditor>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PptEditor]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PptEditor);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
