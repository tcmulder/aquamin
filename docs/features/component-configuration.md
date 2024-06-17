# Component Configuration

## Component Philosophy

All sites can be broken down into meaningful components, combined in various ways to create a unified whole. Just like it does for blocks, aquamin capitalizes on this concept by making it _really_ easy to work with individual components.

Each component is it's own self-contained directory where you'll handle all development for that particular piece of the site (it may help to read [aquamin's block philosophy](/features/block-configuration#block-philosophy) for more on the theory behind this).

## Creating Components

The easiest way to create a component is to run `wp aquamin component create` ([see the docs](features/wp-cli#wp-aquamin-component-create)). Then, just restart webpack, and the scaffolded component is ready for you to customize within its own directory inside `aquamin/assets/component-library/`. You'll also conveniently find a `get_template_part()` call (including the correct path to your component) in the `view.php` file's header comment, so you can copy and paste it wherever your component should appear.

?> If you'd prefer not to use WP-CLI, you can simply add your own components as individual directories within `aquamin/assets/component-library/`. You can use the files within `aquamin/includes/cli/templates/component/` as a starting point if it's helpful, replacing all the "template" placeholder code and filename prefixes with your component's name.

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

Within each component directory are all the [development files](features/theme-configuration#file-naming-and-enqueuing-conventions) for that particular component. Upon build, Webpack will compile [production files](features/theme-configuration#the-assets-and-dist-directories) to the `aquamin/dist` directory for use.

### File Name Prefixing

Note that the above shortened filenames work, but for easier debugging aquamin prefixes them like `example-component-theme.js`, `example-component-view.css`, `example-component-view.php`, etc.


### Example: Main Menu

Let's explore the internal organization of the built in main menu component.

```
📂 assets
 ┗ 📂 component-library  // directory containing all components
   ┗ 📂 menu             // the component's unique name
     ┣ 📄 menu-view.php  // HTML/PHP for the menu component
     ┣ 📄 menu-theme.css // site-wide main menu styling
     ┗ 📄 menu-theme.js  // site-wide main menu behavior
```

The .css and .js files end with "theme," so aquamin enqueues them automatically site-wide on the front-end (see [file naming conventions](features/theme-configuration#file-naming-and-enqueuing-conventions)). Aquamin includes this component via a call to `get_template_part( 'dist/component-library/menu/menu-view' )` in the site's header template file.


### Example: Password Protected Posts

Another example is the password protected post styling:

```
📂 assets
 ┗ 📂 component-library                // directory containing all components
   ┗ 📂 password-protected             // the component's unique name
     ┣ 📄 password-protected-hooks.php // hooks to enqueue the CSS
     ┗ 📄 password-protected-view.css  // password form styling
```

The .css file ends with "view," so it's compiled to `aquamin/dist/component-library/password-protected/password-protected-view.css` (see [file naming conventions](features/theme-configuration#file-naming-and-enqueuing-conventions)). Then, `password-protected-hooks.php` enqueues this stylesheet only on posts that have WordPress's password protection enabled, rather than site-wide.