<?php
function nhp_json_ld( $data ) {
	return '<script type="application/ld+json">' . wp_json_encode_compat( $data ) . '</script>';
}

function wp_json_encode_compat( $data ) {
	if ( function_exists( 'wp_json_encode' ) ) {
		return wp_json_encode( $data, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE );
	}
	return json_encode( $data, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE );
}

function nhp_local_business_schema() {
	$c      = nhp_config();
	$schema = array(
		'@context' => 'https://schema.org',
		'@type'    => array( 'HVACBusiness', 'LocalBusiness' ),
		'name'     => $c['brand'],
		'image'    => nhp_asset( 'assets/img/og-cover.svg' ),
		'url'      => nhp_path(),
		'telephone' => $c['phone_display'],
		'email'    => $c['email'],
		'priceRange' => $c['price_range'],
		'currenciesAccepted' => 'USD',
		'paymentAccepted' => 'Cash, Credit Card, Financing',
		'areaServed' => array(
			array( '@type' => 'City', 'name' => 'Newark, Delaware' ),
			array( '@type' => 'City', 'name' => 'Bear, Delaware' ),
			array( '@type' => 'City', 'name' => 'Glasgow, Delaware' ),
			array( '@type' => 'City', 'name' => 'Pike Creek, Delaware' ),
			array( '@type' => 'City', 'name' => 'Hockessin, Delaware' ),
			array( '@type' => 'City', 'name' => 'Christiana, Delaware' ),
			array( '@type' => 'AdministrativeArea', 'name' => 'New Castle County, Delaware' ),
		),
		'geo' => array(
			'@type'     => 'GeoCoordinates',
			'latitude'  => $c['lat'],
			'longitude' => $c['lng'],
		),
		'openingHoursSpecification' => array(
			array(
				'@type'     => 'OpeningHoursSpecification',
				'dayOfWeek' => array( 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday' ),
				'opens'     => '00:00',
				'closes'    => '23:59',
			),
		),
		'description' => 'HVAC repair, installation, and 24/7 emergency dispatch in Newark, Delaware and surrounding New Castle County communities.',
	);

	if ( ! empty( $c['address'] ) ) {
		$schema['address'] = array(
			'@type'           => 'PostalAddress',
			'streetAddress'   => $c['address'],
			'addressLocality' => $c['city'],
			'addressRegion'   => $c['state_code'],
			'postalCode'      => '19711',
			'addressCountry'  => 'US',
		);
	} else {
		$schema['address'] = array(
			'@type'           => 'PostalAddress',
			'addressLocality' => $c['city'],
			'addressRegion'   => $c['state_code'],
			'addressCountry'  => 'US',
		);
	}

	return $schema;
}

function nhp_service_schema( $page ) {
	$c = nhp_config();
	return array(
		'@context'    => 'https://schema.org',
		'@type'       => 'Service',
		'name'        => $page['h1'],
		'serviceType' => isset( $page['service_type'] ) ? $page['service_type'] : $page['h1'],
		'provider'    => array(
			'@type' => 'HVACBusiness',
			'name'  => $c['brand'],
			'telephone' => $c['phone_display'],
			'url'   => nhp_path(),
		),
		'areaServed'  => array(
			'@type' => 'City',
			'name'  => 'Newark, Delaware',
		),
		'description' => $page['meta'],
		'url'         => nhp_path( $page['slug'] ),
	);
}

function nhp_faq_schema( $faqs ) {
	$entities = array();
	foreach ( $faqs as $faq ) {
		$entities[] = array(
			'@type'          => 'Question',
			'name'           => wp_strip_all_tags_compat( $faq['q'] ),
			'acceptedAnswer' => array(
				'@type' => 'Answer',
				'text'  => wp_strip_all_tags_compat( $faq['a'] ),
			),
		);
	}
	return array(
		'@context'   => 'https://schema.org',
		'@type'      => 'FAQPage',
		'mainEntity' => $entities,
	);
}

function wp_strip_all_tags_compat( $text ) {
	if ( function_exists( 'wp_strip_all_tags' ) ) {
		return wp_strip_all_tags( $text );
	}
	return trim( html_entity_decode( strip_tags( $text ), ENT_QUOTES, 'UTF-8' ) );
}

function nhp_breadcrumb_schema( $items ) {
	$list = array();
	$i    = 1;
	foreach ( $items as $item ) {
		$entry = array(
			'@type'    => 'ListItem',
			'position' => $i,
			'name'     => $item['label'],
		);
		if ( ! empty( $item['url'] ) ) {
			$entry['item'] = $item['url'];
		}
		$list[] = $entry;
		$i++;
	}
	return array(
		'@context'        => 'https://schema.org',
		'@type'           => 'BreadcrumbList',
		'itemListElement' => $list,
	);
}

function nhp_website_schema() {
	$c = nhp_config();
	return array(
		'@context' => 'https://schema.org',
		'@type'    => 'WebSite',
		'name'     => $c['brand'],
		'url'      => nhp_path(),
	);
}

function nhp_article_schema( $page ) {
	$c = nhp_config();
	return array(
		'@context'        => 'https://schema.org',
		'@type'           => 'Article',
		'headline'        => $page['title'],
		'description'     => $page['meta'],
		'datePublished'   => isset( $page['date'] ) ? $page['date'] : '2026-09-01',
		'dateModified'    => isset( $page['modified'] ) ? $page['modified'] : '2026-09-13',
		'author'          => array(
			'@type' => 'Organization',
			'name'  => $c['brand'],
		),
		'publisher'       => array(
			'@type' => 'Organization',
			'name'  => $c['brand'],
		),
		'mainEntityOfPage' => nhp_path( $page['slug'] ),
	);
}

function nhp_print_schema( $page ) {
	$blocks   = array();
	$blocks[] = nhp_local_business_schema();
	if ( empty( $page['slug'] ) ) {
		$blocks[] = nhp_website_schema();
	}
	if ( ! empty( $page['service_type'] ) ) {
		$blocks[] = nhp_service_schema( $page );
	}
	if ( ! empty( $page['faqs'] ) ) {
		$blocks[] = nhp_faq_schema( $page['faqs'] );
	}
	if ( ! empty( $page['crumbs'] ) ) {
		$blocks[] = nhp_breadcrumb_schema( $page['crumbs'] );
	}
	if ( ! empty( $page['is_article'] ) ) {
		$blocks[] = nhp_article_schema( $page );
	}
	$html = '';
	foreach ( $blocks as $block ) {
		$html .= nhp_json_ld( $block );
	}
	return $html;
}
