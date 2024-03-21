# GUI Tools

Aquamin adds a few useful tools within the WordPress back-end interface.

## Block Patterns

The _Block Patterns_ link in the WordPress sidebar allows you to define what [patterns](https://learn.wordpress.org/lesson-plan/how-to-use-wordpress-block-patterns/ ':target=_blank') appear within the block editor. By adding them here rather than via coded PHP files, it's a little easier as a developer to put patterns together; but, even more importantly, it's *way* easier for your clients to modify existing or add new patterns after you've passed the site off to them.

Make sure to define the Pattern Category whenever you add a new pattern to organize your patterns in a meaningful way within the block editor. (And remember to hit _Enter_ after you add them: I always forget...)

### Pre-Populating Posts

You can easily pre-populate the content of your posts with a pattern you create under _Block Patterns_. In the following example, any new posts of the Portfolio custom post type will use the pattern called My Portfolio Pattern, so the client automatically starts off each such post with whatever blocks you've defined in that pattern.

```php
add_filter( 'default_content', 'aquamin_default_portfolio_content' );
function aquamin_default_portfolio_content( $content ) {
    global $post_type;
	if ( $post_type === 'portfolio' ) {
		$pattern = get_posts( array(
			'name'            => 'my-portfolio-pattern',
			'post_type'       => 'custom-patterns',
			'posts_per_page'  => 1,
			'fields'          => 'ids'
		) );
		if ( $pattern ) {
			$content = get_post_field( 'post_content', $pattern[ 0 ] );
		}

	}
    return $content;
}
```

## Reusable Blocks

The _Reusable Blocks_ link in the WordPress sidebar allows you to see all [reusable blocks](https://learn.wordpress.org/lesson-plan/reusable-blocks/ ':target=_blank') you've defined on your site. So, if you want to change a reusable block globally, rather than needing to track down an example of that block somewhere on the site and update it there to apply it to all pages, you can more quickly find it within _Reusable Blocks_ and simply edit it there.

## Global Content

The _Appearance > Global Content_ link in the WordPress sidebar lets you use the block editor for nonstandard features like footers, menus, sidebars, etc. It's much like the old Widgets area of WordPress, but works much better (aquamin originally employed block widgets, but abandoned them due to multiple bugs, quirks, and inconveniences in the core widget implementation at the time). If you run the `wp aquamin setup` command, you'll already have a Footer global content post added here, allowing you to build your footer with blocks.

You can also add your own. In the following example, we'd create a My Sidebar global content post, which we can then populate with whatever blocks we'd like (and the client can easily modify that content later). Then, you'd grab the content from that post and display it in your theme like so:

```php
$sidebar = get_posts( array(
	'name'           => 'my-sidebar',
	'post_type'      => 'aquamin-general',
	'posts_per_page' => 1,
	'fields'         => 'ids'
) );
if( $sidebar ) {
	echo apply_filters( 'the_content', get_post_field( 'post_content', $sidebar[0] ) );
}
```

?> Once WordPress's Full Site Editor has sufficiently matured, most of this functionality will likely be handled through that system, and the Global Content feature in aquamin will be deprecated at that time. For now though, it's very convenient, especially for clients wanting to edit content utilizing the full potential of blocks in nonstandard places on the site.