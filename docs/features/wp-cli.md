---
title: WP-CLI
permalink: /features/wp-cli/
layout: default
# nav_order: 2
# has_children: true
parent: Features
---

# Custom Block Generator

# Setup
 
After activating the aquamin theme for the first time, you can run:

```
wp aquamin setup
```

This does several things:

1. Imports basic footer content for you to customize under _Appearance > Footer > Footer_ (aquamin displays this content via the `footer.php` template). Note that eventually this may move to the full site editor, but currently this is the best way to bring the block editor into the footer.
2. Sets up a helpful pattern library plugin featuring aquamin's core block customizations and pre-installed blocks. The plugin also features a style guide for you to test styling of all the common HTML elements in one place, and a playground to experiment with custom blocks somewhere site visitors can't accidentally stumble across.

## Adding Your Custom Blocks to Setup
 
 You can use the pattern library plugin for creating and testing your own blocks, too. If you would like to import blocks you built for other sites using the aquamin theme into the pattern library, simply copy that block's folder into `blocks/block-library` and then include the block's pattern XML export (e.g. `wp export --post__in=7 --post_type='all-the-things'`) in the `includes/cli/demo-content/` directory before running `wp aquamin setup`, and your block will be imported, too.
