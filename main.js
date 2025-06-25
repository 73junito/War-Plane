"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const aircraft_1 = require("./aircraft/aircraft");
const engine_1 = require("./physics/engine");
const renderer_1 = require("./graphics/renderer");
const inputHandler_1 = require("./input/inputHandler");
class FlightSimulator {
    constructor() {
        this.isRunning = false;
        this.aircraft = new aircraft_1.Aircraft();
        this.physics = new engine_1.PhysicsEngine();
        this.renderer = new renderer_1.Renderer();
        this.input = new inputHandler_1.InputHandler();
        this.setupEventListeners();
    }
    setupEventListeners() {
        this.input.onControlsChange = (controls) => {
            this.aircraft.updateControls(controls);
        };
    }
    start() {
        this.isRunning = true;
        this.gameLoop();
    }
    stop() {
        this.isRunning = false;
    }
    gameLoop() {
        if (!this.isRunning)
            return;
        const deltaTime = 1 / 60; // 60 FPS
        // Update physics
        this.physics.update(this.aircraft, deltaTime);
        // Render frame
        this.renderer.render(this.aircraft);
        // Continue loop
        requestAnimationFrame(() => this.gameLoop());
    }
}
// Initialize and start the simulator
const simulator = new FlightSimulator();
simulator.start();
console.log('War Plane Flight Simulator started!');
//# sourceMappingURL=main.js.map