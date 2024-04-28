export function formatAlarmTimeWithoutZero(time: string): string {
    const [hours, minutes] = time.split(':');

    // Remove leading zero from hours (if any)
    const formattedHours = Number(hours).toString();

    // Remove leading zero from minutes (if any)
    const formattedMinutes = Number(minutes).toString();

    return `${formattedHours}:${formattedMinutes}`;
}