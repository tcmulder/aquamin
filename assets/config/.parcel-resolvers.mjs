import {Resolver} from '@parcel/plugin';
import path from 'path';

export default new Resolver({
	async resolve({ options, specifier }) {
		// create excludes list (these are actual installed packages so don't use the global wp object)
		const excludedRealPackages = ['@wordpress/icons'];
		// replace e.g. @wordpress/block-editor packages with global wp['blockEditor'] object property
		if (specifier.startsWith('@wordpress') && ! excludedRealPackages.includes(specifier)) {
			const propertyName = specifier
				.substring(11)
				.toLowerCase()
				.replace(/(-\w)/g, (m) => m.toUpperCase().substring(1));
			return {
				// this path is arbitrary (but preferably unique) and required by parcel
				filePath: path.join(
					options.projectRoot,
					`wp-${propertyName}.js`
				),
				// this maps the package (which isn't installed or bundled) to the global wp object
				code: `module.exports = wp['${propertyName}'];`,
			};
		}
		// move on the the next built in resolver option
		return null;
	},
});
