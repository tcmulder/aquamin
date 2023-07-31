# Theme Configuration

## Component Philosophy
All sites can be broken down into meaningful components, combined in various ways to create a unified whole. Similar to blocks, aquamin capitalizes on this concept by making it _really_ easy to work with individual components.

So, each component is it's own self-contained directory (with a few global exceptions) where you'll handle all development for that particular piece of the site (it may help to read [aquamin's block philosophy](/features/block-configuration#block-philosophy) for more on the theory).

## Creating Components

The easiest way to create a component is to run `wp aquamin component create` ([see the docs](features/wp-cli#wp-aquamin-component-create)). If you have parcel running, just refresh the site and the scaffolded component will immediately be available, ready for you to customize within its own directory inside `aquamin/assets/component-library/`. If you had the command scaffold your PHP, you'll conveniently find the get_template_part() call (including the appropriate file path) in the comment above the markup.php file in that directory, too.

Or, if you'd prefer to scaffold a component yourself, you may choose to add these manually for more control: just add a new directory and appropriate files to the `aquamin/assets/component-library/` folder. The main thing to keep in mind is that aquamin automatically includes all `style.css` styling on the front-end, all `editor.css` styling in the block editor's back-end, all `script.js` JavaScript on the front-end, and your HTML/PHP should go in `markup.php` files (you'll need to manually include them with `get_template_part()` where they're needed).

?> _Note:_ Aquamin prefixes filenames for easier debugging like `my-component-style.css`, `my-component-editor.css`, etc., and includes them via glob patterns like `*style.css`, `*editor.css`, etc.

## Examples

An example component is the included `aquamin/assets/component-library/footer` component, which adds sticky footer styling.

```
📂 assets
 ┗ 📂 component-library     // directory containing all components
   ┗ 📂 footer              // the component's unique name
     ┣ 📄 footer-markup.php // html for the component (this one is included in footer.php) 
     ┗ 📄 footer-style.css  // sticky footer styling (add additional footer styling here)
```

You could also add a `footer-script.js` file to develop front-end scripts associated with the footer, or `footer-editor.css` to add footer styling within back-end block editor.

?> _Note:_ See how within the normal WordPress `footer.php` template, we use `get_template_part()` to grab the `footer-markup.php` file shown here: that lets us have all files associated with the footer component within this single component directory.

For convenience, you can also include features here that don't quite fit the "component" concept in a traditional sense. Take the included WordPress styling overrides for instance:

```
📂 assets
 ┗ 📂 component-library
   ┗ 📂 wp-overrides    // the "component's" unique name
     ┣ 📄 wp-editor.css // wp styling overrides within the block editor
     ┗ 📄 wp-style.css  // wp styling overrides for the front-end
```

## Built In Components

The following components come with the aquamin theme. You'll add your own alongside these in the same `aquamin/assets/component-library/` directory.

```
📂 assets
 ┗ 📂 component-library     // all your component files should be within this folder
   ┣ 📂 content             // component: content for posts
   ┣ 📂 excerpt             // component: standard blog excerpts
   ┣ 📂 footer              // component: the site's footer
   ┣ 📂 menu                // component: the site's main navigation
   ┗ 📂 wp-overrides        // wordpress styling overrides
```

## Global Features

Aquamin includes some global, reusable features that apply across all components.

```
📂 assets
 ┣ 📂 util                  // js utility functions (used across multiple components)
 ┗ 📂 global                // global styling that exists across all components
   ┣ 📄 alignment.css       // block alignment customizations
   ┣ 📄 animations.css      // reusable multi-component keyframe animations
   ┣ 📄 fonts.css           // custom font imports (add a font folder here to use this)
   ┣ 📂 normalize           // global styling for common html elements you'll customize
   ┣ 📄 shame.css           // styling we hope to fix later (occurs last in cascade)
   ┣ 📄 style.css           // main entry file (coordinates global styling cascade)
   ┗ 📄 variables.css       // css custom properties (first in cascade)
```

## OtherAssets

### Font Assets
You can add fonts to a `aquamin/assets/global/fonts/` folder, then add the `@font-face definitions` in the `aquamin/assets/global/fonts.css` file. Parcel will take care of hashing and including these assets in the `aquamin/dist/` directory for you.

Or, you can directly enqueue any fonts from a CDN (like Google Fonts) within the `aquamin/includes/enqueue.php` file.

### Image Assets

If a component requires images, you should create an `aquamin/assets/component-library/some-component-name/images` directory and include them from there—that way, each component's directory houses its own images. If you have images that are used by multiple components, you can also create an `aquamin/assets/images` directory for them. Parcel will take care of hashing and including these assets in the `aquamin/dist/` directory for you.

### SVG Assets

Usually, Parcel will import all images as a simple path, including SVGs. If you would instead like to import your SVG images inline, you can name them like `*.inline.svg`, and Parcel will handle the inlining for you. For example, you'll notice each block has an `icon.inline.svg` image file is already set up in this manner for block icons (feel free to update these with your own custom icons!).

### Static Assets

You may want to include static assets in the `aquamin/dist/` directory (I often do for a `theme.sprite.svg` file that contains reusable logos, social icons, etc.). You can add these files within the `aquamin/assets/static/` directory, and any time you run `npm run build` they will be copied into `aquamin/dist/static/`.

?> _Note:_ `npm run start` ignores changes to these files, so you will need to rerun the build if you make changes.