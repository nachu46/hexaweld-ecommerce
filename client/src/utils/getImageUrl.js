export const getImageUrl = (url) => {
    if (!url) return '';
    let fixedUrl = url;

    // Fix existing bad data in the DB
    if (fixedUrl.startsWith('http://localhost:5000')) {
        fixedUrl = fixedUrl.replace('http://localhost:5000', '');
    }

    // If it's a relative URL (like /uploads/...), prepend the actual API URL
    if (fixedUrl.startsWith('/uploads')) {
        const apiUrl = import.meta.env.VITE_API_URL || '';
        return `${apiUrl}${fixedUrl}`;
    }

    // Otherwise return as is (e.g. valid external links, empty strings)
    return fixedUrl;
};
