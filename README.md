# yaphoa.github.io

Personal site, built by GitHub Pages with Jekyll. Three pages: About (`index.md`), Writings
(`writings/index.html`) and Others (`others/index.html`); each writing gets its own page.

## Edit the About page

Everything is in `index.md`: the fields at the top (name, photo, role, links, interests,
education, experience) and the bio text below them. A link with `icon: github`, `icon: linkedin`, `icon: kaggle` or `icon: email` shows as an
icon; without `icon` it shows as text.

## Edit the Others page

Hobby projects are the `projects` list at the top of `others/index.html`: a `name`, a `url`, and
optionally a one-line `description`.

## Add a writing

Create `_posts/YYYY-MM-DD-some-title.md`:

```markdown
---
layout: post
title: Some title
---

The text, in Markdown.
```

It appears on the Writings page and in the RSS feed once pushed.
