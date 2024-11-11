Thanks for this cool challenge. Really enjoyed doing it.

The description and instructions were clear and very informative.

The project has been deployed into vercel and is accessible in this url:
https://my-leonardo.vercel.app/

Web Demo:

![](web.mp4)

Mobile Size Demo:

![](mobile.mp4)
## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Notes and Improvements:
- Chakra doesn't have code sand boxes for its demos and components, which is something that for example Material UI offers, this makes it harder to customze the components

- The returned type of a query has to be hardcoded manually, would be nicer to use type generators like `graphqlCodegen`

- Adding a `Log out` functionality
- Improving the pagination to navigate through a series of pages
- Improve the loading states, like using skeleton
- Add toast notifications