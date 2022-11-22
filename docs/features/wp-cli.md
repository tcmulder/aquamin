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

# `wp aquamin block`

This command sets up a new block matching aquamin's standard block pattern, walking you through a series of prompts to name your custom block and generate its files. You can run `wp aquamin block --help` for a full list of options. Learn more about [blocks in aquamin](/features/block-configuration/).

# `wp aquamin setup`
 
The setup command does several things:

1. It imports basic footer content for you to customize under _Appearance > Footer > Footer_. Aquamin displays this content via the `footer.php` template automatically. (Eventually this may move to the full site editor, but currently this is the best way to bring the block editor into the footer.)
2. It sets up a helpful pattern library plugin. You can build all your custom blocks as patterns here in order to test common use cases (e.g. showing multiple block options all in one place for testing, or adding your block over multiple background colors to test aesthetics and readability).
   1. It imports content featuring aquamin's core block customizations, animations, and pre-installed blocks for you to preview.
   2. It features a style guide for you to test styling of all the common HTML elements in one place.
   3. It features a playground to experiment with custom blocks somewhere site visitors can't accidentally stumble across. 

> _Note:_ You can use the pattern library for working on your own custom blocks, too. If you would like `wp aquamin setup` to pre-install some of your own aquamin-compatible blocks, simply copy that block's directory into `aquamin/blocks/block-library/` and then include the block's pattern [WXR file](https://developer.wordpress.org/cli/commands/export/){: target="_blank"} (e.g. `wp export --post__in=123`) in the `aquamin/includes/cli/demo-content/` directory before running `wp aquamin setup`, and your block will be imported alongside aquamin's small suite of standard blocks.
