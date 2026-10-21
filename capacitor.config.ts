import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.teumjit.app',
  appName: '틈짓',
  webDir: 'out',
  // WebView의 fetch 대신 네이티브 HTTP로 요청을 보내서 브라우저 CORS 정책의
  // 영향을 받지 않도록 함 (백엔드가 이 앱의 origin을 CORS 허용목록에 추가하지
  // 않아도 동작하게 하기 위함)
  plugins: {
    CapacitorHttp: {
      enabled: true,
    },
  },
};

export default config;
