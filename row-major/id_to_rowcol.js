function id_to_rowcol(cell_id, width) {
  const row = Math.floor(cell_id / width);
  const column = cell_id % width;
  return { column, row };
}

module.exports = id_to_rowcol;
module.exports.default = id_to_rowcol;
