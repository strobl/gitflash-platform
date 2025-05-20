
# Backlog: Bewerbungen V2

## US-101 Talent: Bewerbungs-History einsehen

**Als** Talent  
**Möchte ich** die Historie meiner Bewerbungen einsehen können  
**Damit** ich den Verlauf meiner Bewerbung und alle Statusänderungen nachvollziehen kann.

**Akzeptanzkriterien:**
- Talent kann auf einer Bewerbungsdetailseite alle bisherigen Statusänderungen sehen
- Für jede Statusänderung werden angezeigt: alter Status, neuer Status, Zeitpunkt, wer geändert hat
- Die Einträge sind chronologisch sortiert (neuste zuerst)
- Gelesene History-Einträge werden als solche markiert

**Definition of Done:**
- Frontend-Implementierung der History-Anzeige
- Database-Schema für Status-History
- Trigger für das automatische Logging von Statusänderungen
- UI/UX Reviews abgeschlossen
- Unit- und E2E-Tests bestehen

## US-102 Recruiter: Bewerbungen filtern & Status ändern

**Als** Recruiter  
**Möchte ich** Bewerbungen filtern und deren Status ändern können  
**Damit** ich den Bewerbungsprozess effizient verwalten kann.

**Akzeptanzkriterien:**
- Bewerbungen können nach Status gefiltert werden
- Recruiter kann Bewerbungsstatus per Dropdown ändern
- Optionale Notizen können beim Statuswechsel hinzugefügt werden
- Optimistic Locking verhindert konkurrierende Änderungen (Version)
- Talent erhält einen Toast, wenn der Status geändert wurde

**Definition of Done:**
- Frontend-Filter und Status-Dropdown
- Implementierung des Optimistic Locking via version
- Realtime-Benachrichtigungen für Talents
- Tests für alle Status-Übergänge

## US-103 System: Zähler konsistent halten (Trigger)

**Als** Plattform-Betreiber  
**Möchte ich** dass der Bewerbungszähler (jobs.applicants) immer konsistent ist  
**Damit** die Statistiken und Anzeigen korrekt sind.

**Akzeptanzkriterien:**
- Der Zähler wird bei INSERT, UPDATE und DELETE korrekt angepasst
- Soft-Deletes werden korrekt berücksichtigt (deleted_at)
- Job-Wechsel innerhalb einer Bewerbung wird korrekt behandelt
- Transaktionssicherheit ist gewährleistet

**Definition of Done:**
- Vollständige Trigger-Implementierung
- Umfassende Tests für alle Pfade
- Edge Cases wie Race Conditions abgedeckt

## US-104 Admin: DSGVO-Anonymisierung auslösen

**Als** Admin  
**Möchte ich** Bewerbungen anonymisieren können  
**Damit** wir DSGVO-Anfragen zur Datenlöschung erfüllen können.

**Akzeptanzkriterien:**
- Admin kann per API oder UI die Anonymisierung einer Bewerbung auslösen
- Personenbezogene Daten werden aus der Bewerbung entfernt
- Statistiken und Zähler bleiben erhalten
- Die Anonymisierung wird protokolliert (anonymized_at Timestamp)

**Definition of Done:**
- Implementierung der Anonymisierungsfunktion
- Admin-UI zur Auslösung
- Tests für korrekte Anonymisierung
- Audit-Trail der Anonymisierung

## US-105 Talent: Echtzeit-Toast bei Status-Änderung

**Als** Talent  
**Möchte ich** sofort benachrichtigt werden, wenn sich der Status meiner Bewerbung ändert  
**Damit** ich immer auf dem aktuellen Stand bin.

**Akzeptanzkriterien:**
- Realtime-Benachrichtigung im Browser, wenn Status geändert wird
- Toast zeigt Jobname und neuen Status
- Toast erscheint auch, wenn Talent auf einer anderen Seite der App ist
- Bei Klick auf den Toast wird zur Bewerbungsdetailseite navigiert

**Definition of Done:**
- Realtime-Kommunikation via Supabase Realtime
- Edge Function für Benachrichtigungsversand
- Frontend-Toast-Komponente
- Tests für die Echtzeit-Funktionalität
