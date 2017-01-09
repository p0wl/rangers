

export type Counted = {
    value: any,
    count: number,
};

export default function countBy(values: any[]): Counted[] {
    const result = new Map<any, number>();

    values.sort().forEach(item => {
        const count = (result.has(item) ? result.get(item) : 0) + 1;
        result.set(item, count);
    });

    return Array.from(result.entries()).map(([value, count]) => ({
        value,
        count
    }));
}