import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { UserGuardGuard } from './user-guard.guard'; // Note the correct import name

describe('UserGuardGuard', () => { // Note the correct class name
  let guard: UserGuardGuard; // Declare a variable to hold the instance of the guard

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(UserGuardGuard); // Instantiate the guard using TestBed.inject()
  });

  it('should be created', () => {
    expect(guard).toBeTruthy(); // Check if the guard instance is truthy
  });
});
