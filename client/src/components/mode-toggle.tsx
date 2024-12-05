import { Moon, Sun } from "lucide-react"
import { useTheme } from "./theme-provider"
import { useEffect, useState } from "react"

export function ModeToggle() {
  const { setTheme } = useTheme()
  const [isDark, setIsDark] = useState(false);
  useEffect(() => {
    if (isDark) {
      setTheme("dark")
    } else {
      setTheme("light")
    }
  }, [isDark])
  return (
    <div className="flex gap-2 items-center p-2 hover:cursor-pointer" onClick={() => setIsDark(!isDark)}>
      <Sun size={16} className="rotate-0 scale-90 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon size={16} className="absolute  rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-90" />
      <span className="hover:underline">Toggle Theme</span>
    </div>
  )
}
