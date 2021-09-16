<?php

/**
 * Plugin Name: Master Gutenberg Blocks Pack
 * Plugin URI: https://github.com/Robson16/master-gutenberg-blocks-pack
 * Description: The Master Gutenberg Blocks Pack is a plugin that adds some new custom blocks to the Gutenberg WordPress editor.
 * Author: Robson H. Rodrigues
 * Author URI: robsonhrodrigues.com.br
 * Version: 1.0.0
 * Text Domain: masterblocks
 * License: GPL2+
 * License URI: https://www.gnu.org/licenses/gpl-2.0.txt
 */

// Exit if accessed directly.
if (!defined('ABSPATH')) {
	exit;
}

/**
 * Block Initializer.
 */
require_once plugin_dir_path(__FILE__) . 'src/init.php';
