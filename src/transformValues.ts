import countBy from './countBy';

export enum ColumnDisplay {
    EQUAL,
    STARTS_WITH,
    BETWEEN,
}

export type ValueFilter = (value: any) => boolean;

export type ValueWithFilter = {
    value: any,
    count: number,
    filter: ValueFilter
};

const equalFilter = (selected: any) => (itemValue: any) => selected === itemValue;
const startsWith = (selected: any) => (itemValue: any) => itemValue.startsWith(selected);

export function displayValues(allValues: any[]): ValueWithFilter[] {
    const columnDisplayType = columnDisplay(allValues);

    if (columnDisplayType === ColumnDisplay.STARTS_WITH) {
        const vals = allValues.reduce((mem, val) => { mem.push(val.charAt(0)); return mem; }, []);
        const counted = countBy(vals);
        return counted.map((val: ValueWithFilter) => {
            val.filter = startsWith(val.value);
            return val;
        });
    }

    const counted = countBy(allValues);
    return counted.map((val: ValueWithFilter) => {
        val.filter = equalFilter(val.value);
        return val;
    });
}

function unique(values: any[]) {
    const asSet = new Set(values);
    return Array.from(asSet);
}

export function columnDisplay(values: any[]) {
    if (typeof values[0] === 'string') {

        if (unique(values).length > 20) {
            return ColumnDisplay.STARTS_WITH;
        }
    }
    return ColumnDisplay.EQUAL;
}