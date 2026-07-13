# Unify Design Skill

When this skill is loaded, read its entirety and apply the rules below for all work on the Unify Figma project. This skill covers the complete component inventory, design tokens, build rules, and screen assembly patterns.

---

## File & Pages

| Key | Value |
|-----|-------|
| File key | `fZpKZpih18tEiVkeYPoCWs` |
| Components page | `components new ` (id `388:13249`) |
| Design reference | `design new` (id `375:12370`) |

Always switch to the correct page before reading or writing:
```js
const page = figma.root.children.find(p => p.name === 'components new ');
await figma.setCurrentPageAsync(page);
```
Never assign `figma.currentPage` directly — it throws.

---

## Design Tokens

### Text Styles (all Nunito — load fonts before use)

| Name | Style ID | Font | Size | Weight |
|------|----------|------|------|--------|
| Header | `S:bb21f71c595a9a23c57617bc7f4c24785ddfdc92,` | Nunito | 48 | Extra Bold |
| Title | `S:811fd78e3e85f673b48dbac9b0a501a7a3f33980,` | Nunito | 24 | Extra Bold |
| Subheader | `S:582afa1d0efd390d2524a00d47cf6e79b8039174,` | Nunito | 18 | Light |
| Main text | `S:e2140faaae5c976757071cc9567e945193dd710b,` | Nunito | 17 | Medium |
| Button | `S:a753bac1ae5c4485267d2edbb3885557d620a1c8,` | Nunito | 18 | Bold |
| Caption | `S:be70291e1fac15ffcf2b3d404041c3b6c980f87d,` | Nunito | 12 | Regular |

**Usage mapping:**
- Page/section headings → Header
- Card titles (e.g. "Umtrunk", "Interface Design") → Title
- Dates, times, week ranges → Subheader
- Body paragraphs, descriptions → Main text
- Button labels, tab labels → Button
- Small metadata (room numbers, tiny schedule times) → Caption

### Color Variables (collection: `primitives`)

| Name | Variable ID | Hex | Use on |
|------|-------------|-----|--------|
| `text/primary` | `VariableID:455:134` | `#292925` | Dark text on light/cream backgrounds |
| `text/inverse` | `VariableID:455:135` | `#F9F2EB` | Light text on dark/pink backgrounds |

**Applying text style + color to a TEXT node:**
```js
await figma.loadFontAsync({ family: 'Nunito', style: 'Medium' }); // load needed weights first

const t = figma.createText();
t.characters = 'Hello';
t.textStyleId = 'S:e2140faaae5c976757071cc9567e945193dd710b,'; // Main text

const varPrimary = figma.variables.getVariableById('VariableID:455:134');
const basePaint = { type: 'SOLID', color: { r: 41/255, g: 41/255, b: 37/255 }, opacity: 1, blendMode: 'NORMAL', visible: true };
t.fills = [figma.variables.setBoundVariableForPaint(basePaint, 'color', varPrimary)];
```

---

## Component Inventory

All components live on the `components new ` page. Standard canvas width: **368px**.

**Page organization:** the page is laid out top-to-bottom in 7 labeled sections (big
Nunito ExtraBold 48 `SECTION: …` text headers at `x=0`, dark `#292925`). Order: Primitives
& Icons → Buttons & Inputs → Navigation → Characters → Cards & Panels → Timetable → Misc.
Small primitives sit in horizontal rows; large sets stack vertically, all left-aligned at
`x=0`. The **Misc** section at the bottom (`y≈9827`) holds loose non-component scraps pending
review: `Frame 39832` (Account fragment), a stray screenshot rectangle, `Augen` eyes art,
and a `landing page` screen frame. When adding a new component, drop it in the matching
section and keep the left edge at `x=0`.

### Primitives

| Component | ID | Size | Notes |
|-----------|----|------|-------|
| `icon_arrow` | `411:129` | 28×16 | Single arrow vector |
| `card_round_button` | `411:131` | 64×64 | Contains `icon_arrow`; swappable content |
| `icon_plus` | `445:273` | 24×24 | Plus sign vector |
| `plus_button` | `445:277` | 64×64 | Contains `icon_plus` |

### chevron_button (ComponentSet `419:142`)

| Variant | ID | Size |
|---------|----|------|
| Direction=Down | `419:136` | 35×35 |
| Direction=Up | `419:139` | 35×35 |

Circular button with dark stroke. Get instance: `figma.getNodeById('419:136').createInstance()`.

### toggle_switch (ComponentSet `564:803`)

Two properties: **Shape** (Bouncy / Wavy / Hooky) × **Toggle** (Left / Right) = 6 variants.

| Variant | ID |
|---------|----|
| Shape=Bouncy, Toggle=Right | `564:797` |
| Shape=Bouncy, Toggle=Left | `564:798` |
| Shape=Wavy, Toggle=Right | `564:799` |
| Shape=Wavy, Toggle=Left | `564:800` |
| Shape=Hooky, Toggle=Right | `564:801` |
| Shape=Hooky, Toggle=Left | `564:802` |

All 360×84, HORIZONTAL auto-layout. Pill-style segmented switch: pink "aus" knob on one
half, white "an" half on the other. `Shape` controls the edge silhouette of the knob
(bouncy = rounded bumps, wavy = soft waves, hooky = hooked notch). `Toggle` controls which
side the pink knob sits. Labels are German (an = on, aus = off).

**Note:** supersedes the earlier 2-variant `toggle` (`563:799`, "Dark" label, no Shape).

---

### profile_menu (ComponentSet `548:837`)

| Variant | Figur rel position |
|---------|--------------------|
| Figur=1 | x=63, y=−258 |
| Figur=2 | x=88, y=−258 |
| Figur=3 | x=114, y=−172 |
| Figur=4 | x=77, y=−303 |
| Figur=5 | x=93, y=−206 |
| Figur=6 | x=125, y=−243 |
| Figur=7 | x=80, y=−214 |
| Figur=8 | x=128, y=−253 |

Structure (each variant): 402px wide, **443px** tall (AUTO height, hugs content).
- `Frame 39825` — vertical auto-layout, 3× `settings_button` instances (account/friends/settings), w=376, h=281
- `bottom_navigation_bar` instance — 363×92, Pressed=Home (`401:130`)
- `figur` frame — ABSOLUTE, constraints `{horizontal:'MIN', vertical:'MIN'}`, position varies per variant (see table). `clipsContent=false` on outer frame so figur pokes above.

Outer frame: fill `#292925` (text/primary), paddingTop=10, paddingBottom=10, paddingLeft=10, paddingRight=10, itemSpacing=50, counterAxisAlignItems=CENTER, primaryAxisAlignItems=MAX.

Figur=4's artwork came from Frame 39826 → profile_avatar → figur (536:3631), nested two levels deep.

---

### nav_bar_figur (Component `541:455`)

| Property | Value |
|----------|-------|
| Size | 402×126 (visual height ~185 including figur overhang) |
| Width | Fixed |
| Height | Hugs content (AUTO) |

Structure:
- `bottom_navigation_bar` instance (Pressed=Star, `401:132`) — AUTO in vertical layout, centered (counterAxisAlignItems=CENTER), paddingTop=19, paddingBottom=15, paddingLeft=10, paddingRight=10
- `figur` frame — ABSOLUTE, x=139, y=−59 (pokes 59px above frame top), constraints: { horizontal: CENTER, vertical: MIN }

`clipsContent=false` so the figur head visually extends above the frame boundary. The figur is pinned top-center so it always sits at the same position regardless of frame height changes.

---

### bottom_navigation_bar (ComponentSet `401:133`)

| Variant | ID | Size |
|---------|----|------|
| Pressed=Calendar | `401:129` | 363×92 |
| Pressed=Home | `401:130` | 363×92 |
| Pressed=Location | `401:131` | 363×92 |
| Pressed=Star | `401:132` | 363×92 |

Placed at the bottom of every screen. Default: `Pressed=Home`.

### button_next_break (ComponentSet `404:135`)

| Variant | ID | Size |
|---------|----|------|
| Color=Cream | `404:129` | 359×99 |
| Color=Pink | `404:130` | 359×99 |

Speech-bubble style button. Contains `Union` (bubble shape) + `next break` text + eye
group (`layoutPositioning='ABSOLUTE'`, bottom-right, pokes past the bubble — `clipsContent=false`).

### next_break_card (ComponentSet `415:151`)

| Variant | ID | Size |
|---------|----|------|
| Color=Pink | `415:132` | 365×213 |
| Color=White | `415:133` | 365×213 |

Structure: `title_block` / `time_row` / `face` (bottom-right pinned absolute). The `face` contains `card_round_button` with swappable content.

### friends_stundenplan (ComponentSet `420:1320`)

| Variant | ID | Size |
|---------|----|------|
| State=Closed | `420:142` | 334×71 |
| State=Open | `420:1319` | 303×250 |

Expandable panel. Face pinned **top-left** (`constraints: { horizontal: 'MIN', vertical: 'MIN' }`). Panel body uses `primaryAxisSizingMode = 'AUTO'` to grow downward.

### friends_stundenplan_new (ComponentSet `510:388`)

| Variant | ID | Size |
|---------|----|------|
| State=Closed | `510:386` | 362×71 |
| State=Open | `510:387` | 358×293 |
| State=Add friends | `538:443` | 362×71 |
| State=Delete friends | `538:444` | 362×71 |

Newer version of `friends_stundenplan` where the **monster is inside the frame bounds**
(top-left), so it works in auto-layout without overflow. Closed/Add/Delete rows show
`Lemmy` + `bis 16:30`; right-side icon differs per state (chevron / green plus / red trash).

**Fixed (2026-07-05):** despite the note above, `State=Open` actually had overflow —
its inner `friends_stundenplan` frame was a **CENTER-aligned** auto-layout flow child
(280 tall) inside a `FIXED` 250-tall parent, causing Figma to center-overflow it
symmetrically ±15px above/below the component's own bounds; the absolutely-positioned
`face` (top-left monster, `constraints: MIN/MIN`) nested inside it pushed the true top
overflow to -28px. None of this counted toward the component's own reported height, so
when two Open cards were stacked in the friends list, the second card's real visual top
(the monster) started 28px above its layout position — swallowing the list's 18px
`itemSpacing` and then some, leaving them almost touching. Fixed by converting
`friends_stundenplan` to `ABSOLUTE` (`constraints: MIN/MIN`, same as `face`), setting its
`y` to 13 (shifts the whole assembly down by the 28px overflow amount), and resizing the
component from 250→293 to match the true footprint. Verified: two adjacent Open cards
now show the correct, exact 18px gap.

**Face shape (2026-07-05):** the `face` bottom-right element (background rect + eye
ellipses + `card_round_button`) was resized/reshaped across all Open variants
(`connect_now`, `socials`, `map`, both colors) to match a new design Lucas set on
`connect_now` Open Cream: background rect 156×82, eye-ellipse group ~79×53 (previously
varied: 166×91 rect / 92×61 or 81×54 eyes depending on component). Applied by cloning the
reference's `Rectangle 64` + eye-ellipse group into each target and **re-applying each
target's own original fill colors afterward, matched by ellipse name** — critical because
`map`'s Open variants have intentionally tinted eye-whites (Cream card → pink-tinted eyes,
Pink card → cream-tinted eyes) that must NOT be flattened to plain white.

### connect_now (ComponentSet `493:1825`)

| Variant | ID | Size |
|---------|----|------|
| State=Open, Color=Cream | `493:266` | 377×345 |
| State=Open, Color=Pink | `493:372` | 377×345 |
| State=Closed, Color=Cream | `493:373` | 377×72 |
| State=Closed, Color=Pink | `493:378` | 377×72 |
| State=Small, Color=Cream | `493:388` | 377×64 |
| State=Small, Color=Pink | `493:394` | 377×64 |

Structure (Open): `header_block` / `time_row` / `friends` (wrapping layout) / `face` (bottom-right).
The `friends` section uses `layoutWrap = 'WRAP'` for free-floating blobs with names.
Structure (Closed / Small): `Union` (speech-bubble) + `next break` text + eye group (ABSOLUTE, bottom-right).

**Note:** `button_next_break` (`404:135`, "connect-now-closed") is an older standalone
"next break" pair (cream/pink) — superseded by these Closed/Small variants but still present, also with eyes.

### map (ComponentSet `501:1086`)

| Variant | ID | Size |
|---------|----|------|
| State=Open, Color=Cream | `896:130` | 377×401 |
| State=Open, Color=Pink | `896:129` | 377×401 |
| State=Closed, Color=Cream | `501:1079` | 359×99 |
| State=Closed, Color=Pink | `501:1085` | 359×99 |

Structure (Open): outer wrapper frame (`AUTO`-hug, correctly includes the `face` overflow
in its own reported height — see below) > inner `map` frame (`FIXED` height) >
`header_block` / `time_row` / `friends` (map image frame) / `face` (bottom-right,
ABSOLUTE, last child for z-order above map).
Structure (Closed): `Union` (speech-bubble shape) + `Map` text + eye group (ABSOLUTE, bottom-right).
**Note:** face must be last child in the children array so it renders above the `friends` map frame.

**Replaced (2026-07-05):** Lucas rebuilt both Open variants from scratch (`896:129`
Pink, `896:130` Cream, replacing the old `501:1073`/`501:670`) to fix the exact face-
overflow bug noted below — his new version wraps the card in an `AUTO`-hug outer frame,
which Figma correctly expands to include the absolutely-positioned `face`'s true visual
extent (401 = inner 347 + face's 54px overflow) automatically, no manual fix needed.
**When replacing a component variant like this:** deleting the old component silently
wipes (not errors) any reaction elsewhere that targeted it as a `CHANGE_TO`/`NAVIGATE`
destination — check the Closed variant's eye-toggle reaction after swapping, it will
need rewiring to the new ID. Also check for a stray reaction directly on the component
**root** (separate from the nested eye-group's own reaction) — found one here (a whole-
card `ON_CLICK` pointing at the old, now-deleted Open master) probably left over from
Lucas's own testing while building the replacement; removed per his choice, since only
the eye icon (not the whole card) is meant to be clickable.

Previously (now superseded): Open variants were `FIXED` at 316px with `face`
(`constraints: {vertical: MAX}`) poking 95px below that boundary uncounted, causing
`face` to collide with the fixed bottom nav bar once opened in a stack. Fixed at the time
by resizing to 411 + resetting `face.y` (a `MAX`-constrained absolute child auto-
repositions itself when its frame is resized, which cancels a naive resize-only fix) —
superseded by the from-scratch replacement above, kept here as a gotcha reference.

### socials (ComponentSet `495:326`)

| Variant | ID | Size |
|---------|----|------|
| State=Open, Color=Pink | `495:262` | 377×308 |
| State=Open, Color=Cream | `495:288` | 377×308 |
| State=Closed, Color=Cream | `495:324` | 359×72 |
| State=Closed, Color=Pink | `495:325` | 359×72 |

Structure (Open): `header_block` / `activities past 16:00` / `activities` (wrapping layout) / `face` (bottom-right).
Structure (Closed): `Union` (speech-bubble shape) + `socials` text + eye group (ABSOLUTE, bottom-right). Same wrapping pattern as `connect_now`.

### tab_switcher (ComponentSet `435:291`)

| Variant | ID | Size |
|---------|----|------|
| State=Stundenplan | `435:289` | 368×60 |
| State=Socials | `435:290` | 368×60 |

Top tab bar for the timetable panel. Used as nested instance inside `stundenplan`.

### stundenplan (ComponentSet `439:1392`)

Two properties: **State** (Stundenplan / Socials) × **Weekday** (Montag/Dienstag/Mittwoch/
Donnerstag/Freitag — only meaningful when State=Stundenplan; Socials carries a dummy
Weekday=Montag value since Figma requires every variant to define every property).

| Variant | ID | Size |
|---------|----|------|
| State=Stundenplan, Weekday=Montag | `437:1392` | 377×625 |
| State=Stundenplan, Weekday=Dienstag | `858:5003` | 377×657 |
| State=Stundenplan, Weekday=Mittwoch | `858:5004` | 377×433 |
| State=Stundenplan, Weekday=Donnerstag | `858:5005` | 377×494 |
| State=Stundenplan, Weekday=Freitag | `858:5006` | 377×624 |
| State=Socials, Weekday=Montag | `439:274` | 377×188 |

Large timetable panel. `State=Stundenplan` contains: `tab_switcher` → `select week` →
`select day` (5 circles "m d m d f" = Montag/Dienstag/Mittwoch/Donnerstag/Freitag) → 4×
`course` instances (State=Closed) across two sub-frames.

**Day-circle click behavior:** each of the 5 circles has an `ON_CLICK` → `CHANGE_TO`
reaction (instant, `transition: null` — no Smart Animate) targeting the sibling Weekday
variant at that position — the active day's own circle is intentionally left unwired
(matches the tab_switcher pattern).

### select week (ComponentSet `877:1261`)

One property: **Week** (1/2/3/4), each showing a different date range ("7.3 till 13.3",
"20.3 till 26.3", "27.3 till 13.3", "2.4 till 8.4").

| Variant | ID |
|---------|----|
| Week=1 | `877:1257` |
| Week=2 | `877:1258` |
| Week=3 | `877:1259` |
| Week=4 | `877:1260` |

Structure: `Frame 39866` > left arrow wrapper (`Frame 39864`) + date texts + right arrow
wrapper (`Frame 39863`). **Click targets are the arrow wrapper frames, not the inner
vector** — same pattern as the day-selector circles.

**Arrow click behavior:** `ON_CLICK` → `CHANGE_TO` (instant, `transition: null`) —
left arrow goes to the previous week, right arrow to the next. **Clamped, not
looping**: Week=1's left arrow and Week=4's right arrow are intentionally left unwired
(no wraparound).

**Embedded into every `stundenplan` weekday variant** — each of the 5 Weekday variants
(Montag/Dienstag/Mittwoch/Donnerstag/Freitag) has its own `select week` instance at the
same position (replacing what used to be a static, non-interactive frame with hardcoded
"7.3 till 13.3"), all defaulting to Week=1. Since it's a separate nested ComponentSet
(like `select day` and `course`), it doesn't explode `stundenplan`'s own variant matrix —
each instance manages its own week state independently of which weekday is active. **Position, not
frame name, identifies the day** — the underlying circle frame names (Frame 74/75/76/77/78)
are inconsistent across variants; always match by relative x (0/74/148/222/296 =
Montag/Dienstag/Mittwoch/Donnerstag/Freitag) when locating a circle. `CHANGE_TO` is required here (not `NAVIGATE`) — `NAVIGATE` between sibling variants only
works when interacting with the master directly; once an instance is placed on a
different page than the master, `NAVIGATE` silently does nothing. `CHANGE_TO` swaps the
instance's own variant regardless of page, so it's the only reliable choice for
in-component state toggles meant to be reused as instances elsewhere.

### activity (ComponentSet `448:1452`)

| Variant | ID | Size |
|---------|----|------|
| State=Open, Color=Pink | `448:1448` | 368×567 |
| State=Closed, Color=Pink | `448:1449` | 368×354 |
| State=Open, Color=Light | `448:1450` | 368×567 |
| State=Closed, Color=Light | `448:1451` | 368×354 |

Activity event card. Structure: `poster` / title / date / `divider` (open only) / details (open only) / `face`.

**Face placement — do NOT reposition (Lucas hand-tuned):**
- Open variants: face `x≈291–294`, `y≈433`
- Closed variants: face `x=297`, `y=314`
- `layoutPositioning = 'ABSOLUTE'`, `constraints: { horizontal: 'MAX', vertical: 'MAX' }`
- Contains `plus_button` sub-component

### course (ComponentSet `469:1424`)

| Variant | ID | Size |
|---------|----|------|
| State=Closed | `469:1422` | 336×76 |
| State=Open | `469:1423` | 336×110 |

Timetable course row. Structure: `divider` (1px line) / `content_row` (course name + time + room + chevron) / `people_row` (open only).

- Course name → **Main text** style
- Time / room / person names → **Caption** style
- Chevron: `chevron_button` instance (Direction=Down / Direction=Up)
- Person chips: horizontal auto-layout, `cornerRadius: 999`, stroke `#292925`, `account_circle` instance (id `248:837`) + name text

### figur (ComponentSet `514:2591`)

Two properties: **Figur** (1,2,3,4,6,9,7,8 — the 8 monster characters) × **State**
(normal / selected) = 16 variants.

| Figur | normal id | selected id |
|-------|-----------|-------------|
| 1 | `514:2567` | `571:807` |
| 2 | `514:2570` | `571:816` |
| 3 | `514:2573` | `571:825` |
| 4 | `514:2576` | `571:836` |
| 6 | `514:2579` | `571:845` |
| 9 | `514:2582` | `571:854` |
| 7 | `514:2585` | `571:863` |
| 8 | `514:2588` | `571:872` |

- **normal**: bare figure artwork at natural size (`Vector` body + `Augen` eye band), sizes vary (~111–129 wide).
- **selected**: figure wrapped in a **167×167 circle** — transparent fill, pink `#FF88C8` stroke, 6px, INSIDE align, `clipsContent=false`. Inside is a nested **instance** of the matching normal variant, geometrically centered (`x=(167-w)/2`, `y=(167-h)/2`). Figur=1 uses Lucas's hand-placed offset (padding 31/47/24/24); the rest are auto-centered — fine-tune per figure if needed.

---

### stockwerke (ComponentSet `594:135`)

Floor-selector card stack. Two properties: **State** (Open / Closed) × **Stockwerk**
(EG / 1. Stock / 2. Stock) = 6 variants. (Capitalized Open/Closed to match the rest of
the system; the source frames were named "klein" = closed, "gross" = open.)

| State | Stockwerk | ID | Size |
|-------|-----------|----|------|
| Closed | EG | `594:129` | 367×228 |
| Closed | 1. Stock | `594:130` | 367×228 |
| Closed | 2. Stock | `594:131` | 367×228 |
| Open | EG | `594:132` | 367×846 |
| Open | 1. Stock | `594:133` | 367×846 |
| Open | 2. Stock | `594:134` | 367×846 |

Three tan cards stacked with **negative item-spacing** (`stockwerke` inner frame, gap −36
closed / −202 open) so they overlap into a layered deck. Widths increase 307 → 337 → 367
and fills lighten `#CFB69C` → `#DED1C4` → `#F9F2EB` to give depth; the **active floor is
always the front (widest, cream) card**, with the others rotating cyclically behind it
(EG → 1. Stock → 2. Stock → EG). Each card carries a floor label (Nunito ExtraBold 24) +
room-code range (Nunito Light 18) + a full-screen icon. **Open** adds the building floor
plan (a `Union` boolean-op vector drawing) under the front card.

Only one floor-plan drawing exists in the file — it is **reused for all three Open
variants** as a placeholder; swap per-floor art later if needed. The Open variants were
built by cloning `2. Stock gross` and relabeling the 6 text nodes (top/mid/front × name +
code) per the rotation. Source frames retain a tall 846px height with empty space below
the map (Lucas's original sizing — left untouched).

---

## Screen Assembly (from `design new`)

All screens are **398px wide**, inner content width **368px** (15px margin each side).

### landing page (`464:1735`) — 398×1825, bg `#FF88C8`
- Top hero (`Frame 39807`, 398×395) — monster illustration
- `dark_section` frame (398×1430) — bg `#292925`, expands downward

### stundenplan page (`464:1069`) — 398×1119, bg `#292925`
- `stundenplan` (State=Stundenplan) at x:15, y:46 — 368×629
- `bottom_navigation_bar` (Pressed=Home) at y:981

### socials page (`464:1317`) — 398×1679, bg `#292925`
- `stundenplan` (State=Socials) at x:15, y:46 — 368×180
- `activity` (State=Open, Color=Pink) at y:236 — 368×567
- `activity` (State=Closed, Color=Pink) at y:813 — 368×354
- `activity` (State=Closed, Color=Light) at y:1177 — 368×354
- `bottom_navigation_bar` (Pressed=Home) at y:1541

---

## Build Rules

### Auto-layout sizing modes
```js
// Values are 'FIXED' or 'AUTO' (not 'HUG')
// Set sizing mode BEFORE calling resize() — resize() after AUTO resets it to FIXED
frame.primaryAxisSizingMode = 'AUTO';   // height hugs content
frame.counterAxisSizingMode = 'FIXED';  // width is fixed
frame.resize(368, 10);                  // only the FIXED axis value matters
```

### Pinning face elements (absolute in auto-layout)
```js
face.layoutPositioning = 'ABSOLUTE';
face.constraints = { horizontal: 'MAX', vertical: 'MAX' }; // bottom-right pin
// top-left pin: { horizontal: 'MIN', vertical: 'MIN' }
```

### Canvas stacking for stacked cards with bottom-right faces
Cards (`socials`, `map`, `connect_now`, `activity`) have a face/eyes extrusion that
pokes **below** the card's bottom edge. When stacked in a VERTICAL auto-layout, the
default paint order ("Last on top") makes each lower card cover the extrusion of the
card above it. Fix: `itemReverseZIndex = true` ("First on top") so the top card paints
over the one below — its downward extrusion stays visible.

**But the `bottom_navigation_bar` must stay on top of everything.** It's the last child,
so reversing the *whole page container* pushes it to the bottom of the z-stack and the
card above covers it. Correct pattern: wrap only the cards in a sub-frame that carries
`itemReverseZIndex = true`, and leave the page container at default. Then the nav bar
(last child of the container) paints last = on top, while cards still stack correctly.
```js
const wrapper = figma.createFrame();           // holds cards only, not the nav bar
wrapper.layoutMode = 'VERTICAL';
wrapper.itemSpacing = container.itemSpacing;    // match to preserve spacing
wrapper.counterAxisAlignItems = container.counterAxisAlignItems;
wrapper.itemReverseZIndex = true;               // upper card over lower card
wrapper.clipsContent = false; wrapper.fills = [];
container.insertChild(0, wrapper);
wrapper.layoutSizingHorizontal = 'FILL';
for (const card of cards) wrapper.appendChild(card); // in original order
container.itemReverseZIndex = false;            // nav bar (last) paints on top
```
Applied on `design new`: dark_section `Frame 39813` (`490:9133`) and `stundenplan page`
(`502:10934`). Up-poking extrusions (`friends_stundenplan_new` monster, `settings_button`
eyes) are correct by default — leave them.

### Creating a ComponentSet
```js
const comp1 = figma.createComponentFromNode(frame1);
comp1.name = 'State=Closed';
const comp2 = figma.createComponentFromNode(frame2);
comp2.name = 'State=Open';
// Both must be appended to the page before combining
const set = figma.combineAsVariants([comp1, comp2], page);
set.name = 'my_component';
```

### Swapping an instance to a new component
```js
const inst = figma.getNodeById('423:1853');
inst.swapComponent(figma.getNodeById('469:1422'));
```

### Safe font name check (fontName can be the MIXED symbol)
```js
if (node.fontName !== figma.mixed) {
  const style = node.fontName.style.toLowerCase();
}
```

### Never overwrite Lucas's manual placements
Lucas hand-tunes positions in Figma after components are built. Always read current `x`/`y` before repositioning anything he may have touched. The `activity` face positions are the canonical example.

---

## Quick-start for adding a new component

1. Switch to `components new ` page with `await figma.setCurrentPageAsync(page)`
2. Load all needed Nunito font weights with `figma.loadFontAsync`
3. Build closed/default frame, then open/active variant
4. Set `primaryAxisSizingMode = 'AUTO'` + `counterAxisSizingMode = 'FIXED'` **before** `resize()`
5. Apply text styles: `node.textStyleId = STYLE_ID`
6. Apply color variables: `node.fills = [figma.variables.setBoundVariableForPaint(paint, 'color', variable)]`
7. `figma.createComponentFromNode()` each frame, name as `Property=Value`
8. `figma.combineAsVariants([...], page)` → name the set
9. Swap any existing instances on `design new` using `inst.swapComponent(newComp)`
