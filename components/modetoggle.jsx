"use client"

import * as React from "react"
import { Monitor, Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "./ui/button"
import { cn } from "@/lib/utils"

export function ModeToggle({btnClassName}) {
  const { setTheme } = useTheme()
  return (
    <div className="flex gap-1 justify-center items-center">
      <Button size="sm" className={cn("h-[26px] w-[26px] p-0",btnClassName)} variant={"outline"} onClick={() => setTheme("dark")}>
        <Moon className="h-4 w-4" />
      </Button>
      <Button size="sm" className={cn("h-[26px] w-[26px] p-0",btnClassName)} variant={"outline"} onClick={() => setTheme("light")}>
        <Sun className="h-4 w-4" />
      </Button>
      <Button size="sm" className={cn("h-[26px] w-[26px] p-0",btnClassName)} variant={"outline"} onClick={() => setTheme("system")}>
        <Monitor className="h-4 w-4" />
      </Button>
    </div>
  )
}
