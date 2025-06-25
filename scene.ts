export class Scene {
    private objects: any[];

    constructor() {
        this.objects = [];
    }

    addObject(object: any) {
        this.objects.push(object);
    }

    updateScene() {
        // Update the state of all objects in the scene
        this.objects.forEach(object => {
            // Update logic for each object
        });
    }
}