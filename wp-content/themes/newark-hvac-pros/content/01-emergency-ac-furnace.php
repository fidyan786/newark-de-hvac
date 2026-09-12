<?php
return array(
	'emergency-hvac-newark-de' => array(
		'slug'         => 'emergency-hvac-newark-de',
		'template'     => 'emergency',
		'emergency'    => true,
		'hide_form_cta'=> true,
		'service_type' => 'Emergency HVAC',
		'title'        => 'Emergency HVAC Newark, DE | 24-Hour Service Available Now',
		'meta'         => '24-hour emergency HVAC in Newark, DE. No heat, no AC, or a system that will not start — call now for after-hours dispatch across New Castle County.',
		'h1'           => 'Emergency HVAC Newark, DE — Available 24/7, Call Now',
		'hero_sub'     => 'No heat in January or no AC in a July humidity spike is not a wait-until-Monday problem. Tap to call. A licensed technician is dispatched as soon as a slot opens.',
		'crumbs'       => nhp_crumbs( 'Emergency HVAC', 'emergency-hvac-newark-de' ),
		'intro'        => array(
			'When the system dies at 11 p.m. in a Newark ranch or a Pike Creek split-level, the search is not “who has the nicest brochure.” It is who answers and who can actually roll a truck. This page is the after-hours line for no-heat, no-cooling, burning smells, and water where it should not be.',
			'Newark sits in a humid subtropical climate: July highs near 86–88°F with sticky dew points, January nights in the mid-20s, and about 21 inches of snow a year. Equipment failure in those windows is a safety and health issue, especially for older adults, infants, and rental households near the University of Delaware.',
			'Call ' . nhp_phone_display() . ' now. Do not fill out a form if the house is unsafe.',
		),
		'symptoms'     => array(
			'No heat with outdoor temperatures near or below freezing',
			'No air conditioning during a heat wave or high heat-index day',
			'Burning, electrical, or strong gas odor from the HVAC system',
			'Furnace or heat pump will not ignite or start after several tries',
			'AC freezing into a block of ice or leaking across the floor',
			'Carbon monoxide alarm related to a fuel-fired furnace or boiler',
			'Complete loss of airflow in every room',
			'Breaker that will not stay on for the outdoor condenser or air handler',
		),
		'body'         => array(
			array(
				'h' => 'How emergency dispatch works',
				'p' => array(
					'You call. We confirm the ZIP — 19702, 19711, 19713, 19725, Bear, Hockessin, and nearby New Castle County streets — and the symptom. Overnight and weekend calls go to the on-call technician, not a voicemail box that waits until morning.',
					'On arrival, the tech makes the house safe first: shut down a flooding coil, isolate a cracked heat exchanger concern, or restore heat with a repair you approve. You see the price before wrenches turn on a non-emergency upsell.',
				),
			),
			array(
				'h' => 'Why Newark emergencies cluster in July and January',
				'p' => array(
					'July humidity around White Clay Creek and the UD campus pushes systems that were “mostly fine” in May into failure. Condensate drains clog, capacitors open, and outdoor fans seize. January is the opposite problem: ignitors, flame sensors, and oil nozzles on older furnaces pick the coldest night to quit.',
					'Nor’easters also knock power around for hours. When power returns, surge-damaged boards and locked compressors show up in clusters. If your system will not restart after an outage, treat it as an emergency call — not a DIY reset loop that can damage a compressor.',
				),
			),
			array(
				'h' => 'What we will not do on an emergency call',
				'p' => array(
					'We will not pretend a dead 20-year-old condenser is a $89 “tune-up.” If replacement is the honest answer, you get that quote with repair as a comparison — not a bait switch. We also will not quote a fake arrival window. You get the next available emergency slot for your side of Newark.',
				),
			),
		),
		'faqs'         => array(
			array( 'q' => 'Do you really answer 24 hours in Newark?', 'a' => 'Yes. Emergency HVAC, emergency AC repair, and emergency furnace repair calls are taken overnight, Sundays, and holidays. Non-urgent filter changes can wait until morning.' ),
			array( 'q' => 'How fast can a technician arrive?', 'a' => 'Arrival depends on storm volume and where the truck is coming from in New Castle County. Heat-wave and no-heat nights are prioritized over convenience calls. Ask for the current window when you call.' ),
			array( 'q' => 'Is after-hours HVAC more expensive?', 'a' => 'Emergency dispatch can carry a higher after-hours rate than a weekday afternoon. You still approve a flat rate before the repair. No open-ended hourly surprise.' ),
			array( 'q' => 'What should I do while I wait?', 'a' => 'For no heat: close unused rooms, open faucet cabinets if pipes are at risk, and do not use ovens as heaters. For no AC: drink water, use a box fan, and check that the thermostat has power. If you smell gas, leave the house and call the utility / 911, then us.' ),
		),
		'related'      => array(
			nhp_rel( 'ac-repair-newark-de', 'AC Repair', 'Daytime and emergency cooling repairs.' ),
			nhp_rel( 'furnace-repair-newark-de', 'Furnace Repair', 'No-heat diagnosis for gas and oil systems.' ),
			nhp_rel( 'heat-pump-repair-newark-de', 'Heat Pump Repair', 'When the unit will not heat or cool.' ),
		),
	),

	'ac-repair-newark-de' => array(
		'slug'         => 'ac-repair-newark-de',
		'template'     => 'service',
		'service_type' => 'AC Repair',
		'title'        => 'AC Repair Newark, DE | Same-Day Air Conditioning Service',
		'meta'         => 'AC repair in Newark, DE for homes that are not cooling, freezing up, or leaking. Same-day air conditioning service when available. Serving 19702, 19711, 19713, and nearby.',
		'h1'           => 'AC Repair in Newark, DE — Fast, Same-Day Service',
		'hero_sub'     => 'Central air that runs but will not drop the temperature is a classic Newark summer call. We diagnose capacitors, coils, refrigerant leaks, and drain clogs — then quote a flat rate.',
		'crumbs'       => nhp_crumbs( 'AC Repair', 'ac-repair-newark-de' ),
		'intro'        => array(
			'Air conditioning repair is the highest-volume summer job in Newark for a reason. Average July highs sit in the mid-to-upper 80s, but humidity along the Christina River and around campus makes indoor air feel much worse when a condenser is down. Homeowners in 19711 near UD and in 19702 toward Glasgow both search the same phrase: AC repair Newark DE.',
			'Most Newark houses were built around 1978. Original or second-generation condensers from the 1990s and 2000s are now in the failure window. We repair what is worth repairing and tell you clearly when a replacement is cheaper over the next two summers.',
		),
		'symptoms'     => array(
			'AC not cooling, or blowing warm air on a humid afternoon',
			'Outdoor unit silent, humming, or clicking without starting',
			'Ice on the copper lines or the indoor coil',
			'Water around the furnace/air handler closet or ceiling stains',
			'Rooms near the west side of the house much hotter than others',
			'Breaker tripping when the condenser kicks on',
			'Musty smell at startup after the system sat unused',
			'Short cycling — on and off every few minutes',
		),
		'body'         => array(
			array(
				'h' => 'What we repair',
				'p' => array( 'Capacitors, contactors, fan motors, blower motors, condensate pumps, float switches, thermostats, control boards, TXVs, and many refrigerant leaks are everyday Newark AC service. We also straighten to straighten fins, clear drain lines that clog in pollen season, and recover/recharge only when the leak path is identified — not as a seasonal “top off.”' ),
				'list' => array(
					'Central air and heat pump cooling mode',
					'Packaged rooftop and ground-level packaged units on ranches',
					'Ductless mini-split heads that freeze or drip',
					'Apartment and small rental systems near campus',
				),
			),
			array(
				'h' => 'The Newark humidity factor',
				'p' => array(
					'Delaware summers are wet. Annual precipitation is about 45–47 inches, and July dew points regularly make a 85°F day feel like a heat-index problem. An AC that “kind of cools” but will not dehumidify leaves windows sweating and bedrooms clammy. That is often a low-charge, dirty coil, or oversized-short-cycle issue — not something a bigger thermostat setpoint will fix.',
					'If you are in a 1970s ranch with original ductwork, we also look at airflow. Undersized returns and leaky trunks in crawlspaces around Brookside and Ogletown are common reasons a “new-looking” condenser still cannot keep up.',
				),
			),
			array(
				'h' => 'Repair vs. replace on a Newark AC',
				'p' => array(
					'A good rule used on our quotes: if the condenser is over 12–15 years old and the repair exceeds about half the value of a new, right-sized 16 SEER2-class system, we show both numbers. R-22 equipment is not recharged as if it were still a cheap commodity. You will hear that before money is spent chasing a dying compressor.',
				),
			),
			array(
				'h' => 'Our AC repair process',
				'p' => array(
					'Call or request service with your ZIP and the symptom (not cooling, leaking, won’t turn on). The technician tests electrical, airflow, temperatures, and — when needed — pressures. You get a flat-rate repair option. Approved work is done that visit when parts are on the truck.',
				),
			),
		),
		'cost'         => array(
			'h' => 'How much does AC repair cost in Newark?',
			'p' => array( 'Typical Newark AC repairs run $150–$900. Capacitors, condensate clogs, and thermostats cluster near the bottom. Fan motors, boards, and leak repairs sit higher. Compressors and coils often push the conversation into replacement. You approve the number first. See the full ranges on our HVAC cost guide.' ),
		),
		'faqs'         => array(
			array( 'q' => 'Do you offer same-day AC repair in Newark?', 'a' => 'Yes, when the day’s emergency load allows. Heat-wave days fill first. Call early for the best window in 19702, 19711, and 19713.' ),
			array( 'q' => 'Why is my AC not cooling in Newark humidity?', 'a' => 'Dirty filters, clogged outdoor coils, low refrigerant, and failing capacitors are the usual four. Humidity makes a 3-degree temperature miss feel like the system is dead.' ),
			array( 'q' => 'Is it worth repairing or replacing my AC?', 'a' => 'Repair if the unit is under ~12 years old and the part is discrete. Replace if you are on a second compressor, using obsolete refrigerant, or spending close to half the cost of a new system.' ),
			array( 'q' => 'How long does AC repair take?', 'a' => 'Many jobs are 45–120 minutes. Leak searches and coil replacements take longer and may need a follow-up.' ),
			array( 'q' => 'Do you service rental properties near the University of Delaware?', 'a' => 'Yes. Landlords and property managers can request service; tenants should have owner approval. We still need a valid on-site contact and ZIP.' ),
		),
		'related'      => array(
			nhp_rel( 'ac-installation-newark-de', 'AC Installation', 'When repair is no longer the value play.' ),
			nhp_rel( 'emergency-hvac-newark-de', 'Emergency HVAC', 'After-hours no-cooling dispatch.' ),
			nhp_rel( 'hvac-maintenance-newark-de', 'HVAC Maintenance', 'Spring tune-ups that prevent July failures.' ),
			nhp_rel( 'hvac-cost-guide-newark-de', 'Cost Guide', 'Local price ranges for repair and replacement.' ),
		),
	),

	'furnace-repair-newark-de' => array(
		'slug'         => 'furnace-repair-newark-de',
		'template'     => 'service',
		'service_type' => 'Furnace Repair',
		'title'        => 'Furnace Repair Newark, DE | Emergency Heating Service 24/7',
		'meta'         => 'Furnace repair in Newark, DE for gas and oil systems that will not heat, short cycle, or shut down on safety. 24/7 no-heat dispatch for New Castle County.',
		'h1'           => 'Furnace Repair in Newark, Delaware — Honest Flat-Rate Pricing',
		'hero_sub'     => 'No heat on a 26°F Newark night is an emergency. We diagnose gas furnaces, oil furnaces, and dual-fuel setups common in homes built around 1978.',
		'crumbs'       => nhp_crumbs( 'Furnace Repair', 'furnace-repair-newark-de' ),
		'intro'        => array(
			'Furnace repair Newark DE searches spike from October through February, with the sharpest peak in January. Average lows sit near 23–26°F. A house in Fairfield or a Pike Creek split-level that loses heat overnight is a pipe-risk and a health-risk, not a “see if it resets in the morning” project.',
			'New Castle County still has oil-fired equipment — Hillside Oil’s long presence is not an accident — alongside the more common natural-gas furnaces. We work on both. If conversion off oil is the smarter 10-year move, we will say so instead of selling another nozzle and filter and disappearing.',
		),
		'symptoms'     => array(
			'Furnace not turning on, or turning on then shutting off',
			'Blower runs but the air is cold',
			'Short cycling every few minutes',
			'Banging, rumbling, or squealing at startup',
			'Pilot or ignitor issues, or a furnace that smells like fuel',
			'Yellow flame on a gas burner (should be mostly blue)',
			'Thermostat calling for heat with no response',
			'Oil furnace lockout after a storm or after running out of fuel',
		),
		'body'         => array(
			array(
				'h' => 'Gas furnace repair',
				'p' => array( 'Hot-surface ignitors, flame sensors, pressure switches, inducer motors, gas valves, and limit switches account for most Newark gas furnace calls. Dirty filters in student rentals near UD cause limit trips that look like “the furnace is dead.” We clean, test, and replace the failed part — not the whole cabinet — unless the heat exchanger is compromised.' ),
			),
			array(
				'h' => 'Oil furnace repair',
				'p' => array( 'Oil systems in older Newark and Hockessin homes fail on nozzles, electrodes, cad cells, pumps, and sooted heat exchangers after neglected annual service. If you ran the tank dry, the pump may be air-locked or damaged. We prime and test properly; we do not keep firing into a flooded chamber.' ),
			),
			array(
				'h' => 'Safety first on no-heat calls',
				'p' => array( 'Cracked heat exchangers, blocked flues, and carbon monoxide symptoms are stop-work events. If we find a safety issue, you get that news immediately. A cheap “it runs again” that leaks flue gas into a Brookside basement is not a repair we will sell.' ),
			),
			array(
				'h' => 'Our heating repair process',
				'p' => array( 'We confirm fuel type, thermostat demand, and error codes. Combustion and safety checks come before comfort tweaks. You receive a flat-rate repair quote. Emergency no-heat is available 24/7.' ),
			),
		),
		'cost'         => array(
			'h' => 'How much does furnace repair cost in Newark?',
			'p' => array( 'Most furnace repairs run $150–$800. Ignitors, sensors, and filters are inexpensive. Inducers, boards, and heat exchangers change the math. If replacement is the honest recommendation, compare it with our furnace installation page and financing options.' ),
		),
		'faqs'         => array(
			array( 'q' => 'Can you repair oil furnaces in Newark?', 'a' => 'Yes. Oil heat is still in the older housing stock. We also advise when a heat pump or gas conversion is a better long-term spend.' ),
			array( 'q' => 'My furnace will not turn on. What should I check?', 'a' => 'Thermostat batteries, the furnace switch (looks like a light switch), a tripped breaker, and a filthy filter. If it still sits dark, call — especially below freezing.' ),
			array( 'q' => 'Do you work after hours?', 'a' => 'Yes. Overnight no-heat is an emergency dispatch, not a next-morning voicemail.' ),
			array( 'q' => 'How long does furnace repair take?', 'a' => 'Often under two hours when the part is stocked. Heat exchanger or control-board special orders take longer.' ),
		),
		'related'      => array(
			nhp_rel( 'furnace-installation-newark-de', 'Furnace Installation', 'Replacement when the repair is no longer worth it.' ),
			nhp_rel( 'emergency-hvac-newark-de', 'Emergency HVAC', '24/7 no-heat line.' ),
			nhp_rel( 'boiler-repair-newark-de', 'Boiler Repair', 'For hydronic and oil-boiler homes.' ),
			nhp_rel( 'hvac-maintenance-newark-de', 'Fall Tune-Ups', 'Catch ignitor and heat exchanger issues before January.' ),
		),
	),
);
