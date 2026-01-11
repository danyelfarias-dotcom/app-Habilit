
import React from 'react';

// Benefit interface for student and instructor features
export interface Benefit {
  title: string;
  description: string;
  icon: React.ReactNode;
}

// Step interface for the 'How it Works' section
export interface Step {
  number: string;
  title: string;
  description: string;
}
