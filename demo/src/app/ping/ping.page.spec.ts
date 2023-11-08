import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PingPage } from './ping.page';

describe('PingPage', () => {
  let component: PingPage;
  let fixture: ComponentFixture<PingPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(PingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
