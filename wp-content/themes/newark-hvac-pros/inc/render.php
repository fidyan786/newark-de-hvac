<?php
/**
 * Render helpers for page templates.
 */
function nhp_render_header() {
	include nhp_theme_dir() . '/templates/header.php';
}
function nhp_render_footer() {
	include nhp_theme_dir() . '/templates/footer.php';
}

function nhp_trust_bar() {
	$items = array(
		array( 'clock', '24/7 emergency dispatch' ),
		array( 'shield', 'Licensed DE contractors' ),
		array( 'money', 'Flat-rate quotes first' ),
		array( 'bolt', 'Same-day when available' ),
		array( 'wrench', 'All major brands' ),
	);
	echo '<section class="trustbar"><div class="wrap">';
	foreach ( $items as $item ) {
		echo '<div class="trust-item">' . nhp_icon( $item[0] ) . '<span>' . esc_html( $item[1] ) . '</span></div>';
	}
	echo '</div></section>';
}

function nhp_emergency_band() {
	echo '<section class="emergency"><div class="wrap"><div><h2>HVAC emergency? We\'re available 24/7</h2><p>No heat, no AC, burning smells, or a system that will not start — call now. Serving Newark, Bear, Glasgow, Pike Creek, Hockessin, and the rest of New Castle County.</p></div><div><a class="phone-xl" href="' . esc_url( nhp_phone_tel() ) . '">' . esc_html( nhp_phone_display() ) . '</a></div></div></section>';
}

function nhp_faq_block( $faqs, $title = 'Frequently asked questions' ) {
	if ( empty( $faqs ) ) {
		return;
	}
	echo '<section class="section"><div class="wrap"><h2>' . esc_html( $title ) . '</h2><div class="faq">';
	foreach ( $faqs as $faq ) {
		echo '<details><summary>' . esc_html( $faq['q'] ) . '</summary><p>' . esc_html( $faq['a'] ) . '</p></details>';
	}
	echo '</div></div></section>';
}

function nhp_related( $links ) {
	if ( empty( $links ) ) {
		return;
	}
	echo '<section class="section band"><div class="wrap"><h2>Related Newark HVAC pages</h2><div class="grid-3">';
	foreach ( $links as $link ) {
		echo '<a class="svc" href="' . esc_url( $link['url'] ) . '"><h3>' . esc_html( $link['label'] ) . '</h3><p>' . esc_html( isset( $link['text'] ) ? $link['text'] : 'Learn more' ) . '</p></a>';
	}
	echo '</div></div></section>';
}

function nhp_hvac_illustration() {
	return '<svg viewBox="0 0 640 360" role="img" aria-label="Illustration of a Newark home with a central air condenser and furnace">
		<rect width="640" height="360" rx="24" fill="#e8f2f7"/>
		<rect x="70" y="210" width="500" height="18" fill="#c5d5de"/>
		<path d="M140 210 L250 110 L360 210 Z" fill="#0a3354"/>
		<rect x="168" y="150" width="164" height="60" fill="#f7fbfc"/>
		<rect x="188" y="168" width="48" height="32" fill="#8ecae6"/>
		<rect x="250" y="168" width="48" height="32" fill="#8ecae6"/>
		<rect x="232" y="182" width="22" height="28" fill="#0e4a73"/>
		<rect x="400" y="168" width="120" height="42" rx="8" fill="#0e4a73"/>
		<circle cx="460" cy="189" r="14" fill="#d9eef6"/>
		<rect x="418" y="210" width="84" height="12" fill="#163a52"/>
		<rect x="90" y="188" width="36" height="22" rx="4" fill="#e85d04"/>
		<text x="96" y="204" fill="#fff" font-size="11" font-family="Segoe UI, sans-serif">24/7</text>
		<text x="70" y="250" fill="#0a3354" font-size="16" font-family="Segoe UI, sans-serif" font-weight="700">Newark, DE · humid summers, cold January nights</text>
		<text x="70" y="274" fill="#4d5d68" font-size="13" font-family="Segoe UI, sans-serif">Median home year ~1978 — replacement-cycle demand</text>
	</svg>';
}

function nhp_render_page( $page ) {
	$tpl = isset( $page['template'] ) ? $page['template'] : 'page';
	$file = nhp_theme_dir() . '/templates/' . $tpl . '.php';
	if ( ! is_file( $file ) ) {
		$file = nhp_theme_dir() . '/templates/page.php';
	}
	$GLOBALS['nhp_page'] = $page;
	$GLOBALS['nhp_slug'] = isset( $page['slug'] ) ? $page['slug'] : '';
	include $file;
}
