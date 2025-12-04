
"use client"

import * as React from "react"
import {
  Area,
  Bar,
  Cell,
  Line,
  Pie,
  RadialBar,
  Scatter,
  AreaChart as AreaChartPrimitive,
  BarChart as BarChartPrimitive,
  LineChart as LineChartPrimitive,
  PieChart as PieChartPrimitive,
  RadialBarChart as RadialBarChartPrimitive,
  RadarChart as RadarChartPrimitive,
  ScatterChart as ScatterChartPrimitive,
  CartesianGrid,
  Legend as LegendPrimitive,
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
  Tooltip as TooltipPrimitive,
  XAxis,
  YAxis,
} from "recharts"

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

import { cn } from "@/lib/utils"

// #region Chart Types
const ChartContainer = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & {
    config: ChartConfig
    children: React.ReactElement<any, string | React.JSXElementConstructor>
  }
>(({ id, className, children, config, ...props }, ref) => {
  const chartId = `chart-${id || React.useId()}`
  const Comp = React.useMemo(() => {
    if (!children) {
      return null
    }

    return React.cloneElement(children, {
      "data-chart": chartId,
      id: chartId,
    })
  }, [children, chartId])

  return (
    <ChartContext.Provider value={{ chartId, config }}>
      <div
        data-chart={chartId}
        ref={ref}
        className={cn(
          "flex aspect-video justify-center text-xs [&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground [&_.recharts-cartesian-grid_line]:stroke-border/50 [&_.recharts-curve.recharts-tooltip-cursor]:stroke-border [&_.recharts-dot[stroke='#fff']]:stroke-transparent [&_.recharts-layer:focus-visible]:outline-none [&_.recharts-polar-grid_[stroke='#ccc']]:stroke-border [&_.recharts-radial-bar-background-sector]:fill-muted [&_.recharts-radial-bar-sector]:fill-primary [&_.recharts-reference-line-line]:stroke-border [&_.recharts-sector[stroke='#fff']]:stroke-transparent [&_.recharts-sector]:fill-primary [&_.recharts-surface]:outline-none",
          className
        )}
        {...props}
      >
        {Comp}
      </div>
    </ChartContext.Provider>
  )
})
ChartContainer.displayName = "Chart"

type ChartContextProps = {
  chartId: string
  config: ChartConfig
}

const ChartContext = React.createContext<ChartContextProps | null>(null)

function useChart() {
  const context = React.useContext(ChartContext)

  if (!context) {
    throw new Error("useChart must be used within a <ChartContainer />")
  }

  return context
}

type ChartConfig = {
  [k in string]: {
    label?: React.ReactNode
    icon?: React.ComponentType
  } & (
    | { color?: string; theme?: never }
    | { color?: never; theme: Record<string, string> }
  )
}

// #endregion

// #region Chart Components
const ChartTooltip = TooltipPrimitive

const ChartTooltipTrigger = TooltipTrigger

const ChartTooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipContent>,
  React.ComponentProps<typeof TooltipContent> & {
    hideLabel?: boolean
    hideIndicator?: boolean
    indicator?: "line" | "dot" | "dashed"
    nameKey?: string
    labelKey?: string
  }
>(
  (
    {
      className,
      ...props
    },
    ref
  ) => {
    return (
      <TooltipContent
        ref={ref}
        className={cn("data-[side=top]:mb-2", className)}
        {...props}
      />
    )
  }
)

ChartTooltipContent.displayName = "ChartTooltipContent"

const ChartLegend = LegendPrimitive

const ChartLegendContent = React.forwardRef<
  React.ElementRef<typeof LegendPrimitive>,
  React.ComponentProps<typeof LegendPrimitive> & {
    hideIcon?: boolean
    nameKey?: string
  }
>(({ className, ...props }, ref) => {
  return (
    <LegendPrimitive
      ref={ref}
      verticalAlign="bottom"
      className={cn(
        "flex-wrap! data-[align=center]:!justify-center data-[align=right]:!justify-end data-[align=left]:!justify-start [&_.recharts-legend-item]:ml-0 [&_.recharts-legend-item:not(:last-child)]:mr-4 [&_.recharts-legend-icon]:h-2 [&_.recharts-legend-icon]:w-2 [&_.recharts-legend-icon]:!translate-y-px",
        className
      )}
      {...props}
    />
  )
})
ChartLegendContent.displayName = "ChartLegendContent"
// #endregion

export {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  ChartContext,
  useChart,
}
export type { ChartConfig }
