export const changeCamelToSnakeCase = (obj: Record<string, number | string>) => {
    let arrayOfKeys = Object.keys(obj);
    let tempResult = [];
    let result: Record<string, number | string> = {};

    let tempWord = '';

    for (let i = 0; i < arrayOfKeys.length; i++) {
        for (let j = 0; j < arrayOfKeys[i].length; j++) {
            if (arrayOfKeys[i] !== arrayOfKeys[i].toUpperCase()) {
                tempWord = tempWord + arrayOfKeys[i];
            } else {
                tempResult.push(tempWord);
                tempWord = '';
                tempWord += arrayOfKeys[i].toLowerCase();
            }
        }
    }

    tempResult.push(tempWord);

    const joinedKeys = tempResult.join('_');
    result[joinedKeys] = obj[joinedKeys];

    return result.join;
}