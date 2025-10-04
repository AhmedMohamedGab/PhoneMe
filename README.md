# PhoneMe

PhoneMe is a small, client-side Product Management System (PMS) for a phone store. It is a static HTML/CSS/JavaScript app that lets you create, edit, search, and remove products. Data is stored in the browser's Local Storage so you can keep your product list between sessions on the same device and browser.

## Features

- Create new product entries (name, category, count, price, tax, ads, discount)
- Live total calculation (price + tax + ads - discount)
- Edit existing products
- Incremental removal (delete a single item) and remove whole products
- Delete all products
- Search by product name or category (live search)
- Data persisted in Local Storage

All completed features are tracked in `functionality requirements.md`.

## Files

- `index.html` — main UI
- `style.css` — custom styles and theme
- `main.js` — application logic (create, update, delete, search, localStorage)
- `functionality requirements.md` — short checklist of implemented features

## How to run

- Open `index.html` in a browser, or run a local server (e.g. `python -m http.server 8000`) and open http://localhost:8000.

## License

This project is provided under the MIT License — feel free to copy, reuse, and modify.
