const hasObjectValue = (obj, key) => {
    return key.split('.').every((x) => {
        if (typeof obj !== 'object' || obj === null || !(x in obj)) return false;
        obj = obj[x];
        return true;
    });
}

export default hasObjectValue;
