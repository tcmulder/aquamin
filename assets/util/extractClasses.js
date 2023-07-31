/**
 * Extract classes
 *
 * Extract common classes from components. This is necessary because
 * adding attributes in the editor appears to happen multiple times,
 * so only the last set of classes added gets applied; so, this function
 * re-adds the appropriate classes on each pass.
 *
 * You can begin attribute names with aquaminClassName
 * (e.g. aquaminClassNameSpacing) to automatically have this function add
 * them to the classList.
 *
 * Definitely a hack, but here we are :-)
 */
import classnames from 'classnames';

const extractClasses = (attributes) => {
	// start with no classes
	const classNames = [];
	// get all classes applied to this component
	for (const [key, value] of Object.entries(attributes)) {
		if (key.startsWith('aquaminClassName') && value.length) {
			classNames.push(...value.map((classObj) => classObj.value));
		}
	}
	// return them
	return classnames(classNames);
};
export default extractClasses;
