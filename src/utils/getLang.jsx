 // Get Google Translate language from cookie or default to "en"

    export const getGoogleTranslateLang = () => {
    const name = 'googtrans=';
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookies = decodedCookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
        let c = cookies[i].trim();
        if (c.indexOf(name) === 0) {
        const parts = c.substring(name.length).split('/');
        // parts[2] is the target language code, if missing default to 'en'
        return parts[2] && parts[2].length > 0 ? parts[2] : 'en';
        }
    }
    // If cookie not found at all, default to 'en'
    return 'en';
    };