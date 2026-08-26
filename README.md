# Plain Firebase Chat Room

5 files, no build step, no framework:

- `index.html` — Google sign-in + first-time username setup
- `chat.html` — the chatroom (messages, settings, admin controls)
- `banned.html` — shown to banned users (separate page/rules, not a client-side flag)
- `firebase-config.js` — your Firebase project keys, imported by the other pages
- `firestore.rules` — security rules (this is what actually enforces bans/admin, not the JS)

## Setup

1. **Create a Firebase project** at console.firebase.google.com.
2. **Authentication** → Sign-in method → enable **Google**.
3. **Firestore Database** → create a database (production mode is fine, you're pasting in custom rules anyway).
4. **Project settings → General → Your apps** → add a Web app → copy the `firebaseConfig` object it gives you into `firebase-config.js`, replacing the placeholder values.
5. **Firestore → Rules** → paste in the contents of `firestore.rules` → Publish.
6. `ADMIN_EMAIL` in `firebase-config.js` is already set to `am1onionyt@gmail.com`. That account gets the Delete/Ban buttons in chat and is exempt from the ban check. Change it there (and in `firestore.rules`) if that ever needs to change.

## Hosting it

These use ES module `import`s, so opening `index.html` directly via `file://` won't work — it needs to be served over http(s). Easiest options:

- `firebase init hosting` in this folder, then `firebase deploy` (free, and lives on a `*.web.app` domain).
- Or just drag the folder into any static host (Netlify, GitHub Pages, Vercel, etc).
- For local testing: `python3 -m http.server` in this folder, then visit `http://localhost:8000`.

Add whatever domain you deploy to under **Authentication → Settings → Authorized domains**, or Google sign-in will reject it.

## How the ban actually works

Banning writes a doc to `bans/{their-uid}` with a reason. Two things enforce it:

1. **Firestore rules** block that uid from creating new messages at all — this holds regardless of anything happening in the browser.
2. The client checks `bans/{uid}` on load and redirects to `banned.html`, which is a separate static page (not just a hidden div toggled by a JS boolean), so there's nothing to flip in devtools to get back into the chat UI. Real access is still gated by the rules either way.

## Notes / things you might want to add later

- No message editing, only delete.
- Banning doesn't retroactively delete their old messages — only blocks new ones. Add a batch delete in `banUser()` if you want that too.
- Usernames are unique but not linked to auth display name — someone signing in with a different Google account can't reuse a taken username.
- No message length/rate limiting beyond the 1000-char input cap — add rules-side checks if you want to guard against spam bots.
