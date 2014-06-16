// Generated by CoffeeScript 1.7.1
describe("Board", function() {
  describe("buildMap", function() {
    return it("creates a 21x21 array as a map", function() {
      expect(app.board.map.length).toEqual(21);
      expect(app.board.map[15].length).toEqual(21);
      return expect(app.board.map[20].length).toEqual(21);
    });
  });
  describe("initialization", function() {
    it("creates a new board at level 1", function() {
      return expect(app.board.level).toEqual(1);
    });
    return it("removes existing children", function() {
      var child;
      child = app.board.addChild(new cjs.Shape());
      app.board = initBoard();
      return expect(app.board.contains(child)).toBe(false);
    });
  });
  describe("buildRoomArray", function() {
    it("creates a 5x5 array of rooms", function() {
      expect(app.board.rooms.length).toEqual(5);
      return expect(app.board.rooms[0].length).toEqual(5);
    });
    it("assigns 1 room as entry", function() {
      var entries;
      entries = _.chain(app.board.rooms).flatten().filter(function(room) {
        return room.name === "entry";
      }).value().length;
      return expect(entries).toEqual(1);
    });
    it("assigns 1 room as exit", function() {
      var entries;
      entries = _.chain(app.board.rooms).flatten().filter(function(room) {
        return room.name === "exit";
      }).value().length;
      return expect(entries).toEqual(1);
    });
    it("makes exit room connected", function() {
      var exit;
      exit = _.chain(app.board.rooms).flatten().filter(function(room) {
        return room.name === "exit";
      }).last().value();
      return expect(exit.connected).toBeTruthy();
    });
    it("assigns 3..4 rooms as empty", function() {
      var entries;
      entries = _.chain(app.board.rooms).flatten().filter(function(room) {
        return room.name === "empty";
      }).value().length;
      expect(entries).toBeLessThan(5);
      return expect(entries).toBeGreaterThan(2);
    });
    it("assigns 7..11 rooms as room", function() {
      var entries;
      entries = _.chain(app.board.rooms).flatten().filter(function(room) {
        return room.name === "room";
      }).value().length;
      expect(entries).toBeLessThan(12);
      return expect(entries).toBeGreaterThan(6);
    });
    return it("assigns 8..15 rooms as hall", function() {
      var entries;
      entries = _.chain(app.board.rooms).flatten().filter(function(room) {
        return room.name === "hall";
      }).value().length;
      expect(entries).toBeLessThan(16);
      return expect(entries).toBeGreaterThan(7);
    });
  });
  describe("buildTileArray", function() {
    it("creates a 21x21 array", function() {
      expect(app.board.tiles.length).toEqual(21);
      return expect(app.board.tiles[20].length).toEqual(21);
    });
    return it("has a Tile Container in each place", function() {
      expect(app.board.tiles[0][0]).toEqual(jasmine.any(Tile));
      expect(app.board.tiles[4][2]).toEqual(jasmine.any(Tile));
      return expect(app.board.tiles[18][18]).toEqual(jasmine.any(Tile));
    });
  });
  describe("plotPaths", function() {
    it("makes every room connected", function() {
      var connectedRooms;
      connectedRooms = _.filter(_.flatten(app.board.rooms), function(room) {
        return room.connected;
      });
      return expect(connectedRooms.length).toEqual(25);
    });
    return xit("intermittently fails: makes every non-empty room have an exit", function() {
      var exitableRooms;
      exitableRooms = _.filter(_.flatten(app.board.rooms), function(room) {
        return !_.isEmpty(room.exits) || room.name === "empty";
      });
      return expect(exitableRooms.length).toEqual(25);
    });
  });
  describe("createPathFrom", function() {
    it("returns an array of rooms that ends in a connected room or a dead end", function() {
      var entry, last, path;
      entry = _.where(_.flatten(app.board.rooms), {
        name: "entry"
      })[0];
      path = app.board.createPathFrom(entry);
      last = _.last(path);
      return expect(last.connected || _.isEmpty(app.board.findEscapes(last))).toBeTruthy();
    });
    it("marks each room as connected if the last room is an exit", function() {
      var entry, exit, path;
      exit = _.where(_.flatten(app.board.rooms), {
        name: "exit"
      })[0];
      spyOn(app.board, 'getNextRoom').and.returnValue(exit);
      entry = _.where(_.flatten(app.board.rooms), {
        name: "entry"
      })[0];
      path = app.board.createPathFrom(entry);
      return expect(path[0].connected).toBeTruthy();
    });
    return it("recursively creates paths until all are connected", function() {
      var entry, exit, path;
      entry = _.where(_.flatten(app.board.rooms), {
        name: "entry"
      })[0];
      exit = _.where(_.flatten(app.board.rooms), {
        name: "exit"
      })[0];
      path = app.board.createPathFrom(entry);
      return expect(path[0].connected).toBeTruthy();
    });
  });
  describe("findEscapes", function() {
    it("returns escapes", function() {
      var room;
      emptyBoard();
      room = app.board.rooms[3][3];
      return expect(_.isEmpty(app.board.findEscapes(room))).toBeFalsy();
    });
    it("doesn't return an exit past the top edge", function() {
      var escapes, room;
      room = app.board.rooms[1][0];
      escapes = app.board.findEscapes(room);
      return expect(escapes.north).toBe(void 0);
    });
    it("doesn't return an exit past the right edge", function() {
      var escapes, room;
      room = app.board.rooms[4][1];
      escapes = app.board.findEscapes(room);
      return expect(escapes.east).toBe(void 0);
    });
    it("doesn't return an exit past the bottom edge", function() {
      var escapes, room;
      room = app.board.rooms[1][4];
      escapes = app.board.findEscapes(room);
      return expect(escapes.south).toBe(void 0);
    });
    it("doesn't return an exit past the left edge", function() {
      var escapes, room;
      room = app.board.rooms[0][1];
      escapes = app.board.findEscapes(room);
      return expect(escapes.west).toBe(void 0);
    });
    it("doesn't return a seeking room above this one", function() {
      var escapes, room;
      app.board.rooms[3][3].seeking = true;
      room = app.board.rooms[3][4];
      escapes = app.board.findEscapes(room);
      return expect(escapes.north).toBe(void 0);
    });
    it("doesn't return a seeking room to the right of this one", function() {
      var escapes, room;
      app.board.rooms[3][3].seeking = true;
      room = app.board.rooms[2][3];
      escapes = app.board.findEscapes(room);
      return expect(escapes.east).toBe(void 0);
    });
    it("doesn't return a seeking room below this one", function() {
      var escapes, room;
      app.board.rooms[3][3].seeking = true;
      room = app.board.rooms[3][2];
      escapes = app.board.findEscapes(room);
      return expect(escapes.south).toBe(void 0);
    });
    it("doesn't return a seeking room to the left of this one", function() {
      var escapes, room;
      app.board.rooms[3][3].name = "empty";
      room = app.board.rooms[4][3];
      escapes = app.board.findEscapes(room);
      return expect(escapes.west).toBe(void 0);
    });
    it("doesn't return an empty room above this one", function() {
      var escapes, room;
      app.board.rooms[3][3].name = "empty";
      room = app.board.rooms[3][4];
      escapes = app.board.findEscapes(room);
      return expect(escapes.north).toBe(void 0);
    });
    it("doesn't return an empty room to the right of this one", function() {
      var escapes, room;
      app.board.rooms[3][3].name = "empty";
      room = app.board.rooms[2][3];
      escapes = app.board.findEscapes(room);
      return expect(escapes.east).toBe(void 0);
    });
    it("doesn't return an empty room below this one", function() {
      var escapes, room;
      app.board.rooms[3][3].name = "empty";
      room = app.board.rooms[3][2];
      escapes = app.board.findEscapes(room);
      return expect(escapes.south).toBe(void 0);
    });
    return it("doesn't return an empty room to the left of this one", function() {
      var escapes, room;
      app.board.rooms[3][3].seeking = true;
      room = app.board.rooms[4][3];
      escapes = app.board.findEscapes(room);
      return expect(escapes.west).toBe(void 0);
    });
  });
  describe("getNextRoom", function() {
    var next, room;
    room = null;
    next = null;
    beforeEach(function() {
      emptyBoard();
      room = app.board.rooms[0][0];
      return next = app.board.getNextRoom(room);
    });
    it("returns a room that can be exited to", function() {
      return expect((next.coords.x === 1 && next.coords.y === 0) || (next.coords.x === 0 && next.coords.y === 1)).toBeTruthy();
    });
    return it("makes the next room seeking", function() {
      return expect(next.seeking).toBeTruthy();
    });
  });
  describe("mapArchitecture", function() {
    var room;
    room = null;
    beforeEach(function() {
      emptyBoard();
      return room = new Room(new cjs.Point(2, 2));
    });
    it("places rooms accurately on the map", function() {
      app.board.renderRoom(room);
      expect(app.board.map[9][9]).toEqual(0);
      expect(app.board.map[11][11]).toEqual(0);
      return expect(app.board.map[12][12]).toEqual(1);
    });
    describe("standard room doors", function() {
      it("are placed to the east", function() {
        room.exits.east = true;
        app.board.renderRoom(room);
        return expect(app.board.map[12][10]).toEqual(2);
      });
      return it("are placed to the south", function() {
        room.exits.south = true;
        app.board.renderRoom(room);
        return expect(app.board.map[10][12]).toEqual(2);
      });
    });
    describe("halls", function() {
      it("can have a north passage", function() {
        room.exits.north = true;
        app.board.renderHall(room);
        return expect(app.board.map[10][9]).toEqual(0);
      });
      it("are placed to the east", function() {
        room.exits.east = true;
        app.board.renderHall(room);
        expect(app.board.map[12][10]).toEqual(0);
        return expect(app.board.map[11][10]).toEqual(0);
      });
      it("are placed to the south", function() {
        room.exits.south = true;
        app.board.renderHall(room);
        expect(app.board.map[10][12]).toEqual(0);
        return expect(app.board.map[10][11]).toEqual(0);
      });
      return it("are placed to the west", function() {
        room.exits.west = true;
        app.board.renderHall(room);
        return expect(app.board.map[9][10]).toEqual(0);
      });
    });
    return it("renders empties", function() {
      room.name = "empty";
      app.board.renderEmpty(room);
      expect(app.board.map[10][9]).toEqual(1);
      expect(app.board.map[11][10]).toEqual(1);
      expect(app.board.map[10][11]).toEqual(1);
      expect(app.board.map[9][10]).toEqual(1);
      return expect(app.board.map[10][10]).toEqual(1);
    });
  });
  return describe("mapPointSurroundings", function() {
    it("returns null if point is on top edge of map", function() {
      return expect(app.board.mapPointSurroundings(13, 0)).toBe(null);
    });
    it("returns null if point is on right edge of map", function() {
      return expect(app.board.mapPointSurroundings(20, 13)).toBe(null);
    });
    it("returns null if point is on bottom edge of map", function() {
      return expect(app.board.mapPointSurroundings(13, 20)).toBe(null);
    });
    it("returns null if point is on left edge of map", function() {
      return expect(app.board.mapPointSurroundings(0, 13)).toBe(null);
    });
    it("returns a 3x3 array", function() {
      expect(app.board.mapPointSurroundings(1, 1).length).toEqual(3);
      return expect(app.board.mapPointSurroundings(1, 1)[0].length).toEqual(3);
    });
    return it("returns a subsection of the map", function() {
      var surroundings;
      surroundings = app.board.mapPointSurroundings(1, 1);
      expect(surroundings[1][0]).toEqual(1);
      expect(surroundings[2][1]).toEqual(app.board.map[2][1]);
      expect(surroundings[1][2]).toEqual(app.board.map[1][2]);
      return expect(surroundings[0][1]).toEqual(1);
    });
  });
});

//# sourceMappingURL=BoardSpec.map
