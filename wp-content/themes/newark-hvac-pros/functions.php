<?php
/**
 * Newark HVAC Pros theme.
 *
 * @package NewarkHVACPros
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

require_once get_template_directory() . '/inc/bootstrap.php';
require_once get_template_directory() . '/inc/seed.php';

if ( session_status() !== PHP_SESSION_ACTIVE && ! headers_sent() ) {
	session_start();
}

add_action(
	'after_setup_theme',
	function () {
		add_theme_support( 'title-tag' );
		add_theme_support( 'html5', array( 'search-form', 'style', 'script' ) );
		register_nav_menus( array( 'primary' => 'Primary' ) );
	}
);

add_filter( 'pre_get_document_title', function () {
	return false;
}, 99 );

add_action(
	'wp_enqueue_scripts',
	function () {
		wp_dequeue_style( 'wp-block-library' );
		wp_dequeue_style( 'global-styles' );
	},
	100
);

add_action( 'init', function () {
	add_rewrite_rule( '^sitemap\.xml$', 'index.php?nhp_sitemap=1', 'top' );
} );

add_filter(
	'query_vars',
	function ( $vars ) {
		$vars[] = 'nhp_sitemap';
		return $vars;
	}
);

add_action(
	'template_redirect',
	function () {
		if ( ! get_query_var( 'nhp_sitemap' ) ) {
			return;
		}
		header( 'Content-Type: application/xml; charset=UTF-8' );
		echo '<?xml version="1.0" encoding="UTF-8"?>' . "\n";
		echo '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' . "\n";
		echo '  <url><loc>' . esc_url( home_url( '/' ) ) . '</loc></url>' . "\n";
		foreach ( get_pages( array( 'number' => 200 ) ) as $p ) {
			echo '  <url><loc>' . esc_url( get_permalink( $p ) ) . '</loc></url>' . "\n";
		}
		echo '</urlset>';
		exit;
	}
);

add_action( 'after_switch_theme', 'nhp_seed_pages' );
