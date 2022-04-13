import { RichText, useBlockProps } from '@wordpress/block-editor';
import classnames from 'classnames';

export default function save( { attributes, style } ) {
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
		'master-title-with-border-block': true,
		'has-border': borderTop || borderRight || borderBottom || borderLeft,
		'has-border-top': borderTop,
		'has-border-right': borderRight,
		'has-border-bottom': borderBottom,
		'has-border-left': borderLeft,
	} );

	return (
		<div
			{ ...useBlockProps.save( {
				className,
				style: { ...style, borderColor: borderColor },
			} ) }
		>
			<TagName>
				<RichText.Content value={ text } />
			</TagName>
		</div>
	);
}
