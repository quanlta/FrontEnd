import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { AdminGuard } from './admin-guard.guard'; // Correct import statement

describe('AdminGuard', () => { // Use the correct class name 'AdminGuard'
  let guard: AdminGuard; // Declare a variable to hold the instance of the guard

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AdminGuard); // Instantiate the guard using TestBed.inject()
  });

  it('should be created', () => {
    expect(guard).toBeTruthy(); // Check if the guard instance is truthy
  });
});