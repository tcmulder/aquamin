---
title: WP-CLI Commands
permalink: /features/wp-cli/
layout: default
nav_order: 3
# has_children: true
parent: Features
---


# WP-CLI Commands

Aquamin has some [WP-CLI](https://developer.wordpress.org/cli/commands/){: target="_blank"} commands built in to make common development tasks easy.

# `wp aquamin create block`

This command scaffolds a new block for you, walking you through a series of prompts to name your block and generate its files. You'll end up with a new directory within `aquamin/blocks/block-library/` that contains all your block files, ready for you to customize (learn more about [blocks in aquamin](/aquamin/features/block-configuration/)).

# `wp aquamin create component`

This command scaffolds a new component for you, letting you name the component and choose what files it should include. You'll end up with a new directory within `aquamin/components/component-library/` that contains all your component files, properly enqueued and ready to use. Note you'll conveniently find the get_template_part() call (including the appropriate file path) in the comment above the markup.php file, if you chose to include PHP.

# `wp aquamin setup`
 
This setup command does several things:

1. It sets up a helpful pattern library plugin. You can build your custom blocks as patterns here in order to test common use cases (e.g. showing multiple block options all in one place for testing, or adding your block over multiple background colors to test aesthetics and readability). This pattern library is only available to users logged into WordPress.
   1. It imports content featuring aquamin's core block customizations, animations, and small suite of pre-installed blocks for you to preview.
   2. It features a style guide for you to test styling of all the common HTML elements in one place.
   3. It features a playground to experiment with custom blocks somewhere site visitors can't accidentally stumble across. 
2. It imports basic footer content for you to customize under _Appearance > Global Content > Footer_. Aquamin displays this content via the `footer.php` template automatically. (Eventually this may move to the full site editor, but currently this is the best way to bring the block editor into the footer.)

> _Note:_ The pattern library is designed for you to use for developing your own blocks, too. If on future sites you would like to pre-install some of your own aquamin-compatible blocks, simply add that block's directory into `aquamin/blocks/block-library/` and then include the block's pattern [WXR file](https://developer.wordpress.org/cli/commands/export/){: target="_blank"} (e.g. `wp export --post__in=123`) in the `aquamin/includes/cli/demo-content/` directory before running `wp aquamin setup`, and your block will be imported alongside aquamin's small suite of standard blocks.
