export const changeSnakeToCamelCase = (obj: Record<string, number | string>) => {
    let result: Record<string, number | string> = {};
    let arrayOfKeys = Object.keys(obj);

    for (let i = 0; i < arrayOfKeys.length; i++) {
        let elem = arrayOfKeys[i].split('_');

        let tempResult = [];
        tempResult.push(elem[0]);

        for (let j = 1; j < elem.length; j++) {
            tempResult.push(elem[j][0].toUpperCase() + elem[j].slice(1));
        }

        const joinedKey = tempResult.join('');

        result[joinedKey] = obj[arrayOfKeys[i]];
    }

    return result;
};