const setItem=(key, value)=>{
    localStorage.setItem(key, JSON.stringify(value));
}

const getItem =(key)=>{
    const item = localStorage.getItem(key);
    if (item === null || item === undefined) {
        return null;
    }
    try {
        return JSON.parse(item);
    } catch (error) {
        console.error(`Error parsing localStorage item '${key}':`, error);
        return null;
    }
}

const removeItem=(key)=>{
    localStorage.removeItem(key);
}

export{setItem,getItem,removeItem};
