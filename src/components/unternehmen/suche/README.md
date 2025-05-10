
# Talent Search Components

This directory contains components for the GitFlash Talent Search feature, a tool for companies to find talent in the construction industry.

## Components Overview

### TalentSearchBar
The main search input and filter button. It handles user queries and opens the filters panel.

### SearchFilters
An off-canvas filter menu that contains all filtering options:
- Profession filters (checkboxes)
- Experience range (slider)
- Location selection (dropdown)
- Remote work options (toggle)
- Salary range (dual slider)

### TalentCard
Displays information about a talent, including:
- Name and experience level
- Description/bio
- Expertise tags
- Availability information
- Leaderboard rank (if applicable)
- "View Profile" button that links to the talent detail page

### TalentResultList
Renders a list of TalentCards, with loading and empty states.

## Integration

These components are fully integrated with the `/unternehmen/suche` page and use the `TalentSearchContext` for state management.

The search functionality is implemented in the `useTalentSearch` hook, which includes:
- Query parameter handling (sync with URL for deep linking)
- Debounced search
- Filter application
- Loading states

## Data Model

```typescript
interface TalentData {
  id: string;
  name: string;
  experience: number;
  description: string;
  expertise: { label: string; highlighted?: boolean }[];
  availability: { label: string }[];
  leaderboardRank?: number;
}
```

## Usage

Currently implemented with mock data; ready to connect to the Supabase backend once available. The URL parameters are already synced with the search state for deep linking functionality.
