<?php
function nhp_http( $url, $opts = array() ) {
	$ctx = stream_context_create(
		array(
			'http' => array_merge(
				array(
					'method'        => 'GET',
					'timeout'       => 8,
					'ignore_errors' => true,
				),
				$opts
			),
		)
	);
	$body = @file_get_contents( $url, false, $ctx );
	$code = 0;
	if ( isset( $http_response_header[0] ) && preg_match( '/\s(\d{3})\s/', $http_response_header[0], $m ) ) {
		$code = (int) $m[1];
	}
	return array( $code, is_string( $body ) ? $body : '' );
}

$fail = 0;
function check( $name, $ok ) {
	global $fail;
	echo ( $ok ? 'pass ' : 'FAIL ' ) . $name . PHP_EOL;
	if ( ! $ok ) {
		$fail++;
	}
}

list( $code, $home ) = nhp_http( 'http://localhost:8080/' );
check( 'home 200', $code === 200 );
check( 'chat boot', strpos( $home, 'NHP_CHAT' ) !== false );
check( 'chatbot.js', strpos( $home, 'chatbot.js' ) !== false );
check( 'chatbot.css', strpos( $home, 'chatbot.css' ) !== false );
check( 'no openai leak', strpos( $home, 'OPENAI' ) === false );
check( 'ai disabled without key', strpos( $home, '"aiEnabled":false' ) !== false );
check( 'phone tel present', strpos( $home, 'phoneTel' ) !== false );

list( $code, $ac ) = nhp_http( 'http://localhost:8080/ac-repair-newark-de/' );
check( 'ac page 200', $code === 200 );
check( 'ac page slug in boot', strpos( $ac, 'ac-repair-newark-de' ) !== false );

list( $code, $furnace ) = nhp_http( 'http://localhost:8080/furnace-repair-newark-de/' );
check( 'furnace page 200', $code === 200 );

list( $code ) = nhp_http( 'http://localhost:8080/wp-content/themes/newark-hvac-pros/assets/js/chatbot-engine.js' );
check( 'engine js 200', $code === 200 );
list( $code ) = nhp_http( 'http://localhost:8080/wp-content/themes/newark-hvac-pros/assets/js/chatbot.js' );
check( 'ui js 200', $code === 200 );
list( $code ) = nhp_http( 'http://localhost:8080/wp-content/themes/newark-hvac-pros/assets/css/chatbot.css' );
check( 'chat css 200', $code === 200 );

list( $code, $chat ) = nhp_http(
	'http://localhost:8080/api/chat',
	array(
		'method'  => 'POST',
		'header'  => "Content-Type: application/json\r\n",
		'content' => json_encode( array( 'message' => 'hi', 'localReply' => 'Need help with your heating or cooling system?' ) ),
	)
);
check( 'chat api json', $code === 200 && strpos( $chat, 'fallback' ) !== false );

list( $code, $lead ) = nhp_http(
	'http://localhost:8080/api/chat-lead',
	array(
		'method'  => 'POST',
		'header'  => "Content-Type: application/json\r\n",
		'content' => json_encode( array( 'name' => 'Test', 'phone' => '3025550199', 'zipCode' => '19711', 'intent' => 'ac_repair', 'company_url' => '' ) ),
	)
);
check( 'lead api 200', $code === 200 && strpos( $lead, '"ok":true' ) !== false );

list( $code, $bad ) = nhp_http(
	'http://localhost:8080/api/chat-lead',
	array(
		'method'  => 'POST',
		'header'  => "Content-Type: application/json\r\n",
		'content' => json_encode( array( 'phone' => 'x' ) ),
	)
);
check( 'lead api rejects bad phone', $code === 400 );

echo $fail ? "FAILED $fail\n" : "All HTTP smoke checks passed.\n";
exit( $fail ? 1 : 0 );
