/**
 * BLOCK: title-with-border
 */

import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';
import edit from './edit.js';
import save from './save.js';
import './index.scss';
import './style.scss';

registerBlockType( 'mb/block-title-with-border', {
	title: __( 'Title with Border', 'masterblocks' ), // Block title.
	icon: 'heading', // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: 'common', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	keywords: [ __( 'title', 'masterblocks' ), __( 'border', 'masterblocks' ) ],
	supports: {
		align: [ 'wide', 'full' ],
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
	edit,
	save,
} );
