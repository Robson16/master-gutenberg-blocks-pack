<?php

/**
 * Plugin Name:				Master Gutenberg Blocks Pack
 * Plugin URI:				https://github.com/Robson16/master-gutenberg-blocks-pack
 * Description:				The Master Gutenberg Blocks Pack is a plugin that adds some new custom blocks to the Gutenberg WordPress editor.
 * Requires at least: 5.8
 * Requires PHP:      7.0
 * Version:						2.0.1
 * Author:						Robson H. Rodrigues
 * Author URI:				robsonhrodrigues.com.br
 * License:						GPL-2.0-or-later
 * License URI:				https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:				masterblocks
 */

// Exit if accessed directly.
if (!defined('ABSPATH')) {
	exit;
}

/**
 * Block Initializer.
 */
require_once plugin_dir_path(__FILE__) . 'src/init.php';
