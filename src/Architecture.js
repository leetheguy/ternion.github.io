// Generated by CoffeeScript 1.7.1
var Architecture, Door, Wall,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Architecture = {
  spawnFloor: function(level) {
    var style;
    level = Math.floor(level / 10);
    style = _.random(5);
    style = style === 1 ? 0 : 1;
    return app.assets.floors[level][style];
  },
  spawnWall: function(level, surroundings) {
    var ll, lr, n, ul, ur, wall;
    level = Math.floor(level / 10);
    n = parseInt(this.surroundingsToBinary(surroundings), 2);
    ul = (function() {
      switch (false) {
        case (n & 193) !== 193:
          return 5;
        case (n & 192) !== 192:
          return 2;
        case (n & 129) !== 129:
          return 8;
        case (n & 128) !== 128:
          return 0;
        case (n & 65) !== 65:
          return 20;
        case (n & 64) !== 64:
          return 2;
        case (n & 1) !== 1:
          return 8;
        default:
          return 0;
      }
    })();
    ur = (function() {
      switch (false) {
        case (n & 7) !== 7:
          return 6;
        case (n & 6) !== 6:
          return 1;
        case (n & 5) !== 5:
          return 21;
        case (n & 4) !== 4:
          return 1;
        case (n & 3) !== 3:
          return 11;
        case (n & 2) !== 2:
          return 3;
        case (n & 1) !== 1:
          return 11;
        default:
          return 3;
      }
    })();
    lr = (function() {
      switch (false) {
        case (n & 28) !== 28:
          return 10;
        case (n & 24) !== 24:
          return 7;
        case (n & 20) !== 20:
          return 11;
        case (n & 16) !== 16:
          return 7;
        case (n & 12) !== 12:
          return 17;
        case (n & 8) !== 8:
          return 19;
        case (n & 4) !== 4:
          return 17;
        default:
          return 19;
      }
    })();
    ll = (function() {
      switch (false) {
        case (n & 112) !== 112:
          return 9;
        case (n & 96) !== 96:
          return 18;
        case (n & 80) !== 80:
          return 4;
        case (n & 64) !== 64:
          return 18;
        case (n & 48) !== 48:
          return 4;
        case (n & 32) !== 32:
          return 16;
        case (n & 16) !== 16:
          return 4;
        default:
          return 16;
      }
    })();
    wall = new cjs.Container;
    ul = _.clone(app.assets.wallParts[level][ul]);
    ur = _.clone(app.assets.wallParts[level][ur]);
    ur.x = 16;
    ll = _.clone(app.assets.wallParts[level][ll]);
    ll.y = 16;
    lr = _.clone(app.assets.wallParts[level][lr]);
    lr.x = 16;
    lr.y = 16;
    wall.addChild(ul);
    wall.addChild(ur);
    wall.addChild(ll);
    wall.addChild(lr);
    return wall;
  },
  surroundingsToBinary: function(s) {
    return '' + s[0][0] + s[0][1] + s[0][2] + s[1][2] + s[2][2] + s[2][1] + s[2][0] + s[1][0];
  }
};

Wall = (function(_super) {
  __extends(Wall, _super);

  function Wall() {
    return Wall.__super__.constructor.apply(this, arguments);
  }

  return Wall;

})(Architecture);

Door = (function(_super) {
  __extends(Door, _super);

  function Door() {
    return Door.__super__.constructor.apply(this, arguments);
  }

  return Door;

})(Architecture);

//# sourceMappingURL=Architecture.map
