"use client";

import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface FilterOption {
  id: string;
  label: string;
  count: number;
  checked?: boolean;
}

export interface FilterSection {
  id: string;
  title: string;
  options: FilterOption[];
  isCollapsed?: boolean;
  showMoreThreshold?: number;
}

export interface FilterSidebarProps {
  sections: FilterSection[];
  onFilterChange?: (sectionId: string, optionId: string, checked: boolean) => void;
  className?: string;
}

export default function FilterSidebar({ 
  sections, 
  onFilterChange, 
  className 
}: FilterSidebarProps) {
  const [sectionStates, setSectionStates] = useState<Record<string, {
    isCollapsed: boolean;
    showMore: boolean;
  }>>(
    sections.reduce((acc, section) => {
      acc[section.id] = {
        isCollapsed: section.isCollapsed || false,
        showMore: false
      };
      return acc;
    }, {} as Record<string, { isCollapsed: boolean; showMore: boolean }>)
  );

  const toggleSection = (sectionId: string) => {
    setSectionStates(prev => ({
      ...prev,
      [sectionId]: {
        ...prev[sectionId],
        isCollapsed: !prev[sectionId]?.isCollapsed
      }
    }));
  };

  const toggleShowMore = (sectionId: string) => {
    setSectionStates(prev => ({
      ...prev,
      [sectionId]: {
        ...prev[sectionId],
        showMore: !prev[sectionId]?.showMore
      }
    }));
  };

  const handleOptionChange = (sectionId: string, optionId: string, checked: boolean) => {
    onFilterChange?.(sectionId, optionId, checked);
  };

  return (
    <div className={cn("w-full max-w-sm bg-white rounded-lg shadow-sm border border-gray-200", className)}>
      {sections.map((section, index) => {
        const sectionState = sectionStates[section.id] || { isCollapsed: false, showMore: false };
        const threshold = section.showMoreThreshold || 6;
        const visibleOptions = sectionState.showMore 
          ? section.options 
          : section.options.slice(0, threshold);
        const hasMore = section.options.length > threshold;

        return (
          <div key={section.id} className={cn("border-b border-gray-100", index === sections.length - 1 && "border-b-0")}>
            {/* Section Header */}
            <button
              onClick={() => toggleSection(section.id)}
              className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset"
              aria-expanded={!sectionState.isCollapsed}
              aria-controls={`section-${section.id}`}
            >
              <h3 className="text-base font-semibold text-blue-600">
                {section.title}
              </h3>
              {sectionState.isCollapsed ? (
                <ChevronDown className="w-4 h-4 text-gray-400 transition-transform duration-200" />
              ) : (
                <ChevronUp className="w-4 h-4 text-gray-400 transition-transform duration-200" />
              )}
            </button>

            {/* Section Content */}
            <div
              id={`section-${section.id}`}
              className={cn(
                "overflow-hidden transition-all duration-300 ease-in-out",
                sectionState.isCollapsed ? "max-h-0" : "max-h-[1000px]"
              )}
            >
              <div className="px-4 pb-4">
                <div className="space-y-2">
                  {visibleOptions.map((option) => (
                    <label
                      key={option.id}
                      className="flex items-center justify-between group cursor-pointer hover:bg-gray-50 rounded-md p-2 transition-colors duration-150"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="relative">
                          <input
                            type="checkbox"
                            checked={option.checked || false}
                            onChange={(e) => handleOptionChange(section.id, option.id, e.target.checked)}
                            className="w-4 h-4 text-blue-600 bg-white border-gray-300 rounded focus:ring-blue-500 focus:ring-2 transition-colors duration-150"
                          />
                        </div>
                        <span className="text-sm text-gray-700 group-hover:text-gray-900 transition-colors duration-150">
                          {option.label}
                        </span>
                      </div>
                      <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full min-w-[2rem] text-center">
                        ({option.count})
                      </span>
                    </label>
                  ))}
                </div>

                {/* Show More/Less Button */}
                {hasMore && (
                  <button
                    onClick={() => toggleShowMore(section.id)}
                    className="mt-3 text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset rounded px-1"
                  >
                    {sectionState.showMore ? 'Show less' : 'Show more'}
                  </button>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}