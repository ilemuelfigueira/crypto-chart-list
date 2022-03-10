export function formatDate(date: Date): string {
	if (!date) return '';
	const day = date.getDate();
	const month = date.getMonth() + 1;
	const hours = date.getHours();
	const minutes = date.getMinutes();

	return `${addLeadingZero(day)}/${addLeadingZero(month)} ${addLeadingZero(hours)}:${addLeadingZero(
		minutes
	)}`;
}

export function addLeadingZero(number: number): string {
	return number < 10 ? `0${number}` : `${number}`;
}
