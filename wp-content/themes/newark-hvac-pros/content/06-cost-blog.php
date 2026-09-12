<?php
$blog_parent = array( 'label' => 'Blog', 'url' => nhp_path( 'blog' ) );
$home = array( 'label' => 'Home', 'url' => nhp_path() );

return array(
	'hvac-cost-guide-newark-de' => array(
		'slug' => 'hvac-cost-guide-newark-de',
		'template' => 'page',
		'show_hero_cta' => true,
		'title' => '2026 HVAC Cost Guide for Newark, Delaware',
		'meta' => '2026 HVAC costs in Newark, DE: AC repair $150–$900, furnace repair $150–$800, AC replacement $3,000–$8,000+, heat pumps $4,000–$10,000+. Local ranges, not national averages.',
		'h1' => '2026 HVAC Cost Guide for Newark, Delaware',
		'hero_sub' => 'What New Castle County homeowners actually budget for repair vs. replacement — with climate and 1978-era housing in mind.',
		'crumbs' => nhp_crumbs( 'HVAC Cost Guide', 'hvac-cost-guide-newark-de' ),
		'intro' => array(
			'Nobody in Newark publishes a serious local cost page. That is the gap. These figures are planning ranges for 2026, not invoices. Your tonnage, duct condition, refrigerant type, and whether the job is a July emergency will move the number. You still get a flat-rate quote before work starts.',
			'Context that changes price here: humid summers (July highs ~86–88°F), January lows in the mid-20s, oil heat still present, and a housing stock whose median year built is about 1978 — lots of second-generation equipment dying at once.',
		),
		'body' => array(
			array(
				'h' => 'Repair ranges',
				'p' => array( 'Diagnostics are typically credited toward the repair if you approve it the same visit.' ),
				'table' => array(
					'head' => array( 'Job', 'Typical Newark range', 'Notes' ),
					'rows' => array(
						array( 'AC repair', '$150–$900', 'Capacitors low; compressors often become replacements' ),
						array( 'Furnace repair', '$150–$800', 'Ignitors/sensors low; heat exchangers change the decision' ),
						array( 'Heat pump repair', '$150–$900+', 'Reversing valves and boards sit higher' ),
						array( 'Maintenance / tune-up', '$80–$200', 'Spring AC or fall heat' ),
						array( 'Thermostat replacement', '$100–$400', 'Wiring upgrades extra' ),
						array( 'Duct cleaning', '$300–$600', 'Only when inspection supports it' ),
					),
				),
			),
			array(
				'h' => 'Installation and replacement ranges',
				'p' => array( 'Installed prices include typical labor for a straightforward Newark house. Electrical panel work, permit extras, oil conversion, and major duct redesign sit on top.' ),
				'table' => array(
					'head' => array( 'Job', 'Typical installed range', 'Notes' ),
					'rows' => array(
						array( 'AC replacement', '$3,000–$8,000+', 'Coil + condenser; paired furnace extra' ),
						array( 'Furnace replacement', '$2,500–$6,000+', 'Venting/oil conversion extra' ),
						array( 'Heat pump (ducted)', '$4,000–$10,000+', 'Dual-fuel and electrical upgrades extra' ),
						array( 'Ductless mini split', '$3,000–$8,000+', 'Per zone; multi-zone higher' ),
						array( 'Whole HVAC system', 'Several thousand to $10,000+', 'House-specific; get a site quote' ),
						array( 'IAQ add-ons', '$500–$3,000', 'Humidifier, dehumidifier, media filter' ),
						array( 'Ductwork repair', '$300–$2,000+', 'New trunks cost more' ),
					),
				),
			),
			array(
				'h' => 'What makes Newark jobs cheaper or more expensive',
				'list' => array(
					'Cheaper: accessible basement, 2000s equipment with common parts, weekday non-emergency',
					'More expensive: after-hours heat wave, R-22 leftover equipment, crawlspace ducts, oil conversions, 100-amp panels that cannot take a heat pump',
					'University rentals: access and owner approval can add a trip if the tenant is the only person home',
				),
			),
			array(
				'h' => 'Rebates vs. list price',
				'p' => array( 'Energize Delaware Home Performance incentives can reduce qualifying high-efficiency equipment cost if you follow the audit + participating-contractor path. They are not automatic coupons. Read the rebates article and verify live amounts before you budget a net price.' ),
			),
		),
		'faqs' => array(
			array( 'q' => 'Why don’t you publish exact prices?', 'a' => 'A 1.5-ton replacement in a townhouse is not a 4-ton dual-fuel job in Hockessin. Ranges prevent bait advertising. The on-site quote is the real number.' ),
			array( 'q' => 'Are emergency repairs more?', 'a' => 'After-hours dispatch can cost more than a Tuesday afternoon. You still approve a flat rate.' ),
		),
		'related' => array(
			nhp_rel( 'hvac-financing-newark-de', 'Financing', 'If cash is not realistic this month.' ),
			nhp_rel( 'blog/delaware-hvac-rebates', 'Delaware Rebates', 'Incentives that change net cost.' ),
			nhp_rel( 'hvac-replacement-newark-de', 'Replacement', 'High-ticket scope.' ),
		),
	),

	'blog/hvac-cost-newark-delaware-2026' => array(
		'slug' => 'blog/hvac-cost-newark-delaware-2026',
		'template' => 'article',
		'is_article' => true,
		'date' => '2026-09-01',
		'title' => 'HVAC Costs in Newark, Delaware (2026) | What Homeowners Pay',
		'meta' => 'A Newark-specific look at 2026 HVAC repair and replacement costs, tied to housing age, humidity, and oil vs. gas heat.',
		'h1' => 'What HVAC really costs in Newark, DE in 2026',
		'hero_sub' => 'National blogs quote Texas prices. This is New Castle County.',
		'crumbs' => array( $home, $blog_parent, array( 'label' => '2026 HVAC Costs', 'url' => nhp_path( 'blog/hvac-cost-newark-delaware-2026' ) ) ),
		'intro' => array( 'If you only remember one number, remember two seasons: cooling repairs cluster $150–$900, and a straight AC replacement often lives in the $3,000–$8,000 band before duct or electrical surprises. The full tables live on the cost guide; this article is the why.' ),
		'body' => array(
			array( 'h' => 'Housing stock drives replacements', 'p' => array( 'Point2Homes-style snapshots put Newark near 9,900 housing units, about 54% owner-occupied, median build year 1978. HVAC lasts 15–20 years. That math is why replacement, not just repair, stays busy even in a city of ~30,000 people — the catchment is really New Castle County.' ) ),
			array( 'h' => 'Humidity is a hidden cost', 'p' => array( 'An AC that “almost cools” in Newark still fails the job if it cannot pull moisture. Short-cycling oversized systems and dirty coils create callbacks. Budget for airflow and drainage, not just a new outdoor unit.' ) ),
			array( 'h' => 'Oil vs. gas vs. heat pump', 'p' => array( 'Oil remnants cost more to keep alive and sometimes less to convert — depending on whether a gas main exists. Heat pumps add electrical-panel risk to the quote. None of that shows up in a national “average AC replacement is $5,500” graphic.' ) ),
		),
		'related' => array( nhp_rel( 'hvac-cost-guide-newark-de', 'Full cost tables', 'Repair and install ranges.' ) ),
	),

	'blog/heat-pump-vs-furnace-delaware' => array(
		'slug' => 'blog/heat-pump-vs-furnace-delaware',
		'template' => 'article',
		'is_article' => true,
		'date' => '2026-09-04',
		'title' => 'Heat Pump vs. Furnace in Newark, DE | Delaware Climate',
		'meta' => 'Heat pump vs. gas furnace for Newark, Delaware: January lows in the 20s, humid summers, dual-fuel, oil conversions, and 2026 rebate context.',
		'h1' => 'Heat pump vs. furnace: what’s best for a Newark, DE home?',
		'hero_sub' => 'Delaware is not the Deep South and not New England. The equipment choice should match that.',
		'crumbs' => array( $home, $blog_parent, array( 'label' => 'Heat Pump vs Furnace', 'url' => nhp_path( 'blog/heat-pump-vs-furnace-delaware' ) ) ),
		'intro' => array( 'Köppen Cfa — humid subtropical — means you need serious cooling and serious heating. July highs around 86–88°F with uncomfortable dew points. January lows around 23–26°F. About 21 inches of snow. A heat pump that was specified for Atlanta will look sloppy here; a furnace-only plan ignores how expensive summer AC replacements have become.' ),
		'body' => array(
			array( 'h' => 'When a heat pump wins', 'list' => array( 'AC is dead anyway and you can install a heat pump for both jobs', 'Oil furnace is tired and there is no cheap gas conversion', 'House is reasonably insulated and you can add backup heat correctly', 'You can actually use Energize Delaware incentives via the proper audit path' ) ),
			array( 'h' => 'When a gas furnace still wins', 'list' => array( 'Existing good-condition AC, only the furnace failed', 'Very leaky 1978 ranch with a 100-amp panel and no appetite for electrical work', 'You want dual-fuel: heat pump in shoulder seasons, gas below a set outdoor temperature' ) ),
			array( 'h' => 'Dual-fuel is the local compromise', 'p' => array( 'New Castle County has gas in many neighborhoods. Dual-fuel uses the heat pump for the 80% of hours that are mild and the furnace when it is actually cold. It costs more to install than a cheap 80% furnace. It often costs less to live with than emergency heat strips on a poorly sized heat pump.' ) ),
			array( 'h' => 'What expired in 2026', 'p' => array( 'The federal 25C credit for heat pumps ended for equipment installed after December 31, 2025. Do not let a salesperson quote you a $2,000 federal heat-pump credit that you cannot claim. State and utility programs are the live conversation — and they have paperwork.' ) ),
		),
		'faqs' => array(
			array( 'q' => 'Will a heat pump work in Newark snow?', 'a' => 'Yes if it is a cold-climate or properly backed-up unit with a clear pad. Buried in a drift against a fence, no.' ),
			array( 'q' => 'Should I keep my oil furnace?', 'a' => 'If it is safe and you are two years from moving, maybe. If the vessel is tired, run the 10-year fuel math against a heat pump or gas conversion.' ),
		),
		'related' => array(
			nhp_rel( 'heat-pump-installation-newark-de', 'Heat Pump Installation', 'Get a dual-fuel or all-electric quote.' ),
			nhp_rel( 'furnace-installation-newark-de', 'Furnace Installation', 'Gas and oil replacements.' ),
		),
	),

	'blog/delaware-hvac-rebates' => array(
		'slug' => 'blog/delaware-hvac-rebates',
		'template' => 'article',
		'is_article' => true,
		'date' => '2026-09-08',
		'title' => 'Delaware HVAC Rebates (2026) | Energize Delaware, Delmarva, Tax Credits',
		'meta' => '2026 Delaware HVAC rebate overview: Energize Delaware heat pump and AC incentives, audit rules, HEAR status, and the expired 25C heat-pump credit.',
		'h1' => 'Delaware energy rebates for HVAC systems (2026)',
		'hero_sub' => 'The live money is mostly Energize Delaware — not a leftover federal heat-pump credit.',
		'crumbs' => array( $home, $blog_parent, array( 'label' => 'HVAC Rebates', 'url' => nhp_path( 'blog/delaware-hvac-rebates' ) ) ),
		'intro' => array( 'Local HVAC sites almost never explain incentives. That is malpractice in a state with a functioning efficiency program. Amounts change. Verify at energizedelaware.org and with your utility before you sign a contract.' ),
		'body' => array(
			array( 'h' => 'Energize Delaware Home Performance', 'p' => array( 'The statewide program pays incentives after a qualifying home energy assessment and work by a participating, correctly certified contractor. You generally cannot rebate equipment that was already installed, and you cannot treat a brand-new zone as an “upgrade” of a system that never existed.' ),
				'list' => array(
					'Heat pumps: on the published 2025–26 menu, Tier 1 and Tier 2 central heat pumps list around $800 and $1,600 standard ($1,200 / $2,200 assisted), with 4/5-ton variants similar',
					'Mini-splits: roughly $550–$1,100 standard depending on tier, plus per additional indoor unit, with higher assisted amounts',
					'Central AC: Tier 1 / Tier 2 amounts on the order of $650 / $1,250 standard',
					'Furnaces: replacing lower-AFUE equipment with 96%+ multi-stage ECM units lists $350–$750 standard depending on what you had',
					'Whole-home caps apply (on the order of $4,000 standard / $5,500 assisted — confirm the current cap sheet)',
				),
			),
			array( 'h' => 'How to actually get the money', 'p' => array( 'Book the audit first. Use a participating contractor. Install what the audit supports. Rebates are often issued several weeks after inspection and paperwork. Skipping the audit to “save time” is how people forfeit the incentive and then blame the brand.' ) ),
			array( 'h' => 'Delmarva Power', 'p' => array( 'Delmarva serves much of Delaware, including the Wilmington / Newark orbit. Some efficiency offers are territory-specific (Maryland pages on Delmarva’s site are easy to confuse with Delaware). Check the offer that matches your account, not your Google result. Green Power Connection can be reached at 866-634-5571 according to Energize Delaware’s help center.' ) ),
			array( 'h' => 'Federal 25C and HEAR', 'p' => array( 'The 25C heat-pump credit is not available for installs after December 31, 2025. Smaller 25C items (such as some insulation or audits) may still exist — tax advice is not this website. Delaware’s HEAR/HOMES allocations have been described as awaiting federal approval; do not budget an $8,000 HEAR check until DNREC says it is live.' ) ),
		),
		'faqs' => array(
			array( 'q' => 'Can I combine a rebate with financing?', 'a' => 'Often the rebate lowers the amount you finance. Stacking rules depend on the program year. Ask on the quote.' ),
			array( 'q' => 'Do you guarantee a rebate amount?', 'a' => 'No. We quote equipment honestly and tell you which path is required. The program administrator pays the rebate.' ),
		),
		'related' => array(
			nhp_rel( 'heat-pump-installation-newark-de', 'Heat Pump Installation', 'Equipment that often qualifies.' ),
			nhp_rel( 'hvac-cost-guide-newark-de', 'Cost Guide', 'Gross prices before incentives.' ),
		),
	),

	'blog/spring-hvac-checklist-newark' => array(
		'slug' => 'blog/spring-hvac-checklist-newark',
		'template' => 'article',
		'is_article' => true,
		'date' => '2026-03-15',
		'title' => 'Spring HVAC Checklist for Newark Homeowners',
		'meta' => 'Spring AC tune-up checklist for Newark, DE: filters, condensate, outdoor coils, and when to call before the first heat wave.',
		'h1' => 'Spring HVAC maintenance checklist for Newark, DE',
		'hero_sub' => 'March–May is the cheap season. July is the expensive one.',
		'crumbs' => array( $home, $blog_parent, array( 'label' => 'Spring Checklist', 'url' => nhp_path( 'blog/spring-hvac-checklist-newark' ) ) ),
		'intro' => array( 'Pollen along White Clay Creek and a condenser that sat still all winter are a bad mix. Do the owner items, then book a tune-up if the system is over five years old or skipped last year.' ),
		'body' => array(
			array( 'h' => 'DIY in 20 minutes', 'list' => array( 'Replace the filter — rentals near UD often have the wrong size stuffed in sideways', 'Clear leaves and grass from the outdoor unit (do not bend fins with a hose on full blast)', 'Make sure the condensate line is not buried in mulch', 'Set the thermostat to cool and confirm the outdoor fan starts', 'Listen for a hard hum with no start — that is a capacitor call, not a “let it try”' ) ),
			array( 'h' => 'What the technician should still do', 'p' => array( 'Electrical measurements, temperature split, coil condition, drain flush, and a look at ducts if rooms never evened out last August. A “free inspection” that only sells a replacement is not a tune-up.' ) ),
		),
		'related' => array( nhp_rel( 'hvac-maintenance-newark-de', 'Book a tune-up', 'Spring AC service.' ), nhp_rel( 'ac-repair-newark-de', 'AC Repair', 'If it already will not cool.' ) ),
	),

	'blog/fall-furnace-maintenance-newark' => array(
		'slug' => 'blog/fall-furnace-maintenance-newark',
		'template' => 'article',
		'is_article' => true,
		'date' => '2026-09-10',
		'title' => 'Fall Furnace Inspection Checklist | Newark, DE',
		'meta' => 'Fall furnace maintenance for Newark, Delaware: filters, carbon monoxide, oil nozzles, and why October is better than January.',
		'h1' => 'Fall furnace inspection for Newark homeowners',
		'hero_sub' => 'The first 30° night finds every dirty flame sensor in 19711.',
		'crumbs' => array( $home, $blog_parent, array( 'label' => 'Fall Furnace', 'url' => nhp_path( 'blog/fall-furnace-maintenance-newark' ) ) ),
		'intro' => array( 'Book heating service in September–November. January no-heat is how you meet every other household in New Castle County on the same emergency board.' ),
		'body' => array(
			array( 'h' => 'Owner checklist', 'list' => array( 'New filter', 'Test CO alarms (fuel-fired systems)', 'Make sure the furnace switch is on — it looks like a light switch', 'Oil customers: confirm tank level before the first cold snap', 'Clear intake/exhaust terminations of leaves and snow plans' ) ),
			array( 'h' => 'What we check on a fall visit', 'p' => array( 'Ignition, flame sense, heat exchanger visual, flue, inducer, gas pressure or oil combustion, blower, and thermostat. Safety failures are stop-work events, not “it ran last winter.”' ) ),
		),
		'related' => array( nhp_rel( 'furnace-repair-newark-de', 'Furnace Repair', 'If it already will not start.' ), nhp_rel( 'hvac-maintenance-newark-de', 'Maintenance', 'Schedule the visit.' ) ),
	),

	'blog/common-hvac-problems-newark' => array(
		'slug' => 'blog/common-hvac-problems-newark',
		'template' => 'article',
		'is_article' => true,
		'date' => '2026-09-12',
		'title' => 'Common HVAC Problems in Newark, DE Homes',
		'meta' => 'The HVAC failures Newark, Delaware homes actually see: humid-summer AC issues, January no-heat, old ducts, and rental delays near UD.',
		'h1' => 'Common HVAC problems in Newark, DE homes',
		'hero_sub' => 'A 1978 ranch, a campus rental, and a Pike Creek split-level fail in different ways.',
		'crumbs' => array( $home, $blog_parent, array( 'label' => 'Common Problems', 'url' => nhp_path( 'blog/common-hvac-problems-newark' ) ) ),
		'intro' => array( 'Symptom searches convert because they are honest. Here is what we actually see in this ZIP cluster.' ),
		'body' => array(
			array( 'h' => 'Summer', 'list' => array( 'AC not cooling on humid afternoons', 'Frozen coils from dirty filters', 'Condensate overflows in closets', 'Outdoor fans that will not start (capacitors)' ) ),
			array( 'h' => 'Winter', 'list' => array( 'Furnace not turning on', 'Short cycling on limit', 'Oil lockouts after a delivery gap', 'Heat pumps stuck in defrost or emergency heat' ) ),
			array( 'h' => 'Year-round', 'list' => array( 'Leaky or crushed ducts in crawlspaces', 'Thermostats miswired after DIY smart-stat installs', 'Landlords delaying UD-area repairs until a tenant threatens to leave' ) ),
			array( 'h' => 'What to do', 'p' => array( 'Match the symptom to the service page, then call. Burning smells and no heat below freezing are emergency-page problems.' ) ),
		),
		'related' => array(
			nhp_rel( 'hvac-diagnostics-newark-de', 'Diagnostics', 'Noises, smells, leaks.' ),
			nhp_rel( 'emergency-hvac-newark-de', 'Emergency', 'Unsafe or no heat/cool.' ),
		),
	),

	'blog/choose-hvac-contractor-newark' => array(
		'slug' => 'blog/choose-hvac-contractor-newark',
		'template' => 'article',
		'is_article' => true,
		'date' => '2026-09-13',
		'title' => 'How to Choose an HVAC Contractor in Newark, Delaware',
		'meta' => 'How to pick an HVAC company in Newark, DE: license, written quotes, 24/7 reality vs. marketing, and how to read a market dominated by 70-year brands.',
		'h1' => 'How to choose an HVAC contractor in Newark, DE',
		'hero_sub' => 'The SERP is full of 76-year companies and franchise templates. Here is a checklist that does not require trusting a banner ad.',
		'crumbs' => array( $home, $blog_parent, array( 'label' => 'Choose a Contractor', 'url' => nhp_path( 'blog/choose-hvac-contractor-newark' ) ) ),
		'intro' => array( 'Boulden Brothers, Horizon, Burns & McBride/Sila, Air Temp, Aire Serv, Sobieski, Enhanced, and D&T are all real operators. A new dispatch brand should not pretend otherwise. You should still ask every one of them — including us — the same questions.' ),
		'body' => array(
			array( 'h' => 'Checklist', 'list' => array( 'Delaware HVACR license you can look up', 'Written flat-rate quote before work', 'Who answers after 6 p.m. and on Sundays', 'Whether “NATE certified” is the tech on your job or a website badge', 'Permit on replacements', 'What happens if the part fails in 30 days' ) ),
			array( 'h' => 'Red flags', 'list' => array( 'Recharge without a leak search on a dying R-22 unit', 'Today-only pricing that expires at sunset', 'No ZIP confirmation', 'Review counts that do not match Google', 'A furnace replacement pitched from a clogged filter' ) ),
			array( 'h' => 'How we want to be judged', 'p' => array( 'Speed, quote integrity, and local knowledge. Not a fake founding year. Call ' . nhp_phone_display() . ' and compare the experience to whoever else is on your shortlist.' ) ),
		),
		'related' => array( nhp_rel( 'about', 'About us', 'What we will and will not claim.' ), nhp_rel( 'contact', 'Contact', 'Request a quote.' ) ),
	),
);
