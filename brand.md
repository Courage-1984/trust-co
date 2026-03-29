# Trust Co — Brand fonts & colour palette

Reference for design and implementation. Values match [`css/style.css`](css/style.css).

## Fonts

| Role | Family | Weights | Usage |
|------|--------|---------|--------|
| **Display / headings** | [Cormorant Garamond](https://fonts.google.com/specimen/Cormorant+Garamond) | 400, 500, 600, 700 | `h1`–`h6` |
| **Body / UI** | [Inter](https://fonts.google.com/specimen/Inter) | 300, 400, 500, 600, 700 | Body copy, navigation, labels, tables |

**Google Fonts import** (already used in the site stylesheet):

```text
https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=Inter:wght@300;400;500;600;700&display=swap
```

## Colour palette

### Core brand colours

| Token (CSS) | Name | Hex | Notes |
|-------------|------|-----|--------|
| `--navy` | Midnight navy | `#0F2747` | Primary brand dark; headings; theme colour |
| `--teal` | Deep teal | `#0E5C63` | Accent; icons; highlights |
| `--gold` | Warm gold | `#C8A96B` | Accent; dividers; emphasis |
| `--grey` | Stone grey | `#6E7681` | Secondary text |
| `--ivory` | Soft ivory | `#F7F4EE` | Warm light backgrounds |
| `--white` | White | `#FFFFFF` | Page background; cards on dark |

### Extended / system colours

| Token | Hex | Typical use |
|-------|-----|-------------|
| `--navy-light` | `#1a3a62` | Navy tints / hover states |
| `--teal-dark` | `#0a4449` | Teal depth / contrast |
| `--gold-light` | `#d9bc85` | Gold highlights |
| `--text-dark` | `#1a1a2e` | Strong body emphasis |
| `--text-body` | `#3a3a4a` | Default body text |

### Shadows (reference)

Defined in CSS as `rgba(15, 39, 71, …)` at varying opacity — tied to **midnight navy** (`#0F2747`).


