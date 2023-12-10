# grid-fns
Functions for working with Grids

## install
```sh
npm install grid-fns
```

## functions
- [calc_cell_size](#calc_cell_size)
- [prepare_snap](#prepare_snap)
- [prepare_unsnap](#prepare_unsnap)

## usage
### calc_cell_size
```js
import calc_cell_size from "grid-fns/calc_cell_size.js"

calc_cell_size([-180, -90, 180, 90], [1024, 768])
[0.3515625, 0.234375] // [cell width, cell height]
```

### prepare_snap
Snap a grid point to a cell and return the cell's id.
```js
import prepare_snap from "grid-fns/prepare_snap.js"

const snap = prepare_snap({ bbox: [-180, -90, 180, 90], size: [1024, 768] })

snap(-180, 90) // top-left corner
0

snap(180, 90) // top-right corner
1024

snap(179.999999999, -89.9999999999) // bottom-right cell
786431
```

### prepare_unsnap
Creates a function that returns a coordinate for a given cell id
```js
const unsnap = prepare_unsnap({ bbox: [-180, -90, 180, 90], size: [1024, 768] })
unsnap(0);
[-179.82421875, 89.8828125] // center of top-left cell

unsnap(1024)
[-179.82421875, 89.6484375] // center of top-right cell
```
