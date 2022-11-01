---
title: Quickstart
permalink: /quickstart/
layout: default
nav_order: 2
# has_children: true
# parent: Page Title
---

# Quickstart

1. Run `wp theme install --activate https://github.com/tcmulder/aquamin/archive/refs/heads/master.zip` to install using wp-cli, or [download aquamin](https://github.com/tcmulder/aquamin/archive/refs/heads/master.zip){:download="download"} directly and [install the theme manually](https://wordpress.org/support/article/using-themes/#adding-new-themes-using-the-administration-screens){: target="_blank"}. (You can use whatever [local server](https://wordpress.org/support/article/installing-wordpress-on-your-own-computer/){: target="_blank"} you'd like that meets the [requirements](/features/requirements/)).
2. Visit the them's directory in your console via `cd wp-content/themes/aquamin`.
3. Run `npm install` to set up the build tool.
4. Run `npm run start` to fire up the dev server (`npm run build` runs a production build).
5. Optionally, run `wp aquamin setup` ([learn more about the setup command](/features/wp-cli/#wp-aquamin-setup)).

You're all set! Next up, familiarize yourself with the aquamin [features](/features/).
