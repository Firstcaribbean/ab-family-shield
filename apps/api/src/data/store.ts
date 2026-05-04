import { initialAppState, type AppState } from "@family-safety/shared";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const dataDir = path.resolve(process.cwd(), "data");
const stateFile = path.join(dataDir, "app-state.json");

let cachedState: AppState | null = null;

async function ensureDataDir() {
  await mkdir(dataDir, { recursive: true });
}

async function writeStateFile(state: AppState) {
  await ensureDataDir();
  await writeFile(stateFile, JSON.stringify(state, null, 2), "utf8");
}

export async function loadAppState() {
  if (cachedState) {
    return cachedState;
  }

  try {
    const raw = await readFile(stateFile, "utf8");
    const parsed = JSON.parse(raw) as AppState;
    const defaults = structuredClone(initialAppState);
    cachedState = {
      ...defaults,
      ...parsed,
      auth: {
        ...defaults.auth,
        ...(parsed.auth ?? {})
      }
    };
    return cachedState;
  } catch {
    cachedState = structuredClone(initialAppState);
    await writeStateFile(cachedState);
    return cachedState;
  }
}

export async function saveAppState(state: AppState) {
  cachedState = state;
  await writeStateFile(state);
}
