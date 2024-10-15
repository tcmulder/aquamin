# Animations

Right out of the box, aquamin comes with simple but sophisticated animations that are easily configurable via the block editor. They use efficient, customizable [composable animations](https://www.thinkaquamarine.com/development/composable-animations/ ':target=_blank'). (I include these animations on almost all my sites; but, since aquamin is meant to be a minimal theme, you can easily [remove animations](#opt-out-of-animations) if you don't want them).

If you ran the `wp aquamin setup` command, your pattern library will contain a post called Ani that contains many example animations.

## Block Animations

Aquamin adds an _Animations_ panel to the Gutenberg block editor sidebar for many core blocks. You can easily configure which blocks should display this panel through the `affectedBlocks` array within the `aquamin/assets/block-library/extend-ani/ani-editor.js` file.

If you add your own custom blocks to this list, the _Animations_ panel will appear for them on the back-end, and aquamin will handle attaching all the classes and observers needed to animate your blocks on the front-end—no additional configuration required.

## Viewport-Based Animations

Viewport-based animations activate once a block enters the viewport, and rewind as soon as they leave the viewport. When you select a supported block within the WordPress block editor, you'll see a menu in the block editor sidebar called _Animations_ where you can add, remove, and combine these effects.

### Delegated and Stepped

Some blocks that support animation contain multiple sub-elements, and you can animate these in sequence with a subtle delay between each. For instance, if you attach animations to the `core/buttons` block, it instead applies those animations to the `core/button` blocks nested within it, and staggers their start times a bit. If you would like to add this effect to your own custom blocks, add a class of `ani-parent` to the main block container (the one that employs the `useBlockProps` call) and `ani-child` to the sub-elements to which you would like to delegate the animations.

## Load-Based Animations

Load-based animations can be useful for heros or other features that appear immediately upon site load. There's no built-in way of attaching on-load animations through the WordPress interface like there is for viewport-based animations though: you'll have to add a class of `ani--load` to an element, plus the animation types you want it to use (e.g. `class="ani--load ani--opacity ani--up"` would fade in and up on load). 

?> Load based animations are especially useful for a hero's image element, because the script will smartly wait for either the image to load or it to be retrieved from cache, allowing the animation to begin _only_ after the element is able to be shown. If you just attach a normal viewport-based animation to the same image, it's possible that a half loaded image will begin fading in as soon as JavaScript has loaded.

## Scroll-Based Animations

While not nearly as robust as something like [Greensock](https://greensock.com/ ':target=_blank'), aquamin includes support for simple, lightweight animations that scrub smoothly based on your scrollbar movement. It has built in support for the `core/cover` block, adding a parallax effect to the bock's background media.

Under the hood, a custom property called `--ani-plx` is simply going from 1 to 0 as elements with a class of `ani--parallax` enter then leave the viewport (i.e. `--ani-plx` is `1` as soon as the element enters the viewport, `0.5` once it has scrolled to the center of the viewport, and `0` once it has been fully scrolled out of view again). So, you can use it for a wide variety of other animations using CSS `calc()` functions.

You can also pass in `false` as a 2nd argument within the `aquamin/assets/block-library/extend-ani/ani-theme.js` to base the scroll on the _window_ height rather than the _element_ height; this is useful in some scenarios, like when you want multiple animations to occur at the same speed even though the elements themselves vary in height.

## Background-Based Animations

Aquamin has two animations that pin an element's background while the rest of the page scrolls freely (available to the `core/cover`, `core/group`, and `core/columns` blocks by default). The _background_ animation is similar to `background-attachment:fixed`, pinning the background color or media behind all the page's content; the _foreground_ animation is similar to a `position:fixed` popup, covering over any content adjacent to the affected block.

## Custom Animations

In addition to the built-in animations, you can add your own via the `--ani-custom-transform` and/or `--ani-custom-filter`. Remember, you're animating _from_ an off-screen state _to_ an in-view resting state, so a complex example could look something like this:

```css
.thing.ani--blur.ani--scale:not(.is-shown) {
	--ani-custom-transform: skewX(10deg);
	--ani-custom-filter:
		drop-shadow(5px 5px 0 red)
		hue-rotate(220deg)
		drop-shadow(-5px -5px 0 red);
}
```
This would cause `.thing` elements outside of the viewport that are using the built in blur and scale animations to also be skewed and shadowed; then, when scrolled into view, `.thing` elements would animate to their non-skewed/scaled/blurred/shadowed state in the viewport.

## Opt Out of Animations
Aquamin's animations are lightweight and easy to use, but maybe they don't suit your needs. If you don't want to use them at all, simply delete the entire `aquamin/assets/block-library/extend-ani` directory.

Though a little more involved, you can also remove just specific animation features. For instance, to just eliminate background-based animations, you'd delete the `aniBackground.js` and `ani-background.css` files, then remove the two `aniBackground()` calls from `ani-theme.js`.
