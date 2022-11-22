---
title: Theme Configuration
permalink: /features/theme-configuration/
layout: default
nav_order: 1
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

## PHP

Aquamin comes with a pretty minimal number of standard WordPress theme files (header.php, footer.php, page.php, etc.). It also comes with a `aquamin/template-parts/` directory for your `get_template_part()` calls. There are several common template parts already set up you can edit or discard as needed.

### Functions in functions.php
{: .no_toc }

Most functions you'd like to add to your theme can simply go directly in the `aquamin/functions.php` file. If you would prefer to break this file up, you can follow the examples at the top of the `functions.php` file itself, adding those additional files to the `aquamin/includes/` directory.


## JavaScript
Front-end scripts go within the `src/js/` directory. By default, the `aquamin/src/js/theme/theme.bundle.js` script is enqueued in `aquamin/includes/enqueue.php` for your theme-wide scripts.

But, any JavaScript files titled like `*.bundle.js` will be treated as separate entry points, and will therefore generate separate files within the `aquamin/dist/` directory. So, if you'd like to break your front-end scripts up, you can duplicate the `aquamin/src/js/theme/` directory and rename it's bundle.js and directory name appropriately.

```
📂 src
 ┗ 📂 js
   ┣ 📂 theme                // site-wide scripts
   ┃ ┣ 📄 theme.bundle.js    // main entrypoint: import all your site-wide scripts here
   ┃ ┗ 📄 main-menu.js       // menu functionality example
   ┣ 📂 another-example      // example additional script (you'll need to enqueue it)
   ┃ ┣ 📄 example.bundle.js  // entrypoint for the examples that follow
   ┃ ┣ 📄 example-1.js       // example functionality
   ┃ ┗ 📄 example-2.js       // additional example functionality
   ┗ 📂 block-editor         // don't touch these: used by aquamin for block configuration
```
{: .short-line-height }

Aquamin supports simple import [glob patterns](https://parceljs.org/features/dependency-resolution/#glob-specifiers){: target="_blank"} as well.

## CSS

The `aquamin/src/css/` directory contains the theme's styling, including a `styles.css` file that imports the files in the proper cascade. It's composed of several folders:

```
📂 src
 ┗ 📂 css
   ┣ 📂 global		// high level stuff like variables, @font-face, @keyframes, etc.
   ┣ 📂 base		// universal styling affecting nearly every page.
   ┃ ┣ 📂 external	// overrides for WordPress defaults, plugins, extensions, etc.
   ┃ ┣ 📂 normalize	// base HTML styling starting point you'll customize.
   ┣ 📂 components	// styling for individual pieces of the site (most files go here).
   ┣ 📂 layout		// styling for major layout elements like header, footer, menus, etc.
   ┗ 📄 styles.css	// main entrypoint that coordinates the cascade.
```
{: .short-line-height }

Aquamin uses PostCSS to provide support for [nesting](https://parceljs.org/languages/css/#nesting){: target="_blank"}, and supports simple [glob patterns](https://parceljs.org/features/dependency-resolution/#glob-specifiers){: target="_blank"}.

   
### Font and Image Assets
{: .no_toc }

You can add fonts to the `aquamin/src/fonts/` folder, then add the @font-face definitions in the `aquamin/src/global/fonts.css` file. You can add images you'll be using in your CSS files within the `aquamin/src/images/` directory. Parcel will take care of hashing and including these assets in the `/aquamin/dist/` directory for you.

### SVGs
{: .no_toc }

If you would like to import your SVG images inline, you can name them like `*.inline.svg` and Parcel will handle the inlining for you. You'll notice the `aquamin/blocks/icons/general.inline.svg` image is already set up in this manner for block icons (feel free to update this with your own custom icon!).