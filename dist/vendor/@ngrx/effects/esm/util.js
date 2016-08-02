export function flatten(list) {
    return list.reduce((items, next) => {
        if (Array.isArray(next)) {
            return items.concat(flatten(next));
        }
        return items.concat(next);
    }, []);
}
export function toPayload(update) {
    return update.action.payload;
}
export function all() {
    return false;
}
