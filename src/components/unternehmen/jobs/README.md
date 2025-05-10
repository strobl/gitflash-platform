
# Jobs Management Components

This directory contains components for the GitFlash Jobs Management feature, a tool for companies to create and manage job listings in the construction industry.

## Components Overview

### JobsList
The main component for displaying a list of jobs with filtering and search capabilities. It renders either a table of jobs or an empty state when no jobs are found.

### JobStatusBadge
A reusable badge component for displaying job status with appropriate colors:
- Active: Green
- In Review: Yellow
- Draft: Gray
- Closed: Red

### EmptyState
Displays a visual indicator with a message when no jobs are available, with a CTA to create a new job.

## Integration

These components are fully integrated with the `/unternehmen/jobs` page and use the following hooks for state management:

- `useJobsList`: Manages the list of jobs, including loading states, filtering, and CRUD operations
- `useJobForm`: Handles form state, validation, and submission for creating/editing jobs

## Data Model

```typescript
interface JobItem {
  id: number;
  title: string;
  status: 'Aktiv' | 'In Prüfung' | 'Entwurf' | 'Geschlossen';
  applicants: number;
  posted: string;
  views: number;
}
```

## Usage

Currently implemented with mock data; ready to connect to the Supabase backend once available. The UI is fully responsive and follows the design specifications from the Figma mockups.
