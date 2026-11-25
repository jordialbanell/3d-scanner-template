# 3D Scanner

Event spaces, documented in 3D. Capture a venue with the Luma AI app, paste the capture link, and the space joins a library you can explore in 3D and pin notes to when planning the next event.

Built by [Jordi Albanell](https://jordialbanell.com/projects). Try it on [jordialbanell.com](https://jordialbanell.com/projects/3dscanner).

## What it does

- Add a space by pasting a Luma AI capture link: it becomes an explorable 3D viewer.
- Pin colour-coded notes to each space (access, power, load-in, whatever matters for the event).
- A library of every venue you have captured, to revisit when planning.
- Visitors can look; only the owner can add or edit.

## Run your own

1. **Use this template** (green button on GitHub) to make your own copy, then clone it.
2. `npm install`
3. **Database.** Create a free [Supabase](https://supabase.com) project. Open its SQL Editor and run the `supabase/` files in number order (if Supabase warns about Row Level Security, choose "Run without RLS": the files turn it on themselves). Only the app's server, with the service role key, can read or write the data.
4. **Settings.** Copy `.env.example` to `.env.local` and fill it in. `PROJECTS_OWNER_PASSWORD` is the password you'll sign in with; `PROJECTS_OWNER_SECRET` is any long random string (for example `openssl rand -hex 32`).
5. `npm run dev`, open http://localhost:3000 and sign in with "Owner? Sign in".
6. **Deploy.** Import the repo on [Vercel](https://vercel.com/new) and paste the same settings into its Environment Variables.

**Capturing a space:** record a slow walk-through of the venue with the free Luma AI app, let it process, then copy the capture's share link into the app.

## Built with

Next.js, React, Supabase, Luma AI (captures and viewer).

## Licence and credit

MIT licence, copyright (c) 2026 Jordi Albanell. See [LICENSE](LICENSE).

In plain words: you can use this code, change it, share it and build on it, including for paid work. The one legal condition is that **every copy keeps the copyright line and the LICENSE file**, so the code always says where it came from. Removing them breaks the licence.

If you put something live that's built on it, a "Based on 3D Scanner by [Jordi Albanell](https://jordialbanell.com)" link is appreciated.
