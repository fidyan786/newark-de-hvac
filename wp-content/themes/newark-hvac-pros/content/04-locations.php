<?php
$home_crumb = array( 'label' => 'Home', 'url' => nhp_path() );
$area_parent = array( 'label' => 'Service Area', 'url' => nhp_path( 'service-area' ) );

return array(
	'service-area' => array(
		'slug' => 'service-area', 'template' => 'page', 'show_hero_cta' => true,
		'title' => 'Newark HVAC Service Area | ZIPs and Neighborhoods',
		'meta' => 'HVAC service area for Newark, DE: 19702, 19711, 19713, 19725 plus Bear, Glasgow, Pike Creek, Hockessin, Christiana, Brookside, and Ogletown.',
		'h1' => 'Newark, Delaware HVAC service area',
		'hero_sub' => 'New Castle County coverage with Newark as the hub — not a nationwide map with your city name dropped in.',
		'crumbs' => nhp_crumbs( 'Service Area', 'service-area' ),
		'intro' => array('We dispatch for Newark and neighboring communities that already share contractors, school catchments, and shopping patterns. Primary ZIPs are 19702, 19711, 19713, and 19725. Extended coverage includes Bear (19701), Hockessin (19707), and New Castle (19720). University PO Box ZIPs (19712, 19714–19717) are not treated as separate “cities” in our SEO or our routing.'),
		'body' => array(
			array('h' => 'Primary Newark ZIPs','p' => array('19702 covers southern and western Newark toward Glasgow. 19711 is northern Newark and the University area mixed with owner-occupied streets. 19713 is eastern Newark and the Ogletown commercial mix. 19725 is used as a Newark residential ZIP in local contractor copy and we honor it in coverage language.')),
			array('h' => 'Communities with their own pages','p' => array('Bear, Pike Creek, Glasgow, Hockessin, and Christiana each have a dedicated HVAC page because they are distinct places with their own search behavior — not doorway clones.')),
			array('h' => 'Cross-border notes','p' => array('Some Newark companies also run into Elkton, MD and Kennett Square / Landenberg, PA. We can discuss those addresses case by case. This site is built to rank and convert in Delaware first.')),
		),
		'html' => '<div class="grid-2" style="margin-top:1.5rem">' . implode( '', array_map( function( $l ) {
			return '<a class="svc" href="' . esc_url( $l['url'] ) . '"><h3>' . esc_html( $l['label'] ) . '</h3><p>Local HVAC page</p></a>';
		}, nhp_location_nav() ) ) . '</div>',
		'faqs' => array(
			array('q' => 'Do you serve Wilmington?','a' => 'Wilmington is about 8 miles away and many companies cover both. Call with the ZIP. This site’s organic focus is Newark and inner New Castle County.'),
			array('q' => 'I live in Middletown. Can you come?','a' => 'Middletown is south of the core map. Ask when you call — coverage depends on the day’s routing, not a fake statewide claim.'),
		),
	),
	'bear-de-hvac' => array(
		'slug' => 'bear-de-hvac', 'template' => 'page', 'show_hero_cta' => true, 'with_form' => true,
		'title' => 'HVAC Repair Bear, DE | Newark HVAC Pros',
		'meta' => 'HVAC repair and installation for Bear, Delaware (19701) and nearby Lums Pond / Route 40 homes. Dispatched from the Newark service area.',
		'h1' => 'HVAC in Bear, DE — Repair, Replacement, 24/7 Dispatch',
		'hero_sub' => 'Family suburban streets off Route 40 and around Lums Pond. Same flat-rate approach as Newark, with trucks that already run 19701 every week.',
		'crumbs' => array( $home_crumb, $area_parent, array( 'label' => 'Bear, DE', 'url' => nhp_path( 'bear-de-hvac' ) ) ),
		'intro' => array('Bear is not a Newark neighborhood with a different sign. It is a distinct census-designated place with its own ZIP (19701), schools, and housing mix — colonials, split-levels, and newer infill that still needs AC that can handle Delaware humidity. Aire Serv and other Newark operators already publish Bear geo pages because people search “HVAC Bear DE” and “AC repair Bear.”','We cover Bear as an extension of the Newark dispatch radius, not as a fake second company. If you are near Lums Pond State Park, along Pulaski Highway, or toward Glasgow, you are in range.'),
		'body' => array(
			array('h' => 'What Bear homes typically need','p' => array('Summer AC repair remains the volume driver. Many houses are newer than Newark’s 1978 median, but first-generation condensers from the 2000s are now in replacement age. Heat pumps show up more on newer builds. Emergency no-cool calls spike the same July–August window as Newark.')),
			array('h' => 'Services for Bear','list' => array('AC repair and replacement','Furnace and heat pump service','Emergency 24/7 dispatch','Maintenance before peak season')),
			array('h' => 'Getting a technician','p' => array('Call ' . nhp_phone_display() . ' with ZIP 19701 and the symptom. Same-day when the board allows. Financing available on qualifying replacements.')),
		),
		'faqs' => array(
			array('q' => 'Is Bear in your Newark service area?','a' => 'Yes. 19701 is on the extended ZIP list.'),
			array('q' => 'Do I need a different company than Newark?','a' => 'No. It is the same dispatch, licensed Delaware technicians, and flat-rate quotes.'),
		),
		'related' => array(nhp_rel('glasgow-de-hvac','Glasgow HVAC','Next community east/south.'), nhp_rel('ac-repair-newark-de','AC Repair','Core cooling page.')),
	),
	'pike-creek-de-hvac' => array(
		'slug' => 'pike-creek-de-hvac', 'template' => 'page', 'show_hero_cta' => true, 'with_form' => true,
		'title' => 'HVAC Repair Pike Creek, DE | Newark HVAC Pros',
		'meta' => 'HVAC service for Pike Creek, Delaware — affluent 19711-area homes, 1970s construction, and dual-system houses. Repair, replacement, and maintenance.',
		'h1' => 'HVAC in Pike Creek, DE',
		'hero_sub' => 'CNN once ranked Pike Creek a top place to live. The houses are still from the same Mid-Atlantic stock that needs real HVAC, not a brochure.',
		'crumbs' => array( $home_crumb, $area_parent, array( 'label' => 'Pike Creek, DE', 'url' => nhp_path( 'pike-creek-de-hvac' ) ) ),
		'intro' => array('Pike Creek sits about five miles from downtown Newark, mostly in the 19711 ZIP, with a 2020-era population near 7,800. Housing leans owner-occupied and higher value than student-heavy streets by campus. That means replacement tickets are larger, expectations are sharper, and “send whoever is cheapest tonight” is not the pitch.','Aire Serv already maintains a Pike Creek geo URL, which is a strong signal that the keyword has local intent. Our page is written for the place: wooded lots, split-levels, finished basements, and systems that were often upgraded once in the 2000s and are due again.'),
		'body' => array(
			array('h' => 'Climate and housing','p' => array('Same humid summers and cold January nights as Newark, but many homes have more zone complexity — extra bonus rooms, denser tree cover that shades condensers, and older duct chases that were never redesigned after a remodel. We look at airflow before we upsell tonnage.')),
			array('h' => 'Typical Pike Creek jobs','list' => array('High-efficiency AC and furnace replacements','Heat pump / dual-fuel interest','Indoor air quality (whole-home filtration, humidifiers)','Quiet operation requests on tight lots')),
		),
		'faqs' => array(
			array('q' => 'Is Pike Creek its own city?','a' => 'It is a distinct community inside New Castle County, often searched separately from “Newark HVAC.” Coverage is still from the same Newark dispatch.'),
			array('q' => 'Do you service heat pumps in Pike Creek?','a' => 'Yes. Repair and installation.'),
		),
		'related' => array(nhp_rel('hockessin-de-hvac','Hockessin HVAC','Nearby affluent suburb.'), nhp_rel('hvac-replacement-newark-de','HVAC Replacement','Whole-home systems.')),
	),
	'glasgow-de-hvac' => array(
		'slug' => 'glasgow-de-hvac', 'template' => 'page', 'show_hero_cta' => true, 'with_form' => true,
		'title' => 'HVAC Repair Glasgow, DE | Newark HVAC Pros',
		'meta' => 'HVAC repair in Glasgow, Delaware near Peoples Plaza and I-95. 19702 coverage for AC, furnace, and emergency service.',
		'h1' => 'HVAC in Glasgow, DE',
		'hero_sub' => 'Peoples Plaza, Route 40, and I-95 access — suburban Glasgow searches separately from downtown Newark even when the ZIP says 19702.',
		'crumbs' => array( $home_crumb, $area_parent, array( 'label' => 'Glasgow, DE', 'url' => nhp_path( 'glasgow-de-hvac' ) ) ),
		'intro' => array('Glasgow is a named community on the south/west side of the Newark market. Contractors who only write “Newark” miss people typing “AC repair Glasgow DE.” Housing is suburban, family-oriented, and tied to the 19702 grid that Enhanced Heating and others already list on their sites.','Access from I-95 makes this a practical same-day run when a truck is already in southern New Castle County. Heat-wave AC calls and winter furnace lockouts look like the rest of the county: capacitors, ignitors, and systems that skipped spring service.'),
		'body' => array(
			array('h' => 'Services','list' => array('AC repair and installation','Furnace repair and replacement','Emergency HVAC','Maintenance and IAQ')),
			array('h' => 'How to book','p' => array('Use ZIP 19702 if that is what USPS printed, and say Glasgow so the tech has the right landmark context (Peoples Plaza, Route 40). Call ' . nhp_phone_display() . '.')),
		),
		'faqs' => array(array('q' => 'Is Glasgow the same as Newark?','a' => 'It is adjacent and often shares 19702, but it is a distinct place name in search and in conversation. We treat it that way.')),
		'related' => array(nhp_rel('bear-de-hvac','Bear HVAC','Neighboring community.'), nhp_rel('ac-repair-newark-de','AC Repair','Main cooling page.')),
	),
	'hockessin-de-hvac' => array(
		'slug' => 'hockessin-de-hvac', 'template' => 'page', 'show_hero_cta' => true, 'with_form' => true,
		'title' => 'HVAC Repair Hockessin, DE | Newark HVAC Pros',
		'meta' => 'HVAC service in Hockessin, Delaware (19707). Affluent suburban homes, oil-to-gas interest, and high-efficiency replacements.',
		'h1' => 'HVAC in Hockessin, DE',
		'hero_sub' => 'Larger lots, older estates mixed with newer infill, and ZIP 19707 — a different customer than a UD rental, same licensed dispatch.',
		'crumbs' => array( $home_crumb, $area_parent, array( 'label' => 'Hockessin, DE', 'url' => nhp_path( 'hockessin-de-hvac' ) ) ),
		'intro' => array('Hockessin is one of New Castle County’s higher-income suburbs and a named geo target for Aire Serv and other Newark-based companies. Homes can be larger, with more zones, oil remnants, and customers who want quiet equipment and a clean install — not a parts-cannon visit.','We cover 19707 as extended service from the Newark hub. Expect honest load calculations on bigger envelopes and a straight conversation about heat pumps versus high-AFUE gas.'),
		'body' => array(
			array('h' => 'What we see in Hockessin','p' => array('Multi-zone comfort complaints, aging oil boilers or furnaces, premium brand replacements, and IAQ requests (humidification, better filtration). Emergency no-heat still happens in January; we do not treat Hockessin as weekday-only.')),
			array('h' => 'Services','list' => array('System replacement and dual-fuel','Boiler and furnace repair','AC and heat pump service','Indoor air quality')),
		),
		'faqs' => array(
			array('q' => 'Do you work on oil systems in Hockessin?','a' => 'Yes. Repair and conversion conversations both happen here more than in newer 19702 subdivisions.'),
			array('q' => 'Can I get a replacement quote without a sales circus?','a' => 'Yes. Site visit, written scope, financing if you want it. No fake “today-only” price.'),
		),
		'related' => array(nhp_rel('pike-creek-de-hvac','Pike Creek HVAC','Nearby community.'), nhp_rel('boiler-repair-newark-de','Boiler Repair','Hydronic / oil boilers.')),
	),
	'christiana-de-hvac' => array(
		'slug' => 'christiana-de-hvac', 'template' => 'page', 'show_hero_cta' => true, 'with_form' => true,
		'title' => 'HVAC Repair Christiana, DE | Newark HVAC Pros',
		'meta' => 'HVAC service in Christiana, Delaware near Christiana Mall and the hospital district. Residential and small commercial.',
		'h1' => 'HVAC in Christiana, DE',
		'hero_sub' => 'Mall, hospital, and I-95 — mixed residential and light commercial. We handle homes first and small commercial where we can staff it.',
		'crumbs' => array( $home_crumb, $area_parent, array( 'label' => 'Christiana, DE', 'url' => nhp_path( 'christiana-de-hvac' ) ) ),
		'intro' => array('Christiana is the medical and retail node of the Newark market: Christiana Hospital (a major regional employer), Christiana Mall, and housing that sits on the 19702/19713 edge. Competitor ZIP lists routinely include 19718 for the medical-center area. People search Christiana as a place even when their mail says Newark.','Residential calls look like the rest of the county. Small commercial — a shop, a clinic suite, a restaurant RTU — can be quoted on the commercial page if it fits our truck capacity.'),
		'body' => array(
			array('h' => 'Residential','p' => array('AC repair, furnace repair, replacements, and 24/7 emergency dispatch for houses around the mall and hospital corridors.')),
			array('h' => 'Small commercial','p' => array('If you manage a suite near the hospital district, use the commercial HVAC page or the contact form and describe the rooftop or split. We will tell you quickly if it is in scope.')),
		),
		'faqs' => array(array('q' => 'Do you service apartments near the mall?','a' => 'Yes, with owner or management approval. Tenants should have permission before we enter.')),
		'related' => array(nhp_rel('commercial-hvac-newark-de','Commercial HVAC','Light commercial and RTUs.'), nhp_rel('emergency-hvac-newark-de','Emergency HVAC','After-hours line.')),
	),
);
