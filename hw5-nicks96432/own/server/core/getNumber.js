let number;

const getNumber = (forceRestart = false) => {
	// TODO: generate a random number if number is undefined or forceRestart is true
	if (forceRestart === true || number === undefined) {
		number = Math.floor(Math.random() * 99);
	}
	return number;
};

export default getNumber;
