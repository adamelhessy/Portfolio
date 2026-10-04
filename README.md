# Adam Elhessy - Portfolio

Static site (HTML + CSS + a little JavaScript, no build step).

```
index.html           page content
css/style.css        main design
css/animations.css   animations, project thumbnails, contact form, mobile nav fix
js/main.js           scroll reveal + contact form
images/              photos and project screenshots
```

- Open `index.html` in a browser to preview.
- Deploy by uploading the folder to Vercel, Netlify or GitHub Pages.

## Contact form

The form posts to [FormSubmit](https://formsubmit.co). The first time anyone submits it, FormSubmit emails an activation link to the address used in `js/main.js` and `index.html`. Click it once and messages will arrive normally.

## Replacing a project image

Save the screenshot in `images/` and change the `src` of that project's `<img>` in `index.html`. Thumbnails are shown at a 2.7:1 crop.
