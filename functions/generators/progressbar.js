/** @format
 *
 * Fuego By Painfuego
 * Version: 6.0.0-beta
 * © 2024 1sT-Services
 */

module.exports = progressBar = (player, size = 15) => {
  const redLine = "<:Redline:1170659711390060645>";
  const whiteLine = "<:Yellow_Line:1170659706570805258>";
  const slider = "<a:RD_nowplaying:1170660444596351007>";

  if (!player.queue.current) {
    return `${slider}${whiteLine.repeat(size - 1)}`;
  }

  const current = player.shoukaku.position || 0;
  const total = player.queue.current.length;

  if (current > total) {
    return `${redLine.repeat(size - 1)}${slider}`;
  }

  const progress = Math.round((size - 1) * (current / total));
  const remaining = size - 1 - progress;
  const bar = `${redLine.repeat(progress)}${slider}${whiteLine.repeat(
    remaining,
  )}`;

  return bar;
};
