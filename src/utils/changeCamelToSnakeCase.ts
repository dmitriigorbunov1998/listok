export const changeCamelToSnakeCase = (camelCaseObj: Record<string, number | string>) => {
    let arrayOfKeys = Object.keys(camelCaseObj);
    let snakeCaseObj: Record<string, number | string> = {};

    for (let i = 0; i < arrayOfKeys.length; i++) {
        let originalKey = arrayOfKeys[i];
        let snakeCaseKey = '';

        for (let j = 0; j < originalKey.length; j++) {
            let currentKeySymbol = originalKey[j];

            if (currentKeySymbol === currentKeySymbol.toUpperCase()) {
                snakeCaseKey += `_${currentKeySymbol.toLowerCase()}`;
            } else {
                snakeCaseKey += currentKeySymbol;
            }
        }

        snakeCaseObj[snakeCaseKey] = camelCaseObj[originalKey];
    }

    return snakeCaseObj;
}