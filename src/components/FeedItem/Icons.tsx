import EmotionImg from '@/components/common/Imgs/EmotionImg/EmotionImg';
import WeatherImg from '@/components/common/Imgs/WeatherImg/WeatherImg';

export default function Icons({ emotion, weather }: { emotion: string; weather: string }) {
  return (
    <>
      {emotion && <EmotionImg emotion={emotion} />}
      {emotion && weather && (
        <WeatherImg weather={weather} style={{ marginLeft: 'var(--space-100)' }} />
      )}
      {!emotion && weather && <WeatherImg weather={weather} />}
    </>
  );
}
