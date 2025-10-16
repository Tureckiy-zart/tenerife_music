
'use client'

import { useState, useMemo, useCallback, ReactNode } from 'react'
import { Search, Filter, X } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { Slider } from '@/components/ui/slider'
import { Button } from '@/components/ui/button'

// ============================================================
// TYPE DEFINITIONS
// ============================================================

export type FilterType = 'search' | 'select' | 'multiselect' | 'range' | 'boolean' | 'tags'

export interface FilterConfig {
  id: string
  label: string
  type: FilterType
  options?: Array<{ value: string; label: string }>
  placeholder?: string
  min?: number
  max?: number
  step?: number
  defaultValue?: any
  filterFn?: (item: any, value: any) => boolean
}

export interface ActiveFilter {
  [key: string]: any
}

export interface UniversalFilterProps<T> {
  data: T[]
  filters: FilterConfig[]
  searchConfig?: {
    enabled: boolean
    placeholder?: string
    searchKeys?: string[]
  }
  onFilterChange?: (filteredData: T[], activeFilters: ActiveFilter) => void
  renderItem?: (item: T, index: number) => ReactNode
  className?: string
  showFilterCount?: boolean
}

// ============================================================
// UNIVERSAL FILTER HOOK
// ============================================================

export function useUniversalFilter<T extends Record<string, any>>(
  data: T[],
  filters: FilterConfig[],
  searchConfig?: {
    enabled: boolean
    placeholder?: string
    searchKeys?: string[]
  }
) {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeFilters, setActiveFilters] = useState<ActiveFilter>({})

  // Инициализация фильтров с дефолтными значениями
  useMemo(() => {
    const defaultFilters: ActiveFilter = {}
    filters.forEach((filter) => {
      if (filter.defaultValue !== undefined) {
        defaultFilters[filter.id] = filter.defaultValue
      }
    })
    setActiveFilters(defaultFilters)
  }, [filters])

  // Фильтрация данных
  const filteredData = useMemo(() => {
    let result = [...data]

    // Поисковая фильтрация
    if (searchConfig?.enabled && searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim()
      const searchKeys = searchConfig.searchKeys || []

      result = result.filter((item) => {
        if (searchKeys.length > 0) {
          return searchKeys.some((key) => {
            const value = key.split('.').reduce((obj, k) => obj?.[k], item)
            return value?.toString().toLowerCase().includes(query)
          })
        }
        // Если ключи не указаны, ищем по всем строковым полям
        return Object.values(item).some((value) =>
          value?.toString().toLowerCase().includes(query)
        )
      })
    }

    // Применение фильтров
    Object.entries(activeFilters).forEach(([filterId, filterValue]) => {
      const filterConfig = filters.find((f) => f.id === filterId)
      if (!filterConfig || filterValue === undefined || filterValue === null) return

      if (filterConfig.filterFn) {
        // Кастомная функция фильтрации
        result = result.filter((item) => filterConfig.filterFn!(item, filterValue))
      } else {
        // Стандартная логика фильтрации
        switch (filterConfig.type) {
          case 'select':
            if (filterValue && filterValue !== 'all') {
              result = result.filter((item) => {
                const value = filterConfig.id.split('.').reduce((obj: any, k: string) => obj?.[k], item as any)
                return value === filterValue
              })
            }
            break

          case 'multiselect':
            if (Array.isArray(filterValue) && filterValue.length > 0) {
              result = result.filter((item) => {
                const value = filterConfig.id.split('.').reduce((obj: any, k: string) => obj?.[k], item as any)
                if (Array.isArray(value)) {
                  return value.some((v) => filterValue.includes(v))
                }
                return filterValue.includes(value)
              })
            }
            break

          case 'tags':
            if (Array.isArray(filterValue) && filterValue.length > 0) {
              result = result.filter((item) => {
                const tags = filterConfig.id.split('.').reduce((obj: any, k: string) => obj?.[k], item as any)
                if (Array.isArray(tags)) {
                  return filterValue.every((tag) => tags.includes(tag))
                }
                return false
              })
            }
            break

          case 'range':
            if (Array.isArray(filterValue) && filterValue.length === 2) {
              const [min, max] = filterValue
              result = result.filter((item) => {
                const value = parseFloat(
                  filterConfig.id.split('.').reduce((obj: any, k: string) => obj?.[k], item as any)
                )
                return !isNaN(value) && value >= min && value <= max
              })
            }
            break

          case 'boolean':
            if (typeof filterValue === 'boolean') {
              result = result.filter((item) => {
                const value = filterConfig.id.split('.').reduce((obj: any, k: string) => obj?.[k], item as any)
                return Boolean(value) === filterValue
              })
            }
            break
        }
      }
    })

    return result
  }, [data, searchQuery, activeFilters, filters, searchConfig])

  const updateFilter = useCallback((filterId: string, value: any) => {
    setActiveFilters((prev) => ({ ...prev, [filterId]: value }))
  }, [])

  const resetFilters = useCallback(() => {
    const defaultFilters: ActiveFilter = {}
    filters.forEach((filter) => {
      if (filter.defaultValue !== undefined) {
        defaultFilters[filter.id] = filter.defaultValue
      }
    })
    setActiveFilters(defaultFilters)
    setSearchQuery('')
  }, [filters])

  const activeFilterCount = useMemo(() => {
    let count = 0
    Object.entries(activeFilters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '' && value !== 'all') {
        if (Array.isArray(value) && value.length > 0) count++
        else if (!Array.isArray(value)) count++
      }
    })
    if (searchQuery.trim()) count++
    return count
  }, [activeFilters, searchQuery])

  return {
    filteredData,
    searchQuery,
    setSearchQuery,
    activeFilters,
    updateFilter,
    resetFilters,
    activeFilterCount,
  }
}

// ============================================================
// UNIVERSAL FILTER COMPONENT
// ============================================================

export function UniversalFilter<T extends Record<string, any>>({
  data,
  filters,
  searchConfig = { enabled: true },
  onFilterChange,
  renderItem,
  className = '',
  showFilterCount = true,
}: UniversalFilterProps<T>) {
  const {
    filteredData,
    searchQuery,
    setSearchQuery,
    activeFilters,
    updateFilter,
    resetFilters,
    activeFilterCount,
  } = useUniversalFilter(data, filters, searchConfig)

  // Уведомление родителя об изменении фильтров
  useMemo(() => {
    onFilterChange?.(filteredData, activeFilters)
  }, [filteredData, activeFilters, onFilterChange])

  return (
    <div className={`universal-filter ${className}`}>
      {/* Search Bar */}
      {searchConfig.enabled && (
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              type="text"
              placeholder={searchConfig.placeholder || 'Search...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-10"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      )}

      {/* Filter Controls */}
      <div className="flex flex-wrap items-center gap-4 mb-6">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Filter className="w-4 h-4" />
          <span className="font-medium">Filters</span>
          {showFilterCount && activeFilterCount > 0 && (
            <span className="bg-[#003A4D] text-white px-2 py-0.5 rounded-full text-xs font-semibold">
              {activeFilterCount}
            </span>
          )}
        </div>

        {/* Filter Inputs */}
        {filters.map((filter) => renderFilterInput(filter, activeFilters, updateFilter))}

        {/* Reset Button */}
        {activeFilterCount > 0 && (
          <Button
            variant="outline"
            size="sm"
            onClick={resetFilters}
            className="ml-auto"
          >
            <X className="w-4 h-4 mr-1" />
            Reset
          </Button>
        )}
      </div>

      {/* Results */}
      <div className="filter-results">
        {renderItem ? (
          filteredData.map((item, index) => renderItem(item, index))
        ) : (
          <div className="text-gray-500 text-sm">
            {filteredData.length} {filteredData.length === 1 ? 'result' : 'results'}
          </div>
        )}
      </div>
    </div>
  )
}

// ============================================================
// RENDER FILTER INPUT HELPER
// ============================================================

function renderFilterInput(
  filter: FilterConfig,
  activeFilters: ActiveFilter,
  updateFilter: (id: string, value: any) => void
) {
  const value = activeFilters[filter.id]

  switch (filter.type) {
    case 'select':
      return (
        <div key={filter.id} className="min-w-[150px]">
          <Select
            value={value || 'all'}
            onValueChange={(val) => updateFilter(filter.id, val)}
          >
            <SelectTrigger>
              <SelectValue placeholder={filter.placeholder || filter.label} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All {filter.label}</SelectItem>
              {filter.options?.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )

    case 'multiselect':
      return (
        <div key={filter.id} className="flex flex-wrap gap-2">
          {filter.options?.map((opt) => (
            <label
              key={opt.value}
              className="flex items-center gap-2 px-3 py-2 rounded-lg border cursor-pointer hover:bg-gray-50"
            >
              <Checkbox
                checked={Array.isArray(value) && value.includes(opt.value)}
                onCheckedChange={(checked) => {
                  const current = Array.isArray(value) ? value : []
                  const updated = checked
                    ? [...current, opt.value]
                    : current.filter((v) => v !== opt.value)
                  updateFilter(filter.id, updated)
                }}
              />
              <span className="text-sm">{opt.label}</span>
            </label>
          ))}
        </div>
      )

    case 'tags':
      return (
        <div key={filter.id} className="flex flex-wrap gap-2">
          {filter.options?.map((opt) => {
            const isActive = Array.isArray(value) && value.includes(opt.value)
            return (
              <button
                key={opt.value}
                onClick={() => {
                  const current = Array.isArray(value) ? value : []
                  const updated = isActive
                    ? current.filter((v) => v !== opt.value)
                    : [...current, opt.value]
                  updateFilter(filter.id, updated)
                }}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-[#00A6A6] text-white hover:bg-[#008B8B]'
                    : 'bg-white text-gray-700 border border-gray-200 hover:border-[#00A6A6] hover:bg-gray-50'
                }`}
              >
                {opt.label}
              </button>
            )
          })}
        </div>
      )

    case 'range':
      return (
        <div key={filter.id} className="min-w-[200px] space-y-2">
          <Label className="text-sm">{filter.label}</Label>
          <Slider
            min={filter.min || 0}
            max={filter.max || 100}
            step={filter.step || 1}
            value={Array.isArray(value) ? value : [filter.min || 0, filter.max || 100]}
            onValueChange={(val) => updateFilter(filter.id, val)}
          />
          <div className="flex justify-between text-xs text-gray-500">
            <span>{Array.isArray(value) ? value[0] : filter.min}</span>
            <span>{Array.isArray(value) ? value[1] : filter.max}</span>
          </div>
        </div>
      )

    case 'boolean':
      return (
        <label
          key={filter.id}
          className="flex items-center gap-2 px-3 py-2 rounded-lg border cursor-pointer hover:bg-gray-50"
        >
          <Checkbox
            checked={Boolean(value)}
            onCheckedChange={(checked) => updateFilter(filter.id, checked)}
          />
          <span className="text-sm">{filter.label}</span>
        </label>
      )

    default:
      return null
  }
}

export default UniversalFilter
