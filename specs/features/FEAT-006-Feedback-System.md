# FEAT-006: Feedback System

**Status**: 🆕 New Feature

**Priority**: P3 (Low - Nice to Have)

**Dependencies**: None

## Overview

Simple feedback collection system allowing any user (Yaoyao, Table Leaders, Guests) to submit comments or suggestions about the application. Yaoyao can view and manage all feedback in a dedicated dashboard.

## User Roles & Permissions

### All Users (Yaoyao, Table Leader, Guest)

- 🆕 Submit feedback (name + optional comment)
- 🆕 Access feedback form from footer link

### Yaoyao (isYaoyao: true)

- 🆕 View all submitted feedback
- 🆕 Filter/search feedback by name or date
- 🆕 Delete feedback after addressing

## User Stories

### All Users Stories

- [ ] As any user, I want to submit feedback about the app or my experience so improvements can be made
- [ ] As any user, I want to provide my name and optional comments
- [ ] As any user, I want feedback submission to be simple and accessible from any page (footer link)

### Yaoyao Stories

- [ ] As Yaoyao, I want to view all submitted feedback in a dashboard
- [ ] As Yaoyao, I want to filter/search feedback by name or date
- [ ] As Yaoyao, I want to delete feedback after addressing it
- [ ] As Yaoyao, I want to see feedback count badge on dashboard

## Acceptance Criteria

- [ ] Public feedback form at `/feedback`
- [ ] Required: name (by), Optional: content (textarea)
- [ ] No authentication required for submission
- [ ] Yaoyao-only dashboard at `/dashboard/feedback` to view all feedback
- [ ] List view with sorting by date (newest first)
- [ ] Simple, accessible UI (mobile-friendly)
- [ ] Rate limiting to prevent spam (optional but recommended)
- [ ] Confirmation message after submission

## Data Model

```prisma
model Feedback {
  id        String   @id @default(uuid())
  by        String   // User's name
  content   String?  // Optional feedback text
  createdAt DateTime @default(now())
}
```

**Note**: Model already exists in `prisma/schema.prisma`. No migration needed.

## Implementation Checklist

### Phase 1: Planning & Design 🔄

- [ ] **🚨 CHECKPOINT**: Present implementation plan to user
- [ ] Check if Feedback model exists in `prisma/schema.prisma`
- [ ] Design feedback form UI (simple and friendly)
- [ ] Design feedback dashboard (list with filters)
- [ ] Plan rate limiting strategy (if implementing)

**References to Study**:

- `prisma/schema.prisma` - Feedback model
- `src/repositories/table-repo.ts` - Repository patterns
- Existing form components for UI patterns

### Phase 2: Repository Layer 📝

- [ ] Create `src/repositories/feedback-repo.ts`
  - [ ] `createFeedback(by, content)` - Create new feedback
  - [ ] `getAllFeedback(options?)` - Get all feedback with pagination
    - [ ] Optional filters: date range, search by name
    - [ ] Sort by createdAt DESC (newest first)
  - [ ] `getFeedbackById(id)` - Get single feedback
  - [ ] `deleteFeedback(id)` - Delete feedback (Yaoyao only)
  - [ ] `getFeedbackCount()` - Count total feedback (for badge)
  - [ ] `searchFeedback(query)` - Search by name or content

**🚨 CHECKPOINT**: Show repository function signatures, ask for approval

**Reference**: Follow patterns in `src/repositories/table-repo.ts`

### Phase 3: Type Definitions 📝

- [ ] Create `src/types/models/feedback.ts`

  - [ ] `Feedback` type (mirror Prisma model)

- [ ] Create `src/types/api/feedback.ts`
  - [ ] `CreateFeedbackRequest` - { by: string, content?: string }
  - [ ] `CreateFeedbackResponse` - { success: boolean, feedback: Feedback }
  - [ ] `GetFeedbackResponse` - { feedbacks: Feedback[], total: number }
  - [ ] `DeleteFeedbackResponse` - { success: boolean }

**Reference**: Follow patterns in `src/types/api/table.ts`

### Phase 4: API Layer 📝

- [ ] Create `pages/api/feedback/index.ts`

  - [ ] POST: Submit feedback
    - [ ] No auth required (public)
    - [ ] Body: `{ by, content? }`
    - [ ] Validation: by is required, max 100 chars; content max 1000 chars
    - [ ] Call `createFeedback()`
    - [ ] Return success message
    - [ ] Optional: Rate limiting (max 5 submissions per IP per hour)
  - [ ] GET: Get all feedback
    - [ ] Auth check: `isYaoyao === true` (Yaoyao only)
    - [ ] Query params: `?page=1&limit=20&search=query`
    - [ ] Call `getAllFeedback()` with filters
    - [ ] Return paginated list

- [ ] Create `pages/api/feedback/[id].ts`

  - [ ] GET: Get single feedback
    - [ ] Auth check: `isYaoyao === true`
    - [ ] Call `getFeedbackById()`
  - [ ] DELETE: Delete feedback
    - [ ] Auth check: `isYaoyao === true`
    - [ ] Call `deleteFeedback()`
    - [ ] Return success message

- [ ] Create `pages/api/feedback/count.ts`
  - [ ] GET: Get feedback count
    - [ ] Auth check: `isYaoyao === true`
    - [ ] Call `getFeedbackCount()`
    - [ ] Return { count: number }

**🚨 CHECKPOINT**: Show API route structure, ask for approval

**Reference**: Follow patterns in `pages/api/tables/index.ts`

### Phase 5: Hook Layer 📝

- [ ] Create `src/hooks/feedback/useFeedbacks.ts`

  - [ ] Query hook: `GET /api/feedback`
  - [ ] Params: page, limit, search
  - [ ] Yaoyao only

- [ ] Create `src/hooks/feedback/useCreateFeedback.ts`

  - [ ] Mutation hook: `POST /api/feedback`
  - [ ] Public access

- [ ] Create `src/hooks/feedback/useDeleteFeedback.ts`

  - [ ] Mutation hook: `DELETE /api/feedback/[id]`
  - [ ] Yaoyao only
  - [ ] Invalidate feedback queries on success

- [ ] Create `src/hooks/feedback/useFeedbackCount.ts`
  - [ ] Query hook: `GET /api/feedback/count`
  - [ ] Yaoyao only

**Reference**: Follow patterns in `src/hooks/table/useCreateTable.ts`

### Phase 6: Component Layer - Public Form 📝

- [ ] Create `src/components/feedback/FeedbackForm.tsx`

  - [ ] Simple form with two fields:
    - [ ] Name input (required)
    - [ ] Feedback textarea (optional, placeholder: "Your feedback here...")
  - [ ] Submit button
  - [ ] Loading state during submission
  - [ ] Success message after submission
  - [ ] Error message if submission fails
  - [ ] Clear form after success

- [ ] Create `src/components/feedback/FeedbackFormCard.tsx`
  - [ ] Container card for form
  - [ ] Title: "We'd love to hear from you!"
  - [ ] Description: "Share your feedback or suggestions"
  - [ ] Contains `<FeedbackForm>`

**🚨 CHECKPOINT**: Show component structure, ask for approval

**Reference**: Check existing form patterns in codebase

### Phase 7: Component Layer - Dashboard 📝

- [ ] Create `src/components/feedback/FeedbackList.tsx`

  - [ ] List of feedback items
  - [ ] Props: `feedbacks: Feedback[]`
  - [ ] Each item shows:
    - [ ] Name (by)
    - [ ] Content (truncated if long)
    - [ ] Date (relative: "2 days ago")
    - [ ] Delete button (Yaoyao only)

- [ ] Create `src/components/feedback/FeedbackItem.tsx`

  - [ ] Single feedback card
  - [ ] Props: `feedback: Feedback`, `onDelete: () => void`
  - [ ] Expand to show full content if truncated
  - [ ] Confirm dialog before delete

- [ ] Create `src/components/feedback/FeedbackSearch.tsx`

  - [ ] Search input
  - [ ] Debounced search (500ms delay)
  - [ ] Clear button
  - [ ] Placeholder: "Search by name or content..."

- [ ] Create `src/components/feedback/FeedbackStats.tsx`
  - [ ] Show total feedback count
  - [ ] Show recent feedback count (e.g., "5 new this week")
  - [ ] Optional: Chart of feedback over time

**Reference**: Check existing list/card patterns

### Phase 8: Page Implementation 📝

- [ ] Create `src/app/feedback/page.tsx`

  - [ ] Public feedback submission page
  - [ ] Contains `<FeedbackFormCard>`
  - [ ] Simple, clean layout
  - [ ] Accessible from footer link
  - [ ] No auth required

- [ ] Create `src/app/dashboard/feedback/page.tsx`
  - [ ] Yaoyao-only feedback dashboard
  - [ ] Auth guard: redirect if not `isYaoyao`
  - [ ] Contains:
    - [ ] `<FeedbackStats>` at top
    - [ ] `<FeedbackSearch>` for filtering
    - [ ] `<FeedbackList>` with pagination
  - [ ] Pagination controls
  - [ ] Loading state while fetching

**🚨 CHECKPOINT**: Show page structure, ask for approval

**Reference**: Follow `src/app/dashboard/tables/page.tsx` structure

### Phase 9: Navigation Integration 📝

- [ ] Update footer component (if exists)

  - [ ] Add "Feedback" link pointing to `/feedback`
  - [ ] Visible to all users

- [ ] Update dashboard navigation
  - [ ] Add "Feedback" link in Yaoyao sidebar
  - [ ] Badge showing unread count (optional)
  - [ ] Only visible if `isYaoyao === true`

**Reference**: Check existing navigation components

### Phase 10: Rate Limiting (Optional) 📝

- [ ] Implement simple rate limiting
  - [ ] Track submissions by IP address
  - [ ] Max 5 submissions per IP per hour
  - [ ] Use in-memory store or Redis (if available)
  - [ ] Return 429 (Too Many Requests) if exceeded

**Note**: Rate limiting optional for MVP. Can add later if spam becomes issue.

**Libraries to Consider**:

- `express-rate-limit` (if using Express)
- Custom middleware with Map for tracking

### Phase 11: Testing & QA 📝

- [ ] **Functional Testing**:

  - [ ] Submit feedback from public page - verify success
  - [ ] Submit without name - verify validation error
  - [ ] Submit with very long content - verify truncation or validation
  - [ ] Submit multiple feedbacks - verify all appear in dashboard
  - [ ] Delete feedback from dashboard - verify removed

- [ ] **Dashboard Testing**:

  - [ ] View all feedback - verify sorted by date (newest first)
  - [ ] Search by name - verify filters correctly
  - [ ] Search by content keyword - verify filters correctly
  - [ ] Pagination - verify works with 20+ feedbacks
  - [ ] Delete multiple feedbacks - verify updates list

- [ ] **Auth Testing**:

  - [ ] Public can submit feedback (no auth)
  - [ ] Table leaders cannot access feedback dashboard
  - [ ] Guests cannot access feedback dashboard
  - [ ] Yaoyao can access dashboard and delete

- [ ] **Rate Limiting Testing** (if implemented):

  - [ ] Submit 6 feedbacks rapidly from same IP
  - [ ] Verify 6th submission rejected with 429 error

- [ ] **Edge Cases**:

  - [ ] Submit empty content - verify accepted (content optional)
  - [ ] Submit with special characters - verify encoding
  - [ ] Submit with emoji - verify displays correctly
  - [ ] Dashboard with 0 feedbacks - verify empty state message

- [ ] **Mobile/Responsive Testing**:
  - [ ] Test feedback form on mobile
  - [ ] Test dashboard on mobile
  - [ ] Verify touch interactions

**🚨 CHECKPOINT**: After testing, report results and issues

### Phase 12: Documentation 📝

- [ ] Update this feature file with completion notes
- [ ] Document QA test results
- [ ] Note any spam prevention measures taken
- [ ] Document how Yaoyao should use feedback dashboard

## Technical Notes

### Rate Limiting Strategy

**Simple Approach** (in-memory):

```typescript
// Reference: Check if similar patterns exist
const submissions = new Map<string, number[]>(); // IP -> timestamps

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const hourAgo = now - 3600000;
  const recentSubmissions =
    submissions.get(ip)?.filter((t) => t > hourAgo) || [];
  submissions.set(ip, [...recentSubmissions, now]);
  return recentSubmissions.length >= 5;
}
```

**Note**: In-memory rate limiting resets on server restart. Use Redis for persistent rate limiting.

### Pagination

Use offset-based pagination:

- Default: 20 items per page
- Query: `?page=1&limit=20`
- Repository: `skip: (page - 1) * limit, take: limit`

**Reference**: Check if pagination patterns exist in codebase

### Date Display

Use relative time for better UX:

- "Just now"
- "5 minutes ago"
- "2 days ago"
- "3 weeks ago"

**Libraries**: `date-fns` (check if already installed)

### Empty States

Show friendly message when no feedback:

- "No feedback yet. Be the first to share your thoughts!"
- "All caught up! No new feedback."

## Files Reference

**New Files to Create**:

- `src/repositories/feedback-repo.ts`
- `src/types/models/feedback.ts`
- `src/types/api/feedback.ts`
- `pages/api/feedback/index.ts`
- `pages/api/feedback/[id].ts`
- `pages/api/feedback/count.ts`
- `src/hooks/feedback/useFeedbacks.ts`
- `src/hooks/feedback/useCreateFeedback.ts`
- `src/hooks/feedback/useDeleteFeedback.ts`
- `src/hooks/feedback/useFeedbackCount.ts`
- `src/components/feedback/FeedbackForm.tsx`
- `src/components/feedback/FeedbackFormCard.tsx`
- `src/components/feedback/FeedbackList.tsx`
- `src/components/feedback/FeedbackItem.tsx`
- `src/components/feedback/FeedbackSearch.tsx`
- `src/components/feedback/FeedbackStats.tsx`
- `src/app/feedback/page.tsx`
- `src/app/dashboard/feedback/page.tsx`

**Files to Modify**:

- Footer component - Add feedback link
- Dashboard navigation - Add feedback link (Yaoyao only)

**Reference Files** (Study These First):

- `prisma/schema.prisma` - Feedback model
- `src/repositories/table-repo.ts` - Repository patterns
- Existing form components - Form patterns

## QA Testing Steps

### Setup

1. Ensure Feedback model exists in schema
2. Run migrations if needed

### Test: Submit Feedback (Public)

1. Navigate to `/feedback` (no auth)
2. Fill name: "John Doe"
3. Fill content: "Great app! Would love dark mode."
4. Click "Submit"
5. Verify success message appears
6. Verify form clears after submission
7. Check database: verify Feedback record created

### Test: Submit Without Content

1. Navigate to `/feedback`
2. Fill name only: "Jane Smith"
3. Leave content empty
4. Click "Submit"
5. Verify submission succeeds (content optional)

### Test: Validation

1. Try to submit with empty name - verify error
2. Try to submit with very long name (200 chars) - verify validation
3. Try to submit with very long content (2000 chars) - verify validation or truncation

### Test: View Feedback Dashboard (Yaoyao)

1. Set `isYaoyao: true` in `useAuthStore`
2. Navigate to `/dashboard/feedback`
3. Verify can see all submitted feedbacks
4. Verify sorted by date (newest first)
5. Verify shows name, content, and date for each

### Test: Search Feedback

1. In feedback dashboard, enter search term "John"
2. Verify filters to show only John's feedback
3. Clear search - verify shows all again
4. Search by content keyword "dark mode" - verify works

### Test: Delete Feedback

1. Click delete button on a feedback item
2. Verify confirmation dialog appears
3. Confirm delete
4. Verify success toast
5. Verify feedback removed from list
6. Check database: verify record deleted

### Test: Pagination

1. Submit 25 feedbacks (use script or manually)
2. Navigate to feedback dashboard
3. Verify shows 20 items on page 1
4. Click "Next" - verify shows remaining 5 items
5. Click "Previous" - verify returns to page 1

### Test: Rate Limiting (if implemented)

1. Submit 5 feedbacks quickly from same IP
2. Try to submit 6th feedback immediately
3. Verify rejected with "Too many requests" error
4. Wait 1 hour (or adjust rate limit for testing)
5. Verify can submit again

### Test: Permissions

1. Set `isYaoyao: false` (guest mode)
2. Try to access `/dashboard/feedback` - verify redirect or 403
3. Try to access `/api/feedback` GET - verify 403
4. Try to access `/feedback` (public form) - verify accessible

### Test: Empty State

1. Delete all feedbacks from dashboard
2. Refresh page
3. Verify shows empty state message

### Test: Mobile View

1. Open `/feedback` on mobile device
2. Verify form is responsive and easy to use
3. Open `/dashboard/feedback` on mobile
4. Verify list is readable and scrollable

## Edge Cases & Limitations

- [ ] **Spam**: No CAPTCHA or advanced spam prevention. Rate limiting helps but not foolproof.
- [ ] **Anonymous Feedback**: No user accounts, so same person can submit multiple times.
- [ ] **No Replies**: Yaoyao cannot reply to feedback (future enhancement).
- [ ] **No Notifications**: Yaoyao not notified of new feedback (future enhancement).
- [ ] **Storage**: Unlimited feedback storage (consider archiving old feedback).

## Known Risks

- ⚠️ **Spam/Abuse**: Public form open to spam. Rate limiting mitigates but not perfect.
- ⚠️ **Privacy**: Names are stored. Consider privacy policy or anonymous option.
- ⚠️ **Storage Growth**: Feedback accumulates over time. May need cleanup strategy.

## Success Metrics

- [ ] Users can submit feedback easily (< 30 seconds)
- [ ] Yaoyao receives actionable feedback
- [ ] No spam or abuse issues
- [ ] Feedback helps drive app improvements

## Future Enhancements

- [ ] **Email Notifications**: Notify Yaoyao of new feedback via email
- [ ] **Reply Feature**: Yaoyao can respond to feedback
- [ ] **Categories**: Categorize feedback (bug report, feature request, general)
- [ ] **Upvoting**: Allow users to upvote existing feedback
- [ ] **Anonymous Option**: Allow users to submit anonymously
- [ ] **CAPTCHA**: Add CAPTCHA to prevent bot spam
- [ ] **Sentiment Analysis**: Auto-categorize feedback as positive/negative
- [ ] **Archive**: Archive old feedback (> 6 months)

## Notes

- This is a simple, lightweight feature
- Focus on ease of use and simplicity
- Don't over-engineer - basic feedback collection is sufficient
- Monitor for spam after launch and adjust rate limiting if needed
