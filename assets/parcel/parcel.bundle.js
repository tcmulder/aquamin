// eslint-disable-next-line no-console
console.error(`
WARNING: Do not use this file for anything. It's just a weird solution to a silly quirk in Parcel.
When running a build, Parcel places bundles from assets/bundles into dist/bundles, blocks from
assets/block-library into dist/block-library, etc., i.e. everything has its own directory. That
is, except initially, when there are no blocks within assets/block-library: in that case, since
absolutely everything it's building from resides within the same directory, it' writes all the
bundles in the root of dist/, breaking the enqueues that are expecting these within dist/bundle.

I get why it's doing this; for example, assets/bundles could be placed in dist/assets/bundles,
but it removes "assets" since everything's within that directory, thus simplifying enqueue paths.
The problem is, paths change if Parcel starts seeing different files to watch, which isn't good...

Anyway, this file makes Parcel create a dist/parcel directory, which forces bundles to always be
within dist/bundles even if there are no blocks within assets/block-library. Once you have blocks
in assets/block-library and are not planning on removing them, you can safely delete this entire
assets/parcel/ directory and restart Parcel.
`);
