# HR Management – Frontend Angular

Angular 19 (architecture classique **NgModules**, lazy loading, SCSS, formulaires réactifs).

## Démarrage

```bash
npm install
npm start          # http://localhost:4200
```

`npm start` lance `ng serve` avec `proxy.conf.json` : les appels `/api/*` sont redirigés vers
`http://localhost:8081` (le backend Spring Boot doit tourner), donc **pas de problème CORS en développement**.

Build de production : `npm run build` (adapter `src/environments/environment.prod.ts` ; le CORS doit alors être autorisé côté backend).

## Architecture

```
src/app/
├── core/                  # Singleton, importé une seule fois (AppModule)
│   ├── models/            # Interfaces TypeScript du contrat d'API
│   ├── services/          # DepartmentService, EmployeeService, ReportService, NotificationService
│   ├── interceptors/      # HttpErrorInterceptor (messages d'erreur → toasts)
│   ├── layout/            # Navbar, ToastContainer
│   └── core.module.ts
├── shared/                # Éléments réutilisables (importé par chaque feature)
│   ├── components/        # Pagination, ConfirmDialog, Spinner
│   ├── pipes/             # GenderLabelPipe
│   └── shared.module.ts
├── features/              # Modules fonctionnels chargés à la demande
│   ├── departments/       # Liste, création, modification, suppression
│   ├── employees/         # Liste, création, modification (+ adresse), suppression
│   └── reports/           # Statistiques + filtres + pagination + tri côté serveur
├── app-routing.module.ts
└── app.module.ts
```

## Routes

| Route | Écran |
|---|---|
| `/reports` (défaut) | Rapport : total, répartition par département, liste filtrée/paginée |
| `/employees`, `/employees/new`, `/employees/:id/edit` | Gestion des employés |
| `/departments`, `/departments/new`, `/departments/:id/edit` | Gestion des départements |

## Points d'attention liés au contrat d'API

- **Pas de GET par id** : les formulaires d'édition retrouvent l'élément dans la liste complète.
- **`EmployeeResponse` ne renvoie que `departementName` et `city`** : en édition, le département
  est retrouvé par son nom, et l'adresse n'est pas pré-remplie. Si l'adresse est laissée vide,
  `adresse: null` est envoyé → le backend doit traiter `null` comme « ne pas modifier »
  (sinon, enrichir `EmployeeResponse` avec `departementId` et l'adresse complète).
- Une adresse partielle est refusée côté formulaire (tout ou rien).
