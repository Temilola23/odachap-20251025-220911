"use client"

import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MapPin } from "lucide-react"

interface LocationSelectProps {
  label: string
  placeholder: string
  value: string
  onChange: (value: string) => void
  locations: string[]
}

export function LocationSelect({ label, placeholder, value, onChange, locations }: LocationSelectProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor={label.toLowerCase()} className="text-sm font-medium flex items-center gap-2">
        <MapPin className="h-4 w-4" />
        {label}
      </Label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger id={label.toLowerCase()} className="h-12">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent className="max-h-[300px]">
          {locations.map((location) => (
            <SelectItem key={location} value={location}>
              {location}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
