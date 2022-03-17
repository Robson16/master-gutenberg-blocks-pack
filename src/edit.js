import { __ } from '@wordpress/i18n';
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
import classnames from 'classnames';

import HeadingLevelDropdown from './heading-level-dropdown';

import './editor.scss';

export default function Edit( {
	attributes,
	setAttributes,
	mergeBlocks,
	onReplace,
	style,
	clientId,
} ) {
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

	const blockProps = useBlockProps( {
		className: classnames( {
			[ `has-text-align-${ textAlign }` ]: textAlign,
			'master-title-with-border-block': true,
			'has-border': borderTop | borderRight | borderBottom | borderLeft,
			'has-border-top': borderTop,
			'has-border-right': borderRight,
			'has-border-bottom': borderBottom,
			'has-border-left': borderLeft,
		} ),
		style: { ...style, borderColor: borderColor },
	} );

	return (
		<Fragment>
			<RichText
				identifier="content"
				tagName={ tagName }
				value={ text }
				onChange={ ( newText ) => setAttributes( { text: newText } ) }
				onMerge={ mergeBlocks }
				onReplace={ onReplace }
				onRemove={ () => onReplace( [] ) }
				aria-label={ wp.i18n.__( 'Heading text', 'masterblocks' ) }
				placeholder={ wp.i18n.__( 'Heading', 'masterblocks' ) }
				textAlign={ textAlign }
				{ ...blockProps }
			/>

			<BlockControls>
				<HeadingLevelDropdown
					selectedLevel={ level }
					onChange={ ( newLevel ) =>
						setAttributes( { level: newLevel } )
					}
				/>
				<AlignmentToolbar
					value={ textAlign }
					onChange={ ( newAlignment ) =>
						setAttributes( { textAlign: newAlignment } )
					}
				/>
			</BlockControls>

			<InspectorControls>
				<PanelBody
					title={ wp.i18n.__( 'Border', 'masterblocks' ) }
					initialOpen={ false }
				>
					<PanelColorSettings
						title={ wp.i18n.__( 'Colors', 'masterblocks' ) }
						colorSettings={ [
							{
								value: borderColor,
								onChange: ( color ) =>
									setAttributes( { borderColor: color } ),
								label: wp.i18n.__( 'Color', 'masterblocks' ),
							},
						] }
					/>

					<PanelRow>
						<h3>{ wp.i18n.__( 'Sides', 'masterblocks' ) }</h3>
					</PanelRow>
					<PanelRow>
						<CheckboxControl
							label={ wp.i18n.__( 'Top', 'masterblocks' ) }
							checked={ borderTop }
							onChange={ ( newValue ) => {
								setAttributes( { borderTop: newValue } );
							} }
						/>
					</PanelRow>
					<PanelRow>
						<CheckboxControl
							label={ wp.i18n.__( 'Right', 'masterblocks' ) }
							checked={ borderRight }
							onChange={ ( newValue ) => {
								setAttributes( { borderRight: newValue } );
							} }
						/>
					</PanelRow>
					<PanelRow>
						<CheckboxControl
							label={ wp.i18n.__( 'Bottom', 'masterblocks' ) }
							checked={ borderBottom }
							onChange={ ( newValue ) => {
								setAttributes( { borderBottom: newValue } );
							} }
						/>
					</PanelRow>
					<PanelRow>
						<CheckboxControl
							label={ wp.i18n.__( 'Left', 'masterblocks' ) }
							checked={ borderLeft }
							onChange={ ( newValue ) => {
								setAttributes( { borderLeft: newValue } );
							} }
						/>
					</PanelRow>
				</PanelBody>
			</InspectorControls>
		</Fragment>
	);
}
