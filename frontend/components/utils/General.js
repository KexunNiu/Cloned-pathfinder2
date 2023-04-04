/**
 * A helper function that takes an input date string and return true if the date is in the past, otherwise false
 * @param timestamp The timestamp to check
 * @returns true if the date is in the past, otherwise false
 */
export const isTsInPast = (timestamp) => {
	const date = new Date(timestamp);

	if (isNaN(date.getTime())) {
		return false;
	}

	return date.getTime() < new Date().getTime();
};


/**
 * Returns the current date and time in the format YYYY-MM-DDThh:mm.
 *
 * @returns {string} The current date and time as a string in the specified format.
 */
export const getCurrentDateTime = () => {
  const now = new Date();

  return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}T${pad(now.getHours())}:${pad(now.getMinutes())}`;
}


/**
 * Pads a number with a leading zero if it is a single digit.
 *
 * @param {number} number - The number to pad.
 * @returns {string} The padded number as a string.
 */
const pad = (number) => {
  return number.toString().padStart(2, '0');
}


/**
 * A helper function to search a list of fields for a given search text. If the search text is empty, it will return true.
 * @param searchText The search text to search for
 * @param fieldList A list of strings to search through
 * @returns true if the search text is found in any of the fields, otherwise false
 */
export const searchFields = (searchText, fieldList) => {
	if (!searchText) return true;

	searchText = searchText.toLowerCase();

	return fieldList.some(field => field && field.toLowerCase().includes(searchText));
};


/**
 * A helper function to return the value of a given key in a map, or a fallback value if the key is not found.
 * @param map A JS object
 * @param key A key to search for in the map
 * @param fallbackKey A fallback value to return if the key is not found
 * @returns
 */
export const getOrDefault = (map, key, fallbackKey) => {
	if (key in map) {
		return map[key];
	}

	console.debug(`Key '${key}' not found in map, using fallback key '${fallbackKey}'.`);

	return map[fallbackKey];
};
