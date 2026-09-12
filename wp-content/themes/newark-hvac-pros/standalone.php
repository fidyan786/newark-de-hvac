<?php
/**
 * Standalone front controller (no database required).
 */
if ( ! defined( 'NHP_STANDALONE' ) ) {
	define( 'NHP_STANDALONE', true );
}

require_once __DIR__ . '/inc/bootstrap.php';

if ( getenv( 'VERCEL' ) ) {
	session_save_path( '/tmp' );
}
if ( session_status() !== PHP_SESSION_ACTIVE ) {
	session_start();
}

$GLOBALS['nhp_form_result'] = nhp_handle_form();

if ( function_exists( 'nhp_handle_chat_api' ) && nhp_handle_chat_api() ) {
	exit;
}

$path = parse_url( isset( $_SERVER['REQUEST_URI'] ) ? $_SERVER['REQUEST_URI'] : '/', PHP_URL_PATH );
$path = trim( (string) $path, '/' );

if ( $path === 'sitemap.xml' ) {
	header( 'Content-Type: application/xml; charset=UTF-8' );
	echo nhp_sitemap_xml();
	exit;
}

if ( $path === 'robots.txt' ) {
	header( 'Content-Type: text/plain; charset=UTF-8' );
	echo "User-agent: *\nAllow: /\nSitemap: " . rtrim( nhp_site_url(), '/' ) . "/sitemap.xml\n";
	exit;
}

$slug = ( $path === '' ) ? 'home' : $path;
$page = nhp_page( $slug );

if ( ! $page ) {
	http_response_code( 404 );
	$page = array(
		'slug'     => '404',
		'template' => '404',
		'title'    => 'Page not found | ' . nhp_config()['brand'],
		'meta'     => 'The requested HVAC page was not found.',
		'h1'       => 'Page not found',
	);
}

if ( $slug !== 'contact' && ! empty( $GLOBALS['nhp_form_result']['ok'] ) ) {
	header( 'Location: ' . nhp_path( 'contact' ), true, 303 );
	exit;
}

nhp_render_page( $page );

function nhp_sitemap_xml() {
	$urls = array();
	foreach ( nhp_load_content() as $slug => $page ) {
		$loc = ( $slug === 'home' ) ? nhp_path() : nhp_path( $slug );
		$urls[] = $loc;
	}
	$xml  = '<?xml version="1.0" encoding="UTF-8"?>' . "\n";
	$xml .= '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' . "\n";
	foreach ( $urls as $loc ) {
		$xml .= '  <url><loc>' . htmlspecialchars( $loc, ENT_XML1 ) . '</loc><changefreq>weekly</changefreq></url>' . "\n";
	}
	$xml .= '</urlset>';
	return $xml;
}
