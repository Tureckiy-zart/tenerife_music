'use client'

import { useState, useMemo } from 'react'
import { X } from 'lucide-react'

interface FilterPanelProps {
  allItems: any[]
  searchFields: string[]
  genreField: string
  onFilteredItems: (items: any[]) => void
  searchPlaceholder?: string
  title?: string
}

export default function FilterPanel({ 
  allItems, 
  searchFields, 
  genreField, 
  onFilteredItems, 
  searchPlaceholder = "Search...",
  title = "Filter"
}: FilterPanelProps) {
  const [selectedGenres, setSelectedGenres] = useState<string[]>([])
  const [filterMode, setFilterMode] = useState<'OR' | 'AND'>('OR')
  const [searchQuery, setSearchQuery] = useState<string>('')

  // Get all unique genres from items
  const allGenres = useMemo(() => {
    const genres = new Set<string>()
    allItems.forEach(item => {
      if (item[genreField]) {
        item[genreField].forEach((genre: string) => genres.add(genre))
      }
    })
    return Array.from(genres).sort()
  }, [allItems, genreField])

  // Filter items based on selected genres and search query
  const filteredItems = useMemo(() => {
    let filtered = allItems

    // Apply search filter
    if (searchQuery.trim()) {
      filtered = filtered.filter(item => 
        searchFields.some(field => {
          const fieldValue = item[field]
          return fieldValue && fieldValue.toLowerCase().includes(searchQuery.toLowerCase())
        })
      )
    }

    // Apply genre filter
    if (selectedGenres.length > 0) {
      if (filterMode === 'AND') {
        // Must contain ALL selected genres
        filtered = filtered.filter(item => 
          item[genreField] && selectedGenres.every((selectedGenre: string) => 
            item[genreField].includes(selectedGenre)
          )
        )
      } else {
        // Must contain ANY selected genre (OR logic)
        filtered = filtered.filter(item => 
          item[genreField] && item[genreField].some((genre: string) => selectedGenres.includes(genre))
        )
      }
    }

    return filtered
  }, [allItems, selectedGenres, filterMode, searchQuery, searchFields, genreField])

  // Update parent component when filtered items change
  useMemo(() => {
    onFilteredItems(filteredItems)
  }, [filteredItems, onFilteredItems])

  const toggleGenre = (genre: string) => {
    setSelectedGenres(prev => 
      prev.includes(genre) 
        ? prev.filter(g => g !== genre)
        : [...prev, genre]
    )
  }

  const clearFilters = () => {
    setSelectedGenres([])
    setSearchQuery('')
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-100">
      {/* Search Input */}
      <div className="mb-6">
        <input
          type="text"
          placeholder={searchPlaceholder}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#00A6A6] focus:border-[#00A6A6] transition-colors duration-200 text-lg"
        />
      </div>

      <div className="flex flex-col lg:flex-row lg:items-center gap-4 mb-6">
        <h3 className="text-xl font-bold text-[#003A4D]">{title}</h3>
        
        {/* Filter Mode Toggle with Clear button */}
        <div className="flex items-center gap-3">
          <div className="flex items-center bg-gray-50 rounded-xl p-1">
            <button
              onClick={() => setFilterMode('OR')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                filterMode === 'OR'
                  ? 'bg-[#00A6A6] text-white shadow-sm'
                  : 'text-gray-600 hover:text-[#00A6A6]'
              }`}
            >
              Show any genre
            </button>
            <button
              onClick={() => setFilterMode('AND')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                filterMode === 'AND'
                  ? 'bg-[#00A6A6] text-white shadow-sm'
                  : 'text-gray-600 hover:text-[#00A6A6]'
              }`}
            >
              Show all genres
            </button>
          </div>

          {(selectedGenres.length > 0 || searchQuery.trim()) && (
            <button
              onClick={clearFilters}
              className="inline-flex items-center text-sm text-gray-600 hover:text-[#00A6A6] transition-colors duration-200 px-3 py-2 rounded-lg hover:bg-gray-100"
            >
              <X className="w-4 h-4 mr-1" />
              Clear all
            </button>
          )}
        </div>
      </div>
      
      <div className="flex flex-wrap gap-3 mb-4">
        {allGenres.map((genre) => (
          <button
            key={genre}
            onClick={() => toggleGenre(genre)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
              selectedGenres.includes(genre)
                ? 'bg-gradient-to-r from-[#00A6A6] to-[#00C4C4] text-white shadow-lg transform scale-105'
                : 'bg-gray-100 text-gray-700 hover:bg-[#00A6A6] hover:text-white hover:shadow-md'
            }`}
          >
            {genre}
          </button>
        ))}
      </div>

      {(selectedGenres.length > 0 || searchQuery.trim()) && (
        <div className="text-sm text-gray-600 bg-gray-50 rounded-lg p-3">
          Showing {filteredItems.length} of {allItems.length} items
          {searchQuery.trim() && (
            <span className="ml-2">
              matching "<span className="font-semibold text-[#00A6A6]">{searchQuery}</span>"
            </span>
          )}
          {selectedGenres.length > 0 && (
            <span className="ml-2">
              filtered by: <span className="font-semibold text-[#00A6A6]">{selectedGenres.join(', ')}</span>
              <span className="ml-1 text-gray-500">
                ({filterMode === 'AND' ? 'must contain ALL' : 'must contain ANY'})
              </span>
            </span>
          )}
        </div>
      )}
    </div>
  )
}
