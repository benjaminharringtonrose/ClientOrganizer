const baseSpacing = Object.freeze({
  micro: 4,
  xsmall: 8,
  small: 12,
  med: 16,
  large: 24,
  xlarge: 40,
  xxlarge: 64,
});

export const Spacing = Object.freeze({
  ...baseSpacing,
  sideMargin: baseSpacing.large,
});
