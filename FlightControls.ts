// src/definitions.ts
export interface FlightControls {
  throttle: number;
  elevator: number;
  rudder: number;
  aileron: number;
  flaps: number;
  gear: boolean;
  afterburner: boolean;
}