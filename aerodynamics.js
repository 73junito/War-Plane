"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Aircraft = exports.AerodynamicsCalculator = void 0;
class AerodynamicsCalculator {
    constructor() {
        this.AIR_DENSITY_SEA_LEVEL = 1.225; // kg/m³
        this.GRAVITY = 9.81; // m/s²
        this.SOUND_SPEED_SEA_LEVEL = 343; // m/s
    }
    calculateLift(velocity, angleOfAttack, config, altitude) {
        const airDensity = this.getAirDensity(altitude);
        const speed = this.getVectorMagnitude(velocity);
        // Basic lift equation: L = 0.5 * ρ * V² * S * CL
        const dynamicPressure = 0.5 * airDensity * speed * speed;
        const liftCoefficient = this.calculateLiftCoefficient(angleOfAttack, config);
        const liftMagnitude = dynamicPressure * config.specifications.wingArea * liftCoefficient;
        // Lift is perpendicular to velocity vector
        const liftDirection = this.calculateLiftDirection(velocity, angleOfAttack);
        return this.multiplyVector(liftDirection, liftMagnitude);
    }
    calculateDrag(velocity, config, altitude, gearDown = false) {
        const airDensity = this.getAirDensity(altitude);
        const speed = this.getVectorMagnitude(velocity);
        if (speed === 0)
            return { x: 0, y: 0, z: 0 };
        // Drag equation: D = 0.5 * ρ * V² * S * CD
        const dynamicPressure = 0.5 * airDensity * speed * speed;
        let dragCoefficient = config.specifications.dragCoefficient;
        // Increase drag with landing gear
        if (gearDown) {
            dragCoefficient *= 1.8;
        }
        // Wave drag at supersonic speeds
        const mach = this.calculateMachNumber(speed, altitude);
        if (mach > 1.0) {
            dragCoefficient *= (1 + 0.2 * (mach - 1));
        }
        const dragMagnitude = dynamicPressure * config.specifications.wingArea * dragCoefficient;
        // Drag opposes velocity
        const dragDirection = this.normalizeVector(this.multiplyVector(velocity, -1));
        return this.multiplyVector(dragDirection, dragMagnitude);
    }
    calculateThrust(throttle, config, altitude, afterburner = false) {
        const altitudeFactor = Math.max(0.3, 1 - (altitude / 30000)); // Thrust decreases with altitude
        let maxThrust = afterburner ?
            config.engines.thrustWithAfterburner :
            config.engines.thrustWithoutAfterburner;
        return throttle * maxThrust * altitudeFactor * config.engines.count;
    }
    calculateLiftCoefficient(angleOfAttack, config) {
        // Simplified lift coefficient curve
        const baseCL = config.specifications.liftCoefficient;
        const aoaRadians = angleOfAttack;
        // Linear region (approximately -15° to +15°)
        if (Math.abs(aoaRadians) < 0.26) { // ~15 degrees
            return baseCL * (aoaRadians / 0.26);
        }
        // Stall region
        const stallAngle = 0.26; // ~15 degrees
        if (aoaRadians > stallAngle) {
            return baseCL * Math.cos(aoaRadians - stallAngle);
        }
        else {
            return baseCL * Math.cos(Math.abs(aoaRadians) - stallAngle);
        }
    }
    calculateLiftDirection(velocity, angleOfAttack) {
        // Simplified: lift is perpendicular to velocity in the vertical plane
        const speed = this.getVectorMagnitude(velocity);
        if (speed === 0)
            return { x: 0, y: 1, z: 0 };
        // Create a vector perpendicular to velocity
        return {
            x: 0,
            y: Math.cos(angleOfAttack),
            z: Math.sin(angleOfAttack)
        };
    }
    getAirDensity(altitude) {
        // Simplified atmospheric model
        const scaleHeight = 8400; // meters
        return this.AIR_DENSITY_SEA_LEVEL * Math.exp(-altitude / scaleHeight);
    }
    calculateMachNumber(speed, altitude) {
        // Sound speed decreases with altitude/temperature
        const temperature = 288.15 - (0.0065 * altitude); // Kelvin
        const soundSpeed = Math.sqrt(1.4 * 287 * temperature);
        return speed / soundSpeed;
    }
    getVectorMagnitude(vector) {
        return Math.sqrt(vector.x * vector.x + vector.y * vector.y + vector.z * vector.z);
    }
    normalizeVector(vector) {
        const magnitude = this.getVectorMagnitude(vector);
        if (magnitude === 0)
            return { x: 0, y: 0, z: 0 };
        return {
            x: vector.x / magnitude,
            y: vector.y / magnitude,
            z: vector.z / magnitude
        };
    }
    multiplyVector(vector, scalar) {
        return {
            x: vector.x * scalar,
            y: vector.y * scalar,
            z: vector.z * scalar
        };
    }
}
exports.AerodynamicsCalculator = AerodynamicsCalculator;
class Aircraft {
    constructor(name) {
        this.name = name;
    }
}
exports.Aircraft = Aircraft;
//# sourceMappingURL=aerodynamics.js.map