function hashString(str) {
    const encoder = new TextEncoder();
    const data = encoder.encode(str);
    const hash = crypto.subtle.digest('SHA-256', data);
    console.log(data)
    const hexString = Array.from(new Uint8Array(hash))
        .map(b => b.toString(16).padStart(2, '0'))
        .join('');
    return hexString;
}

export { hashString }