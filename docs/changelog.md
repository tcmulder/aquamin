# Changelog

## 6.1.2 - December 7 2023
* Remove custom block patterns feature (this is now supported by core WordPress).
* Move synced pattern to Appearance > Synced Patterns to clean up the sidebar.
* Fix delegated animations issue that caused them to apply even with no animation options chosen.
* Prefix wp cli files to make them easier to identify as cli scripts.
* Fix Grid block preventing anything but paragraph blocks being entered.
* Fix bug with block template's inner block's use of useInnerBlockProps.

## 6.1.1 - October 5 2023
* Fix global padding and block gap position in theme.json so they apply properly.
* Reverted editor styling approach from 6.0.0 to again use add_editor_style() (otherwise classes aren't scoped by .editor-styles-wrapper and wreak havoc on the outer block editor interface). Note that it appears a PR is in the works to fix this issue.

## 6.1.0 - October 2 2023
* Added variable font and spacing sizes using CSS's `clamp`.
* Revamped CSS custom property names and added more documentation on each.

## 6.0.2 - September 25 2023
* Fix scroll-based animations erroneously going above 1 or below 0 (i.e. negative).
* Add scroll-based animation option to base duration on window height.
* Switch templates to use useInnerBlocksProps rather than `<InnerBlocks>` for better editor HTML structure.
* Replaced `<LimitedAppender>` UI component with new `limitAppender()` function (matches core WordPress styling better).

## 6.0.1 - August 17 2023
* Minor updates to docs link and instructions in main readme file.

## 6.0.0 - August 17 2023
* Overhauled directory structure: now most things are in `assets`.
* Upgrade `block.json` files to use `"apiVersion": 3` by default.
* Fixed issue where child animations inherited their parent animations.
* Added flexible grid block.
* Overhauled enqueue system to support modern CSS in editor (pending resolution of an add_editor_style() parsing issue).
* Renamed some script files in `includes` for clarity and consolidation.
* Created script to sync browsersync CSS injection in the block editor to the block editor iframe.

## 5.1.0 - July 10 2023
* Updated and reduced number of packages.
* Refined alignment/layout styling.
* Moved extended blocks to their own `block-edits` directory.
* Added responsive hide/show block edit functionality.
* Split .ani animation files into separate files.
* Removed common-classes.css as it's redundant (use reusable-global.css instead).
* Reversed cli commands for robustness and clarity (e.g. `wp aquamin bock create`).
* Rewrote and overhauled documentation using docsify (eliminates ruby dependency). Just run `npm run docs` to view them.

## 5.0.0 - May 17 2023
* Set block assets to appear on front-end only on pages where they're used.
* Update wp cli to support some boolean options.

## 4.3.0 - May 12 2023
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
* Fix linting and add as build step.

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
* Overhaul <Media /> component.

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
* Set aquamin_img() to use full image size if not using srcset (e.g. for animated gif images).
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
