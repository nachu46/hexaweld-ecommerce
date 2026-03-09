export const getImageUrl = (url) => {
    if (!url) return '';
    let fixedUrl = url;

    // Fix existing bad data in the DB
    if (fixedUrl.startsWith('http://localhost:5000')) {
        fixedUrl = fixedUrl.replace('http://localhost:5000', '');
    }

    // If it's a relative URL (like /uploads/...), return it directly since we are now serving uploads
    // directly from the Vite public assets directory.
    if (fixedUrl.startsWith('/uploads')) {
        return fixedUrl;
    }

    // Otherwise return as is (e.g. valid external links, empty strings)
    return fixedUrl;
};
