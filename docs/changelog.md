---
title: Changelog
permalink: /changelog/
layout: default
nav_order: 3
has_children: false
# parent: Page Title
---

# Changelog

## 4.0.0 - October 28 2022
* Added docs.
* Break cache automatically for assets.
* Add new footer system.

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