---
title: Quickstart
permalink: /quickstart/
layout: default
nav_order: 2
# has_children: true
# parent: Page Title
---

# Quickstart

Installing aquamin is easiest with WP-CLI using any [local server](https://wordpress.org/support/article/installing-wordpress-on-your-own-computer/){: target="_blank"} that meets the [requirements](/aquamin/features/requirements/).

1. Run <span style="letter-spacing:-0.005em">`wp theme install --activate https://github.com/tcmulder/aquamin/archive/refs/heads/master.zip`</span>.
2. Run `cd wp-content/themes/aquamin` to enter aquamin's directory.
3. Rename the `.env.example` file to `.env` and update the URL value appropriately.
4. Run `npm install` to set up the build tool.
5. Run `npm run start` to fire up the dev server (and `npm run build` for a production build).
6. Optionally, run `wp aquamin setup` ([learn more about the setup command](/aquamin/features/wp-cli/#wp-aquamin-setup)).

You're all set! Next up, familiarize yourself with the aquamin [features](/aquamin/features/).

> _Note:_ If you'd prefer to install manually, just [download aquamin](https://github.com/tcmulder/aquamin/archive/refs/heads/master.zip){:download="download"} directly and [install the theme](https://wordpress.org/support/article/using-themes/#adding-new-themes-using-the-administration-screens){: target="_blank"}.
