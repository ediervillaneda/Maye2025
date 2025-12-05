import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Animation2Component } from './animation2.component';

describe('Animation2Component', () => {
  let component: Animation2Component;
  let fixture: ComponentFixture<Animation2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Animation2Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Animation2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
