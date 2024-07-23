export function getRandomWholeNumberIRange(min: number, max: number): number {
    // Ensure the min is less than or equal to max
    if (min > max) {
        throw new Error("min should be less than or equal to max");
    }
    // Generate a random whole number in the range [min, max]
    return Math.floor(Math.random() * (max - min + 1)) + min;
}