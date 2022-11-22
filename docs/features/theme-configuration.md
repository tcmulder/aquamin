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

## JavaScript
Front-end scripts go within the `src/js/` directory. By default, one folder, `aquamin/src/js/theme/theme.bundle.js`, is enqueued in `aquamin/includes/enqueue.php` for your theme-wide scripts.

But, any JavaScript files titled like `*.bundle.js` will be treated as separate entry points, and will therefore generate separate files within the `aquamin/dist/` directory. So, if you'd like to break your front-end scripts up, you can duplicate the `aquamin/src/js/theme/` directory and rename it's bundle.js and directory name appropriately.

## Styles

The `aquamin/src/css` directory contains the theme's styling, including a `styles.css` file that imports the files in the proper cascade. It's composed of several folders:

1. `aquamin/src/css/global`<br> High level stuff goes here, like custom properites, @keyframes, etc.
2. `aquamin/src/css/base`<br> Universal styling affecting nearly every page goes here, like normalize, global text styling, global classes, plugin styling, etc.
3. `aquamin/src/css/components`<br> You'll likely use this folder most. Styling that affects the individual pieces on the site goes here, like sliders, contact forms, logos, etc.
4. `aquamin/src/css/layout`<br> Styling that affects major layout elements goes here, like header and footer, navigation, sidebars, etc.

   
### Font and Image Assets

You can add fonts to the `aquamin/src/fonts/` folder, then add the @font-face definitions in the `aquamin/src/global/fonts.css` file. You can add images you'll be using in your CSS files within the `aquamin/src/images/` directory.

## PHP

Aquamin comes with a pretty minimal number of standard WordPress theme files (header.php, page.php, etc.). It also comes with a `aquamin/template-parts/` directory for your `get_template_part()` calls. There are several common template parts already set up you can edit or discard.

### Functions in functions.php

Most functions you'd like to add to your theme can simply go directly in the `aquamin/functions.php` file. If you would prefer to break this file up, you can follow the examples at the top of the `functions.php` file itself and add those to the `aquamin/includes/` directory.
