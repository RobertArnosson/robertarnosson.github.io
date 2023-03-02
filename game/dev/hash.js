function hashString(str) {
    let hash = 0;
    for (let n = 0; n < 5; n++) {
        for (let i = 0; i < str.length; i++) {
            let char = str.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash &= hash;
        }
    }
    return hash.toString(16);
}
  
export { hashString }