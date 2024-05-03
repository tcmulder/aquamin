# More Aquamin Features
                        
Aquamin adds a few miscellaneous features to make development and content management easier.

## Documentation

In addition to reviewing the most up-to-date docs at `https://aquamin.thinkaquamarine.com`, you can also run `npm run docs` to open docs for the specific version of aquamin you are using (or peruse the markdown files within the `aquamin/docs` directory).

## Global Content

The _Appearance > Global Content_ link in the WordPress sidebar lets you use the block editor for nonstandard features like footers, menus, sidebars, etc. If you run the `wp aquamin setup` command, you'll already have a Footer global content post added here, allowing you to build your footer with blocks.

?> Once WordPress's Full Site Editor has sufficiently matured, much of this functionality will likely be handled through that system rather than by these customizations to aquamin.

### Example: Sidebar Blocks

You can also add your own. In the following example, we'd create a post under _Appearance > Global Content_ called "My Sidebar," and configure it to show whatever blocks we'd like. Then, we'd grab the content from that post and display it in your theme like so:

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

### Example: Pre-Populating Posts

You can easily pre-populate the block content of your posts with a Global Content post you've created. By adding the following to `functions.php`, a post called "Default Portfolio Content" dictates the starting blocks for any new posts in the Portfolio custom post type.

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

## Browsersync

When you run `npm run start`, along with the hot reloading localhost link at `http://localhost:3000`, you'll see a link to `http://localhost:3001`, which opens browsersync's UI for device syncing, remote debugging, and more (see [browsersync docs](https://browsersync.io/docs/options#option-ui ':target=_blank')).