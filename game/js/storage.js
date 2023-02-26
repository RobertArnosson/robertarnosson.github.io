function setStorageItem(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

function getStorageItem(key) {
    return JSON.parse(localStorage.getItem(key));
}

function removeStorageItem(key) {
    localStorage.removeItem(key);
}

function checkStorageItem(key) {
    if (localStorage.getItem(key)) {
        return true;
    } else {
        return false;
    }
    
}

export { setStorageItem, getStorageItem, removeStorageItem, checkStorageItem };