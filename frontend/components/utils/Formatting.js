/**
 * A helper function that calculates the difference between the input date string and the current date, and returns a string that represents the difference in a human-readable format (ie. "2 days ago", "in 3 days", "just now", etc.)
 * @param timestamp A date string in the format of "YYYY-MM-DDTHH:MM:SS.sssZ"
 * @returns A string that represents the difference between the input date and the current date in a human-readable format
 */
export function formatTimeInterval(timestamp) {
	const date = new Date(timestamp);

	if (isNaN(date.getTime())) {
		return ' on an unknown day';
	}

	const now = new Date();
	const diff = (date.getTime() - now.getTime()) / 1000;

	if (diff < 0) {
		const minutesAgo = Math.floor(Math.abs(diff) / 60);

		if (minutesAgo < 60) {
			return ` ${minutesAgo}m ago`;
		} else if (minutesAgo < 60 * 24) {
			const hoursAgo = Math.floor(minutesAgo / 60);
			return ` ${hoursAgo}h ago`;
		} else {
			const daysAgo = Math.floor(minutesAgo / (60 * 24));
			return ` ${daysAgo}d ago`;
		}
	} else if (diff < 60) {
		return ' just now';
	} else if (diff < 60 * 60) {
		const minutes = Math.floor(diff / 60);
		return ` in ${minutes}m`;
	} else if (diff < 60 * 60 * 24) {
		const hours = Math.floor(diff / (60 * 60));
		return ` in ${hours}h`;
	} else {
		const days = Math.floor(diff / (60 * 60 * 24));
		return ` in ${days}d`;
	}
}


/**
 * A helper function that formats a date string into a human-readable format (ie. "Jan 1, 2021 at 12:00pm")
 * @param timestamp A date string in the format of "YYYY-MM-DDTHH:MM:SS.sssZ"
 * @returns A string that represents the input date in a human-readable format
 */
export function formatDate(timestamp) {
	const date = new Date(timestamp);

	if (isNaN(date.getTime())) {
		return 'Unknown date';
	}

	const month = date.toLocaleString('default', { month: 'short' });
	const day = date.getDate();
	const year = date.getFullYear();
	let hour = date.getHours();
	const minute = date.getMinutes();
	const ampm = hour >= 12 ? 'pm' : 'am';

	hour = hour % 12;
	hour = hour ? hour : 12; // handle midnight

	const time = `${hour}:${minute.toString().padStart(2, '0')}${ampm}`;
	return `${month} ${day}, ${year} at ${time}`;
}


/**
 * A helper function that formats a number as currency
 * @param amount A number
 * @returns A string that represents the input number as Canadian dollars
 */
export function formatCurrency(amount) {
	return new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'CAD',
	}).format(amount);
}


/**
 * A helper function that removes the protocol from a URL to make it more readable when displayed.
 * @param url A URL string
 * @returns A URL string without the protocol
 */
export function removeUrlProtocol(url) {
	return url.replace(/(^\w+:|^)\/\//, '');
}
