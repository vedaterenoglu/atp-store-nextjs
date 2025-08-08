// @ts-nocheck
/**
 * Shadcn UI Components Barrel Export
 *
 * SOLID Principles Applied:
 * - SRP: Single responsibility for exporting shadcn/ui components
 * - OCP: Open for extension with new shadcn components
 * - ISP: Provides focused interface for shadcn components
 *
 * Design Patterns:
 * - Barrel Export Pattern: Consolidates exports for cleaner imports
 * - Facade Pattern: Provides unified interface to shadcn components
 *
 * Architecture: Central export point for all shadcn/ui components,
 * enabling clean imports and maintaining component library consistency
 */

// Form components
export { Badge, badgeVariants } from './badge'

export { Button, buttonVariants } from './button'

export { Input } from './input'

export { Label } from './label'

export { Textarea } from './textarea'

export { Select } from './select'

// UI components
export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
} from './card'

export { Calendar } from './calendar'

export { Skeleton } from './skeleton'

export {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from './carousel'

// Menu components
export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuGroup,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuRadioGroup,
} from './dropdown-menu'

// Tooltip components
export {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from './tooltip'
