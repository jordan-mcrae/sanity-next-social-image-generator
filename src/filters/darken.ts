export const darkenFilter = async (darken: number, width: number, height: number): Promise<Buffer> => {
  const overlay = `<svg width="${width}" height="${height}">
    <rect
      width="${width}"
      height="${height}"
      fill="black"
      fill-opacity="${darken / 100}"
    />
  </svg>`;

  return Buffer.from(overlay);
};
