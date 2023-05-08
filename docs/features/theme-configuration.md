---
title: Theme Configuration
permalink: /features/theme-configuration/
layout: default
nav_order: 2
# has_children: true
parent: Features
---

# Theme Configuration
{: .no_toc }

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## Aquamin's Component Philosophy
All sites are built out of a collection of components, and aquamin capitalizes on this by making it _really_ easy to work with components.

Much like blocks, each component is it's own self-contained directory (with a few global exceptions) where you'll handle all development for that particular piece of the site (it may help to read [aquamin's block philosophy](/aquamin/features/block-configuration/#aquamins-block-philosophy) for more on that).

## Creating Components

The easiest way to create components is to run `wp aquamin create component` ([see the docs](/aquamin/features/wp-cli/#wp-aquamin-create-component)). If you have parcel running, just refresh WordPress and the scaffolded component will immediately be available, ready for you to customize within its own directory in `aquamin/components/component-library/`. If you had the command scaffold your PHP, you'll conveniently find the get_template_part() call (including the appropriate file path) in the comment above the markup.php file in that directory.

Or, since there's a lot more variety to components than blocks, you may choose to add these manually for more control: just add a new directory and appropriate files to the `aquamin/components/component-library/` folder. The main thing to keep in mind is that aquamin automatically includes all `style.css` styling on the front-end, all `editor.css` styling in the block editor's back-end, all `script.js` JavaScript on the front-end, and your HTML/PHP should go in `markup.php` files (you'll need to manually include them with `get_template_part()` where they're needed). Just name the files within your components accordingly. Note you can also add a prefix to these files, like `main-menu-script.js` for example, to make debugging more convenient.

## Examples

A good example component is the `aquamin/components/component-library/menu` component, which is where you'll build the site's navigation.

```
📂 components
 ┗ 📂 component-library
   ┗ 📂 menu          // the component's unique name
     ┣ 📄 menu-markup.php  // html for the component (this one is included from header.php) 
     ┣ 📄 menu-script.js   // javascript for activating the mobile navigation, etc.
     ┗ 📄 menu-style.css   // styling for the navigation
```
{: .short-line-height }

Notice that within the normal WordPress `header.php` template, we use `get_template_part()` to grab the `menu-markup.php` file shown here: that lets us have all files associated with the navigation component within this single component directory.

For convenience, you can also include features here that don't quite fit the "component" concept in a traditional sense. Take WordPress styling overrides for instance:

```
📂 components
 ┗ 📂 component-library
   ┗ 📂 wp-overrides  // the "component's" unique name
     ┣ 📄 wp-editor.css  // wp styling overrides within the block editor
     ┗ 📄 wp-style.css   // wp styling overrides for front-end
```
{: .short-line-height }

Here, we add some styling to the front-end (`wp-style.css`) and block editor (`wp-editor.css`).

## Directory Structure

Here's how aquamin is set up to start—then, you'll edit these files and add your own component directories as you're bulding the site.

```
📂 components
 ┣ 📂 normalize             // global styling for common html elements you'll customize
 ┣ 📂 util                  // js utility functions (used across multiple components)
 ┣ 📄 theme.bundle.js       // theme entry file (mostly imports other files)
 ┣ 📄 theme.css             // theme style entry file (coordinates css cascade)
 ┗ 📂 component-library     // all your component files should be within this folder
   ┣ 📂 content             // component: content for posts
   ┣ 📂 excerpt             // component: standard blog excerpts
   ┣ 📂 footer              // component: the site's footer
   ┣ 📂 menu                // component: the site's main navigation
   ┣ 📂 wp-overrides        // wordpress styling overrides
   📂 global                // global styling that exists across all components
   ┣ 📄 alignment.css       // block alignment customizations
   ┣ 📄 animations.css      // reusable multi-component keyframe animations (blank initially)
   ┣ 📄 common-classes.css  // common styling classes used across components
   ┣ 📄 fonts.css           // custom font imports
   ┣ 📂 fonts               // custom font files
   ┣ 📄 style.css           // main entry file (coordinates global styling cascade)
   ┗ 📄 variables.css       // css custom properties
```
{: .short-line-height }

## Assets

### Font Assets
{: .no_toc }

You can add fonts to the `aquamin/components/global/fonts/` folder, then add the `@font-face definitions` in the `aquamin/components/global/fonts.css` file. Or, you can directly enqueue any fonts from CDN, like Google Fonts, within the `aquamin/includes/enqueue.php` file. Parcel will take care of hashing and including these assets in the `/aquamin/dist/` directory for you.

### Image Assets
{: .no_toc }

If a component requires images, you should create an `aquamin/components/component-library/some-component-name/images` directory and include them there—that way, each component's directory houses its own images. If you have images that are used by multiple components, you can also create an `aquamin/components/images` directory for them. Parcel will take care of hashing and including these assets in the `/aquamin/dist/` directory for you.

### SVG
{: .no_toc }

Usually, Parcel will import all images as a simple path, including SVGs. If you would instead like to import your SVG images inline, you can name them like `*.inline.svg`, and Parcel will handle the inlining for you. For example, you'll notice each block has an `icon.inline.svg` image file is already set up in this manner for block icons (feel free to update these with your own custom icons!).

### Static Assets
{: .no_toc }

You may want to include static assets in the `/aquamin/dist/` directory, like I often do for a `theme.sprite.svg` file that contains reusable logos, social icons, etc. You can add these files within the `/aquamin/components/assets/` directory, and any time you run `npm run build` they will be copied into `/aquamin/dist/components/assets/`. Note that `npm run start` ignores changes to these files, so you will need to rerun the build if you make changes.