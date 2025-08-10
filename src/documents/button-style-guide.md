# Button Style Guide

## Overview

This guide documents the button system implementation, including animations, presets, factory patterns, and best practices.

## Core Button Component

### Animation & Debounce

All buttons now include click animation and debounce for better user experience:

#### Click Animation

- **Scale**: 95% on press
- **Duration**: 150ms
- **Trigger**: Active state (mouse down or touch)
- **Classes**: `active:scale-95 active:transition-transform duration-150`

#### Debounce Mechanism (NEW)

- **Auto-disable**: Button disables for 250ms after click
- **Purpose**: Prevents double-clicks and duplicate submissions
- **Implementation**: Built into core Button component
- **Behavior**:
  - Click → Animation plays → Button disables → 250ms wait → Re-enable
  - Already disabled buttons are not affected
  - Loading buttons stay disabled (no auto re-enable)
  - Works with onClick, form submissions, and navigation

### Import Path

```typescript
// ✅ Correct - Standardized import
import { Button } from '@/components/ui/schadcn'

// ❌ Incorrect - Old paths
import { Button } from '@/components/ui'
import { Button } from '@/components/ui/schadcn/button'
```

## Button Variants

### Visual Variants

- `default` - Primary action button with brand colors
- `destructive` - Dangerous actions (delete, remove)
- `outline` - Secondary actions with border
- `secondary` - Alternative secondary style
- `ghost` - Minimal style for less prominent actions
- `link` - Text-only with underline on hover

### Size Variants

- `sm` - Small buttons (h-8)
- `default` - Standard size (h-9)
- `lg` - Large buttons (h-10)
- `icon` - Square icon-only buttons (size-9)

## Button Constants

### Common Classes (DRY)

```typescript
import { BUTTON_CLASSES } from '@/components/ui/schadcn'

// Width variants
BUTTON_CLASSES.fullWidth // 'w-full'
BUTTON_CLASSES.responsiveWidth // 'w-full sm:w-auto'

// Spacing
BUTTON_CLASSES.withGap.sm // 'gap-1.5'
BUTTON_CLASSES.withGap.md // 'gap-2'

// Margins
BUTTON_CLASSES.margin.top.md // 'mt-4'
BUTTON_CLASSES.margin.bottom.lg // 'mb-6'
```

## Button Presets

### Usage

```typescript
import { BUTTON_PRESETS } from '@/components/ui/schadcn'

// Apply preset
<Button {...BUTTON_PRESETS.formSubmit}>
  Submit
</Button>
```

### Available Presets

- **Navigation**: `navPrimary`, `navSecondary`, `navBack`
- **Forms**: `formSubmit`, `formCancel`, `formReset`
- **Actions**: `actionPrimary`, `actionSecondary`, `actionDanger`
- **Cards**: `cardAction`, `cardPrimary`
- **Modals**: `modalConfirm`, `modalCancel`, `modalClose`
- **Filters**: `filterActive`, `filterInactive`
- **Icons**: `iconAction`, `iconPrimary`
- **States**: `loading`

## Button Factory

### Basic Usage

```typescript
import { ButtonFactory } from '@/components/ui/schadcn'

<ButtonFactory
  label="Save Changes"
  icon="save"
  preset="formSubmit"
  loading={isLoading}
  onClick={handleSave}
/>
```

### Pre-configured Factories

```typescript
import {
  BackButton,
  GoToCartButton,
  FilterButton,
  SaveButton,
  CancelButton,
  DeleteButton,
  LoadingButton,
  IconButton
} from '@/components/ui/schadcn'

// Navigation
<BackButton label="Back to Products" href="/products" />

// Cart
<GoToCartButton />

// Filter with active state
<FilterButton isActive={showFilters} onClick={toggleFilters} />

// Form actions
<SaveButton onClick={handleSave} loading={isSaving} />
<CancelButton onClick={handleCancel} />

// Danger action
<DeleteButton onClick={handleDelete} />

// Loading state
<LoadingButton label="Processing..." />

// Icon only
<IconButton icon="settings" onClick={openSettings} />
```

## Button Groups

### Basic Usage

```typescript
import { ButtonGroup } from '@/components/ui/schadcn'

<ButtonGroup direction="horizontal" spacing="normal">
  <Button>Cancel</Button>
  <Button variant="default">Save</Button>
</ButtonGroup>
```

### Props

- `direction`: 'horizontal' | 'vertical' | 'grid'
- `spacing`: 'tight' | 'normal' | 'loose'
- `responsive`: boolean (stack on mobile)
- `columns`: 2 | 3 (for grid layout)
- `align`: 'start' | 'center' | 'end' | 'stretch'
- `separator`: boolean (add visual separator)
- `fullWidth`: boolean

### Pre-configured Groups

```typescript
import {
  ModalButtonGroup,
  FormButtonGroup,
  CardButtonGroup,
  FilterButtonGroup,
  ToolbarButtonGroup
} from '@/components/ui/schadcn'

// Modal footer
<ModalButtonGroup>
  <CancelButton />
  <SaveButton />
</ModalButtonGroup>

// Form actions
<FormButtonGroup>
  <Button variant="outline">Reset</Button>
  <Button variant="default">Submit</Button>
</FormButtonGroup>

// Card actions
<CardButtonGroup>
  <Button size="sm" variant="outline">View</Button>
  <Button size="sm">Edit</Button>
</CardButtonGroup>

// Filters
<FilterButtonGroup>
  <FilterButton label="All" isActive={filter === 'all'} />
  <FilterButton label="Active" isActive={filter === 'active'} />
  <FilterButton label="Archived" isActive={filter === 'archived'} />
</FilterButtonGroup>

// Toolbar
<ToolbarButtonGroup>
  <IconButton icon="edit" />
  <IconButton icon="copy" />
  <IconButton icon="delete" />
</ToolbarButtonGroup>
```

## Animation States

### Click Animation

- Applied automatically to all buttons
- Scale: 95% on active
- Duration: 150ms
- Does not interfere with disabled state

### Additional Animations

```typescript
import { BUTTON_ANIMATIONS } from '@/components/ui/schadcn'

// Hover effect
<Button className={BUTTON_ANIMATIONS.hover}>
  Hover Me
</Button>

// Pulse for attention
<Button className={BUTTON_ANIMATIONS.pulse}>
  New Feature
</Button>

// Loading spinner
<Button>
  <Loader2 className={BUTTON_ANIMATIONS.spin} />
  Loading...
</Button>
```

## Best Practices

### DO's

✅ Use Button Factory for common patterns
✅ Apply presets for consistency
✅ Use ButtonGroup for related actions
✅ Import from `@/components/ui/schadcn`
✅ Use icon prop instead of manual icon placement
✅ Leverage loading state handling

### DON'Ts

❌ Hardcode spacing classes (use BUTTON_CLASSES)
❌ Create duplicate button components
❌ Mix import paths
❌ Disable animations globally
❌ Override active:scale-95 unless necessary

## Migration Guide

### Old Pattern

```typescript
// Before
import { Button } from '@/components/ui'

<Button className="w-full gap-2 mt-4">
  <ArrowLeft className="h-4 w-4" />
  Back
</Button>
```

### New Pattern

```typescript
// After
import { BackButton } from '@/components/ui/schadcn'

<BackButton
  label="Back"
  className={BUTTON_CLASSES.margin.top.md}
/>

// Or with ButtonFactory
import { ButtonFactory, BUTTON_CLASSES } from '@/components/ui/schadcn'

<ButtonFactory
  label="Back"
  icon="back"
  preset="navBack"
  className={BUTTON_CLASSES.margin.top.md}
/>
```

## Testing Checklist

- [x] Animation works on all variants
- [x] Animation works on all sizes
- [x] Animation doesn't affect disabled buttons
- [x] Debounce prevents double-clicks (250ms)
- [x] Debounce works with onClick handlers
- [x] Debounce works with navigation buttons
- [x] Loading buttons stay disabled
- [x] Presets apply correctly
- [x] Factory creates proper buttons
- [x] Groups layout correctly
- [ ] Touch devices respond properly
- [ ] Keyboard navigation works

## Performance Notes

- Animation uses CSS transforms (GPU accelerated)
- Duration kept at 150ms for responsiveness
- No JavaScript animation libraries needed
- Active state handled by CSS pseudo-class
- Zero runtime overhead for animations
- Debounce uses lightweight React state (minimal overhead)
- Timeout cleanup prevents memory leaks
- 250ms debounce is optimal for preventing double-clicks without feeling sluggish

## Debounce Use Cases

### Prevents:

- ❌ Double form submissions
- ❌ Duplicate API calls
- ❌ Rapid navigation clicks
- ❌ Accidental double-deletions
- ❌ Multiple cart additions
- ❌ Repeated filter toggles

### Benefits:

- ✅ Better UX on slow networks
- ✅ Reduced server load
- ✅ Prevents race conditions
- ✅ Cleaner analytics (no duplicate events)
- ✅ More predictable user interactions
