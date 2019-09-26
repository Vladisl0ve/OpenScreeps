module.exports = {

  run: function(creep) {
    const source = Game.getObjectById(creep.memory.idSource); //creep.pos.findPathTo(Game.getObjectById(creep.memory.idSource))
    const building = creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES);
    let container = source.pos.findInRange(FIND_STRUCTURES, 1, {
      filter: s => s.structureType == STRUCTURE_CONTAINER
    })[0];

    if (building == null) {
      let repair = require('role.repair');
      repair.run(creep);
    }

    //console.log(source)
    if (container && _.sum(creep.carry) != creep.carryCapacity && creep.memory.isDelivering) {
      if (creep.withdraw(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
        creep.moveTo(container)
        //console.log(creepsInRoom.length)
      }

    } else if (_.sum(creep.carry) == creep.carryCapacity || !creep.memory.isDelivering) {

      if (creep.build(building) == ERR_NOT_IN_RANGE) {
        creep.moveTo(building);
        //  console.log(creep.carryCapacity)
      }
      if (_.sum(creep.carry) == 0) {
        creep.memory.isDelivering = true;
      } else {
        creep.memory.isDelivering = false;
      }
    }
  }
};
