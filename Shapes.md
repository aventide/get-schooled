# Base data types

boardSpace: {x: 2, y: 4, occupyingTile: 13}
(only on board)

tile: {animal: 'crab', color: '#a6d8d8', id: 19}
(passed around - can be represented as a pointed-to object from board, or the bank)

# Bank

Array of tiles:
```
{animal: 'crab', color: '#a6d8d8', id: 19}
```

# Board

2D Array (or flattened, as buffer for processing) of boardSpaces:
```
{x: 2, y: 4, occupyingTile: 13}
```

# TurnFor

"animals" || "colors"