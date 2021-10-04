import { __ } from '@wordpress/i18n';
import { RichText, useBlockProps } from '@wordpress/block-editor';
import classnames from 'classnames';

const TitleWithBorderSave = ( { attributes, style } ) => {
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

	const className = classnames( {
		[ `has-text-align-${ textAlign }` ]: textAlign,
		'mb-block-title-with-border': true,
		'has-border-top': borderTop,
		'has-border-right': borderRight,
		'has-border-bottom': borderBottom,
		'has-border-left': borderLeft,
	} );

	return (
		<TagName
			{ ...useBlockProps.save( {
				className,
				style,
			} ) }
		>
			<span style={ { borderColor: borderColor } }>
				<RichText.Content value={ text } />
			</span>
		</TagName>
	);
};

export default TitleWithBorderSave;
