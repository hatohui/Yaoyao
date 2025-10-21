# FEAT-005: Export to Excel

**Status**: 🆕 New Feature

**Priority**: P2 (Medium - Admin Convenience Feature)

**Dependencies**:

- FEAT-001 (CRUD Tables) ✅
- FEAT-009 (People Management) ✅
- FEAT-010 (Order Management) ✅

## Overview

Export all production data to a formatted Excel file for Yaoyao to share with kitchen staff, print for the event, or keep as records. The export includes tables, people, orders, and summary statistics in a multi-sheet workbook with proper formatting and translations.

## User Roles & Permissions

### Yaoyao (isYaoyao: true)

- 🆕 Export data to Excel
- 🆕 Select export language (en, th, vi, zh)
- 🆕 Download formatted Excel file

### Table Leader & Guest

- ❌ No access to export feature

## User Stories

### Yaoyao Stories

- [ ] As Yaoyao, I want to export current production data to an Excel file so I can share with kitchen staff or print for the event
- [ ] As Yaoyao, I want the export to include: table number, table name, capacity, total people, table leader name, all orders (food name, variant, quantity), and member names
- [ ] As Yaoyao, I want to choose the language for the export (en, th, vi, zh) so it matches my staff's language
- [ ] As Yaoyao, I want multiple sheets: "Summary", "Tables", "Orders", "Menu"
- [ ] As Yaoyao, I want the export to calculate totals (total guests, total orders, per-food quantities)
- [ ] As Yaoyao, I want the file to be formatted professionally (headers, colors, borders)

## Acceptance Criteria

- [ ] Export button in dashboard (only visible to Yaoyao)
- [ ] Language selector dialog before export
- [ ] Uses translations from `src/language/*.json` for food names and UI text
- [ ] Excel file generated server-side using `exceljs` library
- [ ] File download named `yaoyao-export-[date].xlsx`
- [ ] All production data (not staging)
- [ ] Handles linked tables (show as grouped or referenced)
- [ ] Export completes in reasonable time (<10s for typical dataset)

## Excel File Structure

### Sheet 1: Summary

| Metric              | Value           |
| ------------------- | --------------- |
| Total Tables        | 12              |
| Total Guests        | 85              |
| Total Orders        | 142             |
| Total Foods Ordered | 28 unique items |
| Export Date         | 2025-10-20      |
| Language            | English         |

### Sheet 2: Tables

| Table # | Table Name | Capacity | Occupancy | Table Leader | Members                   | Linked To  | Status    |
| ------- | ---------- | -------- | --------- | ------------ | ------------------------- | ---------- | --------- |
| 1       | Family     | 6        | 6/6       | John Doe     | John Doe, Jane Doe, ...   | Table 2, 3 | Full      |
| 2       | Friends    | 4        | 3/4       | Alice Smith  | Alice Smith, Bob Lee, ... | Table 1, 3 | Available |

### Sheet 3: Orders by Table

| Table # | Table Name | Food Name    | Variant | Quantity | Notes       |
| ------- | ---------- | ------------ | ------- | -------- | ----------- |
| 1       | Family     | Pad Thai     | Large   | 3        | Extra spicy |
| 1       | Family     | Spring Rolls | Regular | 6        |             |
| 2       | Friends    | Tom Yum Soup | Medium  | 2        |             |

### Sheet 4: Menu Summary

| Food Name    | Category    | Total Quantity | Tables Ordered |
| ------------ | ----------- | -------------- | -------------- |
| Pad Thai     | Main Course | 15             | 8 tables       |
| Spring Rolls | Appetizer   | 22             | 10 tables      |
| Tom Yum Soup | Soup        | 8              | 5 tables       |

## Implementation Checklist

### Phase 1: Planning & Design 🔄

- [ ] **🚨 CHECKPOINT**: Present implementation plan to user
- [ ] Research `exceljs` library documentation
- [ ] Study translation files in `src/language/*.json`
- [ ] Design Excel sheet layouts and formatting
- [ ] Plan data aggregation queries
- [ ] Design language selector UI

**References to Study**:

- ExcelJS docs: https://github.com/exceljs/exceljs
- `src/language/*.json` - Translation files
- `src/repositories/table-repo.ts` - Data fetching patterns
- `src/utils/mapFoodToResponse.ts` - Translation mapping pattern

### Phase 2: Install Dependencies 📝

- [ ] Install ExcelJS: `npm install exceljs`
- [ ] Install types: `npm install --save-dev @types/exceljs`
- [ ] Verify installation in `package.json`

**🚨 CHECKPOINT**: Confirm library installed successfully

### Phase 3: Repository Layer 📝

- [ ] Create `src/repositories/export-repo.ts`
  - [ ] `getExportData()` - Aggregate all data for export
    - [ ] Fetch all production tables (with people, orders, table links)
    - [ ] Fetch all food items with translations
    - [ ] Calculate summary statistics
    - [ ] Include table leader names
    - [ ] Group orders by table
    - [ ] Calculate per-food totals
  - [ ] `getTableSummary()` - Table-specific data
  - [ ] `getOrdersSummary()` - Orders grouped by table
  - [ ] `getMenuSummary()` - Food items with quantities

**🚨 CHECKPOINT**: Show repository function signatures, ask for approval

**Reference**: Follow patterns in `src/repositories/table-repo.ts` for complex joins

**Example Query Pattern**:

```typescript
// Reference: Check existing include patterns in table-repo.ts
// Fetch tables with all related data in single query
```

### Phase 4: Translation Utility 📝

- [ ] Create `src/utils/translateExport.ts`
  - [ ] `translateFood(foodId, language)` - Get food name in chosen language
  - [ ] `translateCategory(categoryId, language)` - Get category name
  - [ ] `translateHeaders(language)` - Get Excel header translations
  - [ ] `loadTranslations(language)` - Load translation JSON file

**Reference**: Follow pattern in `src/utils/mapFoodToResponse.ts`

### Phase 5: Excel Generation Utility 📝

- [ ] Create `src/utils/exportToExcel.ts`
  - [ ] `generateExcelWorkbook(data, language)` - Main export function
  - [ ] `createSummarySheet(workbook, data, language)` - Sheet 1
  - [ ] `createTablesSheet(workbook, data, language)` - Sheet 2
  - [ ] `createOrdersSheet(workbook, data, language)` - Sheet 3
  - [ ] `createMenuSheet(workbook, data, language)` - Sheet 4
  - [ ] `formatHeaders(worksheet)` - Apply styling to headers
  - [ ] `applyBordersAndColors(worksheet)` - Professional formatting

**🚨 CHECKPOINT**: Show Excel generation structure, ask for approval

**ExcelJS Patterns to Use**:

- Create workbook: `const workbook = new ExcelJS.Workbook()`
- Add worksheet: `workbook.addWorksheet('Sheet Name')`
- Set cell values: `worksheet.getCell('A1').value = 'Header'`
- Apply styles: `cell.font = { bold: true }`
- Set column widths: `worksheet.getColumn(1).width = 20`

**Reference**: Check ExcelJS documentation for advanced formatting

### Phase 6: Type Definitions 📝

- [ ] Create `src/types/api/export.ts`
  - [ ] `ExportDataRequest` - { language: 'en' | 'th' | 'vi' | 'zh' }
  - [ ] `ExportDataResponse` - { success: boolean, fileName: string }
  - [ ] `ExportData` - Aggregated data structure
  - [ ] `TableExportData` - Single table export data
  - [ ] `OrderExportData` - Single order export data
  - [ ] `MenuSummaryData` - Food summary data

**Reference**: Follow patterns in `src/types/api/table.ts`

### Phase 7: API Layer 📝

- [ ] Create `pages/api/export/excel.ts`
  - [ ] GET endpoint with query param `?lang=en`
  - [ ] Auth check: `isYaoyao === true` (Yaoyao only)
  - [ ] Validation: language must be one of ['en', 'th', 'vi', 'zh']
  - [ ] Call `getExportData()` from export-repo
  - [ ] Call `generateExcelWorkbook(data, language)` from utils
  - [ ] Generate Excel buffer: `await workbook.xlsx.writeBuffer()`
  - [ ] Set response headers:
    - [ ] `Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet`
    - [ ] `Content-Disposition: attachment; filename=yaoyao-export-[date].xlsx`
  - [ ] Send buffer as response
  - [ ] Error handling (500 if generation fails)

**🚨 CHECKPOINT**: Show API route structure, ask for approval

**Reference**: Check existing file download patterns in codebase (if any)

**Example Response Headers**:

```typescript
// Reference: Check how to set headers in Next.js API route
res.setHeader(
  "Content-Type",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
);
res.setHeader(
  "Content-Disposition",
  `attachment; filename=yaoyao-export-${date}.xlsx`
);
```

### Phase 8: Hook Layer 📝

- [ ] Create `src/hooks/export/useExportExcel.ts`
  - [ ] Custom hook to trigger export download
  - [ ] Function: `exportToExcel(language: string)`
  - [ ] Uses `fetch()` or `axios` to call API
  - [ ] Handles blob response
  - [ ] Triggers browser download
  - [ ] Loading and error states

**Reference**: Check if similar download hooks exist in codebase

**Example Download Pattern**:

```typescript
// Reference: Check browser download patterns
const blob = await response.blob();
const url = window.URL.createObjectURL(blob);
const a = document.createElement("a");
a.href = url;
a.download = filename;
a.click();
```

### Phase 9: Component Layer 📝

- [ ] Create `src/components/export/ExportButton.tsx`

  - [ ] Button component: "Export to Excel"
  - [ ] Only visible if `isYaoyao === true`
  - [ ] Click opens `<LanguageSelectorDialog>`

- [ ] Create `src/components/export/LanguageSelectorDialog.tsx`

  - [ ] Modal with language selection
  - [ ] Radio buttons or dropdown: English, ไทย, Tiếng Việt, 中文
  - [ ] Preview of export contents (optional)
  - [ ] Confirm button triggers `useExportExcel()`
  - [ ] Loading state during export generation
  - [ ] Success/error toast after export

- [ ] Create `src/components/export/ExportProgress.tsx` (optional)
  - [ ] Progress indicator for large exports
  - [ ] Shows "Generating Excel file..." message

**🚨 CHECKPOINT**: Show component structure, ask for approval

**Reference**: Check existing modal/dialog patterns

### Phase 10: Dashboard Integration 📝

- [ ] Update `src/app/dashboard/page.tsx`

  - [ ] Add `<ExportButton>` to dashboard toolbar or header
  - [ ] Position near other admin actions

- [ ] Alternative: Create dedicated export page
  - [ ] `src/app/dashboard/export/page.tsx`
  - [ ] Show export options and preview
  - [ ] Multiple export formats (future: PDF, CSV)

**Reference**: Follow existing dashboard layout

### Phase 11: Excel Formatting & Styling 📝

- [ ] Implement professional styling:

  - [ ] **Headers**: Bold, background color (#4472C4), white text
  - [ ] **Borders**: All cells with thin borders
  - [ ] **Alternating Rows**: Light gray (#F2F2F2) for even rows
  - [ ] **Column Widths**: Auto-fit or fixed widths
  - [ ] **Number Formats**: Quantities as numbers, dates as dates
  - [ ] **Alignment**: Center for headers, left for text, right for numbers

- [ ] Add totals row at bottom of each sheet:
  - [ ] Summary sheet: no totals needed
  - [ ] Tables sheet: Total capacity, total occupancy
  - [ ] Orders sheet: Total quantity
  - [ ] Menu sheet: Total unique foods

**Reference**: ExcelJS styling documentation

### Phase 12: Handle Translations 📝

- [ ] Load correct translation file based on language param

  - [ ] Read `src/language/en.json` for English
  - [ ] Read `src/language/th.json` for Thai, etc.

- [ ] Translate dynamic content:

  - [ ] Food names (from FoodTranslation table)
  - [ ] Category names (from CategoryTranslation table)
  - [ ] Static headers (from translation JSON)

- [ ] Handle missing translations:
  - [ ] Fallback to English if translation missing
  - [ ] Log warning for missing translations

**Reference**: Check `src/utils/mapFoodToResponse.ts` for translation patterns

### Phase 13: Handle Special Cases 📝

- [ ] **Linked Tables**:

  - [ ] Show linked table IDs in "Linked To" column
  - [ ] Option: Group linked tables together with visual indicator

- [ ] **Empty Tables**:

  - [ ] Include tables with 0 people/orders
  - [ ] Show as "Empty" or "Not Assigned"

- [ ] **No Orders**:

  - [ ] Show message if no orders exist
  - [ ] Still export tables and people data

- [ ] **Large Datasets**:
  - [ ] Test with 100+ tables
  - [ ] Optimize query to prevent timeout
  - [ ] Consider streaming response for very large exports

### Phase 14: Testing & QA 📝

- [ ] **Functional Testing**:

  - [ ] Click export button - verify language dialog opens
  - [ ] Select English - verify Excel file downloads
  - [ ] Select Thai - verify food names in Thai
  - [ ] Open Excel file - verify all sheets present
  - [ ] Verify data accuracy (spot check tables, orders)
  - [ ] Verify totals calculated correctly
  - [ ] Verify linked tables shown correctly

- [ ] **Format Testing**:

  - [ ] Headers bold and colored
  - [ ] Borders applied to all cells
  - [ ] Alternating row colors
  - [ ] Column widths appropriate
  - [ ] No truncated text
  - [ ] Numbers formatted as numbers (not text)

- [ ] **Translation Testing**:

  - [ ] Export in all 4 languages (en, th, vi, zh)
  - [ ] Verify food names translated
  - [ ] Verify headers translated
  - [ ] Verify fallback to English if translation missing

- [ ] **Auth Testing**:

  - [ ] Yaoyao can access export
  - [ ] Table leaders cannot see export button
  - [ ] Guests cannot see export button
  - [ ] API endpoint rejects non-Yaoyao requests

- [ ] **Edge Cases**:

  - [ ] Export with 0 tables - verify empty message
  - [ ] Export with 100+ tables - verify performance
  - [ ] Export with special characters in names - verify encoding
  - [ ] Export with linked tables - verify displayed correctly

- [ ] **Cross-Application Testing**:
  - [ ] Open file in Microsoft Excel - verify compatibility
  - [ ] Open file in Google Sheets - verify compatibility
  - [ ] Open file in LibreOffice Calc - verify compatibility

**🚨 CHECKPOINT**: After testing, report results and issues

### Phase 15: Documentation 📝

- [ ] Update this feature file with completion notes
- [ ] Document QA test results
- [ ] Create user guide for export feature
- [ ] Document Excel file structure for reference
- [ ] Note any performance considerations

## Technical Notes

### ExcelJS Library

**Pros**:

- Most feature-rich Excel library for Node.js
- Supports styling, formulas, multiple sheets
- Good documentation and community support

**Cons**:

- Larger bundle size (but server-side, so not critical)
- Slightly slower than lighter alternatives

**Alternative**: `xlsx` library (lighter but less formatting options)

**Decision**: Use ExcelJS for professional formatting

### File Size Considerations

- Typical export: ~50 KB for 10 tables with 100 orders
- Large export: ~500 KB for 100 tables with 1000 orders
- ExcelJS compresses well, so file sizes reasonable

### Translation Performance

- Load translation JSON once per request (not per food item)
- Cache translations in memory during generation
- Use Prisma to fetch food translations in single query (join)

### Error Handling

- If Excel generation fails, return 500 with error message
- If no data to export, return empty file or error message
- Log errors for debugging

### Future Enhancements

- [ ] Export to PDF (using jsPDF or similar)
- [ ] Export to CSV (simpler, no formatting)
- [ ] Scheduled exports (email to Yaoyao daily)
- [ ] Custom export filters (date range, specific tables)
- [ ] Export templates (different formats for different uses)

## Files Reference

**New Files to Create**:

- `src/repositories/export-repo.ts`
- `src/utils/exportToExcel.ts`
- `src/utils/translateExport.ts`
- `src/types/api/export.ts`
- `pages/api/export/excel.ts`
- `src/hooks/export/useExportExcel.ts`
- `src/components/export/ExportButton.tsx`
- `src/components/export/LanguageSelectorDialog.tsx`
- `src/components/export/ExportProgress.tsx` (optional)

**Files to Modify**:

- `src/app/dashboard/page.tsx` - Add export button
- `package.json` - Add exceljs dependency

**Reference Files** (Study These First):

- `src/repositories/table-repo.ts` - Query patterns
- `src/utils/mapFoodToResponse.ts` - Translation mapping
- `src/language/*.json` - Translation files
- ExcelJS docs: https://github.com/exceljs/exceljs

## QA Testing Steps

### Setup

1. Set `isYaoyao: true` in `useAuthStore`
2. Create 5+ tables with people and orders
3. Navigate to `/dashboard`

### Test: Basic Export (English)

1. Click "Export to Excel" button
2. Language selection dialog opens
3. Select "English"
4. Click "Export"
5. Verify loading indicator appears
6. Verify Excel file downloads (yaoyao-export-[date].xlsx)
7. Open file in Excel/Sheets
8. Verify 4 sheets: Summary, Tables, Orders, Menu
9. Verify data accuracy (spot check)

### Test: Export in Thai

1. Click "Export to Excel"
2. Select "ไทย" (Thai)
3. Export
4. Open file
5. Verify headers in Thai
6. Verify food names in Thai (if translations exist)
7. Verify numbers and dates still readable

### Test: Export with Linked Tables

1. Link Table 1 and Table 2 (via FEAT-003)
2. Export to Excel
3. Open file, go to "Tables" sheet
4. Verify "Linked To" column shows "Table 2" for Table 1
5. Verify both tables listed

### Test: Export with Empty Tables

1. Create a table with no people or orders
2. Export to Excel
3. Verify empty table still appears in Tables sheet
4. Verify shows 0/4 occupancy (or similar)

### Test: Large Dataset

1. Create 50 tables with orders
2. Export to Excel
3. Verify export completes without timeout
4. Verify file size reasonable (<1 MB)
5. Verify all data present (spot check last table)

### Test: Format Validation

1. Export file
2. Open in Microsoft Excel
3. Verify headers bold and blue background
4. Verify borders on all cells
5. Verify alternating row colors
6. Verify column widths appropriate (no truncated text)
7. Verify totals row at bottom (if implemented)

### Test: Cross-App Compatibility

1. Export file
2. Open in Google Sheets - verify looks correct
3. Open in LibreOffice Calc - verify looks correct
4. Check for encoding issues (special characters)

### Test: Permissions

1. Set `isYaoyao: false`
2. Verify export button not visible in dashboard
3. Try to access `/api/export/excel` directly - verify 403

### Test: Error Handling

1. Delete all tables
2. Try to export - verify empty file or error message
3. Simulate server error (disconnect DB) - verify error toast

## Edge Cases & Limitations

- [ ] **Large Exports**: 500+ tables may timeout. Consider background job or pagination.
- [ ] **Missing Translations**: Falls back to English, but may confuse users.
- [ ] **Special Characters**: Ensure UTF-8 encoding to support all languages.
- [ ] **Excel Compatibility**: Older Excel versions (2007 and older) may have issues.
- [ ] **File Size**: Very large exports (1000+ orders) may be slow to download.

## Known Risks

- ⚠️ **ExcelJS Performance**: Generating large files may be slow. Test with realistic data.
- ⚠️ **Memory Usage**: Holding entire workbook in memory before download. Monitor server memory.
- ⚠️ **Browser Download**: Some browsers block automatic downloads. Ensure user click triggers download.

## Success Metrics

- [ ] Export completes in <5 seconds for typical dataset
- [ ] Excel file opens correctly in all major spreadsheet apps
- [ ] Data is accurate and formatted professionally
- [ ] Translations work correctly for all supported languages
- [ ] Yaoyao finds export useful for event coordination

## Future Enhancements

- [ ] **PDF Export**: Generate PDF for printing
- [ ] **CSV Export**: Simpler format for data processing
- [ ] **Email Export**: Send Excel file to email address
- [ ] **Scheduled Exports**: Daily/weekly automatic exports
- [ ] **Custom Filters**: Export specific date range or tables
- [ ] **Export Templates**: Different formats (kitchen, staff, guest list)
- [ ] **Export History**: Track past exports

## Notes

- This is a backend-heavy feature (Excel generation)
- Focus on data accuracy and formatting quality
- Test thoroughly in actual Excel/Sheets apps (not just preview)
- Translation quality depends on FoodTranslation and CategoryTranslation data
