function rowcol_to_id({ row, column, width }) {
  return row * width + column;
}

module.exports = rowcol_to_id;
module.exports.default = rowcol_to_id;
