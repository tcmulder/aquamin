---
title: Animations
permalink: /features/animations/
layout: default
nav_order: 6
# has_children: true
parent: Features
---


# Animations
{: .no_toc }

Aquamin by default comes with sophisticated animations that are easily configurable via the block editor. (I include them on almost all my sites; but, since aquamin is meant to be a minimal theme, you can easily [remove animations](#remove-or-customize-build) if you'd like, too).

If you ran the `wp aquamin setup` command, your pattern library will contain a post called Ani that contains many example animations.

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

## Block Animations

Aquamin adds animation options to many of the WordPress core blocks. If you would like to add your own, you can do so by adding your block's name to the `affectedBlocks` array within the `aquamin/blocks/block-library/extended-ani/index.js` file. You can also eliminate core blocks from this list if you do not want them to support animations.

## Viewport-Based Animations

Viewport-based animations activate once a block enters the viewport, and rewind as soon as they leave the viewport. When you select a supported block within the WordPress block editor, you'll see a menu in the block editor sidebar called Animations where you can add and removed the desired effects.

### Delegated Stepped Animations
{: .no_toc }

Some blocks that support animation contain multiple sub-elements, and you can animate these in sequence with a subtle delay between each. For instance, if you attach animations to the `core/buttons` element, it instead applies those animations to the `core/button` blocks nested within it, and staggers their animations a bit. If you would like to add this effect to your own custom blocks, add a class of `ani-parent` to the main block container (the one that employs the `useBlockProps` call) and `ani-child` to the sub-elements to which you would like to delegate the animations.

## Load-Based Animations

Load-based animations can be useful for heros or other features that appear immediately upon site load. There's no built in way of attaching it through the WordPress interface like there is for viewport-based animations though: you'll have to add a class of `ani--load` to the element and then attach the desired animation property classes (e.g. `ani--opacity ani--up`). 

> _Note:_ It is especially useful if you attach .ani--load to an image element, because the script will smartly wait for either the image to load or it to be retrieved from cache, allowing the animation to begin _only_ after the element is able to be shown. If you just attach a normal viewport-based animation to the same image, it's possible that a half loaded image will begin fading in as soon as JavaScript has loaded.

## Scroll-Based Animations

While not nearly as robust as something like [Greensock](https://greensock.com/){: target="_blank"}, aquamin includes some simple, lightweight animations that scrub smoothly based on your scrollbar movement, creating a parallax effect. In the block editor, you'll have the option to choose Parallax for blocks that support this (mainly the `core/cover` block).

## Background-Based Animations

Aquamin has two animations types that pin an element's background from moving while still allowing the content within it to scroll. On the `core/cover` block, you can apply a Background animation which will pin the background behind surrounding content, or Foreground animation which will pin the background above surrounding content (much like a popup). This works for background colors, images, videos, etc.: whatever you choose as a background for the `core/cover` block you're animating.

## Custom Animations

In addition to the built-in animations, you can add your own using the `--ani-custom-transform` and/or `--ani-custom-filter` variables. Remember, you're animating _from_ a off-screen state _to_ a final resting state, so your code will look something like this:

```css
.ani:not(.is-shown) {
	--ani-custom-transform: skewX(10deg);
	--ani-custom-filter:
		drop-shadow(5px 5px 0 red)
		hue-rotate(220deg)
		drop-shadow(-5px -5px 0 red);
}
```

## Opt Out of Animations
{: .no_toc }

If you don't want to use aquamin's animation system at all, simply delete the entire `aquamin/blocks/extended-blocks/extended-ani` directory. You can also remove specific animation features by removing the related imports, files, and function calls.
