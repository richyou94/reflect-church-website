import type { Metadata } from "next";
import { Cormorant_Garamond, Noto_Sans_KR } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

const cormorantGaramond = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["500", "600"],
  display: "swap",
});

const notoSansKr = Noto_Sans_KR({
  variable: "--font-noto-kr",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "비추는 교회 | Reflect Church",
    template: "%s | Reflect Church",
  },
  description:
    "그분의 임재가 모든 것을 변화시킵니다. 경기도 고양시 일산서구에 위치한 비추는 교회의 예배, Prayer Room, 말씀 및 방문 안내를 확인하세요.",
  openGraph: {
    title: "비추는 교회 | Reflect Church",
    description:
      "그분의 임재가 모든 것을 변화시킵니다. 경기도 고양시 일산서구에 위치한 비추는 교회의 예배, Prayer Room, 말씀 및 방문 안내를 확인하세요.",
    locale: "ko_KR",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ko"
      className={`${cormorantGaramond.variable} ${notoSansKr.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {/* No-JS fallback: scroll-reveal elements start hidden via CSS; force them visible if scripting is unavailable. */}
        <noscript>
          <style>{".reveal{opacity:1!important;transform:none!important;}"}</style>
        </noscript>
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
