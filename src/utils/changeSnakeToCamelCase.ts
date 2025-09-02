export const changeSnakeToCamelCase = (obj: any): any => {
    const camelCaseObj: any = {}

    Object.keys(obj).forEach(key => {
        const camelKey = key.replace(/_([a-z])/g, (g) => g[1].toUpperCase());
        const value = obj[key];

        if (value !== null && typeof value === 'object') {
            camelCaseObj[camelKey] = changeSnakeToCamelCase(value);
        } else {
            camelCaseObj[camelKey] = value;
        }
    })

    return camelCaseObj;
}

