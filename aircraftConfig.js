"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SR71_BLACKBIRD = void 0;
// SR-71 Blackbird Configuration
exports.SR71_BLACKBIRD = {
    name: "SR-71 Blackbird",
    type: "Strategic Reconnaissance",
    specifications: {
        mass: 77110, // 170,000 lbs
        maxThrust: 290240, // 65,000 lbf total (both engines)
        wingArea: 167, // 1,800 sq ft
        dragCoefficient: 0.016, // Extremely low drag design
        liftCoefficient: 0.6,
        maxSpeed: 1100, // Mach 3.3 at altitude
        cruiseAltitude: 25908, // 85,000 ft
        maxAltitude: 30480, // 100,000+ ft
        fuelCapacity: 46180, // 101,785 lbs
        range: 5925000 // 3,200 nautical miles
    },
    performance: {
        takeoffSpeed: 92, // 206 mph
        landingSpeed: 83, // 185 mph
        climbRate: 60, // 11,800 ft/min initial
        turnRate: 0.3, // Limited maneuverability
        maxG: 2.5, // Structural limit
        stallSpeed: 70 // 156 mph
    },
    engines: {
        count: 2,
        type: "Pratt & Whitney J58 (JT11D-20B)",
        afterburner: true,
        thrustWithAfterburner: 145120, // 32,500 lbf per engine
        thrustWithoutAfterburner: 111206, // 25,000 lbf per engine
        fuelConsumption: 12.5 // kg/s at full afterburner
    },
    systems: {
        hasLandingGear: true,
        hasFlaps: false, // No conventional flaps
        hasAfterburner: true,
        hasEjectionSeat: true,
        maxGForce: 2.5
    }
};
//# sourceMappingURL=aircraftConfig.js.map