# Design reference

Screenshots of the site as it was before the Wild Robot Challenge revamp, taken on 29 October 2026 from `main` (commit 2d4f8b8). Use them to check that the revamp keeps the original colours and layout.

- **Widths:** `desktop-*` is 1440 px wide; `mobile-*` is 390 px wide.
- **Pages:** home, about, bots, contact, applications, login, adventures (also shown with card 1 and card 2 opened), and lesson slides (lesson 1 video, quiz and mBot2 slides; lesson 2 input and summary slides).
- **Pages behind the login:** captured with a placeholder session, so the lesson 2 summary list is empty.
- **External media:** the NASA hero images, Google Drive videos and YouTube embeds couldn't load where these were taken, so those areas show as dark or empty blocks. Content from the site's own files (local images and videos) loaded normally.

## Design tokens (`src/index.css`)

| Token | Value | Used for |
|---|---|---|
| `--color-accent-primary` | `#f3961c` (orange) | Buttons, active nav link, highlights |
| `--color-accent-secondary` | `#1ca6f3` (azure) | Secondary buttons, badges |
| `--color-primary-text` | `#252525` | Body text, dark footer |
| `--color-secondary-text` | `#333` | Secondary text |
| `--color-background-light` | `#fff` | Page background |
| `--color-background-subtle` | `#faf4f5` | Alternate section background |
| `--color-border` | `#ccc` | Borders |
