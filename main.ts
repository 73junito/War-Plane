import { Aircraft } from './aircraft/aircraft';
import { Controls } from './aircraft/controls';
import { Engine } from './physics/engine';
import { Aerodynamics } from './physics/aerodynamics';
import { Renderer } from './graphics/renderer';
import { Scene } from './graphics/scene';
import { InputHandler } from './input/inputHandler';

class FlightSimulator {
    private aircraft: Aircraft;
    private controls: Controls;
    private engine: Engine;
    private aerodynamics: Aerodynamics;
    private renderer: Renderer;
    private scene: Scene;
    private inputHandler: InputHandler;

    constructor() {
        this.aircraft = new Aircraft();
        this.controls = new Controls();
        this.engine = new Engine();
        this.aerodynamics = new Aerodynamics();
        this.renderer = new Renderer();
        this.scene = new Scene();
        this.inputHandler = new InputHandler();
    }

    public initialize(): void {
        this.renderer.initializeGraphics();
        this.scene.addObject(this.aircraft);
        this.inputHandler.listenForInput();
        this.mainLoop();
    }

    private mainLoop(): void {
        const update = () => {
            this.controls.updateControls();
            this.aircraft.update();
            this.renderer.renderScene(this.scene);
            requestAnimationFrame(update);
        };
        update();
    }
}

const simulator = new FlightSimulator();
simulator.initialize();