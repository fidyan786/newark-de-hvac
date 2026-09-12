<?php
if ( ! function_exists( 'esc_html' ) ) {
	function esc_html( $text ) {
		return htmlspecialchars( (string) $text, ENT_QUOTES, 'UTF-8' );
	}
}
if ( ! function_exists( 'esc_attr' ) ) {
	function esc_attr( $text ) {
		return htmlspecialchars( (string) $text, ENT_QUOTES, 'UTF-8' );
	}
}
if ( ! function_exists( 'esc_url' ) ) {
	function esc_url( $url ) {
		return htmlspecialchars( (string) $url, ENT_QUOTES, 'UTF-8' );
	}
}

function nhp_e( $text ) {
	echo esc_html( $text );
}

function nhp_current_slug() {
	if ( isset( $GLOBALS['nhp_slug'] ) ) {
		return $GLOBALS['nhp_slug'];
	}
	return '';
}

function nhp_is_current( $slug ) {
	return trim( $slug, '/' ) === trim( nhp_current_slug(), '/' );
}

function nhp_cta_call( $label = null, $class = 'btn btn-call' ) {
	$label = $label ? $label : 'Call ' . nhp_phone_display();
	return '<a class="' . esc_attr( $class ) . '" href="' . esc_url( nhp_phone_tel() ) . '">' . esc_html( $label ) . '</a>';
}

function nhp_cta_call_now( $label = 'Call Now', $class = 'btn btn-call' ) {
	$html  = '<div class="nhp-call-now">';
	$html .= '<p class="nhp-call-now-kicker">Need help now?</p>';
	$html .= nhp_cta_call( $label, $class );
	$html .= '</div>';
	return $html;
}

function nhp_cta_request( $label = 'Request Service', $class = 'btn btn-secondary' ) {
	return '<a class="' . esc_attr( $class ) . '" href="' . esc_url( nhp_path( 'contact' ) ) . '">' . esc_html( $label ) . '</a>';
}

function nhp_breadcrumbs( $items ) {
	$html  = '<nav class="crumbs" aria-label="Breadcrumb"><ol>';
	$count = count( $items );
	$pos   = 0;
	foreach ( $items as $item ) {
		$pos++;
		$html .= '<li>';
		if ( ! empty( $item['url'] ) && $pos !== $count ) {
			$html .= '<a href="' . esc_url( $item['url'] ) . '">' . esc_html( $item['label'] ) . '</a>';
		} else {
			$html .= '<span aria-current="page">' . esc_html( $item['label'] ) . '</span>';
		}
		$html .= '</li>';
	}
	$html .= '</ol></nav>';
	return $html;
}

function nhp_icon( $name ) {
	$icons = array(
		'phone'     => '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1.1-.3 1.2.4 2.5.6 3.8.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.6.6 3.8.1.4 0 .8-.3 1.1L6.6 10.8z"/></svg>',
		'clock'     => '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 2a10 10 0 1 0 .01 20.01A10 10 0 0 0 12 2zm1 11H7v-2h4V6h2v7z"/></svg>',
		'shield'    => '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 2 4 5v6c0 5 3.4 9.4 8 10.7C16.6 20.4 20 16 20 11V5l-8-3zm-1 14-4-4 1.4-1.4L11 13.2l5.6-5.6L18 9l-7 7z"/></svg>',
		'bolt'      => '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M13 2 3 14h8l-1 8 11-14h-8l0-6z"/></svg>',
		'snow'      => '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M11 2h2v4.1l2.5-1.5 1 1.8L13 8.2V11h2.8l2.8-2.5 1.5 1.5-2.5 2.8H21v2h-4.1l2.5 2.5-1.5 1.5-2.8-2.5V21h-2v-4.2l-2.5 2.8-1.5-1.5 2.5-2.8H8v-2h4.2L9.4 9.8l1.5-1.5 2.1 1.9V8.2L10.5 6.4l1-1.8L13 6.1V2h-2z"/></svg>',
		'flame'     => '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 2s4 4.2 4 8.2c0 1.5-.5 2.8-1.3 3.8.8-.3 1.5-1 1.9-1.8C18 14.8 18 17 16 19c-1.7 1.7-4 2.2-6.2 1.4C7 19.5 5.5 16.8 6 14c.3-1.6 1.2-3 2.3-4.1C8 12 9.2 13.5 11 14c-1-3 2-6.5 4-8-1 3-1 5 0 6.5C16.2 9.8 14.5 5 12 2z"/></svg>',
		'fan'       => '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 9a3 3 0 1 0 .001 6.001A3 3 0 0 0 12 9zm8.5 2c-2.4 0-4.2.7-5.4 1.8A5 5 0 0 0 13 8.1C14.8 6 18 4.5 20.5 6.2c1.4 1 1.6 3.2 0 4.8zM12 2C9.6 4.4 8.9 6.2 9.2 8.4A5 5 0 0 0 8.1 11C6 9.2 4.5 6 6.2 3.5 7.2 2.1 9.4 1.9 11 3.5L12 2zM3.5 13c2.4 0 4.2-.7 5.4-1.8A5 5 0 0 0 11 15.9C9.2 18 6 19.5 3.5 17.8c-1.4-1-1.6-3.2 0-4.8zM12 22c2.4-2.4 3.1-4.2 2.8-6.4A5 5 0 0 0 15.9 13C18 14.8 19.5 18 17.8 20.5c-1 1.4-3.2 1.6-4.8 0L12 22z"/></svg>',
		'check'     => '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M9.2 16.2 4.8 11.8l1.4-1.4 3 3 8.6-8.6 1.4 1.4z"/></svg>',
		'map'       => '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 2a7 7 0 0 0-7 7c0 5.3 7 13 7 13s7-7.7 7-13a7 7 0 0 0-7-7zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5z"/></svg>',
		'home'      => '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 3 3 12h2v8h6v-5h2v5h6v-8h2L12 3z"/></svg>',
		'money'     => '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 2a10 10 0 1 0 .01 20.01A10 10 0 0 0 12 2zm1 14.9V18h-2v-1.1c-1.7-.4-3-1.5-3-3.1h2c0 .8.8 1.3 2 1.3s2-.5 2-1.2c0-.8-.7-1.1-2.3-1.5-2-.5-3.7-1.3-3.7-3.3 0-1.5 1.2-2.6 3-2.9V6h2v1.1c1.6.3 2.8 1.4 2.9 2.9h-2c0-.7-.7-1.2-1.9-1.2-1.1 0-1.9.4-1.9 1.1 0 .7.6 1 2.2 1.4 2.1.6 3.8 1.4 3.8 3.4 0 1.6-1.2 2.8-3.1 3.2z"/></svg>',
		'wrench'    => '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="m22 19-8.3-8.3A6 6 0 0 0 6.2 3.4L10 7.2 7.2 10 3.4 6.2a6 6 0 0 0 7.3 7.5L19 22l3-3z"/></svg>',
		'star'      => '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="m12 3 2.5 6.5H21l-5.2 3.9L17.8 21 12 16.8 6.2 21l2-7.6L3 9.5h6.5z"/></svg>',
	);
	return isset( $icons[ $name ] ) ? $icons[ $name ] : $icons['check'];
}

function nhp_service_cards() {
	return array(
		array( 'icon' => 'snow', 'title' => 'AC Repair', 'text' => 'Same-day diagnosis when Newark humidity turns a weak AC into a crisis.', 'url' => nhp_path( 'ac-repair-newark-de' ) ),
		array( 'icon' => 'home', 'title' => 'AC Installation', 'text' => 'Right-sized replacements for 1970s–1990s homes hitting end of life.', 'url' => nhp_path( 'ac-installation-newark-de' ) ),
		array( 'icon' => 'flame', 'title' => 'Furnace Repair', 'text' => 'No-heat calls in January — gas and oil systems common in older stock.', 'url' => nhp_path( 'furnace-repair-newark-de' ) ),
		array( 'icon' => 'flame', 'title' => 'Furnace Installation', 'text' => 'High-efficiency replacements with clear pricing before work starts.', 'url' => nhp_path( 'furnace-installation-newark-de' ) ),
		array( 'icon' => 'fan', 'title' => 'Heat Pumps', 'text' => 'Repair and install dual-mode systems built for Delaware winters and summers.', 'url' => nhp_path( 'heat-pump-repair-newark-de' ) ),
		array( 'icon' => 'bolt', 'title' => 'Emergency HVAC', 'text' => '24/7 dispatch when there is no heat, no cooling, or a system failure.', 'url' => nhp_path( 'emergency-hvac-newark-de' ) ),
		array( 'icon' => 'wrench', 'title' => 'Maintenance', 'text' => 'Spring AC and fall furnace tune-ups that prevent peak-season breakdowns.', 'url' => nhp_path( 'hvac-maintenance-newark-de' ) ),
		array( 'icon' => 'snow', 'title' => 'Mini Splits', 'text' => 'Ductless heating and cooling for additions, rentals, and tight lots.', 'url' => nhp_path( 'ductless-mini-split-newark-de' ) ),
	);
}

function nhp_zip_list( $extended = true ) {
	$c    = nhp_config();
	$zips = $c['zips_primary'];
	if ( $extended ) {
		$zips = array_merge( $zips, $c['zips_extended'] );
	}
	return implode( ', ', $zips );
}

function nhp_paragraphs( $paragraphs ) {
	$html = '';
	foreach ( (array) $paragraphs as $p ) {
		$html .= '<p>' . $p . '</p>';
	}
	return $html;
}

function nhp_list( $items, $class = '' ) {
	$html = '<ul' . ( $class ? ' class="' . esc_attr( $class ) . '"' : '' ) . '>';
	foreach ( $items as $item ) {
		$html .= '<li>' . $item . '</li>';
	}
	$html .= '</ul>';
	return $html;
}

function nhp_asset( $rel ) {
	return rtrim( nhp_theme_uri(), '/' ) . '/' . ltrim( $rel, '/' );
}

function nhp_load_content() {
	static $all = null;
	if ( $all !== null ) {
		return $all;
	}
	$all = array();
	$dir = nhp_theme_dir() . '/content';
	foreach ( glob( $dir . '/*.php' ) as $file ) {
		$data = include $file;
		if ( is_array( $data ) ) {
			$all = array_merge( $all, $data );
		}
	}
	return $all;
}

function nhp_page( $slug ) {
	$all = nhp_load_content();
	return isset( $all[ $slug ] ) ? $all[ $slug ] : null;
}

function nhp_all_slugs() {
	return array_keys( nhp_load_content() );
}

function nhp_crumbs( $label, $slug, $parents = array() ) {
	$items = array( array( 'label' => 'Home', 'url' => nhp_path() ) );
	foreach ( $parents as $parent ) {
		$items[] = $parent;
	}
	$items[] = array( 'label' => $label, 'url' => nhp_path( $slug ) );
	return $items;
}

function nhp_rel( $slug, $label, $text ) {
	return array( 'url' => nhp_path( $slug ), 'label' => $label, 'text' => $text );
}

function nhp_articles() {
	$out = array();
	foreach ( nhp_load_content() as $slug => $page ) {
		if ( ! empty( $page['is_article'] ) ) {
			$out[ $slug ] = $page;
		}
	}
	return $out;
}

function nhp_blog_cards_html() {
	$html = '<div class="grid-2">';
	foreach ( nhp_articles() as $page ) {
		$html .= '<a class="svc blog-card" href="' . esc_url( nhp_path( $page['slug'] ) ) . '">';
		$html .= '<p class="meta">' . esc_html( isset( $page['date'] ) ? $page['date'] : '2026' ) . '</p>';
		$html .= '<h3>' . esc_html( $page['h1'] ) . '</h3>';
		$html .= '<p>' . esc_html( $page['meta'] ) . '</p></a>';
	}
	$html .= '</div>';
	return $html;
}
