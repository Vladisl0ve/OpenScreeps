module.exports = {
  run: function(creep) {
    //  let exit = creep.pos.findClosestByRange(FIND_EXIT_LEFT)
    //console.log(exit)
    //creep.moveTo(exit)

    if (creep.room.name != creep.memory.nameRoom) {
      let exitDir = creep.room.findExitTo(creep.memory.nameRoom)
      let exit = creep.pos.findClosestByRange(exitDir)
      creep.moveTo(exit)
      return;
    }
    //  if (Game.creeps['Builder819|W41N44'].harvest(Game.creeps['Builder819|W41N44'].pos.findClosestByRange(FIND_SOURCES)) != OK){
    //creep.moveTo(40, 10)
    //  }

    const controller = creep.room.controller;

    if (creep.claimController(controller) == ERR_NOT_IN_RANGE) {
      creep.moveTo(controller)
    }







    // let source = creep.pos.findClosestByRange(FIND_SOURCES)
    // let building = creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES)
    //
    // if (source && _.sum(creep.carry) != creep.carryCapacity && creep.memory.isDelivering) {
    //   if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
    //     creep.moveTo(source)
    //     //console.log(creepsInRoom.length)
    //   }
    //
    // } else if (_.sum(creep.carry) == creep.carryCapacity || !creep.memory.isDelivering) {
    //
    //   if (creep.build(building) == ERR_NOT_IN_RANGE) {
    //     creep.moveTo(building);
    //     //  console.log(creep.carryCapacity)
    //   }
    //   if (_.sum(creep.carry) == 0) {
    //     creep.memory.isDelivering = true;
    //   } else {
    //     creep.memory.isDelivering = false;
    //   }



    //creep.build(creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES))
    //  creep.move(LEFT)
    //  creep.move(BOTTOM)
    //  creep.move(LEFT)
    //creep.move(TOP)
    //  creep.move(RIGHT)
    //creep.claimController(creep.room.controller)
  }
}
