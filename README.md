# FIX Simulator UI

A web-based interface for running and analyzing **FIX protocol simulations**.  
The application allows users to configure simulators, upload FIX logs, run certifications, and analyze message flows with **advanced replay and AI-based insights**.

---

## Features

- Configure and manage **FIX simulators**
- Upload and parse **FIX log files**
- Run **certification simulations**
- View **session-based message replay**
- Inspect **raw FIX messages and structured tag views**
- Visualize **sequence flows**
- Monitor **heartbeat status**
- Switch between **Simple View and Advanced View**
- **AI Analysis** of session message flows
- **Dark / Light theme support**

---

## Tech Stack

- **React**
- **TypeScript**
- **Vite**
- **Tailwind CSS**
- **Zustand** (state management)
- **Axios** (API calls)
- **SockJS + STOMP** (websocket communication)

---

## Project Structure

```
src
 ├── components
 │    ├── CertificationResults
 │    ├── SimulatorConfig
 │    ├── Dashboard
 │
 ├── store
 │    └── certificationResultsStore.ts
 │
 ├── pages
 ├── services
 └── utils
```

---

## Local Setup

### 1. Clone the repository

```bash
git clone <repo-url>
cd fix-simulator-ui
```

### 2. Install dependencies

```bash
npm install
```

or

```bash
yarn install
```

---

## Environment Variables

Create a `.env` file in the project root.

Example:

```
VITE_API_BASE_URL=http://localhost:8080
VITE_WS_BASE_URL=http://localhost:8080
```

### Environment Variables Description

| Variable | Description |
|--------|-------------|
| VITE_API_BASE_URL | Base URL for backend REST APIs |
| VITE_WS_BASE_URL | Websocket endpoint for FIX simulation events |

---

## Running the Application

Start the development server:

```bash
npm run dev
```

Application runs at:

```
http://localhost:5173
```

---

## Build for Production

```bash
npm run build
```

---

## Key Modules

### Simulator Configuration
Create and manage FIX simulator configurations.

### Run Certification
Execute FIX log simulations against configured simulators.

### Certification Results
View session results including:

- Message replay
- FIX raw logs
- Tag-based message breakdown
- Sequence flow visualization
- Heartbeat monitoring

### Advanced View
Provides detailed debugging tools:

- Session-based replay
- Message-level inspection
- AI session analysis

---

## AI Analysis (Experimental)

Advanced view includes AI-based insights such as:

- Session health analysis
- Message flow summary
- Validation anomaly detection
- FIX protocol recommendations

---

## Websocket Integration

Websocket events are used for:

- Heartbeat monitoring
- Session health updates
- Message flow events

---

## Contributing

1. Create a new feature branch

```bash
git checkout -b feature/<feature-name>
```

2. Commit changes

```bash
git commit -m "feat: description"
```

3. Push branch

```bash
git push origin feature/<feature-name>
```

4. Create a Pull Request

---

## License

Internal project – not for public distribution.
