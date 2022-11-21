---
title: Theme Configuration
permalink: /features/theme-configuration/
layout: default
nav_order: 1
# has_children: true
parent: Features
---

# Theme Configuration
{: .no_toc }

Aquamin makes it super easy to add and configure blocks.

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## Creating Blocks

The easiest way to create blocks is to run `wp aquamin block` (see aquamin's [WP-CLI docs](/features/wp-cli/)). If you have parcel running, just refresh WordPress and the block will immediately be available as a registered block.

If you'd prefer to add blocks manually rather than via WP-CLI, you can copy the `includes/cli/templates/_template-block` directory and paste it into `blocks/block-library`, then find and replace the following:

### Parent Block:
{: .no_toc }
1. template-slug
2. _template-block
3. TemplateNamespace
4. template-title
5. template-desc

### Inner Block (optional):
{: .no_toc }
1. template-item-slug
2. TemplateItemNamespace
3. template-item-title
4. template-item-desc

## Deleting Blocks

If you delete a block's directory, you'll need to exit parcel and run `npm run clean` to clear the cache, then `npm run start` to restart the server; after that, your block will be removed from WordPress's registered bocks.

## Anatomy of a Block

All blocks reside within the `blocks/block-library` directory. Blocks are organized as follows:

```
📂 blocks
┗ 📂 block-library
   ┗ 📂 example-block      // all blocks reside within block-library/*
      ┣ 📄 block.json      // details about block registration
      ┣ 📄 edit.js         // HTML shown in the block editor
      ┣ 📄 editor.css      // styling for block editor (also imports front-end CSS)
      ┣ 📄 index.js        // block entry file (mostly imports other files)
      ┣ 📄 index.php       // PHP block registration (and optionally dynamic block PHP)
      ┣ 📄 save.js         // HTML saved to database
      ┣ 📄 script.js       // optional script that runs on site's front-end only
      ┣ 📄 style.css       // front-end styling
      ┗ 📂 inner-block     // nested block used only by the parent block
         ┣ 📄 block.json   // details about inner block registration
         ┣ 📄 edit.js      // HTML shown in the block editor
         ┣ 📄 index.js     // block entry file (mostly imports other files)
         ┗ 📄 save.js      // HTML saved to database
```

Inner blocks use the parent block's `editor.css`, `style.css`, and optional `script.js` so you needn't jump between many files to build related functionality (e.g. you can edit a Slider block and its inner Slide block at the same time).

> _Note:_ The `blocks/blocks.js` and `blocks/editor.js` files import file glob patterns (e.g. `./block-library/*/index.js`) to make it easy to add blocks—as soon as you add a new block directory, parcel takes care of registering it with WordPress without further coding. Because of this, the files within blocks must be named as shown here.