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

Installation is simple!

**Option 1:** you can install via the wp-cli:

```
wp theme install --activate https://github.com/tcmulder/aquamin/archive/refs/heads/v4.0.0.zip
```

**Option 1:** you can install manually:
1. Download the theme ([download link](https://github.com/tcmulder/aquamin/archive/refs/heads/master.zip){:download="download"}).
2. In your admin panel, go to *Appearance > Themes* and click the *Add New* button.
3. Click *Upload Theme* and *Choose File*, then select the theme's .zip file. Click *Install Now*.
4. Click *Activate* to start using aquamin.

## Setup
After initial installation, here's how you get started with the theme.

1. Fire up your local server
2. `cd` into the theme's directory.
3. Run `npm install`.
4. Run `wp aquamin setup`.
5. Run `npm run start` for your development server, or `npm run build` for production builds.

You're all set!

## Requirements

Aquamin works with the following versions of things:

| Requirement       | Minimum Version |
| :---------------- | :-------------- |
| WordPress         | 6.0.1           |
| PHP               | 8.0.1           |
| Node              | 16.13.2         |
| WP-CLI (optional) | 2.6.0           |

Note that I haven't done testing in older versions, but aquamin may still work—feel free to give it a try!