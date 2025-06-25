"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Aircraft = void 0;
const aircraftConfig_1 = require("./aircraftConfig");
class Aircraft {
    constructor(config = aircraftConfig_1.SR71_BLACKBIRD) {
        this.config = config;
        this.state = {
            position: { x: 0, y: 1000, z: 0 }, // Start at 1000m altitude
            velocity: { x: 0, y: 0, z: 0 },
            acceleration: { x: 0, y: 0, z: 0 },
            rotation: { x: 0, y: 0, z: 0 },
            fuel: 100
        };
        this.controls = {
            throttle: 0,
            pitch: 0,
            roll: 0,
            yaw: 0,
            flaps: 0,
            gear: false,
            afterburner: false
        };
    }
    updateControls(controls) {
        this.controls = { ...controls };
    }
    getForwardVector() {
        const yaw = this.state.rotation.y;
        const pitch = this.state.rotation.x;
        return {
            x: Math.sin(yaw) * Math.cos(pitch),
            y: -Math.sin(pitch),
            z: Math.cos(yaw) * Math.cos(pitch)
        };
    }
    getUpVector() {
        const roll = this.state.rotation.z;
        const pitch = this.state.rotation.x;
        return {
            x: Math.sin(roll) * Math.cos(pitch),
            y: Math.cos(roll) * Math.cos(pitch),
            z: Math.sin(roll) * Math.sin(pitch)
        };
    }
    getSpeed() {
        const { velocity } = this.state;
        return Math.sqrt(velocity.x * velocity.x + velocity.y * velocity.y + velocity.z * velocity.z);
    }
    getMachNumber() {
        const speed = this.getSpeed();
        const altitude = this.state.position.y;
        const temperature = 288.15 - (0.0065 * altitude); // Kelvin
        const soundSpeed = Math.sqrt(1.4 * 287 * temperature);
        return speed / soundSpeed;
    }
}
exports.Aircraft = Aircraft;
//# sourceMappingURL=aircraft.js.map