export class Aerodynamics {
    calculateLift(airDensity: number, wingArea: number, liftCoefficient: number, velocity: number): number {
        return 0.5 * airDensity * wingArea * liftCoefficient * velocity * velocity;
    }

    calculateDrag(airDensity: number, dragCoefficient: number, wingArea: number, velocity: number): number {
        return 0.5 * airDensity * dragCoefficient * wingArea * velocity * velocity;
    }
}