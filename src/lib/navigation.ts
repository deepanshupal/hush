/**
 * Lets any settings component switch the settings window to another section
 * (e.g. "More models" on the General page opens Models) without threading a
 * callback through every page.
 */
export const NAVIGATE_EVENT = "hush:navigate-section";

export function navigateToSection(section: string) {
  window.dispatchEvent(
    new CustomEvent<string>(NAVIGATE_EVENT, { detail: section }),
  );
}
