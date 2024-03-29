<?php
/**
 * The template for displaying comments
 *
 * This is the template that displays the area of the page that
 * contains both the current comments and the comment form.
 * 
 * This file renders the component's HTML via:
 * get_template_part( 'assets/component-library/blog/comments-view' );
 *
 * @package Aquamin
 */
?>

<?php
	/*
	 * If the current post is protected by a password and
	 * the visitor has not yet entered the password we will
	 * return early without loading the comments.
	 */
	if ( post_password_required() ) {
		return;
	}
?>

<div id="comments" class="comments">

	<?php if ( have_comments() ) : ?>

		<h2 class="comments__title">
			<?php
				$aquamin_comment_count = get_comments_number();
				if ( '1' === $aquamin_comment_count ) {
					printf(
						esc_html__( 'One thought on &ldquo;%1$s&rdquo;', 'aquamin' ),
						'<span>' . get_the_title() . '</span>'
					);
				} else {
					printf(
						esc_html( _nx( '%1$s thought on &ldquo;%2$s&rdquo;', '%1$s thoughts on &ldquo;%2$s&rdquo;', $aquamin_comment_count, 'comments title', 'aquamin' ) ),
						number_format_i18n( $aquamin_comment_count ),
						'<span>' . get_the_title() . '</span>'
					);
				}
			?>
		</h2>

		<ol class="comments__list">
			<?php
				wp_list_comments( array(
					'style'      => 'ol',
					'short_ping' => true,
				) );
			?>
		</ol>

		<?php if ( ! comments_open() ) : ?>
			<p class="coments__none"><?php esc_html_e( 'Comments are closed.', 'aquamin' ); ?></p>
		<?php endif; ?>

	<?php endif; ?>

	<?php comment_form(); ?>

</div>
