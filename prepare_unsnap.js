const calc_cell_size = require("./calc_cell_size.js");
const id_to_rowcol = require("./row-major/id_to_rowcol.js");

function prepare_unsnap({ bbox, size }) {
  const [xmin, ymin, xmax, ymax] = bbox;
  const [width, height] = size;
  const [cell_width, cell_height] = calc_cell_size({ bbox, size });
  const xulcenter = xmin + 0.5 * cell_width;
  const yulcenter = ymax - 0.5 * cell_height;
  return function unsnap(cell_id) {
    const { row, column } = id_to_rowcol(cell_id, width);
    const x = xulcenter + cell_width * column;
    const y = yulcenter - cell_height * row;
    // console.dir({ xmin, cell_width, xulcenter, cell_width, column, x, y });
    return [x, y];
  };
}

module.exports = prepare_unsnap;
module.exports.default = prepare_unsnap;
