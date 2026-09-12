<?php
nhp_render_header();
$page = $GLOBALS['nhp_page'];
$c = nhp_config();
?>
<section class="page-hero">
	<div class="wrap">
		<?php echo nhp_breadcrumbs( $page['crumbs'] ); ?>
		<h1><?php echo esc_html( $page['h1'] ); ?></h1>
		<p><?php echo esc_html( $page['hero_sub'] ); ?></p>
		<div class="hero-actions">
			<?php echo nhp_cta_call( 'Call ' . nhp_phone_display(), 'btn btn-call btn-xl' ); ?>
			<?php if ( empty( $page['hide_form_cta'] ) ) echo nhp_cta_request(); ?>
		</div>
	</div>
</section>
<?php nhp_trust_bar(); ?>

<section class="section">
	<div class="wrap split">
		<article class="content prose">
			<?php echo nhp_paragraphs( $page['intro'] ); ?>

			<?php if ( ! empty( $page['symptoms'] ) ) : ?>
				<h2><?php echo esc_html( isset( $page['symptoms_title'] ) ? $page['symptoms_title'] : 'Signs you need service in Newark, DE' ); ?></h2>
				<?php echo nhp_list( $page['symptoms'] ); ?>
			<?php endif; ?>

			<?php if ( ! empty( $page['body'] ) ) : ?>
				<?php foreach ( $page['body'] as $block ) : ?>
					<h2><?php echo esc_html( $block['h'] ); ?></h2>
					<?php echo nhp_paragraphs( $block['p'] ); ?>
					<?php if ( ! empty( $block['list'] ) ) echo nhp_list( $block['list'] ); ?>
				<?php endforeach; ?>
			<?php endif; ?>

			<?php if ( ! empty( $page['cost'] ) ) : ?>
				<h2><?php echo esc_html( $page['cost']['h'] ); ?></h2>
				<?php echo nhp_paragraphs( $page['cost']['p'] ); ?>
			<?php endif; ?>

			<h2>Brands we service in Newark</h2>
			<p>Technicians work on <?php echo esc_html( implode( ', ', $c['brands'] ) ); ?>, plus most other residential equipment installed in New Castle County since the late 1970s.</p>

			<h2>Service area</h2>
			<p>Primary Newark ZIPs: <?php echo esc_html( implode( ', ', $c['zips_primary'] ) ); ?>. We also serve Bear, Glasgow, Pike Creek, Hockessin, Christiana, Brookside, Ogletown, and New Castle.</p>
		</article>
		<aside class="sticky-side">
			<div class="card">
				<h3>Get a technician out</h3>
				<p>Same-day when available. Approve the price before work starts.</p>
				<p><?php echo nhp_cta_call( 'Call ' . nhp_phone_display(), 'btn btn-call btn-block' ); ?></p>
				<p><?php echo nhp_cta_request( 'Request Service', 'btn btn-secondary btn-block' ); ?></p>
				<p class="form-note">Emergency? Skip the form and call.</p>
			</div>
		</aside>
	</div>
</section>

<?php if ( empty( $page['emergency'] ) ) nhp_emergency_band(); ?>
<?php nhp_faq_block( isset( $page['faqs'] ) ? $page['faqs'] : array() ); ?>
<?php nhp_related( isset( $page['related'] ) ? $page['related'] : array() ); ?>
<?php nhp_render_footer(); ?>
