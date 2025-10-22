/**
 * My Block Class Name UI save interface
 *
 * This defines how the block gets
 * saved into the database. If
 * it returns null or <InnerBlocks.Content />
 * then is a dynamic block.
 */

/**
 * Import save dependencies
 */
import { __ } from '@wordpress/i18n';
import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';

/**
 * Generate block HTML to save to the database
 * @param {Object} props            Component props
 * @param {Object} props.attributes All block attributes
 */
const MyBlockClassNameUIBlockSave = (props) => {
	// get the props and attributes we care about
	const {
		attributes: { aquaminClassNameAquaminMySpecialClasses },
	} = props;

	// set props for the outermost block element
	const blockProps = useBlockProps.save({
		className: 'my-block-class-name-ui',
	});

	// apply wrapper props to outermost block element so it can contain inner blocks
	const innerBlocksProps = useInnerBlocksProps.save(blockProps);

	// output the block's html
	return (
		<div {...innerBlocksProps}>
			<p>{__('Classes added to this block:', 'aquamin')}</p>
			<ul>
				{aquaminClassNameAquaminMySpecialClasses.map((cls) => (
					<li key={cls}>{cls.value}</li>
				))}
			</ul>
			<p>{__('Classes added to core paragraph:', 'aquamin')}</p>
			{innerBlocksProps.children}
		</div>
	);
};
export default MyBlockClassNameUIBlockSave;
