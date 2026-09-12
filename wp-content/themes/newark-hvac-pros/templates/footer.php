</main>
<section class="final-cta">
	<div class="wrap">
		<h2>Need heat or AC fixed in Newark?</h2>
		<p>Call for same-day dispatch when available. Flat-rate quotes before work begins.</p>
		<p style="margin:1rem 0 0"><?php echo nhp_cta_call( 'Call ' . nhp_phone_display(), 'btn btn-call btn-xl' ); ?> <?php echo nhp_cta_request( 'Request Service', 'btn btn-ghost btn-xl' ); ?></p>
	</div>
</section>
<footer class="site-footer">
	<div class="wrap foot-grid">
		<div>
			<h3><?php echo esc_html( nhp_config()['brand'] ); ?></h3>
			<p>24/7 HVAC dispatch for Newark, Delaware and nearby New Castle County communities. Licensed contractors. Upfront pricing. No fabricated reviews or credentials.</p>
			<p><a href="<?php echo esc_url( nhp_phone_tel() ); ?>"><?php echo esc_html( nhp_phone_display() ); ?></a><br>
			<a href="mailto:<?php echo esc_attr( nhp_config()['email'] ); ?>"><?php echo esc_html( nhp_config()['email'] ); ?></a></p>
			<p>Serving <?php echo esc_html( implode( ', ', nhp_config()['communities'] ) ); ?>.</p>
		</div>
		<div>
			<h3>Services</h3>
			<ul>
				<?php foreach ( nhp_footer_services() as $item ) : ?>
					<li><a href="<?php echo esc_url( $item['url'] ); ?>"><?php echo esc_html( $item['label'] ); ?></a></li>
				<?php endforeach; ?>
			</ul>
		</div>
		<div>
			<h3>Neighborhoods</h3>
			<ul>
				<?php foreach ( nhp_location_nav() as $item ) : ?>
					<li><a href="<?php echo esc_url( $item['url'] ); ?>"><?php echo esc_html( $item['label'] ); ?></a></li>
				<?php endforeach; ?>
				<li><a href="<?php echo esc_url( nhp_path( 'service-area' ) ); ?>">All service areas</a></li>
			</ul>
		</div>
		<div>
			<h3>Resources</h3>
			<ul>
				<li><a href="<?php echo esc_url( nhp_path( 'hvac-cost-guide-newark-de' ) ); ?>">2026 HVAC Cost Guide</a></li>
				<li><a href="<?php echo esc_url( nhp_path( 'blog/delaware-hvac-rebates' ) ); ?>">Delaware HVAC Rebates</a></li>
				<li><a href="<?php echo esc_url( nhp_path( 'blog/heat-pump-vs-furnace-delaware' ) ); ?>">Heat Pump vs Furnace</a></li>
				<li><a href="<?php echo esc_url( nhp_path( 'hvac-financing-newark-de' ) ); ?>">Financing</a></li>
				<li><a href="<?php echo esc_url( nhp_path( 'reviews' ) ); ?>">Reviews policy</a></li>
				<li><a href="<?php echo esc_url( nhp_path( 'privacy-policy' ) ); ?>">Privacy</a></li>
				<li><a href="<?php echo esc_url( nhp_path( 'terms' ) ); ?>">Terms</a></li>
			</ul>
		</div>
	</div>
	<div class="wrap">
		<p class="fine"><?php echo esc_html( nhp_config()['license_note'] ); ?> Phone number shown is a placeholder tracking number until your 302 call-tracking line is connected. &copy; <?php echo esc_html( date( 'Y' ) ); ?> <?php echo esc_html( nhp_config()['brand'] ); ?>.</p>
	</div>
</footer>
<div class="mobile-call">
	<a class="btn btn-call" href="<?php echo esc_url( nhp_phone_tel() ); ?>"><?php echo nhp_icon( 'phone' ); ?> Call Now — 24/7 · <?php echo esc_html( nhp_phone_display() ); ?></a>
</div>
<script src="<?php echo esc_url( nhp_asset( 'assets/js/site.js' ) ); ?>?v=<?php echo esc_attr( NHP_VERSION ); ?>" defer></script>
<?php if ( function_exists( 'wp_footer' ) && ! nhp_is_standalone() ) { wp_footer(); } ?>
</body>
</html>
