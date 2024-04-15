# GUI Features
                        
Aquamin adds a few useful graphical user interface features to the WordPress back-end interface.

?> Once WordPress's Full Site Editor has sufficiently matured, much of this functionality will likely be handled through that system rather than by these customizations to aquamin.

## Reusable Blocks

The _Appearance > Block Patterns_ link in the WordPress sidebar allows you to see all [block patterns](https://wordpress.org/documentation/article/block-pattern/ ':target=_blank') you've defined on your site. So, if you want to change a reusable block globally, rather than needing to track down an example of that block somewhere on the site and update it there to apply it to all pages, you can more quickly find it within this menu and simply edit it there.

## Global Content

The _Appearance > Global Content_ link in the WordPress sidebar lets you use the block editor for nonstandard features like footers, menus, sidebars, etc. If you run the `wp aquamin setup` command, you'll already have a Footer global content post added here, allowing you to build your footer with blocks.

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

### Pre-Populating Posts

You can easily pre-populate the block content of your posts with a [Global Content](#global-content) post you've created. In the following example, a post called Default Portfolio Content dictates the starting blocks for any new posts in the Portfolio custom post type.

```php
add_filter( 'default_content', 'aquamin_default_portfolio_content' );
function aquamin_default_portfolio_content( $content ) {
    global $post_type;
	if ( $post_type === 'portfolio' ) {
		$pattern = get_posts( array(
			'name'            => 'default-portfolio-content',
			'post_type'       => 'aquamin-general',
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