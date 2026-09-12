<?php
function nhp_leads_dir() {
	$dir = getenv( 'VERCEL' )
		? '/tmp/nhp-leads'
		: dirname( nhp_theme_dir(), 3 ) . '/data/leads';
	if ( ! is_dir( $dir ) ) {
		wp_mkdir_p_compat( $dir );
	}
	return $dir;
}

function wp_mkdir_p_compat( $dir ) {
	if ( function_exists( 'wp_mkdir_p' ) ) {
		return wp_mkdir_p( $dir );
	}
	if ( ! is_dir( $dir ) ) {
		return mkdir( $dir, 0755, true );
	}
	return true;
}

function nhp_form_token() {
	if ( session_status() !== PHP_SESSION_ACTIVE ) {
		session_start();
	}
	if ( empty( $_SESSION['nhp_form_token'] ) ) {
		$_SESSION['nhp_form_token'] = bin2hex( random_bytes( 16 ) );
	}
	return $_SESSION['nhp_form_token'];
}

function nhp_handle_form() {
	if ( $_SERVER['REQUEST_METHOD'] !== 'POST' || empty( $_POST['nhp_form'] ) ) {
		return null;
	}

	if ( session_status() !== PHP_SESSION_ACTIVE ) {
		session_start();
	}

	$honeypot = isset( $_POST['website'] ) ? trim( (string) $_POST['website'] ) : '';
	if ( $honeypot !== '' ) {
		return array( 'ok' => true, 'message' => 'Thanks — we received your request.' );
	}

	$token = isset( $_POST['nhp_token'] ) ? (string) $_POST['nhp_token'] : '';
	if ( empty( $_SESSION['nhp_form_token'] ) || ! hash_equals( $_SESSION['nhp_form_token'], $token ) ) {
		return array( 'ok' => false, 'message' => 'Please refresh the page and try the form again.' );
	}

	$name    = isset( $_POST['name'] ) ? trim( (string) $_POST['name'] ) : '';
	$phone   = isset( $_POST['phone'] ) ? trim( (string) $_POST['phone'] ) : '';
	$zip     = isset( $_POST['zip'] ) ? trim( (string) $_POST['zip'] ) : '';
	$service = isset( $_POST['service'] ) ? trim( (string) $_POST['service'] ) : '';

	if ( $name === '' || $phone === '' || $zip === '' || $service === '' ) {
		return array( 'ok' => false, 'message' => 'Name, phone, ZIP, and service are required.' );
	}
	if ( ! preg_match( '/^[0-9A-Za-z#+\-().\s]{7,20}$/', $phone ) ) {
		return array( 'ok' => false, 'message' => 'Enter a valid phone number so we can call you back.' );
	}
	if ( ! preg_match( '/^\d{5}$/', $zip ) ) {
		return array( 'ok' => false, 'message' => 'Enter a 5-digit ZIP code.' );
	}

	$lead = array(
		'created_at' => gmdate( 'c' ),
		'source'     => 'request_form',
		'name'       => $name,
		'phone'      => $phone,
		'zip'        => $zip,
		'service'    => $service,
		'ip'         => isset( $_SERVER['REMOTE_ADDR'] ) ? $_SERVER['REMOTE_ADDR'] : '',
		'page'       => isset( $_SERVER['REQUEST_URI'] ) ? $_SERVER['REQUEST_URI'] : '',
	);

	nhp_persist_lead( $lead );

	$_SESSION['nhp_form_token'] = bin2hex( random_bytes( 16 ) );

	return array(
		'ok'      => true,
		'message' => 'Request received. We call back as quickly as possible — usually within 15 minutes during peak hours. For no heat or no cooling, call ' . nhp_phone_display() . ' now.',
	);
}

function nhp_persist_lead( $lead ) {
	$payload = json_encode( $lead, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES );
	$file    = nhp_leads_dir() . '/' . gmdate( 'Ymd-His' ) . '-' . bin2hex( random_bytes( 3 ) ) . '.json';
	@file_put_contents( $file, $payload );

	$webhook = getenv( 'FORM_WEBHOOK' );
	if ( is_string( $webhook ) && $webhook !== '' ) {
		$ctx = stream_context_create(
			array(
				'http' => array(
					'method'  => 'POST',
					'header'  => "Content-Type: application/json\r\n",
					'content' => $payload,
					'timeout' => 8,
				),
			)
		);
		@file_get_contents( $webhook, false, $ctx );
	}

	return true;
}

function nhp_service_options() {
	return array(
		'Emergency HVAC',
		'AC Repair',
		'AC Installation / Replacement',
		'Furnace Repair',
		'Furnace Installation / Replacement',
		'Heat Pump Repair',
		'Heat Pump Installation',
		'HVAC Replacement',
		'Maintenance / Tune-Up',
		'Ductless Mini Split',
		'Indoor Air Quality',
		'Duct Cleaning / Ductwork',
		'Commercial HVAC',
		'Financing Question',
		'Other',
	);
}

function nhp_render_form( $compact = false, $result = null ) {
	$c = nhp_config();
	ob_start();
	?>
	<form class="lead-form<?php echo $compact ? ' lead-form-compact' : ''; ?>" method="post" action="<?php echo esc_url( nhp_path( 'contact' ) ); ?>">
		<input type="hidden" name="nhp_form" value="1">
		<input type="hidden" name="nhp_token" value="<?php echo esc_attr( nhp_form_token() ); ?>">
		<p class="hp" aria-hidden="true"><label>Website<input type="text" name="website" tabindex="-1" autocomplete="off"></label></p>
		<?php if ( $result ) : ?>
			<div class="form-msg <?php echo ! empty( $result['ok'] ) ? 'ok' : 'err'; ?>" role="status"><?php echo esc_html( $result['message'] ); ?></div>
		<?php endif; ?>
		<div class="form-grid">
			<label>Name
				<input type="text" name="name" required maxlength="80" autocomplete="name">
			</label>
			<label>Phone
				<input type="tel" name="phone" required maxlength="20" autocomplete="tel" inputmode="tel">
			</label>
			<label>ZIP
				<input type="text" name="zip" required maxlength="5" inputmode="numeric" pattern="\d{5}" placeholder="19711">
			</label>
			<label>Service needed
				<select name="service" required>
					<option value="">Select a service</option>
					<?php foreach ( nhp_service_options() as $opt ) : ?>
						<option value="<?php echo esc_attr( $opt ); ?>"><?php echo esc_html( $opt ); ?></option>
					<?php endforeach; ?>
				</select>
			</label>
		</div>
		<button type="submit" class="btn btn-primary">Request a Free Estimate</button>
		<p class="form-note">Free estimate. We call back — usually within 15 minutes during peak hours. Primary ZIPs: <?php echo esc_html( implode( ', ', $c['zips_primary'] ) ); ?>.</p>
	</form>
	<?php
	return ob_get_clean();
}
