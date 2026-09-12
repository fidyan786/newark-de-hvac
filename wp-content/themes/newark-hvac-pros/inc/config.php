<?php
/**
 * Newark HVAC Pros — site configuration.
 * Replace the tracking number before launch (CallRail / WhatConverts, 302 area code).
 */
if ( ! defined( 'NHP_VERSION' ) ) {
	define( 'NHP_VERSION', '1.0.2' );
}

function nhp_config() {
	static $config = null;
	if ( $config !== null ) {
		return $config;
	}

	$config = array(
		'brand'          => 'Newark HVAC Pros',
		'legal_name'     => 'Newark HVAC Pros',
		'tagline'        => '24/7 Heating & Cooling Dispatch for Newark, DE',
		'phone_display'  => '(302) 555-0147',
		'phone_tel'      => '+13025550147',
		'email'          => 'service@newarkhvacpros.com',
		'city'           => 'Newark',
		'state'          => 'Delaware',
		'state_code'     => 'DE',
		'county'         => 'New Castle County',
		'lat'            => '39.6837',
		'lng'            => '-75.7497',
		'price_range'    => '$$',
		'hours'          => '24/7',
		'founded_note'   => '', // Do not fabricate years in business.
		'license_note'   => 'We dispatch Delaware-licensed HVACR contractors. A public license number is published here once the operating contractor is assigned.',
		'address'        => null, // Service-area business until a verified Newark address exists.
		'zips_primary'   => array( '19702', '19711', '19713', '19725' ),
		'zips_extended'  => array( '19701', '19707', '19720' ),
		'communities'    => array(
			'Newark',
			'Bear',
			'Glasgow',
			'Pike Creek',
			'Hockessin',
			'Christiana',
			'Brookside',
			'Ogletown',
			'New Castle',
		),
		'brands'         => array(
			'Carrier',
			'Trane',
			'Lennox',
			'Rheem',
			'Goodman',
			'Amana',
			'American Standard',
			'York',
			'Bosch',
			'Bryant',
			'Ruud',
		),
		'theme_uri'      => nhp_theme_uri(),
		'site_url'       => nhp_site_url(),
	);

	return $config;
}

function nhp_is_standalone() {
	return defined( 'NHP_STANDALONE' ) && NHP_STANDALONE;
}

function nhp_is_https() {
	if ( ! empty( $_SERVER['HTTP_X_FORWARDED_PROTO'] ) ) {
		$proto = strtolower( trim( explode( ',', (string) $_SERVER['HTTP_X_FORWARDED_PROTO'] )[0] ) );
		if ( $proto === 'https' ) {
			return true;
		}
	}
	if ( ! empty( $_SERVER['HTTPS'] ) && $_SERVER['HTTPS'] !== 'off' ) {
		return true;
	}
	if ( isset( $_SERVER['SERVER_PORT'] ) && (int) $_SERVER['SERVER_PORT'] === 443 ) {
		return true;
	}
	// Vercel production is always HTTPS.
	if ( getenv( 'VERCEL' ) ) {
		return true;
	}
	return false;
}

function nhp_site_url() {
	if ( function_exists( 'home_url' ) && ! nhp_is_standalone() ) {
		return untrailingslashit( home_url() );
	}
	$forced = getenv( 'SITE_URL' );
	if ( is_string( $forced ) && $forced !== '' ) {
		return rtrim( $forced, '/' );
	}
	$scheme = nhp_is_https() ? 'https' : 'http';
	$host   = isset( $_SERVER['HTTP_HOST'] ) ? $_SERVER['HTTP_HOST'] : 'localhost:8080';
	return $scheme . '://' . $host;
}

function nhp_theme_dir() {
	return dirname( __DIR__ );
}

function nhp_theme_uri() {
	if ( function_exists( 'get_template_directory_uri' ) && ! nhp_is_standalone() ) {
		return get_template_directory_uri();
	}
	return nhp_site_url() . '/wp-content/themes/newark-hvac-pros';
}

function nhp_path( $path = '' ) {
	$base = rtrim( nhp_site_url(), '/' );
	$path = trim( $path, '/' );
	if ( $path === '' ) {
		return $base . '/';
	}
	return $base . '/' . $path . '/';
}

function nhp_phone_display() {
	$c = nhp_config();
	return $c['phone_display'];
}

function nhp_phone_tel() {
	$c = nhp_config();
	return 'tel:' . $c['phone_tel'];
}

function nhp_nav_primary() {
	return array(
		array( 'label' => 'Services', 'url' => nhp_path( 'services' ), 'children' => nhp_service_nav() ),
		array( 'label' => 'Emergency', 'url' => nhp_path( 'emergency-hvac-newark-de' ) ),
		array( 'label' => 'Service Area', 'url' => nhp_path( 'service-area' ) ),
		array( 'label' => 'Cost Guide', 'url' => nhp_path( 'hvac-cost-guide-newark-de' ) ),
		array( 'label' => 'About', 'url' => nhp_path( 'about' ) ),
		array( 'label' => 'Contact', 'url' => nhp_path( 'contact' ) ),
	);
}

function nhp_service_nav() {
	return array(
		array( 'label' => 'AC Repair', 'url' => nhp_path( 'ac-repair-newark-de' ) ),
		array( 'label' => 'AC Installation', 'url' => nhp_path( 'ac-installation-newark-de' ) ),
		array( 'label' => 'Furnace Repair', 'url' => nhp_path( 'furnace-repair-newark-de' ) ),
		array( 'label' => 'Furnace Installation', 'url' => nhp_path( 'furnace-installation-newark-de' ) ),
		array( 'label' => 'Heat Pump Repair', 'url' => nhp_path( 'heat-pump-repair-newark-de' ) ),
		array( 'label' => 'Heat Pump Installation', 'url' => nhp_path( 'heat-pump-installation-newark-de' ) ),
		array( 'label' => 'HVAC Replacement', 'url' => nhp_path( 'hvac-replacement-newark-de' ) ),
		array( 'label' => 'Emergency HVAC', 'url' => nhp_path( 'emergency-hvac-newark-de' ) ),
		array( 'label' => 'Maintenance', 'url' => nhp_path( 'hvac-maintenance-newark-de' ) ),
		array( 'label' => 'Mini Splits', 'url' => nhp_path( 'ductless-mini-split-newark-de' ) ),
		array( 'label' => 'Indoor Air Quality', 'url' => nhp_path( 'indoor-air-quality-newark-de' ) ),
		array( 'label' => 'Duct Cleaning', 'url' => nhp_path( 'duct-cleaning-newark-de' ) ),
		array( 'label' => 'Commercial HVAC', 'url' => nhp_path( 'commercial-hvac-newark-de' ) ),
		array( 'label' => 'Financing', 'url' => nhp_path( 'hvac-financing-newark-de' ) ),
	);
}

function nhp_footer_services() {
	return array_slice( nhp_service_nav(), 0, 8 );
}

function nhp_location_nav() {
	return array(
		array( 'label' => 'Bear, DE', 'url' => nhp_path( 'bear-de-hvac' ) ),
		array( 'label' => 'Pike Creek, DE', 'url' => nhp_path( 'pike-creek-de-hvac' ) ),
		array( 'label' => 'Glasgow, DE', 'url' => nhp_path( 'glasgow-de-hvac' ) ),
		array( 'label' => 'Hockessin, DE', 'url' => nhp_path( 'hockessin-de-hvac' ) ),
		array( 'label' => 'Christiana, DE', 'url' => nhp_path( 'christiana-de-hvac' ) ),
	);
}
