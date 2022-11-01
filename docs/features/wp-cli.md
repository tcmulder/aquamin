---
title: WP-CLI
permalink: /features/wp-cli/
layout: default
# nav_order: 2
# has_children: true
parent: Features
---

# Custom Block Generator

# Theme Setup
 
 You can run `wp aquamin setup` after you've activated the aquamin theme. This installs a custom Patterns plugin that showcases aquamin's pre-installed blocks and core block customizations for testing.
 
 You can use the Patterns plugin for creating and testing your own blocks, too—I find it really convenient. If you configure blocks to work on another aquamin site and want to transfer them to a new site, you can just paste the block's folder into `blocks/block-library` include the block's Pattern XML export (e.g. `wp export --post__in=123`) in the `_demo-content` directory before running `wp aquamin setup` and your plugin will be imported as well.
 