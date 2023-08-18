This is an example of MDXEditor embedded in a Next.js app.

Important things to note:

- `next.config.js` is modified to transpile the editor and the diff-view packages, otherwise `npm run build` throws an error. Grab the rest of the modifications from there, too.
- tailwind base is removed from `tailwind.config.js`, otherwise the editor styles are broken since lists, headings, etc miss their distinct styling.
- The component and its plugins are in a separate file that gets dynamically imported so that Next.js does not try to render it on the server.
