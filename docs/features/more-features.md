# More Aquamin Features
                        
Aquamin adds a few miscellaneous features to make development and content management easier.

## Documentation

In addition to reviewing the most up-to-date docs at `https://aquamin.thinkaquamarine.com`, you can also run `npm run docs` to open docs for the specific version of aquamin you are using (or peruse the markdown files within the `aquamin/docs` directory).

## Browsersync

When you run `npm run start`, along with the hot reloading localhost link at `http://localhost:3000`, you'll see a link to `http://localhost:3001`, which opens browsersync's UI for device syncing, remote debugging, and more (see [browsersync docs](https://browsersync.io/docs/options#option-ui ':target=_blank')).

## The `aquamin_get_post_content()` Function

You can use the `aquamin_get_post_content()` function to add features like footers, menus, sidebars, etc. to your posts. For instance, if you run the `wp aquamin setup` command, you'll have a pattern under _Appearance > Patterns > Footer_ that aquamin loads into your footer, allowing you to use the block editor to edit your footer's content.

?> Once WordPress's Full Site Editor has sufficiently matured, much of this functionality will likely be handled through that system rather than by these customizations to aquamin.

### Example: Sidebar Blocks

You can also add your own. In the following example, we'd create a pattern under _Appearance > Patterns_ called "My Sidebar," and configure it to show whatever blocks we'd like. Then, we'd grab the content from that post and display it in your theme, passing in the `WP_Query` arguments like so:

```php
echo aquamin_get_post_content( array( 'name' => 'my-sidebar' ) );

```

### Example: Using Another Page's Content

The default query parameters are `array( 'post_type' => 'wp_block', 'posts_per_page' => 1, 'fields' => 'ids' )`, but you can override these, e.g.:

```php
$page_id_123_content = aquamin_get_post_content( array(
	'p' => '124',
	'post_type' => 'page',
) );
echo $page_id_123_content ? $page_id_123_content : __( 'No content for post id 123', 'aquamin );

```

### Example: Pre-Populating Posts

You can easily pre-populate the block content of your posts with the `aquamin_get_post_content()` function. By adding the following to `functions.php`, a non-synced block pattern called "Default Portfolio Content" dictates the starting blocks for any new posts in the "Portfolio" custom post type:

```php
add_filter( 'default_content', 'aquamin_default_portfolio_content' );
function aquamin_default_portfolio_content( $content ) {
    global $post_type;
	if ( $post_type === 'portfolio' ) {
		$new_content = aquamin_get_post_content( array(
			'name' => 'default-portfolio-content',
		) );
		if ( $new_content ) {
			$content = $new_content;
		}

	}
    return $content;
}
```
