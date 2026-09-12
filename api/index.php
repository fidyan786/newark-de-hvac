<?php
/**
 * Vercel PHP front controller. Serves the existing standalone site
 * without changing templates or copy.
 */
$root = dirname( __DIR__ );
$uri  = nhp_request_uri_path();

// Recover the public path when Vercel rewrites everything to this file.
if ( $uri === '/api/index.php' || $uri === '/api/index' ) {
	$original = '';
	if ( ! empty( $_GET['path'] ) ) {
		$original = '/' . ltrim( (string) $_GET['path'], '/' );
		unset( $_GET['path'] );
	} elseif ( ! empty( $_SERVER['HTTP_X_INVOKE_PATH'] ) ) {
		$original = (string) $_SERVER['HTTP_X_INVOKE_PATH'];
	}
	if ( $original !== '' && $original !== '/api/index.php' && $original !== '/api/index' ) {
		$uri = $original;
		$query = isset( $_SERVER['QUERY_STRING'] ) ? $_SERVER['QUERY_STRING'] : '';
		$query = preg_replace( '/(?:^|&)path=[^&]*/', '', (string) $query );
		$query = ltrim( (string) $query, '&' );
		$_SERVER['REQUEST_URI'] = $uri . ( $query !== '' ? '?' . $query : '' );
		$_SERVER['QUERY_STRING'] = $query;
	} else {
		$uri = '/';
		$_SERVER['REQUEST_URI'] = '/';
	}
}

$file = $root . $uri;
if ( $uri !== '/' && is_file( $file ) ) {
	$ext  = strtolower( pathinfo( $file, PATHINFO_EXTENSION ) );
	$mime = array(
		'css'  => 'text/css; charset=UTF-8',
		'js'   => 'application/javascript; charset=UTF-8',
		'svg'  => 'image/svg+xml',
		'png'  => 'image/png',
		'jpg'  => 'image/jpeg',
		'jpeg' => 'image/jpeg',
		'gif'  => 'image/gif',
		'webp' => 'image/webp',
		'ico'  => 'image/x-icon',
		'txt'  => 'text/plain; charset=UTF-8',
		'xml'  => 'application/xml; charset=UTF-8',
		'json' => 'application/json; charset=UTF-8',
		'woff' => 'font/woff',
		'woff2'=> 'font/woff2',
	);
	if ( isset( $mime[ $ext ] ) ) {
		header( 'Content-Type: ' . $mime[ $ext ] );
		header( 'Cache-Control: public, max-age=86400' );
		readfile( $file );
		exit;
	}
}

require $root . '/index.php';

function nhp_request_uri_path() {
	$uri = isset( $_SERVER['REQUEST_URI'] ) ? $_SERVER['REQUEST_URI'] : '/';
	$path = parse_url( $uri, PHP_URL_PATH );
	return $path ? $path : '/';
}
