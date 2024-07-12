export const isValidUrl = (str) => {
    const pattern = new RegExp(/^(ftp|http|https):\/\/[^ "]+$/);
    return pattern.test(str);
}