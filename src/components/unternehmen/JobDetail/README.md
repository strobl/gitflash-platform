
# Jobanzeigen-Detail Komponenten

Diese Komponenten implementieren die Detailansicht für Jobanzeigen im Unternehmen-Dashboard.

## Architektur

```
JobAnzeigeDetailPage
├── JobHeader
│   └── JobActionsMenu
├── JobMetaSection
├── Tabs
│   ├── ApplicantsTab
│   ├── JobDescription
│   └── StatsTab
└── CloseJobDialog
```

## Hook-APIs

### useJobDetail(jobId: string)

Lädt und verwaltet alle Daten für die Job-Detailseite.

```typescript
const {
  job, // JobDetail | null
  applicants, // Applicant[]
  stats, // JobStats | null
  isLoading, // boolean
  error, // string | null
  updateJobStatus, // (status: string) => Promise<boolean>
  duplicateJob // () => Promise<void>
} = useJobDetail(jobId);
```

### useApplicants()

Hilfsfunktionen für die Verwaltung und Bearbeitung von Bewerbern.

```typescript
const {
  sortApplicants, // (applicants: Applicant[], field: keyof Applicant, direction: 'asc' | 'desc') => Applicant[]
  filterApplicants // (applicants: Applicant[], searchTerm: string) => Applicant[]
} = useApplicants();
```

## API-Contracts

### GET /api/jobs/:id

Lädt die Details einer Jobanzeige.

**Response:**
```json
{
  "id": "string",
  "title": "string",
  "location": "string",
  "project": "string",
  "status": "Aktiv" | "In Prüfung" | "Entwurf" | "Archiviert" | "Geschlossen",
  "visibility": "Öffentlich" | "Nur intern",
  "createdAt": "ISO-Datum",
  "updatedAt": "ISO-Datum",
  "description": "HTML-String"
}
```

### GET /api/jobs/:id/applicants

Lädt die Bewerber einer Jobanzeige.

**Response:**
```json
[
  {
    "id": "string",
    "name": "string",
    "appliedAt": "ISO-Datum",
    "score": "number",
    "status": "Neu" | "In Bearbeitung" | "Vorstellungsgespräch" | "Angebot" | "Abgelehnt" | "Eingestellt",
    "profilePic": "string" (optional)
  }
]
```

### GET /api/jobs/:id/stats

Lädt die Statistiken einer Jobanzeige.

**Response:**
```json
{
  "views": "number",
  "applications": "number",
  "averageScore": "number",
  "viewsOverTime": [
    { "date": "YYYY-MM-DD", "views": "number" }
  ],
  "applicationsOverTime": [
    { "date": "YYYY-MM-DD", "applications": "number" }
  ]
}
```

### PATCH /api/jobs/:id

Aktualisiert den Status einer Jobanzeige.

**Request:**
```json
{
  "status": "Aktiv" | "In Prüfung" | "Entwurf" | "Archiviert" | "Geschlossen"
}
```

### POST /api/jobs/:id/duplicate

Dupliziert eine Jobanzeige.

**Response:**
```json
{
  "id": "string" // ID der duplizierten Jobanzeige
}
```

## Testhinweise

### Unit-Tests

- `JobActionsMenu`: Prüfen, ob bei Klick auf "Schließen" der Dialog geöffnet wird
- `ApplicantsTab`: Prüfen, ob Sortierung nach verschiedenen Feldern korrekt funktioniert
- `StatsTab`: Prüfen, ob die Daten korrekt in einem Chart dargestellt werden

### E2E-Tests

- Navigieren zu `/unternehmen/jobanzeigen/1`
- Jobanzeige-Titel und Status sollten angezeigt werden
- Klick auf "Schließen" sollte Dialog öffnen
- Bestätigen sollte Status auf "Geschlossen" ändern
