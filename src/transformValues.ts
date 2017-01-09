export enum ColumnDisplay {
    EQUAL,
    STARTS_WITH,
    BETWEEN,
}

function unique(values: any[]): any[] {
    const uniq = new Set(values);
    return Array.from(uniq);
}

export type ValueFilter = (value: any) => boolean;

export type ValueWithFilter = {
    value: any,
    filter: ValueFilter
};

const equalFilter = (selected: any) => (itemValue: any) => selected === itemValue;
const startsWith = (selected: any) => (itemValue: any) => itemValue.startsWith(selected);

export function displayValues(allValues: any[]): ValueWithFilter[] {
    const columnDisplayType = columnDisplay(allValues);

    if (columnDisplayType === ColumnDisplay.STARTS_WITH) {
            const vals = allValues.reduce((mem, val) => { mem.push(val.charAt(0)); return mem; }, []);
            return unique(vals).sort().map(val => (
                { value: val, filter: startsWith(val) }
            ));
    }
    return unique(allValues).sort().map(val => (
        { value: val, filter: equalFilter(val) }
    ));
}

export function columnDisplay(values: any[]) {
    if (typeof values[0] === 'string') {
        if (values.length > 25) {
            return ColumnDisplay.STARTS_WITH;
        }
    }
    return ColumnDisplay.EQUAL;
}