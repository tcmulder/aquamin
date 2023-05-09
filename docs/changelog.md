---
title: Changelog
permalink: /changelog/
layout: default
nav_order: 99
has_children: false
# parent: Page Title
search_exclude: true
---

# Changelog

## 4.3.0 - May 8 2023
* Added custom embed scripts option page under Settings > Custom Scripts.
* Change wp cli `wp aquamin block` command to be `wp aquamin create block` so it makes more sense.
* Added new wp cli `wp aquamin create component` command to create basic components.
* Added new EntitySelector block UI component (useful for associating posts, terms, etc. to a block).
* Added new/improved npm clean and static asset copying.
* Removed --c-alpha:1 feature; in the future, we can use built in CSS color functions.
* Simplified color variables, and go with 7 for bright rather than 8 for more flexibility, e.g. can have extra dark variant.
* Added smarter --sp spacing variables.
* Added password protected pattern and remove older year block pattern from wp cli `wp aquamin setup` command.
* Fixed bug with missing block category.
* Overhauled layouts to match back-end more closely.

## 4.2.0 - March 16 2023
* Added ability to prefix common files, e.g. footer-style.css rather than just style.css (makes debugging easier).
* Added static components/assets folder that copies into the dist directory on build.
* Applied minor CSS custom property adjustments.
* Fixed error caused by cache breaker before first build.
* Fixed base font size issue and start with default H1-H6 sizes.

## 4.1.1 - February 8 2023
* Refined cli templates.
* Fixed syntax for <Media /> properties.
* Updated theme.json layouts.
* Correct .alignfull rendering within editor.
* Fix excerpt template part.>

## 4.1.0 - December 13 2022
* Refactored components structure.
* Refactored (simplified) block templates for cli.
* Fixed enqueue cache buster potential issues.
* Adjusted alignment styling to use new WP 6.1.1 features.
* Added built in support for home.php blogroll via archive.php.

## 4.0.1 - November 22 2022
* Fix `wp aquamin setup` import path issue.
* Fix docs internal linking paths.

## 4.0.0 - October 28 2022
* Added docs.
* Added auto cache break for assets.
* Added new footer system.
* Added wp cli commands `block` and `setup`.

## 3.1.1 - October 26 2022
* Add .env.example.
* Streamline cli logs.

## 3.1.0 - October 24 2022
* Overhual <Media /> component.

## 3.0.4 - October 19 2022
* Add handling of ui component css.
* Fix imports.
* Remove old eslint comments.

## 3.0.3 - October 14 2022
* Add usage examples to Media component.
* Add support for <Media /> HTML attribute customizations.

## 3.0.2 - October 11 2022
* Overhaul alignment layout strategy.
* Move demo content exports.

## 3.0.1 - October 3 2022
* Add .env support to make package.json more universal.
* Add example block exports.
* Start with inline paragraph block (used often for copyrights).
* Enhance Media component.

## 3.0.0 - August 08 2022
* Rewrite to support Gutenberg by default.
* Includes Parcel 2 as build tool.

## 2.0.2 - April 25 2022
* Replace cached of aquamin_id() since some hosts object cache the incorrect ID.

## 2.0.1 - December 23 2021
* Default to adding height/width to aquamin_img() (disable by setting disable_size to true).
* Set aquamin_img() to use full image size if not using srcset (e.g. for animaged gif images).
* Fixed element title fatal error.
* Added built-in support for password protection.
* Allow ACF to replace the_content for specific post ID.
* Add advanced centering to single narrow columns.

## 2.0.0 - October 14 2021
* Modify to support new build tool (modified wp-strap webpack).

## 1.2.4 - October 5 2021
* Add option to show disabled pagination next/prev links.

## 1.2.3 - February 16 2021
* Fix function name for aquamin_inner_images.
* Add admin-aquamarine.css file for primary admin theme.

## 1.2.2 - January 14 2021
* Replaced if_the etc. with more generic if_printf/if_sprintf version.

## 1.2.1 - October 7 2020
* Set default ID for aquamin_img function.

## 1.2.0 - October 7 2020
* Added aquaadmin-specific UI styling.
* Updated styles directory (was sass) with common variables/mixins/etc.
* Added common modules (can delete if unneeded). Requires fly dynamic image resizer plugin.
* Added demo content for import.

## 1.1.0 - October 2 2020
* Added ACF fields to the_content on save.
* Added common ACF helper functions.
* Added if_the, if_get_field, etc. sprintf function logic.
* Added aquamin class generating functions.
* Added common disambiguation function.
* Added media functions (aquamin_bg, aquamin_img, aquamin_vid).

## 1.0.1 - August 29 2019
* Added cache break number to enqueue.
* Added theme attribution to admin footer.

## 1.0.0 - April 1 2019
* Initial release.
