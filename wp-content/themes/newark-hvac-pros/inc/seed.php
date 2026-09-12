<?php
/**
 * Create pages from the content catalog on theme activation.
 */
function nhp_seed_pages() {
	if ( ! function_exists( 'wp_insert_post' ) ) {
		return;
	}

	$blog_id = 0;
	$blog    = get_page_by_path( 'blog' );
	if ( $blog ) {
		$blog_id = $blog->ID;
	}

	foreach ( nhp_load_content() as $slug => $page ) {
		if ( $slug === 'home' ) {
			continue;
		}

		$parent = 0;
		$leaf   = $slug;
		if ( strpos( $slug, 'blog/' ) === 0 ) {
			if ( ! $blog_id ) {
				$blog_id = wp_insert_post(
					array(
						'post_title'  => 'Blog',
						'post_name'   => 'blog',
						'post_status' => 'publish',
						'post_type'   => 'page',
						'post_content'=> 'Guides for Newark HVAC.',
					)
				);
			}
			$parent = $blog_id;
			$leaf   = substr( $slug, 5 );
		}

		$existing = get_page_by_path( $slug );
		if ( $existing ) {
			continue;
		}
		if ( $parent ) {
			$found = get_posts(
				array(
					'post_type'      => 'page',
					'name'           => $leaf,
					'post_parent'    => $parent,
					'posts_per_page' => 1,
					'post_status'    => 'publish',
				)
			);
			if ( $found ) {
				continue;
			}
		}

		wp_insert_post(
			array(
				'post_title'   => isset( $page['h1'] ) ? $page['h1'] : $slug,
				'post_name'    => $leaf,
				'post_status'  => 'publish',
				'post_type'    => 'page',
				'post_parent'  => $parent,
				'post_content' => isset( $page['meta'] ) ? $page['meta'] : '',
			)
		);
	}

	$home = get_page_by_path( 'contact' );
	update_option( 'show_on_front', 'page' );
	$front = get_page_by_title( isset( nhp_page( 'home' )['h1'] ) ? nhp_page( 'home' )['h1'] : 'HVAC Repair in Newark, DE — 24/7 Emergency Service' );
	if ( ! $front ) {
		$front_id = wp_insert_post(
			array(
				'post_title'   => 'Home',
				'post_name'    => 'home-newark-hvac',
				'post_status'  => 'publish',
				'post_type'    => 'page',
			)
		);
		update_option( 'page_on_front', $front_id );
	}
	flush_rewrite_rules();
}
