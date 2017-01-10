export default function unique(values: any[]) {
    const asSet = new Set(values);
    return Array.from(asSet);
}