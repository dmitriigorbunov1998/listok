export function formatDateTime(date: any) {
    const dateObj = new Date(date);
    const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    };

    let formattedDate = dateObj.toLocaleString('ru-RU', options);

    formattedDate = formattedDate.replace('г.', '');

    return formattedDate.trim();
}