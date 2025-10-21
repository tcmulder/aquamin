/**
 * Utility functions for classNameUI functionality.
 */
import classnames from 'classnames';
import { cloneElement } from '@wordpress/element';
import { PanelBody } from '@wordpress/components';

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
 *
 * @param {Object} attributes Block attributes
 * @param {string} prefix     Prefix to look for
 */
export const extractClasses = (attributes, prefix = 'aquaminClassName') => {
	// start with no classes
	const classNames = [];
	// get all classes applied to this component
	for (const [key, value] of Object.entries(attributes)) {
		if (key.startsWith(prefix) && value.length) {
			classNames.push(...value.map((classObj) => classObj.value));
		}
	}
	// return them
	return classnames(classNames);
};

/**
 * Define control wrapper
 *
 * Defaults to using a normal <PanelBody />, but you can customize the
 * wrapper by passing this a custom component.
 *
 * @param {Object} props          Props
 * @param {Object} props.children Children
 * @param {Object} props.wrap     Optional wrap element
 * @param {string} props.title    Human-readable title for the accordion (if defaulting to <PanelBody>)
 */
export const Wrapper = ({ wrap, title, children }) => {
	return wrap ? (
		cloneElement(wrap, {}, children)
	) : (
		<PanelBody title={title}>{children}</PanelBody>
	);
};

/**
 * Get attribute slug
 *
 * Returns an attribute like aquamin/my-block as aquaminClassNameMyBlock.
 *
 * Note that you may need to add this manually for dynamic blocks.
 * @param {string} slug Block slug (e.g. 'aquamin/my-block')
 */
export const getAttributeSlug = (slug) => {
	const camelCased = slug
		.replace(/[\/-]+(.)/g, (_, c) => c.toUpperCase()) // convert slashes and hyphens to camel case
		.replace(/^[a-z]/, (c) => c.toUpperCase()); // capitalize first letter
	return `aquaminClassName${camelCased}`;
};
