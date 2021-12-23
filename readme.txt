=== Aquamin ===

Contributors: @thinkaquamarine
Tags: starter, clean, basic, semantic

Requires at least: 4.5
Tested up to: 5.1.1
Stable tag: 2.0.1
License: GPLv2 or later
License URI: https://www.gnu.org/licenses/gpl-2.0.html

A minimal starting point for custom theme development.

== Description ==

A minimal starting point for custom theme development. Starts with a white page with blue links that turn purple when you click 'em so you can add your own code rather than wrestling with a bunch of pre-fab stuff.

== Installation ==

1. In your admin panel, go to Appearance > Themes and click the Add New button.
2. Click Upload Theme and Choose File, then select the theme's .zip file. Click Install Now.
3. Click Activate to use your new theme right away.

== Frequently Asked Questions ==

= Does this theme require any plugins? =

Advanced Custom Fields Pro is highly recommended. If you're not going to use it though, you can delete the functions.php line requiring the inc/acf.php file, the inc/acf.php file itself, and the acf-json directory.

== Changelog ==

= 2.0.1 - December 23 2021 =
* Default to adding height/width to aquamin_img() (disable by setting disable_size to true).
* Set aquamin_img() to use full image size if not using srcset (e.g. for animaged gif images).
* Fixed element title fatal error.
* Added built-in support for password protection.
* Allow ACF to replace the_content for specific post ID.
= 2.0.0 - October 14 2021 =
* Modify to support new build tool (modified wp-strap webpack).
= 1.2.4 - October 5 2021 =
* Add option to show disabled pagination next/prev links.
= 1.2.3 - February 16 2021 =
* Fix function name for aquamin_inner_images.
* Add admin-aquamarine.css file for primary admin theme.
= 1.2.2 - January 14 2021 =
* Replaced if_the etc. with more generic if_printf/if_sprintf version.
= 1.2.1 - October 7 2020 =
* Set default ID for aquamin_img function.
= 1.2.0 - October 7 2020 =
* Added aquaadmin-specific UI styling.
* Updated styles directory (was sass) with common variables/mixins/etc.
* Added common modules (can delete if unneeded). Requires fly dynamic image resizer plugin.
* Added demo content for import.
= 1.1.0 - October 2 2020 =
* Added ACF fields to the_content on save.
* Added common ACF helper functions.
* Added if_the, if_get_field, etc. sprintf function logic.
* Added aquamin class generating functions.
* Added common disambiguation function.
* Added media functions (aquamin_bg, aquamin_img, aquamin_vid).
= 1.0.1 - August 29 2019 =
* Added cache break number to enqueue.
* Added theme attribution to admin footer.
= 1.0.0 - April 1 2019 =
* Initial release.

== Credits ==

* Based on Underscores https://underscores.me/, (C) 2012-2017 Automattic, Inc., [GPLv2 or later](https://www.gnu.org/licenses/gpl-2.0.html)
* Uses modified version of normalize.css https://necolas.github.io/normalize.css/, (C) 2012-2016 Nicolas Gallagher and Jonathan Neal, [MIT](https://opensource.org/licenses/MIT)
