
# Team Management Components

This directory contains components for the company team management page that allows viewing, inviting, and managing team members.

## Architecture

```
Team/
├── TeamOverview.tsx   - Main container component
├── TeamList.tsx       - List/table of team members
├── TeamMemberCard.tsx - Individual team member row
├── RoleDropdown.tsx   - Role selection dropdown
├── InviteMemberModal.tsx - Modal for inviting new members
├── RemoveConfirmDialog.tsx - Confirmation dialog for removal
├── EmptyTeamState.tsx - Empty state UI
├── useTeam.ts        - Data fetching and state management hook
├── types.ts          - TypeScript type definitions
└── README.md         - Documentation
```

## Component Hierarchy

```
UnternehmenTeamPage
└── TeamOverview
    ├── Search Input
    ├── InviteMemberModal
    ├── EmptyTeamState (conditional)
    └── TeamList
        └── TeamMemberCard (multiple)
            ├── RoleDropdown
            └── RemoveConfirmDialog (conditional)
```

## API Contract

### `useTeam()`

**Output:**
- `teamMembers`: Array of team members
- `isLoading`: Boolean indicating data loading state
- `error`: Error message if present
- `inviteMember(email: string, role: string)`: Function to invite a new member
- `removeMember(id: number)`: Function to remove a team member
- `updateMemberRole(id: number, role: string)`: Function to update a member's role

### TeamMember Type

```typescript
interface TeamMember {
  id: number;
  name: string;
  email: string;
  role: string;
  project: string;
  status: 'Aktiv' | 'Inaktiv' | 'Wartet auf Zusage';
  lastActive: string;
  hours: number;
  avatar?: string;
}
```

## Future API Integration

For real-world implementation, replace the mock data in `useTeam.ts` with these API calls:

```
GET /api/team - Fetch all team members
POST /api/team/invite - Invite a new team member
DELETE /api/team/:id - Remove a team member
PATCH /api/team/:id - Update a team member's role
```

Expected response format for GET /api/team:
```json
{
  "members": [
    {
      "id": 1,
      "name": "Lisa Meier",
      "email": "lisa.meier@example.com",
      "role": "HR",
      "project": "BIM Einführung",
      "status": "Aktiv",
      "lastActive": "12.04.2025",
      "hours": 42,
      "avatar": ""
    },
    ...
  ]
}
```
