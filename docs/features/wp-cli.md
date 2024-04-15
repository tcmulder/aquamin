# WP-CLI Commands

Aquamin has some [WP-CLI](https://developer.wordpress.org/cli/commands/ ':target=_blank') commands built in to make common development tasks easy. Each feature comes with its own `--help` docs (e.g. `wp aquamin block create --help`) which contains additional information.

## `wp aquamin block create`

This command scaffolds a new block for you, walking you through a series of prompts to name your block and generate the needed files. You'll end up with a new directory within `aquamin/assets/block-library/` that contains all your block files, ready for you to customize (learn more about [blocks in aquamin](/features/block-configuration)). Restart webpack to begin watching changes to this block's files.

## `wp aquamin component create`

This command scaffolds a new component for you, letting you name the component and choose what files it should include. You'll end up with a new directory within `aquamin/assets/component-library/` that contains all your component files, properly enqueued and ready to use. Note you'll conveniently find the get_template_part() call (including the appropriate file path) in the comment above the view.php file, if you chose to include PHP. Restart webpack to begin watching changes to this component's files.

## `wp aquamin setup`
 
This setup command does several things:

1. It imports basic footer content for you to customize under _Appearance > Global Content > Footer_. Aquamin displays this content via the footer component automatically. (Eventually this may move to the full site editor, but currently this is the best way to reliably bring the block editor into the footer.)
2. It sets up a helpful pattern library plugin. You can build your custom blocks as patterns here in order to test common use cases (e.g. showing multiple block options all in one place for testing, or adding your block over multiple background colors to test aesthetics and readability). This pattern library is visible only on localhost, and to logged in users on other servers.
   1. It imports content featuring aquamin's core block customizations, animations, and small suite of pre-installed blocks for you to preview as patterns in the library.
   2. It features a style guide for you to test global styling of all common HTML elements in one place.
   3. It features a playground to experiment with custom blocks somewhere site visitors can't accidentally stumble across. 

?> You're encouraged to use the pattern library for developing your own blocks, too. If you'd like to pre-install some of your own aquamin-compatible blocks on future sites, simply add that block's directory to `aquamin/assets/block-library/` and then include the block's pattern [WXR file](https://developer.wordpress.org/cli/commands/export/ ':target=_blank') (e.g. `wp export --post__in=123`) in the `aquamin/includes/cli/demo-content/` directory before running `wp aquamin setup`, and your block will be imported alongside aquamin's small suite of standard blocks.
