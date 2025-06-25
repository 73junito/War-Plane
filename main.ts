import { Aircraft } from './aircraft/aircraft';
import { PhysicsEngine } from './physics/engine';
import { Renderer } from './graphics/renderer';
import { InputHandler } from './input/inputHandler';
import { FlightControls } from './definitions';

class FlightSimulator {
    private aircraft: Aircraft;
    private physics: PhysicsEngine;
    private renderer: Renderer;
    private input: InputHandler;
    private isRunning: boolean = false;

    constructor() {
        this.aircraft = new Aircraft();
        this.physics = new PhysicsEngine();
        this.renderer = new Renderer();
        this.input = new InputHandler();
        
        this.setupEventListeners();
    }

    private setupEventListeners(): void {
        this.input.onControlsChange = (controls: FlightControls) => {
            this.aircraft.updateControls(controls);
        };
    }

    public start(): void {
        this.isRunning = true;
        this.gameLoop();
    }

    public stop(): void {
        this.isRunning = false;
    }

    private gameLoop(): void {
        if (!this.isRunning) return;

        const deltaTime = 1/60; // 60 FPS
        
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