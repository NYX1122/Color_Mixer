import chroma from 'chroma-js';

import colorDisplayer from 'color_displayer';

export default function (colors, weights) {
  colorDisplayer(colors);
  if (colors.length !== weights.length) {
    throw new Error('Colors and weights arrays must be of the same length.');
  }

  let totalWeight = weights.reduce((acc, weight) => acc + weight, 0);

  let hclSum = colors
    .reduce(
      (acc, color, index) => {
        let [h, c, l] = chroma(color).hcl();
        let weight = weights[index];
        return [acc[0] + h * weight, acc[1] + c * weight, acc[2] + l * weight];
      },
      [0, 0, 0]
    )
    .map((sum) => sum / totalWeight);
  // Ensure the hue is within the 0-360 range
  hclSum[0] = hclSum[0] % 360;
  if (hclSum[0] < 0) hclSum[0] += 360;

  const weightedColor = chroma.hcl(...hclSum).hex();

  console.log('Mixed color:');
  colorDisplayer([weightedColor]);

  return weightedColor;
}
