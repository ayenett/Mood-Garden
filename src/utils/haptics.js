import { Haptics, ImpactStyle, NotificationType } from '@capacitor/haptics';

/**
 * Triggers light haptic feedback for UI taps/button clicks.
 */
export async function triggerLightHaptic() {
  try {
    await Haptics.impact({ style: ImpactStyle.Light });
  } catch (e) {
    // Gracefully ignore on web browsers without native haptics support
  }
}

/**
 * Triggers medium haptic feedback for card selections / mood choices.
 */
export async function triggerMediumHaptic() {
  try {
    await Haptics.impact({ style: ImpactStyle.Medium });
  } catch (e) {
    // Gracefully ignore on web browsers
  }
}

/**
 * Triggers success haptic notification (e.g. planting flower, saving journal entry).
 */
export async function triggerSuccessHaptic() {
  try {
    await Haptics.notification({ type: NotificationType.Success });
  } catch (e) {
    // Gracefully ignore on web browsers
  }
}
