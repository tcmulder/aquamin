# Theme Configuration

## Component Philosophy
All sites can be broken down into meaningful components, combined in various ways to create a unified whole. Just like it does for blocks, aquamin capitalizes on this concept by making it _really_ easy to work with individual components.

Each component is it's own self-contained directory where you'll handle all development for that particular piece of the site (it may help to read [aquamin's block philosophy](/features/block-configuration#block-philosophy) for more on the theory behind this).

## Creating Components

The easiest way to create a component is to run `wp aquamin component create` ([see the docs](features/wp-cli#wp-aquamin-component-create)). Then, just restart Parcel, and the scaffolded component is ready for you to customize within its own directory inside `aquamin/assets/component-library/`.

?> If you'd prefer not to use WP-CLI, you can simply add your own components as individual directories within `aquamin/assets/component-library/`. You can use the files within `aquamin/includes/cli/templates/component/` as a starting point if it's helpful, replacing all the "template" placeholder code and filename prefixes with your component's name.

### File Name Prefixing

Note that these shortened filenames work, but for easier debugging aquamin prefixes them like `example-component-edit.js`, `example-component-editor.css`, `example-component-view.php`, etc.

## File Naming and Enqueuing Conventions

Not all components are alike, so the files each requires will differ:

|  File Suffix: | Usage
|  -            | -
|  `theme.css`  | Compiled into `aquamin/dist/global/theme.bundle.css` so it loads site-wide automatically.
|  `theme.js`   | Compiled into `aquamin/dist/global/theme.bundle.js` so it loads site-wide automatically.
|  `hooks.php`  | Included via `functions.php` for component-specific hooks and filters.
|  `view.php`   | Manually include this file via `get_template_part()` wherever component is needed.
|  `view.css`   | Compiled into `aquamin/dist/component-library/component-name-view.css` so you can manually enqueue it via `hooks.php` logic.
|  `view.js`    | Compiled into `aquamin/dist/component-library/component-name-view.js` so you can manually enqueue it via `hooks.php` logic.
|  `editor.css` | Compiled into `aquamin/dist/global/editor.bundle.css` so it loads automatically in the back-end block editor.

Just include whatever above files your component needs within the block's own directory so it's easy to find, manage, and edit your component in one place.

?> When you use the `wp aquamin component create` command, you'll conveniently find the `get_template_part()` call (including the appropriate file path) in the  `view.php` file's header comment.

### File Name Prefixing

Note that the above shortened filenames work, but for easier debugging aquamin prefixes them like `example-component-theme.js`, `example-component-view.css`, `example-component-view.php`, etc.

## Examples

An example is the included `aquamin/assets/component-library/footer/` sticky footer component.

```
📂 assets
 ┗ 📂 component-library     // directory containing all components
   ┗ 📂 footer              // the component's unique name
     ┣ 📄 footer-view.php   // HTML/PHP for the footer component
     ┗ 📄 footer-theme.css  // site-wide sticky footer styling
```

Aquamin then includes this component via `get_template_part( 'assets/component-library/footer/footer-view' )` in several other components. You could additionally add a `footer-theme.js` file for front-end footer scripts, a `footer-editor.css` file to add styles relevant only to the back-end block editor, or a `footer-hooks.php` file to add footer-related WordPress hooks and filters.

## Built In Components

The following components come with the aquamin theme. You'll add your own alongside these in the same `aquamin/assets/component-library/` directory.

```
📂 assets
 ┗ 📂 component-library    // all preinstalled components are within this folder
   ┣ 📂 404                // 404 error message component
   ┣ 📂 blog               // blog (single, archive, sidebar, etc.)
   ┣ 📂 footer             // site's footer component
   ┣ 📂 header             // site's header component
   ┣ 📂 menu               // site's main menu navigation in the header
   ┣ 📂 no-content         // reusable "no posts" message component
   ┣ 📂 page               // general page torso component
   ┣ 📂 password-protected // password-protected posts component
   ┣ 📂 search             // search-related components
   ┗ 📂 wp-overrides       // wordpress styling overrides
```

## Global Features

Aquamin includes some global features that apply site-wide across all components and blocks. Edit the code within these files to meet the requirements of your theme.

```
📂 assets
 ┣ 📂 util                  // reusable js utility functions
 ┗ 📂 global                // global styling that exists site-wide
   ┣ 📄 alignment.css       // block alignment customizations
   ┣ 📄 animations.css      // reusable multi-component keyframe animations
   ┣ 📄 fonts.css           // custom font imports (see Fonts below)
   ┣ 📂 normalize           // global styling for common html elements you'll customize
   ┣ 📄 shame.css           // styling we hope to fix later (occurs last in cascade)
   ┣ 📄 theme.css           // main entry file (coordinates global styling cascade)
   ┗ 📄 variables.css       // css custom properties (first in cascade)
```

In addition, you'll find the theme.bundle.js and editor.bundle.js files, which Parcel references as an entry point for compiling global front-end styling/scripts and back-end block editor styling/scripts, respectively.

## Fonts
You should add fonts to a `aquamin/assets/global/fonts/` folder, then add the `@font-face` definitions in the `aquamin/assets/global/fonts.css` file. Parcel will take care of hashing and including your font files within the `aquamin/dist/` directory, and aquamin will enqueue them.

Or, you can directly enqueue any fonts from a CDN (like Google Fonts) within the `aquamin/functions.php` file.

## Images

You can add images for a component within an "images" folder in that component's directory (e.g. `aquamin/assets/component-library/some-component/images/icon.png`), then include them via a relative path (e.g. `background-image: url("./images/icon.png")` in `aquamin/assets/component-library/some-component/some-component-theme.css`).

If you have images that multiple components need to use, create your own `aquamin/assets/images` directory for them. Then, reference them via a relative path (e.g. `background-image: url("../../images/fpo.png")` in `aquamin/assets/component-library/some-component/some-component-theme.css`), and Parcel will take care of hashing and including these images in the `aquamin/dist/` directory.

## SVGs

Usually, Parcel imports all images as a URL, including SVG images. If you would instead like to import your SVG images inline, you can name them like `*.inline.svg`, and Parcel will handle inlining them for you. For example, aquamin blocks use an `icon.inline.svg` image as their block icon in this manner (feel free to modify these with your own custom icons!).

## Static Assets

You may want to include static assets in the `aquamin/dist/` directory. One example could be for a `theme.sprite.svg` sprite file containing reusable logos, social icons, etc. Add these files within the `aquamin/assets/static/` directory, and any time you run `npm run build`, Parcel will copy them into `aquamin/dist/static/`.

!> Changes to these files are ignored by `npm run start`, so you'll have to rerun `npm run build`.