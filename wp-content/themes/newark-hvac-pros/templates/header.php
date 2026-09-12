<?php
$c       = nhp_config();
$page    = isset( $GLOBALS['nhp_page'] ) ? $GLOBALS['nhp_page'] : array();
$title   = isset( $page['title'] ) ? $page['title'] : $c['brand'];
$meta    = isset( $page['meta'] ) ? $page['meta'] : $c['tagline'];
$slug    = isset( $page['slug'] ) ? $page['slug'] : '';
$canonical = $slug === '' || $slug === 'home' ? nhp_path() : nhp_path( $slug );
$emergency = ! empty( $page['emergency'] );
$form_result = isset( $GLOBALS['nhp_form_result'] ) ? $GLOBALS['nhp_form_result'] : null;
?>
<!DOCTYPE html>
<html lang="en-US">
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title><?php echo esc_html( $title ); ?></title>
	<meta name="description" content="<?php echo esc_attr( $meta ); ?>">
	<link rel="canonical" href="<?php echo esc_url( $canonical ); ?>">
	<meta name="theme-color" content="#0a3354">
	<meta property="og:title" content="<?php echo esc_attr( $title ); ?>">
	<meta property="og:description" content="<?php echo esc_attr( $meta ); ?>">
	<meta property="og:type" content="<?php echo ! empty( $page['is_article'] ) ? 'article' : 'website'; ?>">
	<meta property="og:url" content="<?php echo esc_url( $canonical ); ?>">
	<meta property="og:image" content="<?php echo esc_url( nhp_asset( 'assets/img/og-cover.svg' ) ); ?>">
	<meta property="og:locale" content="en_US">
	<meta name="twitter:card" content="summary_large_image">
	<link rel="icon" href="<?php echo esc_url( nhp_asset( 'assets/img/favicon.svg' ) ); ?>" type="image/svg+xml">
	<link rel="stylesheet" href="<?php echo esc_url( nhp_asset( 'assets/css/main.css' ) ); ?>?v=<?php echo esc_attr( NHP_VERSION ); ?>">
	<link rel="stylesheet" href="<?php echo esc_url( nhp_asset( 'assets/css/chatbot.css' ) ); ?>?v=<?php echo esc_attr( NHP_VERSION ); ?>">
	<?php echo nhp_print_schema( array_merge( $page, array( 'slug' => $slug === 'home' ? '' : $slug ) ) ); ?>
	<?php if ( function_exists( 'wp_head' ) && ! nhp_is_standalone() ) { wp_head(); } ?>
</head>
<body class="<?php echo $emergency ? 'is-emergency' : ''; ?>">
<a class="skip" href="#main">Skip to content</a>
<div class="topbar">
	<div class="wrap">
		<span>HVAC emergency in Newark? We're available 24/7.</span>
		<a href="<?php echo esc_url( nhp_phone_tel() ); ?>">Call <?php echo esc_html( nhp_phone_display() ); ?></a>
	</div>
</div>
<header class="site-header">
	<div class="wrap header-inner">
		<a class="logo" href="<?php echo esc_url( nhp_path() ); ?>">
			<span class="logo-mark"><?php echo nhp_icon( 'snow' ); ?></span>
			<span>Newark HVAC Pros<small>Newark, Delaware · New Castle County</small></span>
		</a>
		<button class="nav-toggle" type="button" data-nav-toggle aria-expanded="false" aria-controls="site-nav">Menu</button>
		<nav class="primary-nav" id="site-nav" aria-label="Primary">
			<details class="drop">
				<summary>Services</summary>
				<div class="drop-menu">
					<?php foreach ( nhp_service_nav() as $item ) : ?>
						<a href="<?php echo esc_url( $item['url'] ); ?>"><?php echo esc_html( $item['label'] ); ?></a>
					<?php endforeach; ?>
				</div>
			</details>
			<a href="<?php echo esc_url( nhp_path( 'emergency-hvac-newark-de' ) ); ?>">Emergency</a>
			<a href="<?php echo esc_url( nhp_path( 'service-area' ) ); ?>">Service Area</a>
			<a href="<?php echo esc_url( nhp_path( 'hvac-cost-guide-newark-de' ) ); ?>">Cost Guide</a>
			<a href="<?php echo esc_url( nhp_path( 'about' ) ); ?>">About</a>
			<a href="<?php echo esc_url( nhp_path( 'contact' ) ); ?>">Contact</a>
		</nav>
		<div class="header-cta">
			<a class="btn btn-call" href="<?php echo esc_url( nhp_phone_tel() ); ?>"><?php echo nhp_icon( 'phone' ); ?> <?php echo esc_html( nhp_phone_display() ); ?></a>
			<a class="btn btn-secondary" href="<?php echo esc_url( nhp_path( 'contact' ) ); ?>">Request Service</a>
		</div>
	</div>
</header>
<main id="main">
