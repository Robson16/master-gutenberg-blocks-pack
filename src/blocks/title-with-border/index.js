/**
 * BLOCK: title-with-border
 */

/**
 * External dependencies
 */
import classnames from 'classnames';

/**
* WordPress dependencies
*/
import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';
import {
	RichText,
	InspectorControls,
	PanelColorSettings,
	BlockControls,
	AlignmentToolbar,
	useBlockProps,
} from '@wordpress/block-editor';
import { Fragment } from '@wordpress/element';
import { PanelBody, PanelRow, CheckboxControl } from '@wordpress/components';

/**
 * Internal dependencies
 */
import HeadingLevelDropdown from './heading-level-dropdown';
import './editor.scss';
import './style.scss';

/**
 * Register: Gutenberg Block.
 *
 * Registers a new block provided a unique name and an object defining its
 * behavior. Once registered, the block is made editor as an option to any
 * editor interface where blocks are implemented.
 *
 * @link https://wordpress.org/gutenberg/handbook/block-api/
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block, if it has been successfully
 *                             registered; otherwise `undefined`.
 */

// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
registerBlockType('mb/block-title-with-border', {
	title: __('Title with Border', 'masterblocks'), // Block title.
	icon: 'heading', // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: 'common', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	keywords: [
		__('title', 'masterblocks'),
		__('border', 'masterblocks'),
	],
	supports: {
		align: ['wide', 'full'],
		anchor: true,
		color: true,
		fontSize: true,
	},
	// Block attributes
	attributes: {
		text: {
			type: 'string',
		},
		level: {
			type: 'string',
			default: '2',
		},
		textAlign: {
			type: 'string',
			default: 'left',
		},
		borderColor: {
			type: 'string',
		},
		borderTop: { type: 'boolean' },
		borderRight: { type: 'boolean' },
		borderBottom: { type: 'boolean' },
		borderLeft: { type: 'boolean' },
	},

	/**
	 * The edit function describes the structure of your block in the context of the editor.
	 * This represents what the editor will render when the block is used.
	 *
	 * The "edit" property must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 *
	 * @param {Object} props Props.
	 * @returns {Mixed} JSX Component.
	 */
	edit: ({
		attributes,
		setAttributes,
		mergeBlocks,
		onReplace,
		style,
		clientId,
	}) => {
		const {
			text,
			level,
			textAlign,
			borderTop,
			borderRight,
			borderBottom,
			borderLeft,
			borderColor,
		} = attributes;

		const tagName = 'h' + level;

		const blockProps = useBlockProps({
			className: classnames({
				[`has-text-align-${textAlign}`]: textAlign,
				'mb-block-title-with-border': true,
				'has-border-top': borderTop,
				'has-border-right': borderRight,
				'has-border-bottom': borderBottom,
				'has-border-left': borderLeft,
			}),
			style: { ...style, borderColor: borderColor },
		});

		return (
			<Fragment>
				<RichText
					identifier="content"
					tagName={tagName}
					value={text}
					onChange={(newText) => setAttributes({ text: newText })}
					onMerge={mergeBlocks}
					onSplit={(value, isOriginal) => {
						let block;

						if (isOriginal || value) {
							block = createBlock('mb/block-title-with-border', {
								...attributes,
								content: value,
							});
						} else {
							block = createBlock('core/paragraph');
						}

						if (isOriginal) {
							block.clientId = clientId;
						}

						return block;
					}}
					onReplace={onReplace}
					onRemove={() => onReplace([])}
					aria-label={wp.i18n.__('Heading text', 'masterblocks')}
					placeholder={wp.i18n.__('Heading', 'masterblocks')}
					textAlign={textAlign}
					{...blockProps}
				/>

				<BlockControls>
					<HeadingLevelDropdown
						selectedLevel={level}
						onChange={(newLevel) =>
							setAttributes({ level: newLevel })
						}
					/>
					<AlignmentToolbar
						value={textAlign}
						onChange={(newAlignment) => setAttributes({ textAlign: newAlignment })}
					/>
				</BlockControls>

				<InspectorControls>
					<PanelBody
						title={wp.i18n.__('Border', 'masterblocks')}
						initialOpen={false}
					>
						<PanelColorSettings
							title={wp.i18n.__('Colors', 'masterblocks')}
							colorSettings={[
								{
									value: borderColor,
									onChange: (color) => setAttributes({ borderColor: color }),
									label: wp.i18n.__('Color', 'masterblocks'),
								},
							]}
						/>

						<PanelRow>
							<h3>{wp.i18n.__('Sides', 'masterblocks')}</h3>
						</PanelRow>
						<PanelRow>
							<CheckboxControl
								label={wp.i18n.__('Top', 'masterblocks')}
								checked={borderTop}
								onChange={(newValue) => {
									setAttributes({ borderTop: newValue });
								}}
							/>
						</PanelRow>
						<PanelRow>
							<CheckboxControl
								label={wp.i18n.__('Right', 'masterblocks')}
								checked={borderRight}
								onChange={(newValue) => {
									setAttributes({ borderRight: newValue });
								}}
							/>
						</PanelRow>
						<PanelRow>
							<CheckboxControl
								label={wp.i18n.__('Bottom', 'masterblocks')}
								checked={borderBottom}
								onChange={(newValue) => {
									setAttributes({ borderBottom: newValue });
								}}
							/>
						</PanelRow>
						<PanelRow>
							<CheckboxControl
								label={wp.i18n.__('Left', 'masterblocks')}
								checked={borderLeft}
								onChange={(newValue) => {
									setAttributes({ borderLeft: newValue });
								}}
							/>
						</PanelRow>

					</PanelBody>
				</InspectorControls>

			</Fragment >
		);
	},

	/**
	 * The save function defines the way in which the different attributes should be combined
	 * into the final markup, which is then serialized by Gutenberg into post_content.
	 *
	 * The "save" property must be specified and must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 *
	 * @param {Object} props Props.
	 * @returns {Mixed} JSX Frontend HTML.
	 */
	save: ({ attributes, style }) => {
		const {
			textAlign,
			text,
			level,
			borderTop,
			borderRight,
			borderBottom,
			borderLeft,
			borderColor,
		} = attributes;

		const TagName = 'h' + level;

		const className = classnames({
			[`has-text-align-${textAlign}`]: textAlign,
			'mb-block-title-with-border': true,
			'has-border-top': borderTop,
			'has-border-right': borderRight,
			'has-border-bottom': borderBottom,
			'has-border-left': borderLeft,
		});

		return (
			<TagName
				{...useBlockProps.save({
					className,
					style: { ...style, borderColor: borderColor },
				})}
			>
				<RichText.Content value={text} />
			</TagName>
		);
	},
});
