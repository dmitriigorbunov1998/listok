export const changeCamelToSnakeCase = (obj: any): any => {
    const snakeCaseObj: any = {};

    Object.keys(obj).forEach(key => {
        const snakeKey = key.replace(/([A-Z])/g, '_$1').toLowerCase();
        const value = obj[key];

        if (value !== null && typeof value === 'object') {
            snakeCaseObj[snakeKey] = changeCamelToSnakeCase(value);
        } else {
            snakeCaseObj[snakeKey] = value;
        }
    })

    return snakeCaseObj;
}