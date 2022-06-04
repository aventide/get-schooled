# Code Quality

* Use Immer or similar instead of JSON.parse(JSON.stringify(x))
* Factor out all instances of board.flat(). Use flattened board as default intermediate format for the board. Only use 2D array for displaying it?

# UI

* Turn history (uses existing actionSequence)

* transition banners like "computer is thinking".

* disable board controls during turn transitions.   