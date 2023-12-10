function calc_cell_size({ bbox, size }) {
  const [xmin, ymin, xmax, ymax] = bbox;
  const [width, height] = size;
  return [(xmax - xmin) / width, (ymax - ymin) / height];
}

module.exports = calc_cell_size;
module.exports.default = calc_cell_size;
