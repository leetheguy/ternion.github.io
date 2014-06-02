describe "Board", ->
  describe "initialization", ->
    it "creates a new board at level 1", ->
      expect(app.board.level).toEqual(1)

    it "removes existing children", ->
      app.board.addChild(new cjs.Shape())
      app.board = initBoard()
      expect(app.board.getNumChildren()).toEqual(0)

  describe "buildRoomArray", ->
    it "creates a 5x5 array of rooms", ->
      expect(app.board.rooms.length).toEqual(5)
      expect(app.board.rooms[0].length).toEqual(5)

    it "assigns 1      room  as entry", ->
      entries = _.chain(app.board.rooms)
        .flatten().filter (room) -> room.name is "entry"
        .value().length
      expect(entries).toEqual(1)

    it "assigns 1 room  as exit", ->
      entries = _.chain(app.board.rooms)
        .flatten().filter (room) -> room.name is "exit"
        .value().length
      expect(entries).toEqual(1)

    it "assigns 3..4 rooms as empty", ->
      entries = _.chain(app.board.rooms)
        .flatten().filter (room) -> room.name is "empty"
        .value().length
      expect(entries).toBeLessThan(5)
      expect(entries).toBeGreaterThan(2)

    it "assigns 7..11 rooms as room", ->
      entries = _.chain(app.board.rooms)
        .flatten().filter (room) -> room.name is "room"
        .value().length
      expect(entries).toBeLessThan(12)
      expect(entries).toBeGreaterThan(6)

    it "assigns 8..15 rooms as hall", ->
      entries = _.chain(app.board.rooms)
        .flatten().filter (room) -> room.name is "hall"
        .value().length
      expect(entries).toBeLessThan(16)
      expect(entries).toBeGreaterThan(7)

  describe "buildTileArray", ->
    it "creates a 27x27 array", ->
      expect(app.board.tiles.length).toEqual(27)
      expect(app.board.tiles[26].length).toEqual(27)

    it "has a Tile Container in each place", ->
      expect(app.board.tiles[0][0]).toEqual(jasmine.any(Tile))
      expect(app.board.tiles[4][2]).toEqual(jasmine.any(Tile))
      expect(app.board.tiles[26][26]).toEqual(jasmine.any(Tile))

  describe "plotPaths", ->
    xit "makes every room connected", ->
      connectedRooms = _.filter(_.flatten(app.board.rooms), (room) -> room.connected)
      expect(connectedRooms.length).toEqual(25)

    xit "makes every non-empty room have an exit", ->
      exitableRooms = _.filter(_.flatten(app.board.rooms), (room) -> room.exits.length > 0 or room.name is "empty")
      expect(exitableRooms.length).toEqual(25)

   describe "createPathFrom", ->
     it "returns an array of rooms that ends in a connected room or a dead end", ->
       entry = _.where(_.flatten(app.board.rooms), name: "entry")[0]
       path  = app.board.createPathFrom(entry)
       last  = _.last(path)
       expect(last.connected or _.isEmpty(app.board.findEscapes(last))).toBeTruthy()

   describe "findEscapes", ->
     it "returns escapes", ->
       room = app.board.rooms[3][3]
       expect(_.isEmpty(app.board.findEscapes(room))).toBeFalsy()

     it "doesn't return an exit past the top edge", ->
       room = app.board.rooms[1][0]
       escapes = app.board.findEscapes(room)
       expect(escapes.north).toBe(undefined)

     it "doesn't return an exit past the right edge", ->
       room = app.board.rooms[4][1]
       escapes = app.board.findEscapes(room)
       expect(escapes.east).toBe(undefined)

     it "doesn't return an exit past the bottom edge", ->
       room = app.board.rooms[1][4]
       escapes = app.board.findEscapes(room)
       expect(escapes.south).toBe(undefined)

     it "doesn't return an exit past the left edge", ->
       room = app.board.rooms[0][1]
       escapes = app.board.findEscapes(room)
       expect(escapes.west).toBe(undefined)

     it "doesn't return a seeking room above this one", ->
       app.board.rooms[3][3].seeking = true
       room = app.board.rooms[3][4]
       escapes = app.board.findEscapes(room)
       expect(escapes.north).toBe(undefined)

     it "doesn't return a seeking room to the right of this one", ->
       app.board.rooms[3][3].seeking = true
       room = app.board.rooms[2][3]
       escapes = app.board.findEscapes(room)
       expect(escapes.east).toBe(undefined)


     it "doesn't return a seeking room below this one", ->
       app.board.rooms[3][3].seeking = true
       room = app.board.rooms[3][2]
       escapes = app.board.findEscapes(room)
       expect(escapes.south).toBe(undefined)


     it "doesn't return a seeking room to the left of this one", ->
       app.board.rooms[3][3].name = "empty"
       room = app.board.rooms[4][3]
       escapes = app.board.findEscapes(room)
       expect(escapes.west).toBe(undefined)

     it "doesn't return an empty room above this one", ->
       app.board.rooms[3][3].name = "empty"
       room = app.board.rooms[3][4]
       escapes = app.board.findEscapes(room)
       expect(escapes.north).toBe(undefined)

     it "doesn't return an empty room to the right of this one", ->
       app.board.rooms[3][3].name = "empty"
       room = app.board.rooms[2][3]
       escapes = app.board.findEscapes(room)
       expect(escapes.east).toBe(undefined)


     it "doesn't return an empty room below this one", ->
       app.board.rooms[3][3].name = "empty"
       room = app.board.rooms[3][2]
       escapes = app.board.findEscapes(room)
       expect(escapes.south).toBe(undefined)


     it "doesn't return an empty room to the left of this one", ->
       app.board.rooms[3][3].seeking = true
       room = app.board.rooms[4][3]
       escapes = app.board.findEscapes(room)
       expect(escapes.west).toBe(undefined)

  describe "getNextRoom", ->
    room = null
    next = null

    beforeEach ->
      room = app.board.rooms[0][0]
      next = app.board.getNextRoom room

    it "returns a room that can be exited to", ->
      expect((next.coords.x is 1 and next.coords.y is 0) or (next.coords.x is 0 and next.coords.y is 1)).toBeTruthy()

    it "makes the next room seeking", ->
      expect(next.seeking).toBeTruthy()


#  describe "build map", ->
#    it "builds a foundation with a map surrounded by walls", ->
#      console.info app.board.map
#      expect(app.board.map[0][0]).toEqual(1)
#      expect(app.board.map[0][5]).toEqual(1)
#      expect(app.board.map[5][0]).toEqual(1)
#      expect(app.board.map[11][5]).toEqual(1)
#      expect(app.board.map[5][11]).toEqual(1)
#      expect(app.board.map[11][11]).toEqual(1)
#      expect(app.board.map[11][11]).toEqual(1)
#
#    it "makes all odd x / odd y tiles floors", ->
#      expect(app.board.map[1][1]).toEqual(0)
#      expect(app.board.map[3][7]).toEqual(0)
#      expect(app.board.map[9][5]).toEqual(0)
#    
#    it "makes all other tiles walls", ->
#      expect(app.board.map[2][2]).toEqual(1)
#      expect(app.board.map[4][7]).toEqual(1)
#      expect(app.board.map[9][4]).toEqual(1)

