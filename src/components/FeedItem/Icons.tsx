import EmotionImg from '@/components/common/Imgs/EmotionImg/EmotionImg';
import WeatherImg from '@/components/common/Imgs/WeatherImg/WeatherImg';

export default function Icons({ emotion, weather }: { emotion: string; weather: string }) {
  return (
    <>
      {emotion && <EmotionImg emotion={emotion} />}
      {weather && (
        <WeatherImg weather={weather} style={emotion ? { marginLeft: 'var(--space-100)' } : {}} />
      )}
    </>
  );
}
