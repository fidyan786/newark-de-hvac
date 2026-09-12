<?php
/**
 * HVAC lead-conversion chatbot — config, boot JSON, and JSON APIs.
 */

function nhp_chat_services() {
	return array(
		'ac_repair'          => array( 'label' => 'AC Repair', 'slug' => 'ac-repair-newark-de' ),
		'ac_install'         => array( 'label' => 'AC Installation', 'slug' => 'ac-installation-newark-de' ),
		'furnace_repair'     => array( 'label' => 'Furnace Repair', 'slug' => 'furnace-repair-newark-de' ),
		'furnace_install'    => array( 'label' => 'Furnace Installation', 'slug' => 'furnace-installation-newark-de' ),
		'heatpump_repair'    => array( 'label' => 'Heat Pump Repair', 'slug' => 'heat-pump-repair-newark-de' ),
		'heatpump_install'   => array( 'label' => 'Heat Pump Installation', 'slug' => 'heat-pump-installation-newark-de' ),
		'replacement'        => array( 'label' => 'HVAC Replacement', 'slug' => 'hvac-replacement-newark-de' ),
		'emergency'          => array( 'label' => 'Emergency HVAC', 'slug' => 'emergency-hvac-newark-de' ),
		'maintenance'        => array( 'label' => 'HVAC Maintenance', 'slug' => 'hvac-maintenance-newark-de' ),
		'minisplit'          => array( 'label' => 'Ductless Mini Split', 'slug' => 'ductless-mini-split-newark-de' ),
		'iaq'                => array( 'label' => 'Indoor Air Quality', 'slug' => 'indoor-air-quality-newark-de' ),
		'duct_cleaning'      => array( 'label' => 'Duct Cleaning', 'slug' => 'duct-cleaning-newark-de' ),
		'commercial'         => array( 'label' => 'Commercial HVAC', 'slug' => 'commercial-hvac-newark-de' ),
	);
}

function nhp_chat_page_map() {
	return array(
		'home'                              => array( 'family' => 'home' ),
		'ac-repair-newark-de'               => array( 'family' => 'ac', 'service' => 'ac_repair' ),
		'ac-installation-newark-de'         => array( 'family' => 'ac_install', 'service' => 'ac_install' ),
		'furnace-repair-newark-de'          => array( 'family' => 'heat', 'service' => 'furnace_repair' ),
		'furnace-installation-newark-de'    => array( 'family' => 'heat_install', 'service' => 'furnace_install' ),
		'heat-pump-repair-newark-de'        => array( 'family' => 'heatpump', 'service' => 'heatpump_repair' ),
		'heat-pump-installation-newark-de'  => array( 'family' => 'heatpump_install', 'service' => 'heatpump_install' ),
		'hvac-replacement-newark-de'        => array( 'family' => 'replace', 'service' => 'replacement' ),
		'emergency-hvac-newark-de'          => array( 'family' => 'emergency', 'service' => 'emergency' ),
		'hvac-maintenance-newark-de'        => array( 'family' => 'maintenance', 'service' => 'maintenance' ),
		'ductless-mini-split-newark-de'     => array( 'family' => 'minisplit', 'service' => 'minisplit' ),
		'indoor-air-quality-newark-de'      => array( 'family' => 'iaq', 'service' => 'iaq' ),
		'duct-cleaning-newark-de'           => array( 'family' => 'ducts', 'service' => 'duct_cleaning' ),
		'ductwork-repair-newark-de'         => array( 'family' => 'ducts' ),
		'commercial-hvac-newark-de'         => array( 'family' => 'commercial', 'service' => 'commercial' ),
		'hvac-financing-newark-de'          => array( 'family' => 'general' ),
		'hvac-diagnostics-newark-de'        => array( 'family' => 'general' ),
		'boiler-repair-newark-de'           => array( 'family' => 'heat' ),
		'thermostat-installation-newark-de' => array( 'family' => 'general' ),
		'services'                          => array( 'family' => 'home' ),
		'contact'                           => array( 'family' => 'home' ),
		'service-area'                      => array( 'family' => 'home' ),
		'hvac-cost-guide-newark-de'         => array( 'family' => 'general' ),
	);
}

function nhp_chat_ai_configured() {
	$key = nhp_chat_ai_key();
	return $key !== '';
}

function nhp_chat_ai_key() {
	foreach ( array( 'OPENAI_API_KEY', 'AI_GATEWAY_API_KEY' ) as $key ) {
		$val = getenv( $key );
		if ( is_string( $val ) && trim( $val ) !== '' ) {
			return trim( $val );
		}
	}
	return '';
}

function nhp_chat_boot_config() {
	$c       = nhp_config();
	$slug    = nhp_current_slug();
	$slug    = ( $slug === '' ) ? 'home' : $slug;
	$services = array();
	foreach ( nhp_chat_services() as $key => $svc ) {
		$services[ $key ] = array(
			'label' => $svc['label'],
			'path'  => nhp_path( $svc['slug'] ),
			'slug'  => $svc['slug'],
		);
	}

	return array(
		'brand'               => $c['brand'],
		'city'                => $c['city'],
		'state'               => $c['state'],
		'county'              => $c['county'],
		'phoneDisplay'        => $c['phone_display'],
		'phoneTel'            => nhp_phone_tel(),
		'phoneIsPlaceholder'  => nhp_phone_is_placeholder(),
		'aiEnabled'           => nhp_chat_ai_configured(),
		'endpoints'           => array(
			'chat' => rtrim( nhp_site_url(), '/' ) . '/api/chat',
			'lead' => rtrim( nhp_site_url(), '/' ) . '/api/chat-lead',
		),
		'pageSlug'            => $slug,
		'pagePath'            => ( $slug === 'home' ) ? nhp_path() : nhp_path( $slug ),
		'zipsPrimary'         => $c['zips_primary'],
		'zipsExtended'        => $c['zips_extended'],
		'zipsCampus'          => isset( $c['zips_campus'] ) ? $c['zips_campus'] : array(),
		'communities'         => $c['communities'],
		'services'            => $services,
		'pages'               => nhp_chat_page_map(),
	);
}

function nhp_handle_chat_api() {
	$path = parse_url( isset( $_SERVER['REQUEST_URI'] ) ? $_SERVER['REQUEST_URI'] : '/', PHP_URL_PATH );
	$path = trim( (string) $path, '/' );

	if ( $path !== 'api/chat' && $path !== 'api/chat-lead' ) {
		return false;
	}

	if ( $_SERVER['REQUEST_METHOD'] === 'OPTIONS' ) {
		nhp_chat_cors_headers();
		http_response_code( 204 );
		exit;
	}

	if ( $_SERVER['REQUEST_METHOD'] !== 'POST' ) {
		nhp_chat_json( array( 'ok' => false, 'error' => 'Method not allowed' ), 405 );
	}

	if ( ! nhp_chat_same_origin() ) {
		nhp_chat_json( array( 'ok' => false, 'error' => 'Forbidden' ), 403 );
	}

	if ( $path === 'api/chat-lead' ) {
		nhp_chat_lead_endpoint();
	}

	nhp_chat_ai_endpoint();
	return true;
}

function nhp_chat_cors_headers() {
	$host = isset( $_SERVER['HTTP_HOST'] ) ? $_SERVER['HTTP_HOST'] : '';
	$origin = isset( $_SERVER['HTTP_ORIGIN'] ) ? $_SERVER['HTTP_ORIGIN'] : '';
	if ( $origin && nhp_chat_origin_host( $origin ) === $host ) {
		header( 'Access-Control-Allow-Origin: ' . $origin );
		header( 'Vary: Origin' );
	}
	header( 'Access-Control-Allow-Methods: POST, OPTIONS' );
	header( 'Access-Control-Allow-Headers: Content-Type' );
}

function nhp_chat_origin_host( $origin ) {
	$host = parse_url( $origin, PHP_URL_HOST );
	return is_string( $host ) ? $host : '';
}

function nhp_chat_same_origin() {
	$host   = isset( $_SERVER['HTTP_HOST'] ) ? $_SERVER['HTTP_HOST'] : '';
	$origin = isset( $_SERVER['HTTP_ORIGIN'] ) ? $_SERVER['HTTP_ORIGIN'] : '';
	if ( $origin !== '' ) {
		return nhp_chat_origin_host( $origin ) === $host;
	}
	$referer = isset( $_SERVER['HTTP_REFERER'] ) ? $_SERVER['HTTP_REFERER'] : '';
	if ( $referer === '' ) {
		return true;
	}
	$ref_host = parse_url( $referer, PHP_URL_HOST );
	$ref_port = parse_url( $referer, PHP_URL_PORT );
	$ref      = $ref_host . ( $ref_port ? ':' . $ref_port : '' );
	return $ref === $host || $ref_host === $host;
}

function nhp_chat_json( $data, $code = 200 ) {
	nhp_chat_cors_headers();
	http_response_code( $code );
	header( 'Content-Type: application/json; charset=UTF-8' );
	header( 'Cache-Control: no-store' );
	echo json_encode( $data, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE );
	exit;
}

function nhp_chat_request_json() {
	$raw = file_get_contents( 'php://input' );
	if ( ! is_string( $raw ) || $raw === '' ) {
		return array();
	}
	if ( strlen( $raw ) > 20000 ) {
		nhp_chat_json( array( 'ok' => false, 'error' => 'Payload too large' ), 413 );
	}
	$data = json_decode( $raw, true );
	return is_array( $data ) ? $data : array();
}

function nhp_chat_client_ip() {
	return isset( $_SERVER['REMOTE_ADDR'] ) ? (string) $_SERVER['REMOTE_ADDR'] : '0.0.0.0';
}

function nhp_chat_rate_limit( $bucket, $max, $window_seconds ) {
	$ip   = nhp_chat_client_ip();
	$key  = hash( 'sha256', $bucket . '|' . $ip );
	$dir  = ( getenv( 'VERCEL' ) ? '/tmp' : sys_get_temp_dir() ) . '/nhp-rate';
	if ( ! is_dir( $dir ) ) {
		@mkdir( $dir, 0755, true );
	}
	$file = $dir . '/' . $key . '.json';
	$now  = time();
	$hits = array();
	if ( is_file( $file ) ) {
		$existing = json_decode( (string) file_get_contents( $file ), true );
		if ( is_array( $existing ) ) {
			$hits = $existing;
		}
	}
	$hits = array_values(
		array_filter(
			$hits,
			function ( $t ) use ( $now, $window_seconds ) {
				return is_numeric( $t ) && ( $now - (int) $t ) < $window_seconds;
			}
		)
	);
	if ( count( $hits ) >= $max ) {
		return false;
	}
	$hits[] = $now;
	@file_put_contents( $file, json_encode( $hits ) );
	return true;
}

function nhp_chat_lead_endpoint() {
	if ( ! nhp_chat_rate_limit( 'lead', 8, 600 ) ) {
		nhp_chat_json( array( 'ok' => false, 'error' => 'Please wait a moment before sending another request.' ), 429 );
	}

	$body = nhp_chat_request_json();
	$honey = isset( $body['company_url'] ) ? trim( (string) $body['company_url'] ) : '';
	if ( $honey !== '' ) {
		nhp_chat_json( array( 'ok' => true ) );
	}

	$name  = isset( $body['name'] ) ? trim( (string) $body['name'] ) : '';
	$phone = isset( $body['phone'] ) ? trim( (string) $body['phone'] ) : '';
	$zip   = isset( $body['zipCode'] ) ? trim( (string) $body['zipCode'] ) : '';
	if ( $zip === '' && isset( $body['zip'] ) ) {
		$zip = trim( (string) $body['zip'] );
	}

	if ( $phone === '' || ! preg_match( '/^[0-9A-Za-z#+\-().\s]{7,20}$/', $phone ) ) {
		nhp_chat_json( array( 'ok' => false, 'error' => 'Enter a valid phone number.' ), 400 );
	}
	if ( $zip !== '' && ! preg_match( '/^\d{5}$/', $zip ) ) {
		nhp_chat_json( array( 'ok' => false, 'error' => 'Enter a 5-digit ZIP code.' ), 400 );
	}
	if ( $name !== '' && ( strlen( $name ) > 80 || preg_match( '/https?:/i', $name ) ) ) {
		nhp_chat_json( array( 'ok' => false, 'error' => 'Enter a valid name.' ), 400 );
	}

	$summary = isset( $body['conversationSummary'] ) ? trim( (string) $body['conversationSummary'] ) : '';
	if ( strlen( $summary ) > 2000 ) {
		$summary = substr( $summary, 0, 2000 );
	}

	$lead = array(
		'created_at'           => gmdate( 'c' ),
		'source'               => 'chatbot',
		'sessionId'            => isset( $body['sessionId'] ) ? substr( preg_replace( '/[^a-zA-Z0-9\-_]/', '', (string) $body['sessionId'] ), 0, 80 ) : '',
		'timestamp'            => gmdate( 'c' ),
		'sourcePage'           => isset( $body['sourcePage'] ) ? substr( sanitize_text_field_compat( $body['sourcePage'] ), 0, 160 ) : '',
		'intent'               => isset( $body['intent'] ) ? substr( sanitize_text_field_compat( $body['intent'] ), 0, 80 ) : '',
		'serviceType'          => isset( $body['serviceType'] ) ? substr( sanitize_text_field_compat( $body['serviceType'] ), 0, 80 ) : '',
		'issue'                => isset( $body['issue'] ) ? substr( sanitize_text_field_compat( $body['issue'] ), 0, 240 ) : '',
		'systemStatus'         => isset( $body['systemStatus'] ) ? substr( sanitize_text_field_compat( $body['systemStatus'] ), 0, 40 ) : '',
		'propertyType'         => isset( $body['propertyType'] ) ? substr( sanitize_text_field_compat( $body['propertyType'] ), 0, 40 ) : '',
		'zipCode'              => $zip,
		'urgency'              => isset( $body['urgency'] ) ? substr( sanitize_text_field_compat( $body['urgency'] ), 0, 40 ) : '',
		'name'                 => $name,
		'phone'                => $phone,
		'qualificationStatus'  => isset( $body['qualificationStatus'] ) ? substr( sanitize_text_field_compat( $body['qualificationStatus'] ), 0, 40 ) : 'chatbot',
		'conversationSummary'  => $summary,
		'ip'                   => nhp_chat_client_ip(),
	);

	nhp_persist_lead( $lead );
	nhp_chat_json( array( 'ok' => true ) );
}

function sanitize_text_field_compat( $text ) {
	if ( function_exists( 'sanitize_text_field' ) ) {
		return sanitize_text_field( (string) $text );
	}
	$text = strip_tags( (string) $text );
	$text = preg_replace( '/[\r\n\t]+/', ' ', $text );
	return trim( $text );
}

function nhp_chat_ai_endpoint() {
	if ( ! nhp_chat_ai_configured() ) {
		nhp_chat_json( array( 'ok' => true, 'fallback' => true ) );
	}
	if ( ! nhp_chat_rate_limit( 'chat', 20, 60 ) ) {
		nhp_chat_json( array( 'ok' => false, 'fallback' => true, 'error' => 'rate' ), 429 );
	}

	$body     = nhp_chat_request_json();
	$message  = isset( $body['message'] ) ? trim( (string) $body['message'] ) : '';
	$local    = isset( $body['localReply'] ) ? trim( (string) $body['localReply'] ) : '';
	$state    = isset( $body['state'] ) && is_array( $body['state'] ) ? $body['state'] : array();
	if ( $message === '' || strlen( $message ) > 1000 ) {
		nhp_chat_json( array( 'ok' => false, 'fallback' => true ), 400 );
	}

	$ai = nhp_chat_call_model( $message, $state, $local );
	if ( ! $ai ) {
		nhp_chat_json( array( 'ok' => true, 'fallback' => true ) );
	}
	nhp_chat_json( array( 'ok' => true, 'fallback' => false, 'text' => $ai ) );
}

function nhp_chat_call_model( $message, $state, $local_reply ) {
	$key   = nhp_chat_ai_key();
	$model = nhp_env( 'OPENAI_MODEL', 'gpt-4.1-mini' );
	$base  = rtrim( nhp_env( 'OPENAI_BASE_URL', 'https://api.openai.com/v1' ), '/' );
	if ( getenv( 'AI_GATEWAY_API_KEY' ) && ! getenv( 'OPENAI_API_KEY' ) ) {
		$base  = rtrim( nhp_env( 'OPENAI_BASE_URL', 'https://ai-gateway.vercel.sh/v1' ), '/' );
		$model = nhp_env( 'OPENAI_MODEL', 'openai/gpt-4.1-mini' );
	}

	$safe_state = array(
		'intent'        => isset( $state['intent'] ) ? $state['intent'] : '',
		'serviceType'   => isset( $state['serviceType'] ) ? $state['serviceType'] : '',
		'zipCode'       => isset( $state['zipCode'] ) ? $state['zipCode'] : '',
		'urgency'       => isset( $state['urgency'] ) ? $state['urgency'] : '',
		'systemStatus'  => isset( $state['systemStatus'] ) ? $state['systemStatus'] : '',
		'propertyType'  => isset( $state['propertyType'] ) ? $state['propertyType'] : '',
		'pageSlug'      => isset( $state['sourcePage'] ) ? $state['sourcePage'] : '',
	);

	$c = nhp_config();
	$system = 'You rewrite a Newark, Delaware HVAC website chatbot reply. Keep the same facts. '
		. 'Do not add prices, dollar amounts, licenses, reviews, guarantees, hours beyond what is given, or coverage claims. '
		. 'Do not invent phone numbers. Do not diagnose with certainty. Sound calm, concise, and local. '
		. 'Never say you are a human technician. Under 70 words. '
		. 'If the draft already tells the visitor to call, keep that. '
		. 'Brand: ' . $c['brand'] . '. City: Newark, DE. '
		. 'Known facts JSON: ' . json_encode( $safe_state ) . '.';

	$payload = json_encode(
		array(
			'model'       => $model,
			'temperature' => 0.3,
			'max_tokens'  => 180,
			'messages'    => array(
				array( 'role' => 'system', 'content' => $system ),
				array( 'role' => 'user', 'content' => "Visitor said:\n" . $message . "\n\nDraft reply to rewrite:\n" . $local_reply ),
			),
		)
	);

	$ctx = stream_context_create(
		array(
			'http' => array(
				'method'        => 'POST',
				'header'        => "Content-Type: application/json\r\nAuthorization: Bearer " . $key . "\r\n",
				'content'       => $payload,
				'timeout'       => 8,
				'ignore_errors' => true,
			),
		)
	);

	$raw = @file_get_contents( $base . '/chat/completions', false, $ctx );
	if ( ! is_string( $raw ) || $raw === '' ) {
		return null;
	}
	$data = json_decode( $raw, true );
	if ( ! is_array( $data ) || empty( $data['choices'][0]['message']['content'] ) ) {
		return null;
	}
	$text = trim( (string) $data['choices'][0]['message']['content'] );
	$text = preg_replace( '/\$\s?\d[\d,]*(?:\.\d{2})?/', '', $text );
	if ( $text === '' || strlen( $text ) > 600 ) {
		return null;
	}
	return $text;
}
