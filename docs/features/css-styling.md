# CSS Styling

The `aquamin/assets/global/variables.css` file provides a number of useful custom properties you can update to match your theme's needs. Many of them control corresponding features in the `theme.json` configuration file, so there's one source of truth for these attributes: just make your edits in this CSS file, and Gutenberg will pick up on their values automatically.

|  Key:         | Usage                      | Format                             | Example
|  -            | -                          | -                                  | -
|  `--ani`      | [Animation](#animation)    | --\<animation>-\<property>         | `--ani-speed` (duration/delay speed)
|  `--c`        | [Color](#color)            | --\<color>-\<variant>-\<brightness>| `--c-1-2` (color one, darkish)
|  `--c-bg`     | [Background](#background)  | --\<color>-\<background>           | `--c-bg` (current background color)
|  `--ff`       | [Font Family](#font-family)| --\<font-family>-\<variant>        | `--ff-2` (2nd font family for headings)
|  `--flh`      | [Line Height](#line-height)| --\<font-line-height>-\<variant>   | `--flh-m` (medium line height)
|  `--fs`       | [Font Size](#font-size)    | --\<font-size>-\<element>          | `--fs-h1` (font size for \<h1>'s)
|  `--h`        | [Heights](#heights)        | --\<height>-\<feature>             | `--h-menu` (menu's height in em)
|  `--sp`       | [Spacing](#spacing)        | --\<space>-\<size>-\<unit>         | `--sp-m-rem` (medium rem spacing)
|  `--w`        | [Width](#width)          | --\<width>-\<size>                 | `--w-m` (medium width in px)


## Animation
Use these to set site-wide default transition and animation properties. `--ani-ease` defines the default easing function, and `--ani-speed` defines the primary duration/delay for animations throughout the site.

## Background
Aquamin also adds easy-to-use background color custom properties. Within the `libs.php` file, aquamin loops through all theme colors (set in the `theme.json` file) and outputs a `--c-bg` for each. This gives you access within CSS to the current background color, like `currentColor` but for background colors rather than text. For instance, it let's you do things like:

```css
.button {
	color: var(--c-bg);
	background: currentColor;
}
```

So, for `.thing.has-black-background-color.has-white-color .button` (i.e. a button in a block with a black background and white text), you'd get a high-contrast white button with black text, and for `.thing.has-white-background-color.has-black-color .button` you'd get the inverse. It's often quite useful.

## Color
Aquamin takes a powerful but flexible approach to colors. The overall naming format is `--<color>-<variant 1/2/3/etc>-<brightness 0(darkest)-9(lightest)>`.

So, for instance, `--c-1-7` would be a light primary color, `--c-1-5` would be a normal/mid primary color, and `--c-1-2` would be a dark primary color. Additionally, `--c-0-0` is black and `--c-0-9` is white (while other `--c-0-<number>` colors are various values of gray).

?> To modify opacity, you can use color-mix(); for example, to set a background to a light secondary color at 0.5 opacity, use `background: color-mix(in hsl, var(--c-2-7) 50%, transparent)`.

## Line Height
`--flh-m` sets the base line height for the site, and `--flh-s` by default sets line height a little smaller for headings (since they're often big, causing line height to consume much more space).

## Font Family
`--ff-<variant>` defines the site's font families. So for example, `--ff-1` could be your body font, `--ff-2` a different header font, and you could add `--ff-3` to style buttons in a 3rd font.

## Font Size
`--fs` establishes the base font size for the entire site, and you can bump that down at various breakpoints at the bottom of `aquamin/assets/global/variables.css` to shrink things globally at mobile (anything using `em` or `rem` units).

`--fs-<element>` defines the sizes of various text elements, like H1-H6 headings. By default, aquamin uses `clamp` for responsive font sizing. Imagine you set H3's to:

```css
--fs-h3: clamp(
	30px, /* min in pixels */
	calc(50 / var(--w) * 100vw), /* flex up to max */
	50px /* max in pixels */
);
```

If, for example, `--w: 1440;` (see [Width](#width)), then H3's would be 50px on screens larger than 1440px, and would smoothly scale down below that size to a minimum of 30px for mobile.

?> If you'd rather set your fonts to explicit values and change them via breakpoints, I'd recommend using e.g. `--fs-h3: calc((50 / var(--fs)) * 1em);` for a 50px-equivalent H3 font size in em units.

## Heights
You can share heights amongst various blocks and components using `--h-<element>` properties. For example, it's often useful with a sticky navigation to set the height to `--h-menu`, then add padding to the top of the page equal to `--h-menu` so the navigation doesn't overlap content.

## Spacing
The `--sp-<size>-<unit>` properties are useful for producing consistent margins, padding, and other spacing. They're also used within the `theme.json` file to set the Gutenberg preset spacing options (for 20, 50, and 80 by default) to keep spacing consistent.

`--sp-m-rem` also controls the space to either side of the main column of content for the entire site via `settings.styles.spacing.padding.left/right` in `theme.json`. Aquamin sets WordPress' `--root--padding-<right/left>` variables to this value in the `wp-overrides.css` for consistency.

?> Aquamin uses `clamp` to smoothly scale default spacingSizes in `theme.json`. If you'd prefer to use fixed values, just remove the `--sp-<size>-clamp` variables and update `theme.json` to use the `--sp-<size>-rem` versions instead.

## Width
`--w-<size>` defines common widths. The `theme.json` file uses `--w-l` for `wideSize` and `--w-m` for `contentSize` as standard block alignment widths. The base `--w` property is a unitless version of `--w-m` that's used in several CSS `calc` functions for the site.