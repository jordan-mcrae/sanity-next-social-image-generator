export const colorize = async (filterColor: string, width: number, height: number): Promise<Buffer> => {
  const overlay = `<svg width="${width}" height="${height}">
    <rect
      width="${width}"
      height="${height}"
      fill="${filterColor || 'black'}"
      fill-opacity="0.5"
    />
  </svg>`;

  return Buffer.from(overlay);
};
