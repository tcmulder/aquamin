---
title: Theme Configuration
permalink: /features/theme-configuration/
layout: default
nav_order: 1
# has_children: true
parent: Features
---

# Theme Configuration
{: .no_toc }

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## Aquamin's Component Philosophy
All sites are built out of a collection of components, and aquamin capitalizes on this by making it _really_ easy to work with components.

Much like blocks, each component is it's own self-contained directory (with a few global exceptions) where you'll handle all development for that particular piece of the site (it may help to read [aquamin's block philosophy](/aquamin/features/block-configuration/#aquamins-block-philosophy) for more on that).

But, there's a lot more variety to components than blocks, so aquamin keeps things flexible and mostly manual. The main thing to keep in mind is that aquamin automatically includes all `style.css` styling on the front-end, all `editor.css` styling in the block editor's back-end, all `script.js` JavaScript on the front-end, and your HTML/PHP should go in `markup.php` files (you'll need to manually include them with `get_template_part()` where they're needed). Just name the files within your components accordingly.

### Examples

A good example component is the `aquamin/components/component-library/menu` component, which is where you'll build the site's navigation.

```
📂 components
 ┗ 📂 component-library
   ┗ 📂 menu          // the component's unique name
     ┣ 📄 markup.php  // html for the component (this one is included from header.php) 
     ┣ 📄 script.js   // javascript for activating the mobile navigation, etc.
     ┗ 📄 style.css   // styling for the navigation
```
{: .short-line-height }

Notice that within the normal WordPress `header.php` template, we use `get_template_part()` to grab the `markup.php` file shown here: that lets us have all files associated with the navigation component within this single component directory.

For convenience, you can also include features here that don't quite fit the "component" concept in a traditional sense. Take WordPress styling overrides for instance:

```
📂 components
 ┗ 📂 component-library
   ┗ 📂 wp-overrides  // the "component's" unique name
     ┣ 📄 editor.css  // wp styling overrides within the block editor
     ┗ 📄 style.css   // wp styling overrides for front-end
```
{: .short-line-height }

Here, we add some styling to the front-end (`style.css`) and block editor (`editor.css`).

### Directory Structure

Here's how aquamin is set up to start—then, you'll edit these files and add your own component directories as you're bulding the site.

```
📂 components
 ┣ 📂 normalize             // global styling for common html elements you'll customize
 ┣ 📂 util                  // js utility functions (used across multiple components)
 ┣ 📄 theme.bundle.js       // theme entry file (mostly imports other files)
 ┣ 📄 theme.css             // theme style entry file (coordinates css cascade)
 ┗ 📂 component-library     // all your component files should be within this folder
   ┣ 📂 content             // component: content for posts
   ┣ 📂 excerpt             // component: standard blog excerpts
   ┣ 📂 footer              // component: the site's footer
   ┣ 📂 menu                // component: the site's main navigation
   ┣ 📂 wp-overrides        // wordpress styling overrides
   📂 global                // global styling that exists across all components
   ┣ 📄 alignment.css       // block alignment customizations
   ┣ 📄 animations.css      // reusable multi-component keyframe animations (blank initially)
   ┣ 📄 common-classes.css  // common styling classes used across components
   ┣ 📄 fonts.css           // custom font imports
   ┣ 📂 fonts               // custom font files
   ┣ 📄 style.css           // main entry file (coordinates global styling cascade)
   ┗ 📄 variables.css       // css custom properties
```
{: .short-line-height }
