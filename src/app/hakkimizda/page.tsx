"use client";

import React from "react";
import Image from "next/image";
import Head from "next/head";

export default function About() {
  return (
    <div className="container mx-auto px-4 py-12">
      <Head>
        <title>Hakkımızda - Unison Gayrimenkul</title>
        <meta name="description" content="Unison Gayrimenkul, gayrimenkul sektöründe müşterilerimize yenilikçi ve güvenilir çözümler sunan lider bir şirkettir. Misyonumuz, değerlerimiz ve vizyonumuz hakkında bilgi edinin." />
        
        {/* Schema.org yapılandırılmış veri */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Unison Gayrimenkul",
              "url": "https://unisongayrimenkul.com",
              "logo": "https://unisongayrimenkul.com/images/logo.png",
              "description": "Unison Gayrimenkul, gayrimenkul sektöründe müşterilerimize yenilikçi ve güvenilir çözümler sunan lider bir şirkettir.",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "MERDİVENKÖY MAH. DİKYOL SK. B Blok No:2 İç Kapı:179",
                "addressLocality": "Kadıköy",
                "addressRegion": "İstanbul",
                "postalCode": "34000",
                "addressCountry": "TR"
              },
              "contactPoint": {
                "@type": "ContactPoint",
                "contactType": "customer service",
                "email": "info@unisongayrimenkul.com"
              }
            })
          }}
        />
      </Head>

      <h1 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800 dark:text-white">
        Hakkımızda
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
        <div>
          <h2 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-white">
            Unison Gayrimenkul'e Hoş Geldiniz
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Unison Gayrimenkul olarak, gayrimenkul sektöründe faaliyet göstermekteyiz. Müşterilerimize en iyi hizmeti sunmak ve gayrimenkul yatırımlarında doğru kararlar almalarına yardımcı olmak için çalışıyoruz.
          </p>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Deneyimli ekibimiz, güncel piyasa bilgisi ve profesyonel yaklaşımımızla, alım, satım ve kiralama süreçlerinde müşterilerimize rehberlik ediyoruz. Her müşterimizin ihtiyaçlarını anlamak ve onlara özel çözümler sunmak bizim için önceliklidir.
          </p>
          <p className="text-gray-600 dark:text-gray-300">
            Gayrimenkul sektöründeki gelişmeleri yakından takip ediyor, teknolojik yenilikleri kullanarak müşterilerimize en iyi hizmeti sunuyoruz.
          </p>
        </div>
        <div className="relative h-80 rounded-lg overflow-hidden shadow-lg">
          <Image
            src="/images/office.jpg"
            alt="Unison Gayrimenkul Ofisi"
            fill
            className="object-cover"
          />
        </div>
      </div>

      <div className="mb-16">
        <h2 className="text-2xl font-semibold mb-8 text-center text-gray-800 dark:text-white">
          Değerlerimiz
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <div className="flex justify-center mb-4">
              <div className="w-12 h-12 flex items-center justify-center bg-blue-100 dark:bg-blue-900 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600 dark:text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <h3 className="text-xl font-medium mb-2 text-center text-gray-800 dark:text-white">Dürüstlük</h3>
            <p className="text-gray-600 dark:text-gray-300 text-center">
              Müşterilerimize karşı her zaman şeffaf ve dürüst bir yaklaşım sergiliyoruz.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <div className="flex justify-center mb-4">
              <div className="w-12 h-12 flex items-center justify-center bg-blue-100 dark:bg-blue-900 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600 dark:text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
            </div>
            <h3 className="text-xl font-medium mb-2 text-center text-gray-800 dark:text-white">Uzmanlık</h3>
            <p className="text-gray-600 dark:text-gray-300 text-center">
              Alanında uzman kadromuzla kaliteli ve güvenilir hizmet sunuyoruz.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <div className="flex justify-center mb-4">
              <div className="w-12 h-12 flex items-center justify-center bg-blue-100 dark:bg-blue-900 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600 dark:text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
            </div>
            <h3 className="text-xl font-medium mb-2 text-center text-gray-800 dark:text-white">Müşteri Odaklılık</h3>
            <p className="text-gray-600 dark:text-gray-300 text-center">
              Müşterilerimizin memnuniyeti bizim için en önemli önceliktir.
            </p>
          </div>
        </div>
      </div>

      <div className="mb-16">
        <h2 className="text-2xl font-semibold mb-8 text-center text-gray-800 dark:text-white">
          Misyonumuz
        </h2>
        <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
          <p className="text-gray-600 dark:text-gray-300 text-center">
            Müşterilerimize, kaliteli ve güvenilir devremülk çözümleri sunarak, onların yaşam standartlarını yükseltmek için çalışıyoruz. Profesyonel ve deneyimli ekibimizle, dürüstlük ve şeffaflık ilkeleri doğrultusunda, her zaman en iyi hizmeti sunmayı amaçlıyoruz. Müşteri memnuniyetini ön planda tutarak, sektörde güvenilir bir marka olmayı hedefliyoruz.
          </p>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-8 text-center text-gray-800 dark:text-white">
          Vizyonumuz
        </h2>
        <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
          <p className="text-gray-600 dark:text-gray-300 text-center">
            Unison Gayrimenkul olarak, gayrimenkul sektöründe yenilikçi ve güvenilir çözümler sunarak, müşterilerimizin beklentilerini en üst düzeyde karşılamayı hedefliyoruz. Misyonumuz, sektörde lider konumda olmak ve sürdürülebilir büyümeyi sağlarken, çevreye duyarlı projelerle topluma değer katmaktır.
          </p>
        </div>
      </div>
    </div>
  );
} 