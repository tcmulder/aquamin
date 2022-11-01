---
title: Quickstart
permalink: /quickstart/
layout: default
nav_order: 2
# has_children: true
# parent: Page Title
---

# Quickstart
{: .no_toc }

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## Installation

Run `wp theme install --activate https://github.com/tcmulder/aquamin/archive/refs/heads/master.zip` to install using wp-cli, or [download aquamin](https://github.com/tcmulder/aquamin/archive/refs/heads/master.zip){:download="download"} directly and [install the theme manually](https://wordpress.org/support/article/using-themes/#adding-new-themes-using-the-administration-screens){: target="_blank"}.

## Setup
Once you've installed aquamin, you're ready to set up the development environment.

1. Fire up your local server (most [local servers](https://wordpress.org/support/article/installing-wordpress-on-your-own-computer/){: target="_blank"} should work fine, see [requirements](/features/requirements/)).
2. Visit the them's directory in your console via `cd wp-content/themes/aquamin`.
3. Run `npm install` to set up the build tool.
4. Run `npm run start` to fire up the dev server (`npm run build` runs a production build).
5. Optionally, run `wp aquamin setup` ([learn more about the setup](/features/wp-cli/#setup)).

You're all set! Next up, familiarize yourself with the aquamin [directory structure and concepts](/features/structure-and-concepts/).
