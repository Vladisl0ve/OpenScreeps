// create a new function for StructureTower
StructureTower.prototype.defend =
  function() {
    // find closes hostile creep
    var target = this.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
    var broken = this.pos.findClosestByRange(FIND_STRUCTURES, {
      filter: (s) => s.hits < s.hitsMax && s.structureType != STRUCTURE_WALL && s.structureType != STRUCTURE_RAMPART
    });
    var wounded = this.pos.findClosestByRange(FIND_MY_CREEPS, {
      filter: (s) => s.hits < s.hitsMax
    });
    //if o
    // if one is found...
    if (target != undefined && target.owner.username != "M2Shawning") {
      // ...FIRE!
      this.attack(target);
    } else if (broken != undefined) {
      //repair!
      this.repair(broken);
    } else if (wounded != undefined) {
      //heal it!
      this.heal(wounded);
    }
  };
