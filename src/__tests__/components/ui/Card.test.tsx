import React from 'react';
import { Text } from 'react-native';
import { render, screen } from '@testing-library/react-native';

import { Card } from '@/components/ui/Card';

describe('Card', () => {
  it('renders children', () => {
    render(
      <Card>
        <Text>Card content</Text>
      </Card>
    );
    expect(screen.getByText('Card content')).toBeOnTheScreen();
  });

  it('applies custom backgroundColor', () => {
    render(
      <Card backgroundColor="#FF0000">
        <Text>Red card</Text>
      </Card>
    );
    expect(screen.getByText('Red card')).toBeOnTheScreen();
  });
});
