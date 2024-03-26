# Theme Configuration

## Component Philosophy
All sites can be broken down into meaningful components, combined in various ways to create a unified whole. Similar to blocks, aquamin capitalizes on this concept by making it _really_ easy to work with individual components.

Each component is it's own self-contained directory (with a few global exceptions) where you'll handle all development for that particular piece of the site (it may help to read [aquamin's block philosophy](/features/block-configuration#block-philosophy) for more on the theory behind this).

## Creating Components

The easiest way to create a component is to run `wp aquamin component create` ([see the docs](features/wp-cli#wp-aquamin-component-create)). Then, just restart Parcel, and the scaffolded component is ready for you to customize within its own directory inside `aquamin/assets/component-library/`.

?> If you'd prefer not to use WP-CLI, you can simply add your own components as individual directories within `aquamin/assets/component-library/`. You can use the files within `aquamin/includes/cli/templates/component/` as a starting point if it's helpful, replacing all the "template" placeholder code and filename prefixes with your component's name.

Not all components are alike, so the files each requires will differ. Aquamin automatically enqueues any `view.css` file as front-end styling, any `view.js` file as front-end JavaScript, and any `editor.css` file as back-end block editor styling, loading all of these site-wide. It houses any HTML or PHP in a `view.php` file, then uses `get_template_part()` to include the component wherever it's needed elsewhere in the theme. It also allows you to add any WordPress hooks and filters to a `hooks.php` file within each component's directory. You can optionally prefix all of these names (e.g. `my-component-view.css` or `my-component-hooks.php`) to make code editing and debugging easier. The goal is to ensure each component's code only exists within it's own directory, making them easy to find, manage, and edit.

?> When you use the `wp aquamin component create` command, you'll conveniently find the `get_template_part()` call (including the appropriate file path) in the  `view.php` file's header comment.

## Examples

An example is the included `aquamin/assets/component-library/footer/` sticky footer component.

```
📂 assets
 ┗ 📂 component-library     // directory containing all components
   ┗ 📂 footer              // the component's unique name
     ┣ 📄 footer-view.php // HTML/PHP for the footer component
     ┗ 📄 footer-view.css  // sticky footer styling (add additional footer styling here)
```

Aquamin then includes this component via `get_template_part( 'assets/component-library/footer/footer-view' )` in the standard `aquamin/footer.php` file. You could additionally add a `footer-view.js` file for front-end footer scripts, a `footer-editor.css` file to add styles relevant only to the back-end block editor, or a `footer-hooks.php` file to add footer-related WordPress hooks and filters.

## Built In Components

The following components come with the aquamin theme. You'll add your own alongside these in the same `aquamin/assets/component-library/` directory.

```
📂 assets
 ┗ 📂 component-library   // all preinstalled components are within this folder
   ┣ 📂 404               // 404 error message component
   ┣ 📂 blog              // blog (single, archive, sidebar, etc.)
   ┣ 📂 footer            // site's footer component
   ┣ 📂 header            // site's header component
   ┣ 📂 menu              // site's main menu navigation in the header
   ┣ 📂 no-content        // reusable "no posts" message component
   ┣ 📂 page              // general page torso component
   ┣ 📂 search            // search-related components
   ┗ 📂 wp-overrides      // wordpress styling overrides
```

?> Aquamin loads some of these from the root `aquamin/index.php` file via `get_template_part()` calls reaching into this directory. This allows you, for instance, to work on all your blog-related code within just the `aquamin/assets/component-library/blog/` directory.

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
   ┣ 📄 view.css           // main entry file (coordinates global styling cascade)
   ┗ 📄 variables.css       // css custom properties (first in cascade)
```

## Fonts
You should add fonts to a `aquamin/assets/global/fonts/` folder, then add the `@font-face` definitions in the `aquamin/assets/global/fonts.css` file. Parcel will take care of hashing and including your font files within the `aquamin/dist/` directory, and aquamin will enqueue them.

Or, you can directly enqueue any fonts from a CDN (like Google Fonts) within the `aquamin/functions.php` file.

## Images

You can add images for a component within an "images" folder in that component's directory (e.g. `aquamin/assets/component-library/some-component/images/icon.png`), then include them via a relative path (e.g. `background-image: url("./images/icon.png")` in `aquamin/assets/component-library/some-component/some-component-view.css`).

If you have images that multiple components need to use, create your own `aquamin/assets/images` directory for them. Then, reference them via a relative path (e.g. `background-image: url("../../images/fpo.png")` in `aquamin/assets/component-library/some-component/some-component-view.css`), and Parcel will take care of hashing and including these images in the `aquamin/dist/` directory.

## SVGs

Usually, Parcel imports all images as a URL, including SVG images. If you would instead like to import your SVG images inline, you can name them like `*.inline.svg`, and Parcel will handle inlining them for you. For example, aquamin blocks use an `icon.inline.svg` image as their block icon in this manner (feel free to modify these with your own custom icons!).

## Static Assets

You may want to include static assets in the `aquamin/dist/` directory. One example could be for a `theme.sprite.svg` sprite file containing reusable logos, social icons, etc. Add these files within the `aquamin/assets/static/` directory, and any time you run `npm run build`, Parcel will copy them into `aquamin/dist/static/`.

!> Changes to these files are ignored by `npm run start`, so you'll have to rerun `npm run build`.