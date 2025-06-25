"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PhysicsEngine = void 0;
const aerodynamics_1 = require("./aerodynamics");
class PhysicsEngine {
    constructor() {
        this.gravity = { x: 0, y: -9.81, z: 0 };
        this.aerodynamics = new aerodynamics_1.AerodynamicsCalculator();
    }
    update(aircraft, deltaTime) {
        this.updateForces(aircraft);
        this.updateVelocity(aircraft, deltaTime);
        this.updatePosition(aircraft, deltaTime);
        this.updateRotation(aircraft, deltaTime);
        this.updateFuel(aircraft, deltaTime);
    }
    updateForces(aircraft) {
        const { state, controls, config } = aircraft;
        // Reset acceleration
        state.acceleration = { x: 0, y: 0, z: 0 };
        // Gravity
        this.addVector(state.acceleration, this.gravity);
        // Aerodynamic forces
        const altitude = Math.max(0, state.position.y);
        const angleOfAttack = this.calculateAngleOfAttack(aircraft);
        // Lift
        const lift = this.aerodynamics.calculateLift(state.velocity, angleOfAttack, config, altitude);
        this.addForce(state.acceleration, lift, config.specifications.mass);
        // Drag
        const drag = this.aerodynamics.calculateDrag(state.velocity, config, altitude, controls.gear);
        this.addForce(state.acceleration, drag, config.specifications.mass);
        // Thrust
        const thrust = this.aerodynamics.calculateThrust(controls.throttle, config, altitude, controls.afterburner);
        const forwardVector = aircraft.getForwardVector();
        const thrustForce = this.multiplyVector(forwardVector, thrust);
        this.addForce(state.acceleration, thrustForce, config.specifications.mass);
    }
    updateVelocity(aircraft, deltaTime) {
        const { state } = aircraft;
        state.velocity.x += state.acceleration.x * deltaTime;
        state.velocity.y += state.acceleration.y * deltaTime;
        state.velocity.z += state.acceleration.z * deltaTime;
    }
    updatePosition(aircraft, deltaTime) {
        const { state } = aircraft;
        state.position.x += state.velocity.x * deltaTime;
        state.position.y += state.velocity.y * deltaTime;
        state.position.z += state.velocity.z * deltaTime;
        // Ground collision
        if (state.position.y <= 0) {
            state.position.y = 0;
            if (state.velocity.y < 0) {
                state.velocity.y = 0;
            }
            // Apply ground friction
            state.velocity.x *= 0.95;
            state.velocity.z *= 0.95;
        }
    }
    updateRotation(aircraft, deltaTime) {
        const { state, controls } = aircraft;
        // Apply control inputs to rotation
        const pitchRate = controls.pitch * 0.5;
        const yawRate = controls.yaw * 0.3;
        const rollRate = controls.roll * 0.8;
        state.rotation.x += pitchRate * deltaTime;
        state.rotation.y += yawRate * deltaTime;
        state.rotation.z += rollRate * deltaTime;
        // Limit pitch to prevent complete loops (for now)
        state.rotation.x = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, state.rotation.x));
        // Keep yaw in 0-2π range
        if (state.rotation.y > Math.PI * 2)
            state.rotation.y -= Math.PI * 2;
        if (state.rotation.y < 0)
            state.rotation.y += Math.PI * 2;
        // Limit roll
        state.rotation.z = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, state.rotation.z));
    }
    updateFuel(aircraft, deltaTime) {
        const { state, controls, config } = aircraft;
        if (controls.throttle > 0) {
            const fuelRate = config.engines.fuelConsumption * controls.throttle;
            const fuelBurned = fuelRate * deltaTime;
            state.fuel = Math.max(0, state.fuel - (fuelBurned / config.specifications.fuelCapacity) * 100);
        }
    }
    calculateAngleOfAttack(aircraft) {
        // Simplified: use pitch angle as angle of attack
        return aircraft.state.rotation.x;
    }
    addVector(target, source) {
        target.x += source.x;
        target.y += source.y;
        target.z += source.z;
    }
    addForce(acceleration, force, mass) {
        acceleration.x += force.x / mass;
        acceleration.y += force.y / mass;
        acceleration.z += force.z / mass;
    }
    multiplyVector(vector, scalar) {
        return {
            x: vector.x * scalar,
            y: vector.y * scalar,
            z: vector.z * scalar
        };
    }
}
exports.PhysicsEngine = PhysicsEngine;
//# sourceMappingURL=engine.js.map