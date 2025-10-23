# Theme Configuration

## Automatic Asset Handling

Aquamin automatically looks for certain file patterns within various directories to figure out when and where assets should load, without requiring you to manually import things outside of each block or component's directory. So, it uses regex patterns like `**/*view.{css,scss}` to automatically handle files like `aquamin/assets/block-library/my-block/my-block-view.css` and `aquamin/assets/component-library/my-component/my-component.css` appropriately.


### The `assets` and `dist` Directories

The `aquamin/assets` directory is where you'll edit all your block and component related code. Webpack will compile your .css and .js files, then copy those and all your PHP files, images, fonts, and so forth over to the `aquamin/dist` directory.

| Directory        | Contents                  | Purpose
| -                | -                         | -
| `aquamin/assets` | development source files  | edit only these files during development
| `aquamin/dist`   | compiled production files | enqueue or include these files in the theme

!> Never enqueue or require files directly from the assets directory, as these are only for development; likewise, never directly edit any files in the dist folder, since they'll be overridden with every build.

### File Naming and Enqueuing Conventions

Aquamin handles several special asset file prefixes automatically:

|  CSS/JS&nbsp;Suffix  | Compiled&nbsp;File&nbsp;Within&nbsp;`aquamin/dist/`  | Enqueued&nbsp;By           | Purpose
|  -              | -                                          | -                     | - 
|  `theme.css`    | `global/theme.bundle.css`                  | front-end globally    | theme-wide styling
|  `theme.js`     | `global/theme.bundle.js`                   | front-end globally    | theme-wide behavior
|  `editor.css`   | `global/editor.bundle.css`                 | back-end globally     | block editor styling
|  `view.css`     | `component-library/<name>/<name>-view.css` | `hooks.php` manually  | component styling
|  `view.js`      | `component-library/<name>/<name>-view.js`  | `hooks.php` manually  | component behavior
|  `view.css`     | `block-library/<name>/<name>-view.css`     | via `block.json`      | block styling
|  `view.js`      | `block-library/<name>/<name>-view.js`      | via `block.json`      | block behavior

Additionally, aquamin provides a means of running WordPress hooks and including template parts within your block or component directories:

|  PHP&nbsp;Suffix  | Where Included via PHP                                                                                    | Purpose
|  -                | -                                                                                                         | -
|  `hooks.php`      | automatically included via aquamin's `functions.php` file                                                 | wordpress&nbsp;hooks&nbsp;and&nbsp;filters
|  `view.php`       | manually via `get_template_part('dist/component-library/<name>-view')` wherever component should appear | front-end html output of the component

### JavaScript and CSS Pre-Processing

Aquamin uses Babel and PostCSS to process .js and .css files, so you can use modern, standards-compliant ES6 and CSS features typically without worrying about polyfills, prefixes, etc. And, though aquamin doesn't employ TypeScript or SASS features out of the box, you can use .ts or .scss file extensions as well.

Aquamin compiles .js files to CommonJS, but if you'd like to use ESmodules (e.g. to support the WordPress Interactivity API), use the extension .mjs instead. If you scaffolded your block or component with aquamin's WP-CLI commands, you'll need to convert `viewScript` to `viewScriptModule` in your block's `block.json` file or `wp_register_script` to `wp_register_script_module` in your component's `hooks.php` file, then change the file extension of `view.js` to `view.mjs`. (Note that this uses Node's `--experimental-modules` flag, so there may be some quirks till it's no longer experimental.)

## Global Features

Aquamin includes some global features that apply theme-wide across all components and blocks. Edit the code within these files to meet the requirements of your theme.

```
📂 assets
 ┣ 📂 util                  // js utility functions (import them individually)
 ┃ ┗ 📂 block-ui            // common block UI controls (shared across blocks)
 ┗ 📂 global                // global styling that exists site-wide
   ┣ 📄 alignment.css       // block alignment customizations
   ┣ 📄 animations.css      // reusable multi-component keyframe animations
   ┣ 📄 fonts.css           // custom font imports (see Fonts section below)
   ┣ 📂 normalize           // global styling for common html elements you'll customize
   ┣ 📄 shame.css           // styling we hope to fix later (occurs near last in cascade)
   ┣ 📄 theme.css           // main entry file (coordinates global styling cascade)
   ┗ 📄 variables.css       // css custom properties (first in cascade)
```

## Fonts
Add fonts to a `aquamin/assets/global/fonts/` folder, then add the `@font-face` definitions in the `aquamin/assets/global/fonts.css` file. Webpack will take care including your font files within the `aquamin/dist/` directory, and aquamin will enqueue them.

Or, you can directly enqueue any fonts from a CDN (like Google Fonts) within the `aquamin/functions.php` file.

## Images

You can add images for a component within an "images" folder in that component's directory (e.g. `aquamin/assets/component-library/some-component/images/icon.png`), then include them via a relative path (e.g. `background-image: url("./images/icon.png")` in `aquamin/assets/component-library/some-component/some-component-theme.css`).

If you have images that multiple blocks or components need to use, create your own `aquamin/assets/images` directory for them. Then, reference them via a relative path (e.g. `background-image: url("../../images/my-image.png")` in your stylesheet.

## SVGs

Usually, webpack imports all images as a URL, including SVG images. If you would instead like to import your SVG images inline, you can name them like `*.inline.svg`, and webpack will handle inlining them for you. For example, aquamin blocks use an `icon.inline.svg` image as their block icon in this manner (feel free to modify these with your own custom icons!).

## Static Assets

You may want to include static assets in the `aquamin/dist/` directory. One example could be for a `theme.sprite.svg` sprite file containing reusable logos, social icons, etc. Add these files within the `aquamin/assets/static/` directory, and webpack will copy them into the `aquamin/dist/static/` directory for you to use.