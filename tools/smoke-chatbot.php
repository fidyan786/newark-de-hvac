<?php
$_SERVER['REQUEST_URI'] = '/';
$_SERVER['HTTP_HOST'] = 'localhost:8080';
$_SERVER['REQUEST_METHOD'] = 'GET';
$_SERVER['HTTPS'] = 'off';
ob_start();
include dirname(__DIR__) . '/index.php';
$html = ob_get_clean();
echo ( strpos( $html, 'NHP_CHAT' ) !== false ? 'HAS_CHAT_BOOT' : 'MISSING_CHAT_BOOT' ) . PHP_EOL;
echo ( strpos( $html, 'chatbot.js' ) !== false ? 'HAS_CHAT_JS' : 'MISSING_CHAT_JS' ) . PHP_EOL;
echo ( strpos( $html, 'chatbot.css' ) !== false ? 'HAS_CHAT_CSS' : 'MISSING_CHAT_CSS' ) . PHP_EOL;
echo ( strpos( $html, 'How can I help you today' ) !== false ? 'GENERIC_GREETING' : 'NO_GENERIC_GREETING' ) . PHP_EOL;
echo ( preg_match( '/"aiEnabled":false/', $html ) ? 'AI_OFF_WITHOUT_KEY' : 'AI_FLAG_UNEXPECTED' ) . PHP_EOL;
echo ( strpos( $html, 'OPENAI' ) !== false ? 'LEAKED_OPENAI' : 'NO_SECRET_LEAK' ) . PHP_EOL;
echo 'BYTES=' . strlen( $html ) . PHP_EOL;
