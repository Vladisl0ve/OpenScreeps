module.exports = {

  run: function(creep) {
    const source = Game.getObjectById(creep.memory.idSource);
    const structure = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
      filter: (s) => (s.structureType == STRUCTURE_TOWER ||
          s.structureType == STRUCTURE_SPAWN ||
          s.structureType == STRUCTURE_EXTENSION) &&
        s.energy < s.energyCapacity
    });

    if (source && _.sum(creep.carry) != creep.carryCapacity) {
      if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
        creep.moveTo(source)
      }

    } else if (_.sum(creep.carry) == creep.carryCapacity) {

      if (creep.transfer(structure, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
        creep.moveTo(structure)
      }
    }
  }
};
