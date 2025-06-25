export class Engine {
    private thrust: number;
    private isRunning: boolean;

    constructor() {
        this.thrust = 0;
        this.isRunning = false;
    }

    public start(): void {
        this.isRunning = true;
        console.log("Engine started.");
    }

    public stop(): void {
        this.isRunning = false;
        this.thrust = 0;
        console.log("Engine stopped.");
    }

    public adjustThrust(amount: number): void {
        if (this.isRunning) {
            this.thrust += amount;
            console.log(`Thrust adjusted to ${this.thrust}.`);
        } else {
            console.log("Engine is not running. Cannot adjust thrust.");
        }
    }

    public getThrust(): number {
        return this.thrust;
    }

    public isEngineRunning(): boolean {
        return this.isRunning;
    }
}