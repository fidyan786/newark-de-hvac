<?php
nhp_render_header();
$page = $GLOBALS['nhp_page'];
?>
<section class="hero" style="background:linear-gradient(160deg,#7f1d1d,#b42318 55%,#9f1239);">
	<div class="wrap" style="text-align:center;max-width:48rem">
		<p class="kicker">Available right now</p>
		<h1><?php echo esc_html( $page['h1'] ); ?></h1>
		<p class="sub" style="margin-inline:auto"><?php echo esc_html( $page['hero_sub'] ); ?></p>
		<p style="margin:1.3rem 0 0"><?php echo nhp_cta_call( 'Call ' . nhp_phone_display() . ' now', 'btn btn-call btn-xl' ); ?></p>
		<p class="pill" style="margin-top:1rem;display:inline-block">Do not wait on a form if you have no heat, no AC, or a burning smell.</p>
	</div>
</section>
<?php nhp_trust_bar(); ?>
<section class="section">
	<div class="wrap prose content">
		<?php echo nhp_paragraphs( $page['intro'] ); ?>
		<h2>What counts as an HVAC emergency in Newark</h2>
		<?php echo nhp_list( $page['symptoms'] ); ?>
		<?php foreach ( $page['body'] as $block ) : ?>
			<h2><?php echo esc_html( $block['h'] ); ?></h2>
			<?php echo nhp_paragraphs( $block['p'] ); ?>
		<?php endforeach; ?>
		<p style="margin-top:2rem"><?php echo nhp_cta_call( 'Call the 24/7 line: ' . nhp_phone_display(), 'btn btn-call btn-xl' ); ?></p>
	</div>
</section>
<?php nhp_faq_block( $page['faqs'] ); ?>
<?php nhp_related( $page['related'] ); ?>
<?php nhp_render_footer(); ?>
