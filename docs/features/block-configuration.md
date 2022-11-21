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

Aquamin makes it super easy to add and configure blocks.

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## Creating Blocks
The easiest way to create blocks is to run `wp aquamin block` (see aquamin's [WP-CLI docs](/features/wp-cli/)). If you have parcel running, just refresh WordPress and the block will immediately be available as a registered block.

### Manually
{: .no_toc }

If you'd prefer to add blocks manually rather than via WP-CLI, you can copy the `aquamin/includes/cli/templates/_template-block` directory and paste it into `aquamin/blocks/block-library`, rename your directory, then find and replace the following within it: in the parent block, `template-slug`, `_template-block`, `TemplateNamespace`, `template-title`, `template-desc`; in the inner block (optional), `template-item-slug`, `TemplateItemNamespace`, `template-item-title`, `template-item-desc`.

If you'd like to remove the inner block that's pre-configured after manually creating a block like this, remove the 2nd `register_block_type_from_metadata` function within `index.php`, and the inner block import under the `Register inner blocks` heading within `index.js`.

## Deleting Blocks

If you delete a block's directory to remove the block, you'll need to exit parcel and run `npm run clean` to clear the cache, then `npm run start` to restart the server; after that, your block will be removed from WordPress's registered bocks.

> _Note:_ if you _don't_ do this, builds will fail. Maybe future releases of Parcel will eliminate this requirement. It appears to happen when one file imports another, then the imported file gets deleted: Parcel continues to look for that deleted file—even after restarting—if you don't clear its cache first.

## Anatomy of a Block

All blocks reside within the `blocks/block-library` directory. Blocks are organized as follows:

```
📂 blocks
┗ 📂 block-library         // all blocks reside within blocks/block-library/*
   ┗ 📂 example-block      // generally the block's name
      ┣ 📄 block.json      // details about block registration
      ┣ 📄 edit.js         // HTML shown in the block editor
      ┣ 📄 editor.css      // styling for block editor (also imports front-end's style.css)
      ┣ 📄 index.js        // block entry file (mostly imports other files)
      ┣ 📄 index.php       // PHP block registration (and optionally dynamic block PHP)
      ┣ 📄 save.js         // HTML saved to database
      ┣ 📄 script.js       // optional script that runs on site's front-end only
      ┣ 📄 style.css       // front-end styling
      ┗ 📂 inner-block     // nested block used only by the parent block (optional)
         ┣ 📄 block.json   // details about inner block registration
         ┣ 📄 edit.js      // HTML shown in the block editor
         ┣ 📄 index.js     // block entry file (mostly imports other files)
         ┗ 📄 save.js      // HTML saved to database
```

Inner blocks use the parent block's `editor.css`, `style.css`, and optional `script.js` so you needn't jump between many files to build related functionality (e.g. you can edit a Slider block and its inner Slide block in the same place since they're so tightly interrelated).

> _Note:_ The `blocks/blocks.js` and `blocks/editor.js` files import file glob patterns (e.g. `./block-library/*/index.js`) to make it easy to add blocks—as soon as you add a new block directory, parcel takes care of registering it with WordPress without further coding. Because of this, all files within block directories must be named as shown here.

# Dynamic Blocks
Aquamin's WP-CLI command for creating blocks doesn't currently support automatic creation of dynamic blocks, but you can simply uncomment the dynamic

# Front-End Scripts