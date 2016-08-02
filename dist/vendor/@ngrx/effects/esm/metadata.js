const METADATA_KEY = '@ngrx/effects';
export function Effect() {
    return function (target, propertyName) {
        if (!Reflect.hasOwnMetadata(METADATA_KEY, target)) {
            Reflect.defineMetadata(METADATA_KEY, [], target);
        }
        const effects = Reflect.getOwnMetadata(METADATA_KEY, target);
        Reflect.defineMetadata(METADATA_KEY, [...effects, propertyName], target);
    };
}
export function getEffectKeys(instance) {
    const target = Object.getPrototypeOf(instance);
    if (!Reflect.hasOwnMetadata(METADATA_KEY, target)) {
        return [];
    }
    return Reflect.getOwnMetadata(METADATA_KEY, target);
}
