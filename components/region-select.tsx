"use client"

import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface RegionSelectProps {
  label: string
  placeholder: string
  value: string
  onChange: (value: string) => void
  regions: string[]
}

export function RegionSelect({ label, placeholder, value, onChange, regions }: RegionSelectProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor={label.toLowerCase()} className="text-sm font-medium">
        {label}
      </Label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger id={label.toLowerCase()} className="h-12">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {regions.map((region) => (
            <SelectItem key={region} value={region}>
              {region}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
