module.exports = {

  run: function(creep) {
    const source = Game.getObjectById(creep.memory.idSource); //creep.pos.findPathTo(Game.getObjectById(creep.memory.idSource))
    const targets = creep.room.find(FIND_STRUCTURES, {
      filter: {
        structureType: STRUCTURE_ROAD
      }
    });
    targets.sort((a, b) => creep.pos.findClosestByRange(a) - creep.pos.findClosestByRange(b));




    //console.log(source)
    if (source && _.sum(creep.carry) != creep.carryCapacity && creep.memory.isDelivering) {
      if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
        creep.moveTo(source);
        //console.log(creepsInRoom.length)
      }

    } else if (_.sum(creep.carry) == creep.carryCapacity || !creep.memory.isDelivering) {

      if (targets.length > 0) {
        if (creep.repair(targets[0]) == ERR_NOT_IN_RANGE) {
          creep.moveTo(targets[0]);
        }
      }

      if (_.sum(creep.carry) == 0) {
        creep.memory.isDelivering = true;
      } else {
        creep.memory.isDelivering = false;
      }
    }
  }
};
