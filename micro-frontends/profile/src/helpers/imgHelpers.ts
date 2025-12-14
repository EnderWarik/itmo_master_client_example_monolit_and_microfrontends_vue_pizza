export function makeAvatar(
  base: string,
  dir = "./src/assets/img/users", // папка
  scales = { x1: "@2x", x2: "@4x" },
) {
  const webp = {
    x1: `${dir}/${base}${scales.x1}.webp`,
    x2: `${dir}/${base}${scales.x2}.webp`,
  };
  const jpg = {
    x1: `${dir}/${base}${scales.x1}.jpg`,
    x2: `${dir}/${base}${scales.x2}.jpg`,
  };
  return { webp, jpg };
}
