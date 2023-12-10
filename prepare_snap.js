const calc_cell_size = require("./calc_cell_size.js");
const rowcol_to_id = require("./row-major/rowcol_to_id.js");

/**
 *
 * @param {[Number, Number, Number, Number]} bbox - [xmin, ymin, xmax, ymax]
 * @param {[Number, Number]} size - [width, height]
 * @returns {(x: Number, y: Number) => Number} - Snap Function
 */
function prepare_snap({ bbox, size }) {
  const [xmin, ymin, xmax, ymax] = bbox;
  const [width, height] = size;
  const [cell_width, cell_height] = calc_cell_size({ bbox, size });
  return function snap(x, y) {
    if (x < xmin || x > xmax || y < ymin || y > ymax) {
      throw Error("[grid-fns] point outside bounds of grid");
    }
    const column = Math.floor((x - xmin) / cell_width);
    const row = Math.floor((ymax - y) / cell_height);
    const id = rowcol_to_id({ row, column, width });
    return id;
  };
}

module.exports = prepare_snap;
module.exports.default = prepare_snap;
