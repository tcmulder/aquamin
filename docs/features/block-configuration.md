# Block Configuration

## Block Philosophy

Aquamin's goal is to make it _really_ easy to create blocks, remove them, or transfer them to future aquamin-themed sites. In order to accomplish this, each block is it's own self-contained directory, with all files necessary for it to function contained within that directory.

There's no configuration you need to do outside of that directory to get the block working, and all your development occurs within that directory so you can spend less time tracking down files across the theme's filesystem. If you want to move that block to another aquamin-compatible site in the future, you need only copy and paste it's directory into the new site and tweak it's styling to match. And if you decide to get rid of a block, simply delete it's directory, and it'll leave behind no extra code bloat across other files in the theme—it's 100% gone. Easy peasy!

## Creating Blocks

The easiest way to create blocks is to run `wp aquamin block create` ([see the docs](/features/wp-cli#wp-aquamin-block-create)). You'll need to restart parcel if it's running to add the new entry points to its file watcher, and then the scaffolded block will be available as a registered block in WordPress, ready for you to customize within its own directory inside `aquamin/blocks/block-library/`.

?> _Note:_  If you would prefer not to use WP-CLI, simply copy the appropriate block scaffold directory out of `aquamin/includes/cli/templates/`, conduct a find and replace for the "template" placeholder strings you'll find within its files, and update/remove any placeholder comments.

### Front-End JavaScript Option

The `wp aquamin block create` command will ask if you want to add a `script.js` file to your block that will be available for front-end scripting. Aquamin will prefix the `script.js` file (like `my-block-script.js` for example) to make debugging easier.

If you'd like to break the front-end scripts into multiple files, you can use this `script.js` file as an entry point and organize your additional files as desired within the block's directory.

### Inner Blocks Option

The `wp aquamin block create` command will ask if you'd like an inner block set up. This is a common pattern if your parent block requires a codependent inner block (e.g. a Slider parent block with multiple Slide inner blocks).

You'll add styles and scripts to your inner block via it's _parent's_ `style.css` and optional `script.js` files, rather than within the inner block's directory. This simplifies things by eliminating the need to jump between multiple files to develop blocks that are so tightly coupled anyway (see [Anatomy of a Block](#anatomy-of-a-block) for more details).

### Dynamic Block Option

Though aquamin prefers blocks be built with JavaScript, in some cases blocks require up-to-date data from the database, and therefore require PHP. So, `wp aquamin block create` will ask if you need a dynamic block, and will create a `markup.php` file to house your PHP code if so.

?> _Note:_ Aquamin doesn't currently support automated inner block setup if you choose to go dynamic: if you need that, you'll have to add your dynamic inner block manually.

## Anatomy of a Block

Each block has its own block directory within the `aquamin/blocks/block-library/` directory. All the block's files are contained within its block directory. Note that inner blocks use the parent block's `editor.css`, `style.css`, and optional `script.js` files so you needn't jump between so many files while you're working on the block as a whole.

### Directory Structure

```
📂 blocks
┗ 📂 block-library         // all blocks reside within blocks/block-library/*
   ┗ 📂 example-block      // the block's unique name
      ┣ 📄 block.json      // details about block registration
      ┣ 📄 edit.js         // HTML shown in the block editor
      ┣ 📄 editor.css      // styling for block editor (also imports front-end's style.css)
      ┣ 📄 index.js        // block entry file (mostly imports other files)
      ┣ 📄 index.php       // PHP block registration (and optionally inner block registration)
      ┣ 📄 markup.php      // optional PHP for a dynamic block
      ┣ 📄 save.js         // HTML saved to database
      ┣ 📄 script.js       // optional front-end script for the block
      ┣ 📄 style.css       // front-end styling
      ┗ 📂 inner-block     // nested block used only by the parent block (optional)
         ┣ 📄 block.json   // details about inner block registration
         ┣ 📄 edit.js      // HTML shown in the block editor
         ┣ 📄 index.js     // block entry file (mostly imports other files)
         ┗ 📄 save.js      // HTML saved to database
```

## PHP Hooks

If your block requires PHP hooks, rather than adding them to the theme's `functions.php` file (and therefore having code related to your block that's outside its single, self-contained directory), you can add your hooks to a `hooks.php` file within the block's directory (see an example of this used by the built-in year block's directory at `blocks/block-library/format-type-year/hooks.php`).

## Deleting Blocks

There's currently a bug in Parcel: if you delete a block's directory to remove the block, you'll need to exit parcel and run `npm run clean` to clear the cache, then `npm run start` to restart the server; after that, your block will be removed from WordPress's registered bocks.

?> _Note:_ You can run `npm run clean && npm run start` if you would like to clear the cache immediately before starting the build server each time.

!> _Warning:_ If you _don't_ do this and you delete a file Parcel was watching, builds will fail. Maybe future releases of Parcel will eliminate this requirement. It appears to happen when one file imports another, but then the imported file later gets deleted: Parcel continues to look for that deleted file—even after restarting—if you don't clear its cache first.

## Block Utilities

You'll find some helpful, reusable utilities and UI components under `aquamin/blocks/util` and `aquamin/blocks/ui`, respectively. Check out the comments at the top of these files for usage information. You can add your own into these directories as well, or ignore them if they're not helpful to you (since anything you don't use won't get bundled into the production build anyway).

## Editing Core Blocks

You can modify core blocks using the `aquamin/blocks/block-edits/` directory. Aquamin comes with a few already, including block animations, column layout enhancements, and show/hide responsive container edits. Feel free to duplicate and reuse any of these for your own purposes, or remove those you don't want.

?> _Note:_ While aquamin only loads custom block front-end styles and scripts on posts that use those particular blocks (in order to optimize performance), it loads edits within this directory globally to ensure your edits apply to core blocks wherever they may appear.

## A Note on Imports

You'll notice we're destructuring the `wp` object for most WordPress features rather than using normal imports. For example:

```javascript
// we can import node_modules packages:
import classnames from 'classnames';

// we can import components from files:
import { ButtonX } from '../Buttons';

// but we can't import from WordPress's node_module packages i.e.:
// import {  InspectorControls } from '@wordpress/block-editor';
// because that would cause two conflicting versions of the
// wp object to exist. Instead, we need to destructure from the
// existing wp object:
const { MediaPlaceholder, InspectorControls } = wp.blockEditor;
```

Many examples you'll see online just `import` everything, but I was unable to get Parcel to behave like Webpack and properly use the `wp` object without importing it twice (and therefore throwing all manner of errors). So, until I can find a viable workaround for Parcel, if you're following an example online that shows `import {  InspectorControls } from '@wordpress/block-editor'`, you'll simply change it to `const {  InspectorControls } = wp.blockEditor`.