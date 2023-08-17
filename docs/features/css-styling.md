# CSS Styling

The `aquamin/assets/global/variables.css` file provides a number of useful custom properties you can update to match your theme's needs.

## Fonts

- `--fs` establishes the base font size for the entire site (the default is 16px).
- `--fs-<name>` defines the sizes of various text elements, like H1-H6 headings (e.g. `--fs-h1`). They're converted from pixels to ems by default, but you can replace these as needed
- `--ff-<number>` defines the site's font families (you can add more if you need to).

?> Aquamin employs the font settings within the `text-level-semantics.css` file and elsewhere.

## Layout

- `--sp-<size>` is useful for consistent margins and padding throughout your theme. WordPress' `--wp--style--block-gap` is set to `--sp` in `wp-overrides.css` for consistency.
- `--w-<size>` defines common widths. The `theme.json` file uses `--w-wide` for _Wide Width_ and `--w-normal` for _None_ as standard block alignment widths.
- `--h-<name>` defines common heights. For example, if your site has a sticky menu bar, you could use `--h-menu` to define the main menu's height, then apply that same value to padding that pushes content precisely underneath the sticky menu.
- `--gutter` defines the space to either side of the main column of content for the entire site. WordPress' `--root--padding-<right/left>` variables are set to this value in the `wp-overrides.css` for consistency.

## Keyframe Animations
- `--ani-ease` defines the primary easing function used throughout the site.
- `--ani-speed` defines the primary duration of animations throughout the site.

## Colors

Aquamin takes a powerful but flexible approach to colors. The overall naming format is as follows:

```
--<color>-<variant 1/2/3/etc>-<brightness 0(darkest)-9(lightest)>
```

So, for instance, `--c-1-7` would be a light primary color, `--c-1-5` would be a normal/mid primary color, and `--c-1-2` would be a dark primary color. Additionally, `--c-0-0` is black and `--c-0-9` is white (while other `--c-0-<number>` colors are various values of gray).

Aquamin defines these colors as `--c-raw-<variant>-<brightness>` in HSL format (you could use RGB if you prefer), then creates the simplified `--c-<variant>-<brightness>` custom property from that value. You'll usually use the simplified version, but the `raw` version lets you apply your own opacity, e.g. `color: hsla(var(--c-raw-1-2), 0.5)` is dark primary color at 50% opacity.

Aquamin also adds easy-to-use background color custom properties. Within the `libs.php` file, aquamin loops through all theme colors (set in the `theme.json` file) and outputs a `--c-bg` for each. This gives you access within CSS to the current background color. For instance, it let's you do things like:

```css
.thing {
	border: 1px solid var(--c-bg);
}
```

So, for `.thing.has-0-0-background-color` you'll get a black border, and for `.thing.has-0-9-background-color` you'll get a white border, matching their respective backgrounds. It's often quite useful, especially for child or pseudo elements within colored background sections.

## Media Queries

At the end of the `variables.css` file, you can add media queries that reset values at specific breakpoints. For instance, it's pretty common to have a huge H1 heading size at desktop that needs to be much smaller at mobile, and you'd redefine the `--fs-h1` variable's value here to do that. Other common variables to reset at different screen sizes are things like `--sp`, `--gutter`, `--h-menu`, etc., under the [Layout](features/css-styling#layout) section.