/**
 * Sync window's browsersync CSS injection with block editor iframe
 *
 * Browsersync only injects CSS into the <head> of the window, and
 * therefore doesn't know to inject CSS into the <head> of the block
 * editor iframe. This script watches the window's <head> and syncs
 * browsersync changes with the block editor's iframe.
 */
window.addEventListener('load', () => {
	// if we have browsersync
	if (typeof ___browserSync___ !== 'undefined') {
		// get the block editor iframe
		const iframe = document.querySelector('[name="editor-canvas"]')
			?.contentWindow?.document;
		if (iframe) {
			// watch for changes to <head> of the main window
			const observer = new MutationObserver((mutations) => {
				mutations.forEach((mutation) => {
					// get the changed node's ID
					const id = mutation.addedNodes[0]?.id;
					if (id) {
						// sync href from the window's <link> to the iframe's <link>
						const outer = document.getElementById(id);
						const inner = iframe.getElementById(id);
						if (inner?.href !== outer?.href) {
							inner.href = outer.href;
						}
					}
				});
			});
			// observe <head> for changes (browsersync replaces a <link> with a new one containing a new cache hash)
			observer.observe(document.head, { childList: true });
		}
	}
});
