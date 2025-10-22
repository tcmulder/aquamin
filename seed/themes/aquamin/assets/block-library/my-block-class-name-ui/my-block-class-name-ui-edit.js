/**
 * My Block Class Name UI editor interface
 *
 * This defines how the block works
 * within the back-end block editor.
 */

/**
 * Import edit dependencies
 */
import { __ } from '@wordpress/i18n';
import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';

/**
 * Generate block editor component
 * @param {Object} props            Block props
 * @param {Object} props.attributes All block attributes
 */
const MyBlockClassNameUIBlockEdit = (props) => {
	// get the props and attributes we care about
	const {
		attributes: { aquaminClassNameAquaminMySpecialClasses },
	} = props;

	// set props for the outermost block element
	const blockProps = useBlockProps({
		className: 'my-block-class-name-ui',
	});

	// apply wrapper props to outermost block element so it can contain inner blocks
	const innerBlocksProps = useInnerBlocksProps(blockProps, {
		template: [
			[
				'core/paragraph',
				{
					placeholder: __(
						'My Block Class Name UI inner blocks',
						'aquamin',
					),
					aquaminClassNameAquaminMySpecialClasses2: [
						{
							value: 'border-right',
							title: 'Border Right',
						},
					],
					content: __(
						'.border-right (unless you changed it)',
						'aquamin',
					),
				},
				[],
			],
		],
	});

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
export default MyBlockClassNameUIBlockEdit;
