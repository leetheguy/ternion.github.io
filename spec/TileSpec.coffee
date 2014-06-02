describe "Tile", ->
  point = null
  tile  = null

  beforeEach ->
    point = new cjs.Point(4,2)
    tile = new Tile(point, app.board.level)

  it "creates a new point", ->
    expect(tile.coords).not.toBe(point)

  it "has a width and height of 32", ->
    expect(tile.width).toEqual(32)
    expect(tile.height).toEqual(32)

  it "calculates its own x / y position based on its width / height", ->
    expect(tile.x).toEqual(96)
    expect(tile.y).toEqual(32)

  it "puts the first row and column off screen", ->
    tile = new Tile(new cjs.Point(0,0), 1)
    expect(tile.x).toEqual(-32)
    expect(tile.y).toEqual(-32)

  xit "renders a random sprite based on the board level", ->
    expect(
        tile.getChildAt(0) == app.assets.floors[0][0] ||
        tile.getChildAt(0) == app.assets.floors[0][1])
    .toBeTruthy()
    expect(tile.getNumChildren()).toBeGreaterThan(0)

    app.board.level = 11
    tile = new Tile(point, app.board.level)
    expect(
        tile.getChildAt(0) == app.assets.floors[1][0] ||
        tile.getChildAt(0) == app.assets.floors[1][1])
    .toBeTruthy()
    expect(tile.getNumChildren()).toBeGreaterThan(0)

    app.board.level = 21
    tile = new Tile(point, app.board.level)
    expect(
        tile.getChildAt(0) == app.assets.floors[2][0] ||
        tile.getChildAt(0) == app.assets.floors[2][1])
    .toBeTruthy()
    expect(tile.getNumChildren()).toBeGreaterThan(0)

    app.board.level = 31
    tile = new Tile(point, app.board.level)
    expect(
        tile.getChildAt(0) == app.assets.floors[3][0] ||
        tile.getChildAt(0) == app.assets.floors[3][1])
    .toBeTruthy()
    expect(tile.getNumChildren()).toBeGreaterThan(0)

    app.board.level = 41
    tile = new Tile(point, app.board.level)
    expect(
        tile.getChildAt(0) == app.assets.floors[4][0] ||
        tile.getChildAt(0) == app.assets.floors[4][1])
    .toBeTruthy()
    expect(tile.getNumChildren()).toBeGreaterThan(0)

