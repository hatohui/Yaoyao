# Implementation Steps: Shareable Food URLs with Metadata

## Overview

Implement a feature that allows users to click on food items in the menu to copy a shareable URL. The URL should display rich metadata (Open Graph tags) when pasted in Discord, Telegram, or other social platforms.

## Steps

### 1. Create Dynamic Food Detail Page

- [x] Create `src/app/menu/[id]/page.tsx` for individual food details
- [x] Implement metadata generation using Next.js 13+ `generateMetadata` API
- [x] Add Open Graph metadata (og:title, og:description, og:image, og:url)
- [x] Add Twitter Card metadata
- [x] Ensure the page is server-side rendered for proper metadata crawling

### 2. Create Food Detail Components

- [x] Create `src/components/menu/FoodDetailHeader.tsx` - displays food name, category, availability
- [x] Create `src/components/menu/FoodDetailImages.tsx` - displays food images in a gallery format
- [x] Create `src/components/menu/FoodDetailInfo.tsx` - displays description and variants/prices
- [x] Ensure all components support light/dark mode
- [x] Keep components modular (under 150 lines each)

### 3. Add Copy URL Functionality to FoodCard

- [x] Make FoodCard clickable
- [x] Add onClick handler that copies the food detail URL to clipboard
- [x] Add visual feedback (temporary icon change)
- [x] Add hover effects to indicate clickability
- [x] Ensure accessibility (keyboard navigation, screen reader support)

### 4. Create Custom Hook for URL Copying

- [x] Create `src/hooks/common/useCopyToClipboard.ts`
- [x] Handle clipboard API with fallback for older browsers
- [x] Return success/error states

### 5. Update Language Files

- [x] Add translations for "Copy link", "Link copied", "Share this dish"
- [x] Add translations for food detail page elements
- [x] Update all language files (en, th, vi, zh)

### 6. Styling and UX Polish

- [x] Add loading states for food detail page (built-in Next.js)
- [x] Add error handling (404 for non-existent foods)
- [x] Add "Back to menu" button
- [x] Add responsive design for mobile/tablet/desktop
- [x] Test dark mode styling consistency
- [x] Add smooth transitions and animations
- [ ] Add a tool tip in the menu so users are aware of this.

### 7. Testing and Validation

- [ ] Test URL generation and copying
- [ ] Test metadata in Discord, Telegram preview
- [ ] Test on different devices and browsers
- [ ] Test light/dark mode
- [ ] Test with foods that have/don't have images
- [ ] Test with unavailable foods
- [ ] Test localization for all languages

### 8. Refactoring (COMPLETED ✅)

- [x] Fix timeout error (504) by using TanStack Query
- [x] Create `useFoodById` hook following project patterns
- [x] Split page into server/client components for Next.js 15+
- [x] Create `FoodDetailContent` client component with loading states
- [x] Ensure proper error handling and retry logic
- [x] Update documentation in refactor.md

## Technical Decisions to Confirm

1. **URL Structure**: Use `/menu/[foodId]` or `/food/[foodId]`?

   - Proposed: `/menu/[foodId]` (keeps it consistent with menu context)
     menu/foodId

2. **Copy Action**: Click to copy or separate share button?

   - Proposed: Click anywhere on card to copy URL
     click to Copy, as the detail page is not needed i think

3. **Visual Feedback**: Toast notification or temporary icon change?

   - Proposed: Toast notification with "Link copied!" message
     Temporary icon change like in src\components\table\OrderLinkGenerator.tsx works

4. **Food Detail Page Layout**: Full page or modal?

   - Proposed: Full page (better for SEO and metadata) Full page sure, but I would prefer modal unless its impossible to have the same as full page, give me details on this.

5. **Image Handling**: What if food has no image?
   - Proposed: Use placeholder image or category-based default
     Yes.

## Notes

- Using Next.js App Router (already in use)
- Metadata must be server-side for crawlers
- Consider caching strategies for food data
- Ensure proper error boundaries
