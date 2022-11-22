---
title: Block Configuration
permalink: /features/block-configuration/
layout: default
nav_order: 2
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

## Aquamin's Block Theory

Aquamin takes an approach that makes it easy to create blocks, remove them, or even transfer them to future aquamin-themed sites. To do this, each block is it's own self-contained directory with all files necessary for it to function contained within it. So, adding a block is as easy as pasting in that block's directory, and removing it is as easy as deleting it's directory—no hunting down multiple files and imports spread throughout the theme.

## Creating Blocks
The easiest way to create blocks is to run `wp aquamin block` (see aquamin's [WP-CLI docs](/features/wp-cli/)). If you have parcel running, just refresh WordPress and the block will immediately be available as a registered block.

### Front-End JavaScript Option

The `wp aquamin block` command will ask if you want to add a `script.js` file to your block that will be immediately available for front-end scripts. Under the hood, `aquamin/blocks/blocks.js` is simply importing all `./block-library/*/script.js` files, so you can easily remove or re-add this file later.

If you'd like to break the front-end scripts into multiple files, you can use this `script.js` file as an entry point and organize your additional files as desired within the block's directory.

### Inner Blocks Option

The `wp aquamin block` command will ask if you'd like an inner block set up. This is a common pattern if your parent block requires a codependent inner block (e.g. a Slider parent block with multiple Slide inner blocks). The styling and front-end scripts for the inner blocks is handled by the parent block's files so you don't need to edit things in multiple files (see [Anatomy of a Block](#anatomy-of-a-block) for more details).

### Dynamic Block Option

Though JavaScript is the preferred method for creating blocks, some will require dynamically up-to-date data from the database (e.g. a "latest blog posts"). So, `wp aquamin block` will ask if you need a dynamic block, and create the necessary files if so. (Note that it doesn't currently provide automated inner block setup if you choose to go dynamic: if you need that, you'll have to add your inner block manually.)

## Anatomy of a Block

Each block has its own block directory within the `aquamin/blocks/block-library/` directory. All the block's files are contained within its block directory. Note that inner blocks use the parent block's `editor.css`, `style.css`, and optional `script.js` files so you needn't jump between so many files while you're working on the block as a whole.

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

> _Note:_ The `blocks/blocks.js` and `blocks/editor.js` files import file glob patterns (e.g. `./block-library/*/index.js`) to make it easy to add blocks—as soon as you add a new block directory, parcel takes care of registering it with WordPress without further coding. Because of this, all files within block directories must be named as shown here.

## Deleting Blocks

If you delete a block's directory to remove the block, you'll need to exit parcel and run `npm run clean` to clear the cache, then `npm run start` to restart the server; after that, your block will be removed from WordPress's registered bocks. You can run `npm run clean && npm run start` if you would like to clear the cache immediately before starting the build server each time.

> _Note:_ if you _don't_ do this and you delete a file Parcel was watching, builds will fail. Maybe future releases of Parcel will eliminate this requirement. It appears to happen when one file imports another, but then the imported file later gets deleted: Parcel continues to look for that deleted file—even after restarting—if you don't clear its cache first.