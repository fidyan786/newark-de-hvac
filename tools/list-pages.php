<?php
define( 'NHP_STANDALONE', true );
require dirname( __DIR__ ) . '/wp-content/themes/newark-hvac-pros/inc/bootstrap.php';
$all = nhp_load_content();
echo 'PAGES=' . count( $all ) . PHP_EOL;
foreach ( array_keys( $all ) as $s ) {
	echo $s . PHP_EOL;
}
