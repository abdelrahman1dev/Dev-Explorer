"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { SearchIcon } from "lucide-react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command"

export default function SearchBar() {
  const [value, setValue] = useState("")
  const [suggestions, setSuggestions] = useState<any[]>([])
  const router = useRouter()

  // 🔎 Search handler
  const handleSearch = async (searchValue?: string) => {
    const username = (searchValue ?? value).trim()

    if (!username) {
      toast.error("Please enter a GitHub username.")
      return
    }

    try {
      const res = await fetch(`https://api.github.com/users/${username}`)
      if (!res.ok) {
        toast.error(`We couldn't find "${username}". Try another one.`)
        return
      }

      const data = await res.json()
      toast.success(`Found ${data.login} 🚀`)

      setTimeout(() => {
        router.push(`/profile/${data.login}`)
      }, 1000)
    } catch {
      toast.error("Network error. Please try again.")
    }
  }


  useEffect(() => {
    if (value.length > 1) {
      const delayDebounce = setTimeout(async () => {
        try {
          const results = await fetch(`/api/github/search?q=${value}`).then((res) =>
            res.json()
          )
          setSuggestions(results.items || [])
        } catch {
          setSuggestions([])
        }
      }, 400)

      return () => clearTimeout(delayDebounce)
    } else {
      setSuggestions([])
    }
  }, [value])

  return (
    <div className="relative w-full max-w-sm mx-auto flex items-center justify-center">
      <Command className="rounded-lg border shadow-md md:min-w-[450px]">
        <form
          onSubmit={(e) => {
            e.preventDefault()
            handleSearch()
          }}
          className="flex items-center space-x-2"
        >
          <Input
            className="border-0 outline-none"
            type="search"
            placeholder="Search GitHub username..."
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <Button type="submit" className="cursor-pointer">
            <SearchIcon />
          </Button>
        </form>

        {value.length > 1 && (
          <CommandList>
            <CommandGroup heading="Suggestions">
              {suggestions.length > 0 ? (
                suggestions.map((user) => (
                  <CommandItem
                    key={user.id}
                    onSelect={() => handleSearch(user.login)}
                  >
                    {user.login}
                  </CommandItem>
                ))
              ) : (
                <CommandEmpty>No results found.</CommandEmpty>
              )}
            </CommandGroup>
          </CommandList>
        )}
      </Command>
    </div>
  )
}
