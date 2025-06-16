import type { AppProps } from 'next/app';
import '../styles/globals.css'; // 如果你的 styles 文件夹在根目录

export default function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
