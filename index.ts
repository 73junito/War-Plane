export interface AircraftConfig {
    model: string;
    speed: number;
    altitude: number;
}

export interface ControlInput {
    throttle: number;
    pitch: number;
    roll: number;
    yaw: number;
}