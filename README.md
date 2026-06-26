# Earn Craft Page-wise Premium Website

මෙය Earn Craft සහ Earn Money සඳහා සකස් කළ modern, page-wise, mobile-friendly static demo website package එකකි.

## විවෘත කරන ආකාරය

1. ZIP file එක extract කරන්න.
2. `index.html` file එක double-click කරන්න.
3. XAMPP, WAMP, database හෝ server අවශ්‍ය නැත.

## Pages

- `index.html` — Home page
- `earn-craft.html` — Earn Craft video-by-video buying page
- `craft-login.html` — Earn Craft separate login/register
- `earn-money.html` — Earn Money lifetime access + videos + micro jobs page
- `money-login.html` — Earn Money separate login/register
- `guide.html` — Sinhala instructions page
- `about.html` — About page
- `contact.html` — Contact page
- `admin.html` — Admin panel

## Main structure

- Earn Craft: videos එකින් එක request කිරීම.
- Earn Money: එක් payment එකකින් lifetime access request කිරීම.
- Earn Craft login සහ Earn Money login දෙක එකිනෙකට සම්බන්ධ නොවේ.
- Admin panel එකෙන් Earn Craft section සහ Earn Money section වෙන වෙනම manage කළ හැක.

## Admin demo login

Email: `admin@earncraft.lk`
Code: `1234`

## WhatsApp number වෙනස් කරන ආකාරය

`assets/js/app.js` සහ `assets/js/admin.js` files දෙකේ ඉහළින් ඇති:

```js
const WA_NUMBER = '94762041031';
```

මෙය ඔබගේ WhatsApp number එකට අනුව වෙනස් කරන්න. Sri Lanka number එක `94` සමඟ, මුල `0` නැතිව ලියන්න.

## Buttons

මෙම version එකේ සියලු main action buttons English වලින් සකස් කර ඇත. Sinhala users සඳහා headings, explanations සහ instructions Sinhala වලින් තබා ඇත.

## GitHub Pages publish කිරීම

1. GitHub repository එකක් සාදන්න.
2. මෙම files repository එකට upload කරන්න.
3. Repository Settings → Pages යන්න.
4. Branch ලෙස `main` තෝරන්න.
5. Save කරන්න.

## වැදගත් සටහන

මෙය static demo website එකකි. Login, approval, requests, contact messages වැනි දේ browser `localStorage` තුළ පමණක් සුරකිනු ලැබේ. Real paid video system එකක් සඳහා backend server, secure database, real authentication, payment verification සහ private video hosting අවශ්‍ය වේ.
