import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react-native';

import { PrimaryButton } from '@/components/ui/PrimaryButton';

describe('PrimaryButton', () => {
  const onPress = jest.fn();

  beforeEach(() => {
    onPress.mockClear();
  });

  it('renders label text', () => {
    render(<PrimaryButton label="Lưu" onPress={onPress} />);
    expect(screen.getByText('Lưu')).toBeOnTheScreen();
  });

  it('calls onPress when pressed', () => {
    render(<PrimaryButton label="Gửi" onPress={onPress} />);
    fireEvent.press(screen.getByText('Gửi'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('does not call onPress when disabled', () => {
    render(<PrimaryButton label="Gửi" onPress={onPress} disabled />);
    fireEvent.press(screen.getByText('Gửi'));
    expect(onPress).not.toHaveBeenCalled();
  });

  it('shows ActivityIndicator when loading', () => {
    render(<PrimaryButton label="Gửi" onPress={onPress} loading />);
    expect(screen.queryByText('Gửi')).toBeNull();
  });

  it('has correct accessibilityRole', () => {
    render(<PrimaryButton label="Lưu" onPress={onPress} />);
    expect(screen.getByRole('button')).toBeOnTheScreen();
  });

  it('uses custom accessibilityLabel when provided', () => {
    render(
      <PrimaryButton
        label="OK"
        onPress={onPress}
        accessibilityLabel="Xác nhận"
      />
    );
    expect(screen.getByLabelText('Xác nhận')).toBeOnTheScreen();
  });
});
