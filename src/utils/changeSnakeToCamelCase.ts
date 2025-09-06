export const changeSnakeToCamelCase = (snakeCaseObj: Record<string, number | string>) => {
    let arrayOfKeys = Object.keys(snakeCaseObj);
    let camelCaseObj: Record<string, number | string> = {};

    for (let i = 0; i < arrayOfKeys.length; i++) {
        let arrayOfSymbolKeys = arrayOfKeys[i].split('_');

        let arrayOfCamelCaseKey = [];
        arrayOfCamelCaseKey.push(arrayOfSymbolKeys[0]);

        for (let j = 1; j < arrayOfSymbolKeys.length; j++) {
            arrayOfCamelCaseKey.push(arrayOfSymbolKeys[j][0].toUpperCase() + arrayOfSymbolKeys[j].slice(1));
        }

        const joinedKey = arrayOfCamelCaseKey.join('');
        camelCaseObj[joinedKey] = snakeCaseObj[arrayOfKeys[i]];
    }

    return camelCaseObj;
};