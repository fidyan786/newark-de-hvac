<?php
$c = nhp_config();
return array(
	'services' => array(
		'slug' => 'services', 'template' => 'page', 'show_hero_cta' => true,
		'title' => 'HVAC Services Newark, DE | ' . $c['brand'],
		'meta' => 'All HVAC services in Newark, Delaware: AC, furnace, heat pump, emergency, maintenance, mini splits, IAQ, ducts, commercial, and financing.',
		'h1' => 'HVAC services in Newark, Delaware',
		'hero_sub' => 'Pick the job you need. Every page is written for New Castle County, not a national template.',
		'crumbs' => nhp_crumbs( 'Services', 'services' ),
		'intro' => array('Residential first. Emergency and repair pages convert fastest. Installation and replacement pages support high-ticket calls. Maintenance and IAQ keep the calendar full in shoulder seasons.'),
		'html' => '<div class="grid-3">' . implode( '', array_map( function ( $i ) {
			return '<a class="svc" href="' . esc_url( $i['url'] ) . '"><h3>' . esc_html( $i['label'] ) . '</h3><p>Newark, DE service page</p></a>';
		}, nhp_service_nav() ) ) . '</div>',
	),
	'about' => array(
		'slug' => 'about', 'template' => 'page', 'show_hero_cta' => true,
		'title' => 'About Newark HVAC Pros | Licensed Dispatch in New Castle County',
		'meta' => 'About Newark HVAC Pros — 24/7 HVAC dispatch for Newark, DE. Licensed contractors, flat-rate quotes, no fabricated reviews or founding years.',
		'h1' => 'About Newark HVAC Pros',
		'hero_sub' => 'A Newark-focused HVAC dispatch site. Fast, transparent, local — without borrowing another company’s 76-year story.',
		'crumbs' => nhp_crumbs( 'About', 'about' ),
		'intro' => array('Newark HVAC Pros exists to get a licensed Delaware HVACR technician to a home in Newark, Bear, Glasgow, Pike Creek, Hockessin, or Christiana without the runaround. The market already has 70-year names. What it does not have enough of is a phone-first site that loads fast, explains real local conditions, and quotes before work starts.'),
		'notice' => 'We do not invent years in business, review counts, BBB grades, NATE cards, or a street address we do not have. When the operating contractor is assigned, license number, insurance certificate, and a verified Newark address go in the footer and on this page.',
		'body' => array(
			array('h' => 'How we operate','p' => array('Calls go to a 302 tracking number. After-hours emergencies are answered. Technicians are Delaware-licensed. You approve a flat rate. Replacement jobs can include financing when a lender is connected. Lead-gen is the business model; the work is still real HVAC in real ZIP codes.')),
			array('h' => 'What we optimize for','list' => array('Same-day and 24/7 availability','Upfront pricing (a known complaint against some larger locals)','Newark-specific content: climate, housing age, University rentals, oil heat remnants','Mobile click-to-call on every page')),
			array('h' => 'Community context','p' => array('University of Delaware shapes the rental market. Christiana Hospital shapes employment and the eastern commercial edge. White Clay Creek and the I-95 corridor shape how people describe where they live. We use those facts because they are true, not as keyword stuffing.')),
		),
		'faqs' => array(
			array('q' => 'Are you Boulden Brothers or Horizon?','a' => 'No. Those are separate companies. We compete on speed, clarity, and conversion — not on claiming their history.'),
			array('q' => 'Where is your shop?','a' => 'This property is a service-area business until a verified Newark street address is published. Technicians are licensed in Delaware and dispatched to the ZIPs listed on the service area page.'),
		),
	),
	'contact' => array(
		'slug' => 'contact', 'template' => 'page', 'with_form' => true,
		'title' => 'Contact Newark HVAC Pros | Request HVAC Service',
		'meta' => 'Contact Newark HVAC Pros for HVAC service in Newark, DE. Call 24/7 or request a callback with name, phone, ZIP, and service needed.',
		'h1' => 'Request HVAC service in Newark, DE',
		'hero_sub' => 'Four fields. We call you back — usually within 15 minutes during peak hours. For no heat or no AC, call instead.',
		'crumbs' => nhp_crumbs( 'Contact', 'contact' ),
		'intro' => array('Call ' . $c['phone_display'] . ' anytime. If you can wait for a callback, use the form. Include a 5-digit ZIP so we can confirm you are in the Newark / New Castle County footprint.'),
		'body' => array(
			array('h' => 'Call','p' => array($c['phone_display'] . ' · 24/7 emergency dispatch')),
			array('h' => 'Email','p' => array($c['email'] . ' — not the fastest path for a dead furnace.')),
			array('h' => 'Primary ZIPs','p' => array(implode( ', ', $c['zips_primary'] ) . '. Also Bear 19701, Hockessin 19707, New Castle 19720.')),
		),
	),
	'reviews' => array(
		'slug' => 'reviews', 'template' => 'page', 'show_hero_cta' => true,
		'title' => 'Reviews | Newark HVAC Pros',
		'meta' => 'How Newark HVAC Pros handles reviews. We do not publish fake Google ratings. Real reviews are added as jobs are completed.',
		'h1' => 'Reviews — earned, not invented',
		'hero_sub' => 'Boulden Brothers has 1,700+ Google reviews. We will not fake a number to look like that on day one.',
		'crumbs' => nhp_crumbs( 'Reviews', 'reviews' ),
		'notice' => 'No aggregate star rating is shown on this site until first-party Google reviews exist for this brand. Schema markup for reviews is also omitted until then.',
		'intro' => array('Pay-per-call HVAC sites get wrecked by Google when they paste other people’s testimonials or invent “4.9 stars from 200 neighbors.” We will ask completed customers for a Google review. Until that library exists, judge us on process: licensed techs, quoted prices, 24/7 phone, and local content that is actually about Newark.'),
		'body' => array(
			array('h' => 'What we will do after each job','list' => array('Text or email a Google review link','Never pay for a star rating','Never gate reviews or cherry-pick only 5-stars in schema','Display the live Google rating in the header once it exists')),
			array('h' => 'If you had a problem','p' => array('Call ' . $c['phone_display'] . ' and ask for a callback from dispatch. A public review is welcome; a chance to fix the job comes first.')),
		),
	),
	'privacy-policy' => array(
		'slug' => 'privacy-policy', 'template' => 'page',
		'title' => 'Privacy Policy | Newark HVAC Pros',
		'meta' => 'Privacy policy for Newark HVAC Pros — how we handle service requests, calls, and analytics.',
		'h1' => 'Privacy policy',
		'crumbs' => nhp_crumbs( 'Privacy Policy', 'privacy-policy' ),
		'intro' => array('This site collects name, phone, ZIP, and service type when you submit the request form. Call tracking may record numbers that dial the published line. We use that information to dispatch HVAC service and to measure advertising — not to sell your household as a marketing list.'),
		'body' => array(
			array('h' => 'What we collect','list' => array('Form fields you submit','Call time, duration, and caller ID on the tracking number','Standard server logs and, once configured, GA4 analytics')),
			array('h' => 'What we do not do','p' => array('We do not sell personal information. We do not require an account. Lead files stored on the server are for the operator of this site and the dispatched contractor.')),
			array('h' => 'Contact','p' => array('Privacy questions: ' . $c['email'])),
		),
	),
	'terms' => array(
		'slug' => 'terms', 'template' => 'page',
		'title' => 'Terms | Newark HVAC Pros',
		'meta' => 'Terms of use for Newark HVAC Pros website and service requests.',
		'h1' => 'Terms of use',
		'crumbs' => nhp_crumbs( 'Terms', 'terms' ),
		'intro' => array('The website provides information about HVAC services in Newark, Delaware and a way to request a technician. Work performed is governed by the invoice and authorizations you sign on site, not by marketing copy. Estimates are not bids until they are written for your address.'),
		'body' => array(
			array('h' => 'Emergency claims','p' => array('24/7 dispatch means the phone is answered and a technician is sent according to the live board. It is not a guaranteed arrival time in a county-wide ice storm.')),
			array('h' => 'Placeholder phone number','p' => array('Until a real 302 call-tracking number is connected, the published number is a reserved 555 example. Replace it in configuration before advertising.')),
		),
	),
	'blog' => array(
		'slug' => 'blog', 'template' => 'page',
		'title' => 'Newark HVAC Blog | Cost, Rebates, Maintenance',
		'meta' => 'Guides for Newark, Delaware homeowners: HVAC costs, heat pumps vs furnaces, Energize Delaware rebates, and seasonal checklists.',
		'h1' => 'Newark HVAC guides',
		'hero_sub' => 'Local climate, local housing stock, current incentive rules — not recycled national blog posts.',
		'crumbs' => nhp_crumbs( 'Blog', 'blog' ),
		'intro' => array('These articles support the service pages and target research-intent searches that still convert when the furnace is on its last winter.'),
		'html' => '', // filled below after we know slugs
	),
);
