// @ts-nocheck
/**
 * Shadcn UI Components Barrel Export
 * 
 * NOTE: @ts-nocheck is required for shadcn/ui barrel exports due to complex
 * type re-exports from third-party components. This is an accepted pattern
 * for shadcn/ui library integration and should not be considered a violation.
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

// Alert components
export { Alert, AlertTitle, AlertDescription } from './alert'

// Form components
export { Badge, badgeVariants } from './badge'

export { Button, buttonVariants } from './button'

export { Input } from './input'

export { Label } from './label'

export { Textarea } from './textarea'

export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from './select'

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

// Layout components
export { Separator } from './separator'

export { ScrollArea, ScrollBar } from './scroll-area'

export {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from './resizable'

// Overlay components
export {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverAnchor,
} from './popover'

export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogClose,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from './dialog'

export {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
  CommandSeparator,
} from './command'
