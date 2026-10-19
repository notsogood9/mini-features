
function vehicleDetails(name, number, type) {
  return {
    veh_name: name,
    veh_number: number,
    veh_type: type,
  };
}

function parkinglotDetails(lotNumber, type, status = "available") {
  return {
    lot_number: lotNumber,
    lot_type: type,
    lot_status: status,
    veh_number: null,
  };
}

const parkingslots = [];
const rejectedVehicles = [];

const slot1 = parkinglotDetails(1, "car");
const slot2 = parkinglotDetails(2, "car");
const slot3 = parkinglotDetails(3, "bike");
const slot4 = parkinglotDetails(4, "bike");

parkingslots.push(slot1, slot2, slot3, slot4);



function allocation(vehDetails) {

  const alreadyParked = parkingslots.some(
    (slot) => slot.veh_number === vehDetails.veh_number
  );
  if (alreadyParked) {
    rejectedVehicles.push({
      vehicle: vehDetails,
      reason: "Vehicle already parked",
    });
    return {
      parkingStatus: "failed",
      reason: "Vehicle already parked",
    };
  }

  let allocated = false;
  let allocatedSlot = null;

  for (const slot of parkingslots) {
    if (  slot.lot_type === vehDetails.veh_type &&  slot.lot_status === "available") {
      slot.veh_number = vehDetails.veh_number;
      slot.lot_status = "unavailable";
      
      allocated = true;
      allocatedSlot = slot;
      break;
    }
  }

  if (allocated === false) {
    rejectedVehicles.push({
      vehicle: vehDetails,
      reason: "No compatible slot available",
    });

    return {
      parkingStatus: "failed",
      reason: "No compatible slot available",
    };
  }
  return {
    parkingStatus: "success",
    slot: allocatedSlot,
  };
}

function exit(vehNumber) {
  
  let found = false;
  let releasedSlot = null;

  for (const slot of parkingslots) {
    
    if (slot.veh_number === vehNumber) {
      releasedSlot = slot.lot_number;

      slot.veh_number = null;
      slot.lot_status = "available";
      found = true;
      
      break;
    }
  }


  if (found === false) {
    return {
      exitStatus: "failed",
      reason: "Vehicle not found",
    };
  }


  return {
    exitStatus: "success",
    releasedSlot,
  };
}


// ======================================================
// TEST CASES
// ======================================================

const car1 = vehicleDetails("Honda City", "GJ06AA1111", "car");
const car2 = vehicleDetails("Tata Nexon", "GJ06BB2222", "car");
const car3 = vehicleDetails("Hyundai Creta", "GJ06CC3333", "car");

const bike1 = vehicleDetails("Royal Enfield", "GJ06DD4444", "bike");
const bike2 = vehicleDetails("Activa", "GJ06EE5555", "bike");


// TEST 1 — Allocate first car
console.log("TEST 1:");
console.log(allocation(car1));


// TEST 2 — Allocate second car
console.log("\nTEST 2:");
console.log(allocation(car2));


// TEST 3 — Car slots are now full
console.log("\nTEST 3:");
console.log(allocation(car3));


// TEST 4 — Bike can still park
console.log("\nTEST 4:");
console.log(allocation(bike1));


// TEST 5 — Same bike tries to enter again
console.log("\nTEST 5:");
console.log(allocation(bike1));


// TEST 6 — Car 1 exits
console.log("\nTEST 6:");
console.log(exit("GJ06AA1111"));


// TEST 7 — Car 3 can now use released slot
console.log("\nTEST 7:");
console.log(allocation(car3));


// TEST 8 — Exit vehicle that isn't parked
console.log("\nTEST 8:");
console.log(exit("GJ06XX9999"));


// FINAL STATE
console.log("\nFINAL PARKING LOT:");
console.dir(parkingslots, { depth: null });

console.log("\nREJECTED VEHICLES:");
console.dir(rejectedVehicles, { depth: null });