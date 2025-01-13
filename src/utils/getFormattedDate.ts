export default function getFormattedDate(
  dateString: string, // YYYY-MM-DD format
  locale: string
): string {
  try {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat(locale, { dateStyle: 'long' }).format(date);
  } catch (_) {
    return dateString;
  }
}
