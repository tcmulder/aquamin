# Theme Configuration

## Component Philosophy
All sites can be broken down into meaningful components, combined in various ways to create a unified whole. Similar to blocks, aquamin capitalizes on this concept by making it _really_ easy to work with individual components.

So, each component is it's own self-contained directory (with a few global exceptions) where you'll handle all development for that particular piece of the site (it may help to read [aquamin's block philosophy](/features/block-configuration#block-philosophy) for more on the theory).

## Creating Components

The easiest way to create a component is to run `wp aquamin component create` ([see the docs](features/wp-cli#wp-aquamin-component-create)). Then, just restart Parcel, refresh the site, and the scaffolded component is ready for you to customize within its own directory inside `aquamin/assets/component-library/`. 

?> If you had the command add a PHP template part, you'll conveniently find the get_template_part() call (including the appropriate file path) in the initial markup.php file comment, too.

Or, if you'd prefer to scaffold a component yourself, you may choose to add the necessary files manually for more control: just add those within a new directory inside the `aquamin/assets/component-library/` folder. The main thing to keep in mind is that aquamin automatically includes all `*style.css` styling on the front-end, all `*editor.css` styling in the block editor's back-end, all `*script.js` JavaScript on the front-end, and your HTML/PHP should be within a `markup.php` file (you'll need to manually include this with `get_template_part()` wherever it's needed).

?> Aquamin prefixes filenames for easier debugging like `my-component-style.css`, `my-component-editor.css`, etc., and includes them via glob patterns like `*style.css`, `*editor.css`, etc.

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

?> Within the default WordPress `aquamin/footer.php` file, you'll see `get_template_part( 'assets/component-library/footer/footer-markup' )`, which includes the markup for this component. In this way, we have all files associated with the footer component in a single, manageable directory.

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
 ┗ 📂 component-library     // all preinstalled components are within this folder
   ┣ 📂 content             // component: basic content markup for posts and pages
   ┣ 📂 excerpt             // component: blog excerpt markup
   ┣ 📂 footer              // component: the site's footer
   ┣ 📂 menu                // component: the site's main navigation
   ┗ 📂 wp-overrides        // wordpress styling overrides
```

## Global Features

Aquamin includes some global features that apply across all components. Use these files as a starting point, modifying and adding your own code to them to suit your needs.

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

## Fonts
You should add fonts to a `aquamin/assets/global/fonts/` folder, then add the `@font-face` definitions in the `aquamin/assets/global/fonts.css` file. Parcel will take care of hashing and including your font files within the `aquamin/dist/` directory, and aquamin will enqueue them.

Or, you can directly enqueue any fonts from a CDN (like Google Fonts) within the `aquamin/includes/enqueue.php` file.

## Images

To add images to a particular component, you should create an `images` directory within that component (e.g. `aquamin/assets/component-library/some-component-name/images/`) to keep all that component's files in one directory. If you have images that are used by multiple components, you can also create an `aquamin/assets/images` directory for them. Parcel will take care of hashing and including these assets in the `aquamin/dist/` directory.

## SVGs

Usually, Parcel will import all images as a simple URL, including SVGs. If you would instead like to import your SVG images inline, you can name them like `*.inline.svg`, and Parcel will handle the inlining for you. For example, you'll notice each block has an `icon.inline.svg` image file is already set up in this manner for block icons (feel free to update these with your own custom icons!).

## Static Assets

You may want to include static assets in the `aquamin/dist/` directory. One example could be for a `theme.sprite.svg` sprite file containing reusable logos, social icons, etc. Add these files within the `aquamin/assets/static/` directory, and any time you run `npm run build` Parcel will copy them into `aquamin/dist/static/`.

!> Changes to these files are ignored by `npm run start`, so you'll have to rerun `npm run build`.