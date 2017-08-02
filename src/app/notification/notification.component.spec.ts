
import { TestBed } from '@angular/core/testing';
import { NotificationMessage } from './notification.component';
describe('App', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({ declarations: [NotificationMessage]});
  });
  it ('should work', () => {
    const fixture = TestBed.createComponent(NotificationMessage);
    expect(fixture.componentInstance instanceof NotificationMessage).toBe(true, 'should create NotificationComponent');
  });
});
