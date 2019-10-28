import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateTaskPage } from './generate-task.page';

describe('GenerateTaskPage', () => {
  let component: GenerateTaskPage;
  let fixture: ComponentFixture<GenerateTaskPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenerateTaskPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerateTaskPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
