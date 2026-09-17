import { create } from "zustand";
import { listen } from "@tauri-apps/api/event";
import { commands, type LicenseState } from "../bindings";

interface LicenseStore {
  license: LicenseState | null;
  loading: boolean;
  activating: boolean;
  fetchLicense: () => Promise<void>;
  activate: (key: string) => Promise<void>;
  deactivate: () => Promise<void>;
}

export const useLicenseStore = create<LicenseStore>((set, get) => ({
  license: null,
  loading: true,
  activating: false,

  fetchLicense: async () => {
    try {
      const result = await commands.getLicenseState();
      if (result.status === "ok") {
        set({ license: result.data, loading: false });
      } else {
        set({ loading: false });
      }
    } catch {
      set({ loading: false });
    }
  },

  activate: async (key: string) => {
    set({ activating: true });
    try {
      const result = await commands.activateLicense(key);
      if (result.status === "ok") {
        set({ license: result.data, activating: false });
      } else {
        set({ activating: false });
        throw new Error(result.error);
      }
    } catch (e) {
      set({ activating: false });
      throw e;
    }
  },

  deactivate: async () => {
    set({ activating: true });
    try {
      const result = await commands.deactivateLicense();
      if (result.status === "ok") {
        set({ license: result.data, activating: false });
      } else {
        set({ activating: false });
        throw new Error(result.error);
      }
    } catch (e) {
      set({ activating: false });
      throw e;
    }
  },
}));

// Keep the store in sync with backend-pushed license events.
export const initLicenseListeners = () => {
  const refresh = () => useLicenseStore.getState().fetchLicense();
  listen("license-blocked", refresh);
  listen("license-activated", refresh);
  refresh();
};
