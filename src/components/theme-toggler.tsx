import { useEffect, useState } from "react"
import { Loader2, MoonIcon, SunIcon } from "lucide-react"
import { useTheme } from "@/components/theme-provider"
import { IconButton } from "@/components/ui/button"

export function ThemeToggler() {
const [mounted, setMounted] = useState(false)
const { theme, setTheme } = useTheme()

  const toggleTheme = () => {
  	setTheme(theme === "light" ? "dark" : "light")
  }

  useEffect(() => {
  	setMounted(true)
  }, [])

  if (!mounted) {
  	return (
  		<IconButton variant="outline" color="neutral" disabled>
  			<Loader2 className="size-5 animate-spin" />
  		</IconButton>
  	)
  }

  return (
  	<IconButton variant="outline" color="neutral" onClick={toggleTheme}>
  		{theme === "light" ? <MoonIcon /> : <SunIcon />}
  	</IconButton>
  )

}
