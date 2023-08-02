/**
 * Set up main menu.
 *
 * @param { string } msg Message to console log.
 */
const mainMenu = (msg = 'scripts loading') => {
	const today = new Date();
	const time = `${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`;
	// eslint-disable-next-line no-console
	console.log(`${msg} ${time}`);
};

// run it!
mainMenu();
