const fs = require('fs');

const data = require('./data.json');

let cleaned = data.map(i => {
    delete i.id;
    delete i.bornCountryCode;
    delete i.diedCountryCode;

    if (i.born === "0000-00-00") {
        return null;
    }

    return i
});

cleaned = cleaned.filter(i => i !== null);

const serialized = JSON.stringify(cleaned, null, 2);

const tostringed = `
const data = 
${serialized};

export default data;
`

fs.writeFileSync('./src/data.ts', tostringed);