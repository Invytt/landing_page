# Responsive Reference — Phone Screen Sizes

Sizes for testing the Invytt landing site across devices. **CSS viewport (logical) px** is what matters for layout and media queries — that's what `width=device-width` and Tailwind breakpoints see. Physical pixels = CSS px × DPR.

Test in Chrome DevTools → Device Toolbar (use the CSS viewport column). Site focus is mobile-first.

---

## Two breakpoint systems below — don't confuse them

1. **Tailwind v4 breakpoints** = the actual CSS classes in this codebase. `min-width`, starts at `sm` 640px. **Every phone in portrait is below 640 → all use unprefixed/base styles.**
2. **Phone-width buckets (xs–xl)** = a testing taxonomy *defined in this doc* to group phones by how tight their portrait width is. These are NOT Tailwind classes — they exist so you can reason about "smallest case" vs "roomy case" within the base layout.

### Tailwind v4 breakpoints (real classes)

| Prefix | min-width | Typical device |
|--------|-----------|----------------|
| (none) | 0px       | **All phones portrait** |
| `sm`   | 640px     | Large phones landscape / small tablets |
| `md`   | 768px     | Tablets portrait / unfolded foldables |
| `lg`   | 1024px    | Tablets landscape / small laptops |
| `xl`   | 1280px    | Laptops |
| `2xl`  | 1536px    | Desktops |

### Phone-width buckets (this doc's taxonomy)

| Bucket | CSS width (portrait) | Meaning |
|--------|----------------------|---------|
| **xs** | ≤ 344px  | Tiny — SE 1st gen, fold cover screens. Tightest floor; if it fits here it fits anywhere |
| **sm** | 360–375px | Standard — most Android + older/compact iPhones. **Highest-traffic band** |
| **md** | 384–393px | Modern median — iPhone 12–16, recent Pixel/Galaxy |
| **lg** | 402–414px | Large — iPhone 16 Pro, Pixel 6+, big Android |
| **xl** | 428–448px | Max — Pro Max iPhones, Pixel Pro, phablets |

> Defend **xs (320)** and optimize for **sm (360)** + **md (390-393)** — that's where the users are.

---

## iPhone (portrait)

| Model | CSS viewport | Bucket | DPR | Physical px |
|-------|--------------|--------|-----|-------------|
| iPhone SE 1 / 5 / 5S | 320 × 568 | **xs** | 2 | 640 × 1136 |
| iPhone SE 2/3 / 6/7/8 | 375 × 667 | **sm** | 2 | 750 × 1334 |
| iPhone 12/13 mini | 375 × 812 | **sm** | 3 | 1080 × 2340 |
| iPhone X / XS / 11 Pro | 375 × 812 | **sm** | 3 | 1125 × 2436 |
| iPhone 12 / 13 / 13 Pro / 14 | 390 × 844 | **md** | 3 | 1170 × 2532 |
| iPhone 14 Pro / 15 / 15 Pro / 16 | 393 × 852 | **md** | 3 | 1179 × 2556 |
| iPhone 16 Pro | 402 × 874 | **lg** | 3 | 1206 × 2622 |
| iPhone 6/7/8 Plus | 414 × 736 | **lg** | 3 | 1080 × 1920 |
| iPhone XR / 11 | 414 × 896 | **lg** | 2 | 828 × 1792 |
| iPhone XS Max / 11 Pro Max | 414 × 896 | **lg** | 3 | 1242 × 2688 |
| iPhone 12/13 Pro Max / 14 Plus | 428 × 926 | **xl** | 3 | 1284 × 2778 |
| iPhone 14 Pro Max / 15 Plus / 15 Pro Max / 16 Plus | 430 × 932 | **xl** | 3 | 1290 × 2796 |
| iPhone 16 Pro Max | 440 × 956 | **xl** | 3 | 1320 × 2868 |

---

## Samsung Galaxy (portrait)

| Model | CSS viewport | Bucket | DPR | Physical px |
|-------|--------------|--------|-----|-------------|
| Galaxy S8 / S9 | 360 × 740 | **sm** | 4 | 1440 × 2960 |
| Galaxy S10 / S10e | 360 × 760 | **sm** | 4 | 1440 × 3040 |
| Galaxy S20 / S21 / S22 | 360 × 800 | **sm** | 4 | 1440 × 3200 |
| Galaxy S23 / S24 | 360 × 780 | **sm** | 3 | 1080 × 2340 |
| Galaxy A series (common) | 360 × 800 | **sm** | 3 | 1080 × 2400 |
| Galaxy S23 Ultra / S24 Ultra | 384 × 824 | **md** | 3.75 | 1440 × 3088 |
| Galaxy S25 Ultra | 384 × 832 | **md** | 3.75 | 1440 × 3120 |
| Galaxy Note 20 Ultra | 412 × 883 | **lg** | 3.5 | 1440 × 3088 |

---

## Google Pixel (portrait)

| Model | CSS viewport | Bucket | DPR | Physical px |
|-------|--------------|--------|-----|-------------|
| Pixel 4 | 393 × 830 | **md** | 2.75 | 1080 × 2280 |
| Pixel 4a / 5 | 393 × 851 | **md** | 2.75 | 1080 × 2340 |
| Pixel 9 | 411 × 923 | **lg** | 2.625 | 1080 × 2424 |
| Pixel 6 / 7 / 8 | 412 × 915 | **lg** | 2.625 | 1080 × 2400 |
| Pixel 6 Pro / 7 Pro | 412 × 892 | **lg** | 3.5 | 1440 × 3120 |
| Pixel 8 Pro / 9 Pro | 448 × 998 | **xl** | 3.0 | 1344 × 2992 |

---

## OnePlus / Xiaomi / Oppo / Nothing (portrait)

| Model | CSS viewport | Bucket | DPR | Physical px |
|-------|--------------|--------|-----|-------------|
| OnePlus 11 / 12 | 360 × 804 | **sm** | 4 | 1440 × 3216 |
| Oppo Find X | 360 × 804 | **sm** | 3 | 1080 × 2412 |
| Xiaomi 13 / 14 | 393 × 873 | **md** | 2.75 | 1080 × 2400 |
| Redmi Note (common) | 393 × 873 | **md** | 2.75 | 1080 × 2400 |
| OnePlus 9 / 10 | 412 × 919 | **lg** | 3.5 | 1080 × 2400 |
| Nothing Phone (2) | 412 × 915 | **lg** | 2.625 | 1080 × 2412 |

---

## Foldables

| Model | State | CSS viewport | Bucket | DPR |
|-------|-------|--------------|--------|-----|
| Galaxy Z Fold 5/6 | cover (folded) | 344 × 882 | **xs** | 3 |
| Pixel Fold | cover (folded) | 379 × 729 | **md** | 2.8 |
| Galaxy Z Flip 5/6 | cover/main | 360 × 748 | **sm** | 3 |
| Pixel Fold | inner (unfolded) | 600 × 729 | tablet (`sm` Tailwind) | 2.8 |
| Galaxy Z Fold 5/6 | inner (unfolded) | 768 × 884 | tablet (`md` Tailwind) | 2.6 |

> Folded covers behave like phones (xs–sm). Unfolded crosses Tailwind `sm`/`md` → tablet layout. Test both.

---

## Tablets (cross Tailwind `sm`/`md`/`lg`)

| Device | CSS viewport portrait | Tailwind class hit | DPR |
|--------|-----------------------|--------------------|-----|
| iPad mini | 768 × 1024 | `md` | 2 |
| Galaxy Tab S9 | 800 × 1280 | `md` | 2.25 |
| iPad / iPad Air | 820 × 1180 | `md` | 2 |
| iPad Pro 11" | 834 × 1194 | `md` | 2 |
| iPad Pro 12.9" | 1024 × 1366 | `lg` | 2 |

---

## Minimum test set (one width per bucket)

| Width | Bucket | Represents |
|-------|--------|-----------|
| **320** | xs | iPhone SE 1, fold covers — smallest floor |
| **360** | sm | Most Android + compact iPhone — highest traffic worldwide |
| **375** | sm | iPhone SE 2/3, mini, older iPhones |
| **390 / 393** | md | iPhone 12–16, Pixel — modern median |
| **412** | lg | Large Android (Pixel 6+, OnePlus) |
| **430** | xl | iPhone Pro Max — largest common phone |
| **768** | tablet | Tailwind `md` boundary — tablet / unfolded |

Notes:
- **Buckets here ≠ Tailwind classes.** All phone buckets (xs–xl) render under Tailwind base styles; the real Tailwind jump happens at 640 (`sm`).
- **Landscape** swaps W/H — a 390-wide phone becomes 844 wide, crossing Tailwind `sm`/`md`. Test rotated if hero/nav misbehave.
- **Safe areas / notches**: use `env(safe-area-inset-*)` for full-bleed sections (hero video). Add `viewport-fit=cover` to the meta viewport if going edge-to-edge.
- **DPR** only affects asset sharpness (serve 2×/3× images), not layout. Layout follows CSS viewport width.
