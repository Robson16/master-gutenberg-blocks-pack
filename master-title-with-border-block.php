<?php

/**
 * Plugin Name:       Master Title With Border Block
 * Description:       A plugin that add a new custom title block to the Gutenberg editor.
 * Requires at least: 5.8
 * Requires PHP:      7.0
 * Version:           0.1.0
 * Author:            Robson H. Rodrigues
 * Author URI:				https://robsonhrodrigues.com.br/
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       master-title-with-border-block
 *
 * @package           create-block
 */

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */
function master_title_with_border_block_init()
{
	register_block_type(__DIR__ . '/build');
}
add_action('init', 'master_title_with_border_block_init');
