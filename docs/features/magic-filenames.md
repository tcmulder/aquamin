# Magic Filenames

More information is available under the [Block Configuration](/features/block-configuration) and [Component Configuration](/features/component-configuration) sections, but below is a simpler summary of file naming conventions used by aquamin, magic filenames or prefixes that aquamin automatically handles for you via webpack.

### `view` files in the format _`optional-prefix-` `view` `.extension`_

Aquamin automatically compiles files named or ending in _view_ to separate files. These files are intended to be enqueued on the front-end of the website only on pages where they are needed.

So, `my-block-view.js`, `my-component-view.css`, or `view.scss` would all automatically compile to separate files within the `dist` directory, and should only be enqueued on pages where they're needed.


### `theme` files in the format _`optional-prefix-` `theme` `.extension`_

Aquamin automatically compiles files named or ending in _theme_ to a single file. These files are intended to be enqueued globally on the front-end of the website.

So, `my-block-theme.js`, `my-component-theme.css`, or `theme.scss` would all automatically compile to the `dist/global/theme.bundle.js` or `dist/global/theme.bundle.css` files, which aquamin enqueues on all pages on the front-end.

### `editor` files in the format _`optional-prefix-` `editor` `.extension`_

Aquamin automatically compiles files named or ending in _editor_ to a single file. These files are intended to be enqueued on the back-end of the block editor.

So, `my-block-editor.js`, `my-component-editor.css`, or `editor.scss` would all automatically compile to the `dist/global/editor.bundle.js` or `dist/global/editor.bundle.css` files, which aquamin enqueues on the back-end of the block editor.

### `hooks` files in the format _`optional-prefix-` `hooks` `.extension`_

Files named or ending in _hooks_ are automatically ran by the `functions.php` file. This lets you colocate PHP functionality with your block or component.

So, aquamin would automatically run `my-block-hooks.php`, `my-component-hooks.php`, or `hooks.php` via the theme's `functions.php` file.
