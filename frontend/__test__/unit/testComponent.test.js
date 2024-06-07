import React from 'react'

import { render, screen } from '@testing-library/react';
// Import the component you want to test
import TestComponent from '../../src/components/TestComponent';



  test('should render the test component', () => {
     render(
        <TestComponent />
    );

    // Check if the username, email, password, confirm password fields are rendered
    const signup= screen.getByTestId("signup-heading")
    expect(signup).toBeInTheDocument();
    
  });
