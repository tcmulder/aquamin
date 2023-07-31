---
title: CSS Styling
permalink: /features/css-styling/
layout: default
nav_order: 4
# has_children: true
parent: Features
---


# CSS Styling
{: .no_toc }

The `variables.css` file provides a number of useful custom properties to use in your theme development, and you'll want to customize their values to match your site's design.

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}


## Fonts

Aquamin employs the font settings within the `text-level-semantics.css` file and elsewhere.

- `--fs` establishes the base font size for the entire site (the default is 16px as usual).
- `--fs-<name>` defines the sizes of various text elements, like H1-H6 headings. They're converted from pixels to ems by default, but you can replace these as needed
- `--ff-<number>` defines the site's font families (you can add more if you need to).

## Layout

- `--sp-<size>` is useful for consistent margins and padding throughout your theme.
- `--w-<size>` defines standard widths. Additionally, within `theme.json`,`--w-default` defines the standard content width and `--w-wide` defines the wide width for the block editor.
- `--h-<name>` defines common heights. For instance, if your site has a sticky navigation bar, `--h-menu` is useful to define the main navigation height, as well as some padding at the top of all pages to nudge things below that navigation.
- `--gutter` defines the space to either side of the main column of content for the entire site. WordPress's `--root--padding-<right/left>` variables are set to this value in the `wp-overrides.css` for convenience.

## Animations
- `--ani-ease` defines the primary easing function used throughout the site.
- `--ani-speed` defines the primary duration of animations throughout the site.

## Colors

Aquamin takes a powerful but flexible approach to colors. The overall naming format is as follows:

```
--<color>-<variant 1/2/3/etc>-<brightness 000(darkest)-900(lightest)>
```

So, for instance, `--c-1-800` would be a light primary color, `--c-1-500` would be a normal/mid primary color, and `--c-1-200` would be a dark primary color. Additionally, `--c-0-000` is black and `--c-0-900` is white (while other `--c-0-<number>` colors are various values of gray).

You'll notice `:root` defines `--c-raw-<variant>-<brightness>` in HSL format (you could use RGB if you prefer), and then `*` sets the actual `--c-<variant>-<brightness>` color values, plus a `--c-alpha` value; this is very powerful, as it allows you do the following:

```css
:root {
	--c-raw-0-000: 0, 0%, 0%; /* start with black hsl (or rgb) values only */
}
* {
	--c-alpha: 1; /* default alpha is 100% */
	--c-0-000: hsla(var(--c-raw-0-000), var(--c-alpha); /* default is solid black */
}
.thing {
	--c-alpha: 0.5; /* we choose a different opacity for this element */
	background-color: var(--c-0-000); /* we get a 50% transparent black color */
}
.thing p {
	color: var(--c-0-000); /* we're back to solid black */
}
```
{: .short-line-height }

Lastly for colors, within the `libs.php` file, aquamin loops through all theme colors (set in the `theme.json` file) and outputs a `--c-bg` for each. This gives you access within CSS to the current background color. For instance, it let's you do things like:

```css
.thing {
	border: 1px solid var(--c-bg);
}
```
{: .short-line-height }

So, for `.thing.has-0-000-background-color` you'll get a black border, and for `.thing.has-0-900-background-color` you'll get a white border, matching their respective backgrounds. It's often quite useful, especially for child or pseudo elements within colored background sections.

## Media Queries

At the end of the `variables.css` file, you can add media queries that reset values at specific breakpoints. For instance, it's pretty common to have a huge H1 heading size at desktop that needs to be much smaller at mobile, and you'd redefine the `--fs-h1` variable's value here to do that. Other common variables to reset at different screen sizes are things like `--sp`, `--gutter`, `--h-menu`, etc., under the Layout section.