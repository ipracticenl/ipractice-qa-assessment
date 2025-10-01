## 🛠️ Installation

### Frontend

```bash
cd psychologist-dashboard
npm ci --legacy-peer-deps  # Due to React version mismatch
```

## 🚀 Run the App

### Backend

```bash
cd iPracticeApiSkeleton_Backend
dotnet run --project iPractice.Api
```

### Frontend

```bash
cd psychologist-dashboard

# Extract .env.example file and configure the URL properly
npm run dev

# Run unit tests
npm test

# Run unit tests in watch mode
npm run test:watch

# Run linting
npm run lint
```

## 📚 Swagger

Available at: http://localhost:5000/swagger/index.html

## Demo users

- Psychologist: `Jan de Vries`
- Client: `Cooper`
