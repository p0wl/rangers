/// <reference path="../node_modules/typescript/lib/lib.es6.d.ts" />

import {observable, computed, action, createTransformer, autorun} from 'mobx';
import {displayValues, ColumnDisplay, ValueWithFilter, ValueFilter} from './transformValues';

import data from './data';

class AppState {
    data = {};
    @observable filters: Array<Function> = [];

    constructor() {
        this.data = data;
    }

    @computed get filtered() {
        let filtered = [].concat(this.data);
        this.filters.forEach(filter => filtered = filter(filtered));

        return filtered;
    }

    @computed get columns() {
        return Object.keys(this.filtered[0]);
    }

    displayValues(columnName: string): ValueWithFilter[] {
        const transformer = createTransformer<any[], any>((items) => {
            const allValues = items.map((item) => item[columnName]);

            return displayValues(allValues);
        });

        return transformer(this.filtered);
    }

    columnValues(columnName: string): any[] {
        const transformer = createTransformer<any[], any>((items) => {
            return items.map((item) => item[columnName]);
        });

        return transformer(this.filtered);
    }

    @action filter(column: string, filter: ValueFilter) {
        this.filters.push((filtered: any[]) => filtered.filter((item) => filter(item[column])));
    }

    @action reset() {
        this.filters = [];
    }

    @action back() {
        this.filters.pop();
    }
}

export default AppState;