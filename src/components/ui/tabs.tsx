
import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"
import { cn } from "@/lib/utils"
import { useIsMobile } from "@/hooks/use-mobile"
import { ChevronLeft, ChevronRight } from "lucide-react"

const Tabs = TabsPrimitive.Root

const TabsListScrollable = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List> & {
    scrollable?: boolean;
  }
>(({ className, scrollable = false, children, ...props }, ref) => {
  const [scrollPosition, setScrollPosition] = React.useState(0);
  const tabsRef = React.useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  const handleScroll = (direction: 'left' | 'right') => {
    if (!tabsRef.current) return;
    
    const container = tabsRef.current;
    const scrollAmount = container.offsetWidth * 0.8;
    
    if (direction === 'left') {
      setScrollPosition(Math.max(0, scrollPosition - scrollAmount));
      container.scrollTo({
        left: Math.max(0, scrollPosition - scrollAmount),
        behavior: 'smooth'
      });
    } else {
      setScrollPosition(Math.min(container.scrollWidth - container.offsetWidth, scrollPosition + scrollAmount));
      container.scrollTo({
        left: Math.min(container.scrollWidth - container.offsetWidth, scrollPosition + scrollAmount),
        behavior: 'smooth'
      });
    }
  };

  if (scrollable && isMobile) {
    return (
      <div className="relative flex items-center mb-16">
        <button 
          onClick={() => handleScroll('left')}
          className="absolute left-0 z-10 bg-background/80 p-1 rounded-full shadow-sm"
          aria-label="Scroll left"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <div 
          ref={tabsRef}
          className="overflow-x-auto flex w-full scrollbar-hide px-6"
          style={{ scrollBehavior: 'smooth' }}
        >
          <TabsPrimitive.List
            ref={ref}
            className={cn(
              "inline-flex h-10 items-center justify-start min-w-max rounded-md bg-muted p-1 text-muted-foreground",
              className
            )}
            {...props}
          >
            {children}
          </TabsPrimitive.List>
        </div>
        <button 
          onClick={() => handleScroll('right')}
          className="absolute right-0 z-10 bg-background/80 p-1 rounded-full shadow-sm"
          aria-label="Scroll right"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    );
  }

  return (
    <TabsPrimitive.List
      ref={ref}
      className={cn(
        "inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground",
        scrollable && "w-full overflow-x-auto",
        className
      )}
      {...props}
    >
      {children}
    </TabsPrimitive.List>
  );
});
TabsListScrollable.displayName = "TabsListScrollable";

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      "inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground",
      className
    )}
    {...props}
  />
))
TabsList.displayName = TabsPrimitive.List.displayName

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm",
      className
    )}
    {...props}
  />
))
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      className
    )}
    {...props}
  />
))
TabsContent.displayName = TabsPrimitive.Content.displayName

export { Tabs, TabsList, TabsListScrollable, TabsTrigger, TabsContent }
