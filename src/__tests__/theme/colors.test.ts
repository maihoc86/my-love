import { Colors } from '@/theme/colors';

describe('Colors', () => {
  it('has correct primary color', () => {
    expect(Colors.primary).toBe('#FF2D55');
  });

  it('has correct AI purple color', () => {
    expect(Colors.aiPurple).toBe('#7B61FF');
  });

  it('has correct accent color', () => {
    expect(Colors.accent).toBe('#FFB800');
  });

  it('has correct background color', () => {
    expect(Colors.background).toBe('#FFFBF5');
  });

  it('has all required semantic colors', () => {
    expect(Colors.success).toBeDefined();
    expect(Colors.warning).toBeDefined();
    expect(Colors.error).toBeDefined();
    expect(Colors.info).toBeDefined();
  });

  it('has text hierarchy colors', () => {
    expect(Colors.textPrimary).toBe('#1A1033');
    expect(Colors.textSecondary).toBe('#5C5478');
    expect(Colors.textMuted).toBe('#B5ADCC');
  });
});
