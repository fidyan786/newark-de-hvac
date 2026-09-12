<?php
nhp_render_header();
$page = $GLOBALS['nhp_page'];
$result = isset( $GLOBALS['nhp_form_result'] ) ? $GLOBALS['nhp_form_result'] : null;
?>
<section class="page-hero">
	<div class="wrap">
		<?php if ( ! empty( $page['crumbs'] ) ) echo nhp_breadcrumbs( $page['crumbs'] ); ?>
		<h1><?php echo esc_html( $page['h1'] ); ?></h1>
		<?php if ( ! empty( $page['hero_sub'] ) ) : ?><p><?php echo esc_html( $page['hero_sub'] ); ?></p><?php endif; ?>
		<?php if ( ! empty( $page['show_hero_cta'] ) ) : ?>
			<div class="hero-actions"><?php echo nhp_cta_call(); ?><?php echo nhp_cta_request(); ?></div>
		<?php endif; ?>
	</div>
</section>
<section class="section">
	<div class="wrap <?php echo ! empty( $page['with_form'] ) ? 'split' : ''; ?>">
		<article class="content prose">
			<?php if ( ! empty( $page['intro'] ) ) echo nhp_paragraphs( $page['intro'] ); ?>
			<?php if ( ! empty( $page['notice'] ) ) : ?><p class="notice"><?php echo esc_html( $page['notice'] ); ?></p><?php endif; ?>
			<?php if ( ! empty( $page['body'] ) ) : ?>
				<?php foreach ( $page['body'] as $block ) : ?>
					<h2><?php echo esc_html( $block['h'] ); ?></h2>
					<?php echo nhp_paragraphs( $block['p'] ); ?>
					<?php if ( ! empty( $block['list'] ) ) echo nhp_list( $block['list'] ); ?>
					<?php if ( ! empty( $block['table'] ) ) : ?>
						<table class="price-table">
							<thead><tr><?php foreach ( $block['table']['head'] as $th ) echo '<th>' . esc_html( $th ) . '</th>'; ?></tr></thead>
							<tbody>
							<?php foreach ( $block['table']['rows'] as $row ) : ?>
								<tr><?php foreach ( $row as $td ) echo '<td>' . esc_html( $td ) . '</td>'; ?></tr>
							<?php endforeach; ?>
							</tbody>
						</table>
					<?php endif; ?>
				<?php endforeach; ?>
			<?php endif; ?>
			<?php if ( ! empty( $page['html'] ) ) echo $page['html']; ?>
			<?php if ( isset( $page['slug'] ) && $page['slug'] === 'blog' ) echo nhp_blog_cards_html(); ?>
		</article>
		<?php if ( ! empty( $page['with_form'] ) ) : ?>
			<aside class="sticky-side">
				<div class="card">
					<h3>Request service</h3>
					<?php echo nhp_render_form( true, $result ); ?>
				</div>
			</aside>
		<?php endif; ?>
	</div>
</section>
<?php if ( ! empty( $page['faqs'] ) ) nhp_faq_block( $page['faqs'] ); ?>
<?php if ( ! empty( $page['related'] ) ) nhp_related( $page['related'] ); ?>
<?php nhp_render_footer(); ?>
