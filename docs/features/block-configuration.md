---
title: Block Configuration
permalink: /features/block-configuration/
layout: default
nav_order: 1
# has_children: true
parent: Features
---

# Block Configuration
{: .no_toc }

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## Aquamin's Block Philosophy

Aquamin's goal is to make it _really_ easy to create blocks, remove them, or transfer them to future aquamin-themed sites. In order to accomplish this, each block is it's own self-contained directory, with all files necessary for it to function contained within that directory.

There's no configuration you need to do outside of that directory to get the block working, and all your development occurs within that directory so you can spend less time tracking down files across the theme's filesystem. If you want to move that block to another aquamin-compatible site in the future, you need only copy and paste it's directory into the new site (and then tweak styling to match the new site). And if you decide to get rid of a block, simply delete it's directory, and it'll leave behind no extra code bloat across other files in the theme—it's 100% gone. Easy peasy!

## Creating Blocks

The easiest way to create blocks is to run `wp aquamin block` ([see the docs](/aquamin/features/wp-cli/#wp-aquamin-block)). If you have parcel running, just refresh WordPress and the scaffolded block will immediately be available as a registered block, ready for you to customize within its own directory in `aquamin/blocks/block-library/`.

> _Note:_  If you would prefer not to use WP-CLI, simply copy the appropriate block scaffold directory out of `aquamin/includes/cli/templates/` and conduct a find and replace for the various "template" placeholder strings you'll find within its files.

### Front-End JavaScript Option

The `wp aquamin block` command will ask if you want to add a `script.js` file to your block that will be immediately available for front-end scripting. (Under the hood, `aquamin/blocks/blocks.js` is simply importing all `./block-library/*/script.js` files, so you can easily remove or add `script.js` files later.)

If you'd like to break the front-end scripts into multiple files, you can use this `script.js` file as an entry point and organize your additional files as desired within the block's directory.

### Inner Blocks Option

The `wp aquamin block` command will ask if you'd like an inner block set up. This is a common pattern if your parent block requires a codependent inner block (e.g. a Slider parent block with multiple Slide inner blocks).

You'll add styles and scripts to your inner block via it's _parent's_ `style.css` and optional `script.js` files, rather than within the inner block's directory. This simplifies things by eliminating the need to jump between multiple files to develop blocks that are so tightly coupled anyway (see [Anatomy of a Block](#anatomy-of-a-block) for more details).

### Dynamic Block Option

Though aquamin prefers blocks be built with JavaScript, in some cases blocks require up-to-date data from the database, and therefore require PHP. So, `wp aquamin block` will ask if you need a dynamic block, and will create a `markup.php` file to facilitate your edits. (Note that it doesn't currently provide automated inner block setup if you choose to go dynamic: if you need that, you'll have to add your dynamic inner block manually.)

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
{: .short-line-height }

> _Note:_ The `aquamin/blocks/blocks.js` and `aquamin/blocks/editor.js` files import file glob patterns (e.g. `./block-library/*/index.js`) to make it easy to add blocks—as soon as you add a new block directory, parcel takes care of registering it with WordPress without further coding. Because of this, all files within block directories _must_ be named as shown here.

## Deleting Blocks

There's currently a bug in Parcel. If you delete a block's directory to remove the block, you'll need to exit parcel and run `npm run clean` to clear the cache, then `npm run start` to restart the server; after that, your block will be removed from WordPress's registered bocks. You can run `npm run clean && npm run start` if you would like to clear the cache immediately before starting the build server each time.

> _Note:_ if you _don't_ do this and you delete a file Parcel was watching, builds will fail. Maybe future releases of Parcel will eliminate this requirement. It appears to happen when one file imports another, but then the imported file later gets deleted: Parcel continues to look for that deleted file—even after restarting—if you don't clear its cache first.

## Reusable Block Features

You'll find some helpful, reusable utilities and UI components under `aquamin/blocks/util` and `aquamin/blocks/ui`, respectively. You can add your own into these directories as well, or ignore them if they're not helpful to you: anything you don't use won't get bundled into the production build anyway.

## Imports

You'll notice we're importing some libraries but destructuring the `wp` object for most WordPress features. For example:

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

Many examples you'll see online just `import` everything, but I was unable to get Parcel to behave like Webpack and properly use the `wp` object without it being imported twice (and therefore throwing all manner of errors). So, until I can find a viable workaround for Parcel, if you're following an example online that shows `import {  InspectorControls } from '@wordpress/block-editor'`, you'll simply change it to `const {  InspectorControls } = wp.blockEditor`