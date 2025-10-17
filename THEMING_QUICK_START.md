# 🎨 Theming System - Quick Start

## ✅ What You Can See Now

Your documentation site is running at **http://localhost:3000**

### 1. Theme Switcher (Palette Icon in Header)

Look in the **top-right corner** of the header:
- 🎨 **Palette icon** - Click this to change color themes
- 🌙 **Moon/Sun icon** - Toggle dark/light mode
- 🔗 **GitHub icon** - Link to repository

**Try it:**
1. Visit http://localhost:3000
2. Click the **palette icon** (🎨) in the header
3. Choose a color theme:
   - Default (Teal) - Current theme
   - Purple - Purple primary color
   - Blue - Blue primary color  
   - Rose - Pink/rose primary color
   - Emerald - Green primary color

Watch all buttons and badges change instantly!

### 2. New Button Variants

Go to http://localhost:3000/docs/components/button

You'll now see **7 button types** instead of 4:
- ✅ Primary (Teal - uses `--primary`)
- ⚪ Secondary (Gray - uses `--secondary`)
- 👻 Ghost (Transparent - uses `--accent`)
- 📄 White (White background)
- ✅ **Success** (Green - NEW!)
- ⚠️ **Warning** (Orange - NEW!)
- ❌ **Destructive** (Red - NEW!)

All use CSS variables, so they change when you switch themes!

### 3. New Badge Variant

Go to http://localhost:3000/docs/components/badge

You'll now see **7 badge variants** including:
- ℹ️ **Info** (Blue - NEW!)

### 4. Consistent Theming

**Everything uses design tokens now:**
- Button colors → CSS variables
- Badge colors → CSS variables
- Button heights → CSS variables
- Icon sizes → CSS variables
- Animations → CSS variables

## 🔧 How to Customize

### Change Primary Color Globally

**File:** `docs/app/globals.css`

```css
:root {
  /* Change this line to change primary color everywhere */
  --primary: 271 91% 65%;        /* Purple */
  --primary-hover: 271 91% 60%;
  --primary-active: 271 91% 55%;
}
```

**Refreshes:** All Primary buttons, default badges, focus rings, etc.

### Change Button Heights Globally

```css
:root {
  /* Make buttons taller */
  --button-height-base: 3rem;  /* Was 2.5rem */
}
```

**Refreshes:** All buttons at all sizes

### Change Icon Sizes Globally

```css
:root {
  /* Make icons larger */
  --icon-base: 1.5rem;  /* Was 1.25rem */
}
```

**Refreshes:** All icon sizes throughout the system

## 📍 Where Everything Is

### Files You'll Interact With

| File | What It Does |
|------|--------------|
| `docs/app/globals.css` | **Change colors/sizes here** |
| `docs/lib/design-tokens.ts` | TypeScript token reference |
| `docs/components/theme-switcher.tsx` | Theme picker component |
| `docs/components/ui/button.tsx` | Button (uses tokens) |
| `docs/components/ui/badge.tsx` | Badge (uses tokens) |

### What Changed

**Before:** Hardcoded colors
```typescript
Primary: "bg-teal-600 hover:bg-teal-700"
```

**After:** Uses tokens
```typescript
Primary: "bg-primary hover:bg-primary-hover"
```

**Benefit:** Change `--primary` once, everything updates!

## 🎯 Try It Now

### 1. Open the Site
```bash
# Already running!
Visit: http://localhost:3000
```

### 2. Test Theme Switcher
1. Click **palette icon** (🎨) top-right
2. Select **Purple** theme
3. Watch all Primary buttons turn purple!
4. Try other themes

### 3. Test Dark Mode
1. Click **moon icon** (🌙) top-right
2. Site switches to dark mode
3. All colors automatically adjust
4. Try theme switcher in dark mode too!

### 4. View All Button Types
```
http://localhost:3000/docs/components/button
```

Scroll down to see:
- All 7 button types
- All 3 sizes
- Different states
- With icons

### 5. View All Badge Variants
```
http://localhost:3000/docs/components/badge
```

See all 7 badge variants including the new Info badge.

## 🚀 Quick Customization

### Example 1: Make Your Brand Color Red

Edit `docs/app/globals.css`:

```css
:root {
  --primary: 0 84% 60%;        /* Red */
  --primary-hover: 0 72% 51%;
  --primary-active: 0 65% 45%;
}
```

Save, refresh browser. All Primary elements are now red!

### Example 2: Make Buttons Larger

```css
:root {
  --button-height-sm: 2.5rem;
  --button-height-base: 3rem;
  --button-height-lg: 3.5rem;
}
```

Save, refresh. All buttons are taller!

### Example 3: Slow Down Animations

```css
:root {
  --duration-base: 400ms;  /* Was 200ms */
}
```

Save, refresh. Hover animations are slower!

## 📚 Full Documentation

- **Detailed Guide:** `THEMING_GUIDE.md`
- **Implementation Details:** `THEMING_IMPLEMENTATION.md`
- **Component Workflow:** `COMPONENT_WORKFLOW.md`

## ✨ What's Themeable

### Colors
✅ Primary, Secondary, Success, Warning, Error, Info  
✅ Background, Foreground, Border  
✅ Muted, Accent, Destructive  
✅ All with hover/active states  
✅ Light & dark mode variants  

### Sizes
✅ Button heights (3 sizes)  
✅ Icon sizes (5 sizes)  
✅ Border radius (5 sizes)  
✅ Spacing (12 sizes)  

### Animation
✅ Duration (fast, base, slow)  
✅ Easing functions  

### Typography
✅ Font sizes (8 sizes)  
✅ Font weights (4 weights)  
✅ Letter spacing (3 spacings)  

## 🎉 Key Benefits

1. **One Change → Global Update**
   - Change `--primary` once
   - All components update automatically
   - No search and replace

2. **Dark Mode Built-In**
   - Every token has light & dark variant
   - Automatic color adjustments
   - No extra code

3. **Live Preview**
   - Theme switcher shows changes instantly
   - Test before committing
   - See all combinations

4. **Type-Safe**
   - TypeScript types in `design-tokens.ts`
   - Autocomplete support
   - Compile-time checks

5. **Scalable**
   - Add new components using tokens
   - Consistent styling automatically
   - Easy to maintain

## 🔍 Can't See Theme Switcher?

1. **Check you're on the right URL:**
   - Should be: http://localhost:3000
   - Not: http://localhost:3004

2. **Look in the top-right corner:**
   - You should see: 🎨 🌙 🔗 (palette, moon, github icons)
   - The palette icon is the theme switcher

3. **Clear your browser cache:**
   - Hard refresh: Cmd+Shift+R (Mac) or Ctrl+Shift+R (Windows)

4. **Check the terminal:**
   - Should say "✓ Ready in XXXms"
   - Should show requests like "GET /docs/components/button 200 in XXms"

5. **Still not working? Restart server:**
   ```bash
   pkill -f "next dev"
   cd docs && npm run dev
   ```

## 🎨 Visual Check

When you visit http://localhost:3000/docs/components/button, you should see:

**Button Types Section:**
- 7 buttons in a row (Primary, Secondary, Ghost, White, Success, Warning, Destructive)
- Primary button should be teal/blue-green
- Success button should be green
- Warning button should be orange
- Destructive button should be red

**Header (top-right):**
- Palette icon (🎨) - Theme switcher
- Moon/Sun icon (🌙☀️) - Dark mode toggle
- GitHub icon - Link

Click the palette icon → dropdown appears with 5 color options!

---

**Need Help?** See full documentation in `THEMING_GUIDE.md`

