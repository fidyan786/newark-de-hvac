<?php
/**
 * Map the WordPress request to catalog content.
 */
require_once get_template_directory() . '/inc/bootstrap.php';

$GLOBALS['nhp_form_result'] = function_exists( 'nhp_handle_form' ) ? nhp_handle_form() : null;

$slug = '';
if ( is_front_page() ) {
	$slug = 'home';
} elseif ( is_404() ) {
	$slug = '';
} else {
	$path = trim( (string) parse_url( $_SERVER['REQUEST_URI'], PHP_URL_PATH ), '/' );
	$home = trim( (string) parse_url( home_url(), PHP_URL_PATH ), '/' );
	if ( $home && strpos( $path, $home ) === 0 ) {
		$path = trim( substr( $path, strlen( $home ) ), '/' );
	}
	$slug = $path;
}

$page = $slug ? nhp_page( $slug ) : null;
if ( ! $page ) {
	status_header( 404 );
	$page = array(
		'slug'     => '404',
		'template' => '404',
		'title'    => 'Page not found | Newark HVAC Pros',
		'meta'     => 'Page not found.',
		'h1'       => 'Page not found',
	);
}

nhp_render_page( $page );
