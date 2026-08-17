# Urban Links

**URBANLINKS UBER & HIRE TRANSPORT**
Ph +675 7858 2833  |  urbanlinks.uberhire@gmail.com
IPA Reg: 6-149030735
PO Box 2111, Port Moresby, NCD, PNG

A trip logbook and client payment book that lives entirely on one phone. No account, no server, no signal needed after the first load.

Repository: `https://github.com/MFave-xtc/urbanlinks`
Live address once Pages is on: `https://mfave-xtc.github.io/urbanlinks/`

## What it does

- Log a trip: date, time, client, pick up, drop off, fare, notes
- Mark each trip **Paid now** or **On account**
- Two client types: **Upfront** and **Each fortnight**, with an expected fortnight amount
- Record payments against a client, part payment or full
- Running balance per client, plus total owing across the whole book
- Fortnight view built off a pay-cycle anchor date set once
- Send a client a statement of account, or a receipt for a payment, over WhatsApp or the phone share sheet
- Business details are prefilled and print on every statement and receipt
- Backup to a file, restore from a file, export trips and payments to CSV

## Files in this repo

```
index.html                 the whole app, one file
sw.js                      service worker, makes it work offline
manifest.webmanifest       lets it install to the home screen
icon-192.png
icon-512.png
icon-maskable-512.png
README.md
```

All paths inside the app are relative, so it runs correctly from the `/urbanlinks/` subfolder without any changes.

## Push it up

```bash
git clone https://github.com/MFave-xtc/urbanlinks.git
cd urbanlinks
# copy the six files into this folder, then
git add .
git commit -m "Urban Links trip and payment book"
git push origin main
```

If you would rather not use the command line, open the repo on github.com, click **Add file > Upload files**, drag the files in, and commit.

## Turn on GitHub Pages

1. In the repo, go to **Settings > Pages**.
2. Source: **Deploy from a branch**.
3. Branch: `main`, folder: `/ (root)`. Save.
4. Give it a minute, then open `https://mfave-xtc.github.io/urbanlinks/`.

HTTPS is required for the service worker and for install to home screen. Pages provides it automatically.

## Install on her phone

**Android, Chrome:** open the link, tap the three dots, then **Install app** or **Add to Home screen**.

**iPhone, Safari:** open the link, tap the Share button, then **Add to Home Screen**.

It then opens full screen with no browser bar and works with no signal.

## First run

Open **More** and set two things:

- **Business details** are already filled in with the trading name, phone, email, IPA registration and postal address. Check them under More and correct anything that changes.
- **Fortnight starts on** should be any Monday that a real pay fortnight began. Every fortnight in the app counts forward from that date, so choose one that lines up with her clients' pay cycle.

Then add clients under **Clients**, and start logging trips.

## Important: back it up

All data sits in this one browser's storage on this one phone. It survives closing the app and restarting the phone. It does **not** survive clearing browser data, deleting the app, or losing the phone.

Tap **More > Save backup file** at the end of each fortnight and keep the file somewhere safe. **Restore from backup** puts everything back on any phone.

## Updating the app later

Push a new `index.html`, then bump the cache name in `sw.js` from `urbanlinks-v1` to `urbanlinks-v2`. Without that bump, phones that already installed it keep serving the old cached copy.

## Notes

- Amounts are Kina, shown as K with two decimals.
- Removing a client keeps their trips in the logbook but drops the name and clears the debt, so the money history stays honest.
- Phone numbers of 8 digits are treated as PNG and get the 675 prefix for WhatsApp.
