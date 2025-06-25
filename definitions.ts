// src/definitions.ts
export interface Vector3D {
  x: number;
  y: number;
  z: number;
}

export interface AircraftState {
  position: Vector3D;
  velocity: Vector3D;
  acceleration: Vector3D;
  rotation: Vector3D;
  fuel: number;
}

export interface FlightControls {
  throttle: number;
  pitch: number;
  roll: number;
  yaw: number;
  flaps: number;
  gear: boolean;
  afterburner: boolean;
}

export interface AirportData {
  ident: string;
  name: string;
  latitude: number;
  longitude: number;
  elevation: number;
  runways: RunwayData[];
}

export interface RunwayData {
  length: number;
  width: number;
  heading: number;
  surface: string;
}