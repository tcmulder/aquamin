# Block Configuration

## Block Philosophy

Aquamin's goal is to make it _really_ easy to create blocks, remove them, or transfer them to future aquamin-themed sites. In order to accomplish this, each block is it's own self-contained directory, with all files necessary for it to function contained within that directory.

There's no configuration you need to do outside that directory, because aquamin handles all the registering, enqueueing, tooling, and so forth for you. You needn't scour the theme's filesystem to find bits and pieces of the block's code since it's all in this one directory. You can copy a block to another aquamin-based theme simply by copying this one folder over. And to delete a block, you simply delete this directory, and it'll leave behind no extra code bloat across other files in the theme—it's just 100% gone. Easy peasy!

## Creating Blocks

The easiest way to create a block is to run `wp aquamin block create` ([see the docs](/features/wp-cli#wp-aquamin-block-create)). Aquamin will scaffold a new block directory for you in `aquamin/assets/block-library/`, and after you restart Parcel it will appear as a registered block within WordPress. Note that aquamin only loads assets associated with a block on pages where that block appears, which helps with site performance.

?> If you'd prefer not to use WP-CLI, simply copy the appropriate block scaffold directory out of `aquamin/includes/cli/templates/`, then find and replace the "template" placeholder code and filename prefixes you'll find.

## Anatomy of a Block

Each block has its own block directory within `aquamin/assets/block-library/`. All the block's files are contained within its block directory.

### Directory Structure

```
📂 assets
┗ 📂 block-library         // all blocks reside within assets/block-library/*
   ┗ 📂 example-block      // the block's unique name
      ┣ 📄 block.json      // block registration details
      ┣ 📄 edit.js         // block editor back-end HTML
      ┣ 📄 editor.css      // block editor styling (also imports view.css)
      ┣ 📄 hooks.php       // (optional) functions.php hooks and filters
      ┣ 📄 index.js        // block entry file (mostly imports other files)
      ┣ 📄 save.js         // block HTML to be saved to database
      ┣ 📄 view.css        // front-end styling (also used for inner blocks)
      ┣ 📄 view.js         // (optional) front-end JavaScript (also used by inner blocks)
      ┣ 📄 view.php        // (optional) front-end PHP for dynamic blocks
      ┗ 📂 inner-block     // (optional) nested block used only by its parent
         ┣ 📄 block.json   // block registration details
         ┣ 📄 edit.js      // block editor back-end HTML
         ┣ 📄 index.js     // block entry file (mostly imports other files)
         ┗ 📄 save.js      // block HTML to be saved to database
```

### File Naming and Enqueuing Conventions

The `block.json` file references a block's `view.css` and `view.js` files, allowing these files to only load on pages that utilize that block. If for some reason your block needs to load things side-wide, change these to `theme.css` and `theme.js`, and aquamin will add your scripts within the theme's `theme.bundle.css` and `theme.bundle.js` files globally.

### File Name Prefixing

Note that the above shortened filenames work, but for easier debugging aquamin prefixes them like `example-block-edit.js`, `example-block-editor.css`, `example-block-view.php`, etc.

## Front-End JavaScript

To add front-end JavaScript to a block, you can register a `view.js` file via the `viewScript` property of the block's `block.json` file. The `wp aquamin block create` command can create this file for you when you create a new block.

If you'd like to break a front-end script into multiple files, you can use this `view.js` file as an entry point and import your additional files from within a `scripts` folder inside this block's directory.

## Inner Blocks

A common pattern in Gutenberg is to have a parent block with dependent inner blocks, like a "Slider" block with several "Slide" blocks within it. The `wp aquamin block create` command will ask if you'd like to generate such an inner block, and will place that inner block within the parent's directory for convenience.

Note that you'll apply styling and front-end scripting for an inner block to it's _parent's_ `view.css` and `view.js` files. This simplifies development by reducing the number of files you need to work with, since these block parings are so tightly coupled anyway (see [Anatomy of a Block](#anatomy-of-a-block) for more details).

## Dynamic Blocks

Though static JavaScript blocks are generally best, sometimes blocks require back-end database queries to work, and therefore require dynamic PHP. The `wp aquamin block create` command will ask if a block should be dynamic, creating a `view.php` render file for your block if so.

?> Aquamin doesn't currently support automatic [inner block](#inner-blocks) generation if you choose to go dynamic: if you need that, you'll have to add your dynamic or static inner blocks manually.

## Hooks and Filters

Add whatever WordPress hooks and filters a block requires to a `hooks.php` file in that block's directory. (Don't add them to `functions.php` to ensure everything stays organized in the block's own directory—see [Block Philosophy](#block-philosophy).) You can see an example within `aquamin/assets/block-editor/format-type-year/year-hooks.php`, which the year format type uses to display the current year via PHP.

## Block Utilities

You'll find some helpful, reusable utilities and Gutenberg UI components under `aquamin/assets/util` and `aquamin/assets/util/block-ui`, respectively. Check out the comments at the top of these files for usage information. You can add your own scripts into these directories as well, or ignore them if they're not helpful to you (since anything you don't use won't get bundled into the production build anyway).

## Editing Core Blocks

You can edit core blocks (e.g. add custom block settings, set variations, insert format types, register or deregister block styles, etc.) within the `aquamin/assets/block-editor/` directory.

Aquamin comes with a few modifications already, including block animations, column layout enhancements, a current year paragraph format type, and show/hide responsive container options. Feel free to duplicate and reuse any of these for your own purposes, or remove those you don't want.

?>You'll notice most block edits need a `theme.css` file so the styling appears theme-wide (see [conventions](#file-naming-and-enqueuing-conventions)). You can also replace this with a `view.css` file and enqueue it using advanced logic within a block's `hooks.php` file.

## Built In Blocks

Aquamin comes with a few blocks preinstalled.

1. *The `aquamin/assets/block-library/grd` Grid Block*: This block supports advanced, responsive layout grids.
2. *The `aquamin/assets/block-editor/format-type-year` Format Type*: This format type allows you to essentially add "YYYY" to a paragraph, which gets converted to the current year via PHP—very useful for footer copyrights.

Feel free to edit or delete these blocks to suit your needs.

## Deleting Blocks

There is currently a bug in Parcel: if you delete a block's directory to remove the block, you'll need to exit Parcel and run `npm run clean:cache` to clear the cache, then `npm run start` to restart the server; after that, your block will be removed from WordPress's registered bocks list, and you'll have left no code bloat behind.

?> You can run `npm run clean:cache && npm run start` if you would like to clear the cache immediately before starting the build server each time.

!> If you _don't_ follow these instructions and you delete a file Parcel was watching, builds will fail. Maybe future releases of Parcel will eliminate this bug. It appears to happen when one file imports another, but then the imported file later gets deleted: Parcel continues to look for that deleted file—even after restarting—if you don't clear its cache first.
