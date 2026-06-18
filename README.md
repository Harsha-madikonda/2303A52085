# Campus Hiring Evaluation - Notifications Dashboard

A production-ready, responsive notifications dashboard built with React, TypeScript, and Vite for the Campus Hiring Evaluation project.

## Features

✨ **Modern UI**
- Responsive design (Mobile, Tablet, Desktop)
- Professional gradient-based styling
- Smooth animations and transitions
- Accessibility-focused implementation

🔔 **Notifications Management**
- Fetch notifications from REST API
- Priority-based sorting (Event > Result > Placement)
- Timestamp-based sorting within same type (newest first)
- Filter by notification type
- Pagination with customizable page size

⚡ **Performance**
- Fast development with Vite HMR
- Optimized production builds
- TypeScript for type safety
- Clean, reusable component architecture

🛡️ **Robust Error Handling**
- User-friendly error messages
- Retry functionality
- Loading states
- Empty state handling
- CORS proxy configuration

## Project Structure

```
src/
├── components/
│   ├── NotificationCard.tsx      # Individual notification card
│   ├── Filter.tsx                # Type filter dropdown
│   ├── Pagination.tsx            # Pagination controls
│   └── Loader.tsx                # Loading spinner
├── pages/
│   └── Home.tsx                  # Main dashboard page
├── services/
│   └── api.ts                    # API service with axios
├── types/
│   └── notification.ts           # TypeScript interfaces
├── App.tsx                       # Main App component with routing
├── App.css                       # Application styles
├── index.css                     # Global styles
└── main.tsx                      # Application entry point
```

## Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

## Installation

1. Clone the repository:
```bash
cd notification-app
```

2. Install dependencies:
```bash
npm install
```

## Development

Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Features:
- Hot Module Replacement (HMR) for instant updates
- Fast Refresh for React components
- Type checking with TypeScript

## Building for Production

Build the application:
```bash
npm run build
```

This creates an optimized production build in the `dist/` directory.

Preview the production build:
```bash
npm run preview
```

## Linting

Run ESLint to check code quality:
```bash
npm run lint
```

## API Configuration

### Base URL
The API is configured to use: `http://4.224.186.213/evaluation-service`

### Notification Endpoint
```
GET /evaluation-service/notifications
```

### Query Parameters
- `page` (number): Current page number (default: 1)
- `limit` (number): Items per page (default: 10)
- `notification_type` (string): Filter by type - "Event", "Result", or "Placement"

### Response Format
```json
[
  {
    "ID": "string",
    "Type": "Event" | "Result" | "Placement",
    "Message": "string",
    "Timestamp": "string"
  }
]
```

## CORS Handling

If you encounter CORS issues in development, the Vite proxy is automatically configured in `vite.config.ts`. The proxy will forward requests to the actual API server.

For production, ensure the API server has proper CORS headers configured or use a backend proxy.

## Business Logic

### Notification Priority
Notifications are sorted by priority, then by timestamp (newest first):
1. **Event** (priority: 3) - Highest priority
2. **Result** (priority: 2) - Medium priority
3. **Placement** (priority: 1) - Lowest priority

### Pagination
- Default: 10 items per page
- Options: 5, 10, 20, 50 items
- URL updates automatically with page and limit parameters

### Filtering
- Filter notifications by type
- All types shown by default
- URL updates automatically with selected type

## UI Components

### NotificationCard
Displays individual notification with:
- Type badge with color coding
- Message content
- Timestamp
- Notification ID

### Filter
Dropdown to filter notifications by type:
- All (default)
- Event
- Result
- Placement

### Pagination
Navigation controls featuring:
- Previous/Next buttons
- Page number buttons with smart pagination
- Disabled states for edge cases

### Loader
Animated loading spinner with message during data fetching.

## Styling

### Color Scheme
- **Primary**: Purple gradient (#667eea to #764ba2)
- **Success**: Green (#48bb78)
- **Error**: Red (#f56565)
- **Warning**: Orange (#ed8936)
- **Text**: Dark gray (#1a202c)

### Responsive Breakpoints
- **Desktop**: Full grid layout with 3 columns
- **Tablet**: 2 columns grid
- **Mobile**: Single column with optimized spacing

## Browser Support

- Chrome/Edge (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Mobile browsers (iOS Safari, Chrome Mobile)

## TypeScript Interfaces

### Notification
```typescript
interface Notification {
  ID: string;
  Type: "Event" | "Result" | "Placement";
  Message: string;
  Timestamp: string;
}
```

### ApiResponse
```typescript
interface ApiResponse {
  data: Notification[];
  total: number;
  page: number;
  limit: number;
}
```

### PaginationParams
```typescript
interface PaginationParams {
  page: number;
  limit: number;
  notification_type?: NotificationType;
}
```

## Error Handling

The application handles various error scenarios:
- **Network errors**: Displays user-friendly message with retry button
- **API errors**: Shows specific error from server or generic message
- **Invalid data**: Gracefully handles malformed responses
- **Timeout**: 10-second timeout on API requests

## Performance Optimization

- Lazy loading with React.lazy (optional, ready for implementation)
- Memoization of components (ready for implementation)
- Optimized re-renders with useCallback and useMemo (ready for implementation)
- CSS Grid for efficient layout
- Hardware acceleration on animations

## Accessibility

- Semantic HTML structure
- ARIA labels and descriptions
- Keyboard navigation support
- Focus indicators visible on all interactive elements
- Color contrast meets WCAG AA standards
- Screen reader friendly

## Code Quality

- TypeScript for type safety
- ESLint for code consistency
- Clean, readable code structure
- Reusable components
- Proper separation of concerns

## Deployment

### Vercel
```bash
npm run build
vercel deploy --prod
```

### Netlify
```bash
npm run build
netlify deploy --prod --dir=dist
```

### Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "preview"]
```

## Troubleshooting

### CORS Issues
If API calls fail with CORS errors:
1. Check the proxy configuration in `vite.config.ts`
2. For production, ensure backend has CORS headers
3. Verify API endpoint is accessible

### Port Already in Use
If port 5173 is already in use:
```bash
npm run dev -- --port 3000
```

### Build Failures
Clear node_modules and reinstall:
```bash
rm -rf node_modules package-lock.json
npm install
npm run build
```

## Technologies Used

- **React 19.2.6** - UI library
- **TypeScript 6.0** - Type safety
- **Vite 8.0** - Build tool and dev server
- **React Router 7.18** - Client-side routing
- **Axios 1.18** - HTTP client
- **CSS3** - Styling and animations

## Contributing

When contributing to this project:
1. Follow the existing code structure
2. Use TypeScript for type safety
3. Keep components focused and reusable
4. Update README for significant changes
5. Test on multiple screen sizes

## License

This project is proprietary software for Affordmed Campus Hiring Evaluation platform.

## Support

For issues, questions, or improvements, please contact the development team.
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
