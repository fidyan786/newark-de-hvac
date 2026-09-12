<?php
nhp_render_header();
?>
<section class="page-404">
	<div class="wrap">
		<h1>Page not found</h1>
		<p class="lead">That URL isn’t on this Newark HVAC site. Use the services below or call <?php echo esc_html( nhp_phone_display() ); ?>.</p>
		<p><?php echo nhp_cta_call(); ?> <?php echo nhp_cta_request(); ?></p>
		<div class="grid-3" style="margin-top:2rem;text-align:left">
			<?php foreach ( array_slice( nhp_service_cards(), 0, 6 ) as $card ) : ?>
				<a class="svc" href="<?php echo esc_url( $card['url'] ); ?>"><h3><?php echo esc_html( $card['title'] ); ?></h3><p><?php echo esc_html( $card['text'] ); ?></p></a>
			<?php endforeach; ?>
		</div>
	</div>
</section>
<?php nhp_render_footer(); ?>
