module.exports = {

  run: function(creep) {
    const source = Game.getObjectById(creep.memory.idSource);//creep.pos.findPathTo(Game.getObjectById(creep.memory.idSource))
    const building = creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES);

     //console.log(source)
    if (source && _.sum(creep.carry) != creep.carryCapacity && creep.memory.isDelivering) {
      if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
        creep.moveTo(source);
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
