<?php

/**
 * Blocks Initializer
 *
 * Enqueue CSS/JS of all the blocks.
 *
 */

// Exit if accessed directly.
if (!defined('ABSPATH')) {
	exit;
}

// automatically load dependencies and version
$asset_file = include(plugin_dir_path(__DIR__) . '/build/index.asset.php');

class MasterGutenbergBlocksPackAssets
{
	function __construct()
	{
		add_action('enqueue_block_assets', array($this,  'blocksAssets'));
		add_action('enqueue_block_editor_assets', array($this, 'blocksEditorAssets'));
	}

	function blocksAssets()
	{
		// Styles.
		wp_enqueue_style(
			'master-blocks-style-css',
			plugins_url('build/style-index.css', dirname(__FILE__)),
			array('wp-editor'),
			$asset_file['version'],
		);
	}

	function blocksEditorAssets()
	{
		// Scripts.
		wp_enqueue_script(
			'master-blocks-js', // Handle.
			plugins_url('/build/index.js', dirname(__FILE__)),
			$asset_file['dependencies'],
			$asset_file['version'],
		);

		// Styles.
		wp_enqueue_style(
			'master-blocks-editor-css', // Handle.
			plugins_url('build/index.css', dirname(__FILE__)), // Block editor CSS.
			array('wp-edit-blocks'), // Dependency to include the CSS after it.
			$asset_file['version'],
		);
	}
}

$masterGutenbergBlocksPackAssets = new MasterGutenbergBlocksPackAssets();
