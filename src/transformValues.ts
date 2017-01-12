import * as _ from 'lodash';
import countBy from './countBy';
import unique from './unique';

export enum ColumnDisplay {
    EQUAL,
    STARTS_WITH,
    BETWEEN,
    IN_ARRAY,
}

export type ValueFilter = (value: any) => boolean;

export type ValueWithFilter = {
    value: any,
    count: number,
    filter: ValueFilter
};

const equalFilter = (selected: any) => (itemValue: any) => selected === itemValue;
const startsWith = (selected: any) => (itemValue: any) => selected === '' ? itemValue === selected : itemValue.startsWith(selected);
const between = (lower: number, upper: number) => (itemValue: any) => _.inRange(itemValue, lower, upper);
const inArray = (items: any[]) => (itemValue: any) => { console.log('Checking if ', itemValue, 'in', items); return items.indexOf(itemValue) === -1; };

export function displayValues(allValues: any[]): ValueWithFilter[] {
    const columnDisplayType = columnDisplay(allValues);

    if (columnDisplayType === ColumnDisplay.STARTS_WITH) {
        const vals = allValues.reduce((mem, val) => { mem.push(val.charAt(0)); return mem; }, []);
        const counted = countBy(vals);

        const countUnreduced = countBy(allValues);
        countUnreduced.forEach(element => {
            const reduced = counted.find(i => i.value === element.value.charAt(0));
            if (reduced.count === element.count) {
                reduced.value = element.value;
            }
        });

        return counted.map((val: ValueWithFilter) => {
            val.filter = startsWith(val.value);
            return val;
        });
    }

    if (columnDisplayType === ColumnDisplay.BETWEEN) {
        const onlyOnes = unique(allValues);
        const min = _.min(onlyOnes);
        const max = _.max(onlyOnes);
        const step = Math.floor((max - min) / 5) + (max - min) % 5;

        const vals = [];
        for (let lower = min; lower < max; lower = lower + step) {
            const possibleUpper = lower + step - 1;
            const upper = possibleUpper > max || max - possibleUpper === 1 ? max : possibleUpper;
            vals.push({
                value: `${lower} - ${upper}`,
                count: allValues.filter(item => _.inRange(item, lower, upper + 1)).length,
                filter: between(lower, upper + 1)
            });
        }
        return vals;
    }

    if (columnDisplayType === ColumnDisplay.IN_ARRAY) {
        const flatten = _.flatten(allValues);
        const counted = countBy(flatten);

        return counted.map((val: ValueWithFilter) => {
            console.log('->', val);
            val.filter = inArray(val.value);
            return val;
        });
    }

    let counted = countBy(allValues);

    if (typeof counted[0].value === 'number') {
        counted = _.sortBy(counted, item => item.value);
    }
    return counted.map((val: ValueWithFilter) => {
        val.filter = equalFilter(val.value);
        return val;
    });
}

function columnDisplay(values: any[]) {
    if (typeof values[0] === 'string') {
        if (unique(values).length > 20) {
            return ColumnDisplay.STARTS_WITH;
        }
    }
    if (typeof values[0] === 'number') {
        if (unique(values).length > 20) {
            return ColumnDisplay.BETWEEN;
        }
    }

    if (Array.isArray(values[0])) {
        return ColumnDisplay.IN_ARRAY;
    }
    return ColumnDisplay.EQUAL;
}