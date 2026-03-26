import { Redirect } from 'expo-router';
import { useProfileStore } from '../src/store/profileStore';

export default function Index() {
  const { isOnboardingComplete } = useProfileStore();
  return isOnboardingComplete
    ? <Redirect href="/(tabs)" />
    : <Redirect href="/onboarding/welcome" />;
}
