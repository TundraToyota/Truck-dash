# Truck Maintenance Dashboard

A single-file, offline-capable maintenance log and service predictor. Built for a
2014 Toyota Tundra 5.7L but works for any vehicle.

**Open the app:** `Truck_Maintenance_Dashboard.html`

## Features

- **Maintenance predictions** — tracks km and calendar intervals per component and
  projects the due date for each service using your real average km/day, flagging
  items green / amber / red by urgency.
- **Pre-loaded schedule** — Toyota severe-condition intervals for the 2nd-gen Tundra
  (fluids, plugs, brakes, chassis inspections), fully editable.
- **Service log** — every job recorded with date, km, cost, and parts; logging a
  service automatically resets its schedule item.
- **Mods & upgrades log** — permanent build history with part numbers and costs.
- **Fuel log** — fill-ups with an L/100km trend chart.
- **Multi-vehicle** — add more vehicles with a generic or blank schedule.
- **Installable on iPhone/Android** — served over https it's a PWA: open in the
  browser, "Add to Home Screen", and it runs full-screen and offline.

## Privacy

All data is stored in your device's browser storage (`localStorage`). Nothing is
sent to any server — this repository hosts only the empty app shell. Use
**Settings → Export Backup** for a JSON backup, and **Import** to restore or move
data between devices. Do not commit backup files to this repository.

## Files

| File | Purpose |
|---|---|
| `Truck_Maintenance_Dashboard.html` | The entire app |
| `manifest.json` | PWA install metadata |
| `sw.js` | Service worker (offline caching) |
| `apple-touch-icon.png`, `icon-512.png` | App icons |
