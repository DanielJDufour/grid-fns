const test = require("flug");
const { calc_cell_size, prepare_snap, prepare_unsnap } = require("./index.js");

const id_to_rowcol = require("./row-major/id_to_rowcol.js");
const rowcol_to_id = require("./row-major/rowcol_to_id.js");

const GLOBE = [-180, -90, 180, 90];

test("id_to_rowcol", ({ eq }) => {
  eq(id_to_rowcol(5, 3), { column: 2, row: 1 });
});

test("id_to_rowcol", ({ eq }) => {
  eq(rowcol_to_id({ column: 2, row: 1, width: 3 }), 5);
});

test("calc_cell_size", ({ eq }) => {
  eq(calc_cell_size({ bbox: GLOBE, size: [360, 180] }), [1, 1]);
  eq(
    calc_cell_size({ bbox: [-180, -90, 180, 90], size: [1024, 768] }),
    [0.3515625, 0.234375]
  );
});

test("roundtrip", ({ eq }) => {
  const snap = prepare_snap({ bbox: GLOBE, size: [360, 180] });
  const unsnap = prepare_unsnap({ bbox: GLOBE, size: [360, 180] });
  eq(unsnap(snap(0.5, 0.05)), [0.5, 0.5]);
});

test("snap", ({ eq }) => {
  const width = 1024;
  const height = 768;
  const snap = prepare_snap({ bbox: GLOBE, size: [width, height] });
  eq(snap(-180, 90), 0);
  eq(snap(180, 90), 1024);

  const expected_cell_id = width * height - 1; // subtract 1 because index starts at zero
  eq(snap(179.999999999, -89.9999999999), expected_cell_id);
});

test("unsnap", ({ eq }) => {
  const width = 1024;
  const height = 768;
  const unsnap = prepare_unsnap({ bbox: GLOBE, size: [width, height] });
  eq(unsnap(0), [-179.82421875, 89.8828125]);
  eq(unsnap(1024), [-179.82421875, 89.6484375]);

  const lower_right_cell_id = width * height - 1;
  eq(unsnap(lower_right_cell_id), [179.82421875, -89.8828125]);
});

test("off right edge", ({ eq }) => {
  let msg;
  try {
    const width = 1024;
    const height = 768;
    const snap = prepare_snap({ bbox: GLOBE, size: [width, height] });
    snap(180.00000000001, 0);
  } catch (error) {
    msg = error.message;
  }
  eq(msg, "[grid-fns] point outside bounds of grid");
});
