class Aircraft {
    model: string;
    speed: number;
    altitude: number;

    constructor(model: string, speed: number = 0, altitude: number = 0) {
        this.model = model;
        this.speed = speed;
        this.altitude = altitude;
    }

    fly(increaseSpeed: number, increaseAltitude: number) {
        this.speed += increaseSpeed;
        this.altitude += increaseAltitude;
        console.log(`${this.model} is flying at speed ${this.speed} and altitude ${this.altitude}.`);
    }

    land() {
        this.speed = 0;
        this.altitude = 0;
        console.log(`${this.model} has landed.`);
    }

    update(deltaTime: number) {
        // Update aircraft state based on physics calculations
        console.log(`${this.model} state updated with deltaTime: ${deltaTime}.`);
    }
}