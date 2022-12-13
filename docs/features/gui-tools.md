---
title: GUI Tools
permalink: /features/gui-tools/
layout: default
nav_order: 5
# has_children: true
parent: Features
---


# GUI Tools
{: .no_toc }

Aquamin adds a few useful tools within the WordPress back-end interface.

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

## Block Patterns

The Block Patterns link in the sidebar allows you to define what [patterns](https://learn.wordpress.org/lesson-plan/how-to-use-wordpress-block-patterns/){: target="_blank"} appear within the block editor. By adding them here rather than via coded PHP files, it's a little easier as a developer to put patterns together, but even more importantly it's *way* easier for your clients to modify existing or add new patterns after you've passed the site off to them.

Make sure to define the Pattern Category whenever you add a new pattern to organize your patterns in a meaningful way within the block editor.

### Pre-Populating Posts
{: .no_toc }

If you want, you can easily pre-populate the content of your posts with a pattern you create under Block Patterns. In the following example, any new posts of the Portfolio custom post type will use the pattern called My Portfolio Pattern, so the client automatically starts off each such post with whatever blocks you've defined.

```php
add_filter( 'default_content', 'aquamin_default_case_content' );
function aquamin_default_case_content( $content ) {
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

The Reusable Blocks link in the sidebar allows you to see all [reusable blocks](https://learn.wordpress.org/lesson-plan/reusable-blocks/){: target="_blank"} you've defined on your site. So, if you want to change a reusable block globally, rather than needing to track down an example of that block somewhere on the site and update it there to apply it to all pages, you can more quickly find it within Reusable Blocks and simply edit it there.

## Appearance > Global Content

The Global Content link under Appearance in the sidebar lets you use the block editor for nonstandard features like footers, menus, sidebars, etc. It's much like the old Widgets area of WordPress, but works much better (aquamin originally employed block widgets, but abandoned them due to multiple bugs, quirks, and inconveniences in the core widget implementation at the time). If you run the `wp aquamin setup` command, you'll already have a Footer global content post added here, and any blocks you add to it will appear within the footer.

You can also add your own. For the following example, we'd create a My Sidebar global content post, which we can then easily populate with whatever blocks we'd like (and the client can easily modify that content later):

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

Within aquamarine, you can see an example of this code under `aquamin/components/component-library/footer/morkup.php`;

> _Note:_ Once WordPress's Full Site Editor has sufficiently matured, most of this functionality will likely be handled by that system, and the Global Content feature in aquamin will be deprecated at that time. For now though, it's very convenient, especially for clients wanting to edit content utilizing the full potential of blocks.