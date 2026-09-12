<?php
nhp_render_header();
$c = nhp_config();
$page = $GLOBALS['nhp_page'];
?>
<section class="hero">
	<div class="wrap hero-grid">
		<div>
			<p class="kicker"><?php echo nhp_icon( 'bolt' ); ?> 24/7 Newark, DE dispatch</p>
			<h1><?php echo esc_html( $page['h1'] ); ?></h1>
			<p class="sub"><?php echo esc_html( $page['hero_sub'] ); ?></p>
			<div class="hero-actions">
				<?php echo nhp_cta_call( 'Call ' . nhp_phone_display() . ' — 24/7', 'btn btn-call btn-xl' ); ?>
				<?php echo nhp_cta_request( 'Request Service', 'btn btn-secondary btn-xl' ); ?>
			</div>
			<div class="trust-pills">
				<span class="pill">Flat-rate quotes</span>
				<span class="pill">Licensed Delaware techs</span>
				<span class="pill">ZIPs <?php echo esc_html( implode( ' · ', $c['zips_primary'] ) ); ?></span>
			</div>
		</div>
		<div class="hero-card">
			<h2>Request a callback</h2>
			<?php echo nhp_render_form( true, isset( $GLOBALS['nhp_form_result'] ) ? $GLOBALS['nhp_form_result'] : null ); ?>
		</div>
	</div>
</section>
<?php nhp_trust_bar(); ?>

<section class="section">
	<div class="wrap">
		<h2>HVAC services for Newark homeowners</h2>
		<p class="lead">Newark’s housing stock — median construction year around 1978 — is in a heavy replacement cycle. Humid summers near 86–88°F and January nights in the mid-20s mean both AC and heat are essential, not optional.</p>
		<div class="grid-4">
			<?php foreach ( nhp_service_cards() as $card ) : ?>
				<a class="svc" href="<?php echo esc_url( $card['url'] ); ?>">
					<div class="icon-bubble"><?php echo nhp_icon( $card['icon'] ); ?></div>
					<h3><?php echo esc_html( $card['title'] ); ?></h3>
					<p><?php echo esc_html( $card['text'] ); ?></p>
				</a>
			<?php endforeach; ?>
		</div>
	</div>
</section>

<?php nhp_emergency_band(); ?>

<section class="section">
	<div class="wrap">
		<h2>Why Newark homeowners call us</h2>
		<p class="lead">The local market is full of long-running service companies. This site is built to get a licensed technician to your door fast — with the price approved before work starts.</p>
		<div class="grid-3">
			<div class="why"><div class="icon-bubble"><?php echo nhp_icon( 'clock' ); ?></div><h3>24/7 emergency availability</h3><p>Hillside Oil and some shops close in the afternoon. After-hours no-heat and no-AC calls are answered here.</p></div>
			<div class="why"><div class="icon-bubble"><?php echo nhp_icon( 'money' ); ?></div><h3>Flat-rate, upfront pricing</h3><p>You approve the number before we start. No mystery trip fees piled on after the diagnosis.</p></div>
			<div class="why"><div class="icon-bubble"><?php echo nhp_icon( 'map' ); ?></div><h3>Local New Castle County coverage</h3><p>Newark, Bear, Glasgow, Pike Creek, Hockessin, Christiana, Brookside, and Ogletown.</p></div>
			<div class="why"><div class="icon-bubble"><?php echo nhp_icon( 'shield' ); ?></div><h3>Licensed, background-checked techs</h3><p>Delaware HVACR licensing is required. We dispatch licensed contractors only.</p></div>
			<div class="why"><div class="icon-bubble"><?php echo nhp_icon( 'wrench' ); ?></div><h3>All major brands</h3><p><?php echo esc_html( implode( ', ', $c['brands'] ) ); ?>.</p></div>
			<div class="why"><div class="icon-bubble"><?php echo nhp_icon( 'home' ); ?></div><h3>Honest about what we don’t invent</h3><p>No fake review counts, no borrowed BBB badges, no made-up founding year. Trust is earned on the job.</p></div>
		</div>
	</div>
</section>

<section class="section band">
	<div class="wrap">
		<h2>How service works</h2>
		<div class="grid-3 steps">
			<div class="step"><h3>Call or request online</h3><p>Tell us whether it’s no cooling, no heat, a replacement quote, or a tune-up. Have your ZIP ready (19702, 19711, 19713, 19725 and nearby).</p></div>
			<div class="step"><h3>Technician is dispatched</h3><p>Same-day when the schedule allows. Emergency calls are prioritized during heat waves and cold snaps.</p></div>
			<div class="step"><h3>Price first, then the fix</h3><p>You get a flat-rate quote. Work starts only after you approve it. Financing is available on qualifying replacements.</p></div>
		</div>
	</div>
</section>

<section class="section">
	<div class="wrap">
		<h2>Common HVAC problems in Newark</h2>
		<div class="grid-2 symptoms">
			<a class="card" href="<?php echo esc_url( nhp_path( 'ac-repair-newark-de' ) ); ?>"><span><strong>AC running but not cooling?</strong><br>High humidity around campus and Christiana makes weak condensers feel like a failure.</span><span class="chip">Call now</span></a>
			<a class="card" href="<?php echo esc_url( nhp_path( 'furnace-repair-newark-de' ) ); ?>"><span><strong>Furnace not turning on?</strong><br>January lows near 26°F turn a no-heat call into an emergency.</span><span class="chip">Call now</span></a>
			<a class="card" href="<?php echo esc_url( nhp_path( 'emergency-hvac-newark-de' ) ); ?>"><span><strong>HVAC not working at all?</strong><br>Burning smell, flooding condensate, or a dead system — use the emergency line.</span><span class="chip">Emergency</span></a>
			<a class="card" href="<?php echo esc_url( nhp_path( 'heat-pump-repair-newark-de' ) ); ?>"><span><strong>Heat pump stuck on one mode?</strong><br>Shoulder-season changeovers fail often on older dual-fuel setups.</span><span class="chip">Call now</span></a>
		</div>
	</div>
</section>

<section class="section band">
	<div class="wrap">
		<h2>Newark, DE service area</h2>
		<p class="lead">Primary coverage is Newark ZIPs <?php echo esc_html( implode( ', ', $c['zips_primary'] ) ); ?>, plus Bear (19701), Hockessin (19707), and New Castle (19720). University-area rentals, Pike Creek split-levels, and Christiana-area commercial properties are all in range.</p>
		<div class="area-list">
			<?php foreach ( $c['communities'] as $place ) : ?>
				<span><?php echo esc_html( $place ); ?></span>
			<?php endforeach; ?>
			<?php foreach ( nhp_location_nav() as $loc ) : ?>
				<a href="<?php echo esc_url( $loc['url'] ); ?>"><?php echo esc_html( $loc['label'] ); ?> HVAC</a>
			<?php endforeach; ?>
		</div>
		<p style="margin-top:1.2rem"><a class="btn btn-secondary" href="<?php echo esc_url( nhp_path( 'service-area' ) ); ?>">Full service area</a></p>
	</div>
</section>

<section class="section">
	<div class="wrap grid-2">
		<div>
			<h2>HVAC financing</h2>
			<p class="lead">Replacement in Newark typically runs thousands of dollars. If cash isn’t practical this month, ask about financing on qualifying installations — apply in minutes, then schedule the work.</p>
			<p><a class="btn btn-primary" href="<?php echo esc_url( nhp_path( 'hvac-financing-newark-de' ) ); ?>">See financing options</a></p>
		</div>
		<div class="hero-art"><?php echo nhp_hvac_illustration(); ?></div>
	</div>
</section>

<?php nhp_faq_block( $page['faqs'] ); ?>
<?php nhp_render_footer(); ?>
