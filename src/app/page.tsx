"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import Head from "next/head";

// İlan tipi
type Ilan = {
  id: number;
  baslik: string;
  fiyat: string;
  aciklama: string;
  tarih: string;
  image_url?: string;
  durum?: string; // Devremülk
  metrekare?: string;
  oda_sayisi?: string;
  donem?: string; // Dönem bilgisi (yüksek beyaz, vb)
  kisi_sayisi?: string; // Kişi sayısı
  sozlesme_no?: string; // Sözleşme numarası
  tapu?: boolean; // Tapu durumu
  hafta?: string; // Hafta sayısı
};

export default function Home() {
  const [featuredListings, setFeaturedListings] = useState<Ilan[]>([]);
  const [loading, setLoading] = useState(true);

  // Öne çıkan ilanları çekme
  useEffect(() => {
    const fetchFeaturedListings = async () => {
      setLoading(true);
      // Örnek olarak ilk 3 ilanı çekiyoruz, burada özellikle "öne çıkan" olarak işaretlenmiş ilanları çekmek için
      // veritabanına bir "featured" kolonu eklenebilir ve ona göre filtrelenebilir
      const { data, error } = await supabase
        .from("ilanlar")
        .select("*")
        .limit(3);

      if (error) {
        console.error("İlanları çekerken hata oluştu:", error);
      } else {
        setFeaturedListings(data || []);
      }
      setLoading(false);
    };

    fetchFeaturedListings();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Head>
        <title>Unison Gayrimenkul - Kaliteli ve Güvenilir Devremülk Çözümleri</title>
        <meta name="description" content="Unison Gayrimenkul, müşterilerimizin ihtiyaçlarına özel kaliteli ve güvenilir devremülk çözümleri sunmaktadır. En iyi devremülk fırsatlarını kaçırmayın!" />
        
        {/* Schema.org yapılandırılmış veri */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "RealEstateAgent",
              "name": "Unison Gayrimenkul",
              "url": "https://unisongayrimenkul.com",
              "logo": "https://unisongayrimenkul.com/images/logo.png",
              "sameAs": [
                "https://www.facebook.com/unisongayrimenkul",
                "https://www.instagram.com/unisongayrimenkul",
                "https://twitter.com/unisongayrimenkul"
              ],
              "description": "Kaliteli ve güvenilir devremülk çözümleri sunan Unison Gayrimenkul, müşterilerine profesyonel hizmet vermektedir.",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "MERDİVENKÖY MAH. DİKYOL SK. B Blok No:2 İç Kapı:179",
                "addressLocality": "Kadıköy",
                "addressRegion": "İstanbul",
                "postalCode": "34000",
                "addressCountry": "TR"
              },
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://unisongayrimenkul.com/ilanlar?q={search_term_string}",
                "query-input": "required name=search_term_string"
              }
            })
          }}
        />
      </Head>
      
      {/* Hero Bölümü */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="w-full h-full relative">
            <Image 
              src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1973&q=80" 
              alt="Devremülk" 
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-blue-900/70 to-black/50"></div>
          </div>
        </div>
        
        <div className="container mx-auto px-4 z-10 relative">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 animate-fadeInUp">
              Hayalinizdeki Devremülk Fırsatları
            </h1>
            <p className="text-xl text-gray-200 mb-8 animate-fadeInUp animation-delay-200">
              Unison Gayrimenkul ile kaliteli ve güvenilir devremülk çözümleri. Profesyonel hizmet anlayışıyla hayalinizdeki tatil fırsatlarını keşfedin.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 animate-fadeInUp animation-delay-400">
              <Link href="/ilanlar" className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-medium transition-colors inline-flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                </svg>
                İlanları Keşfet
              </Link>
              <Link href="/iletisim" className="bg-white hover:bg-gray-100 text-blue-600 py-3 px-6 rounded-lg font-medium transition-colors inline-flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
                Bize Ulaşın
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Özellikler Bölümü */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Neden Unison Gayrimenkul?</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
              Devremülk sektöründe güvenilir ve profesyonel hizmet anlayışımızla fark yaratıyoruz.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 text-blue-600 dark:text-blue-400">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Güvenilir Hizmet</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Şeffaf ve dürüst hizmet anlayışımızla müşterilerimizin güvenini kazanıyoruz.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 text-blue-600 dark:text-blue-400">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Profesyonel Ekip</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Alanında uzman ekip üyelerimizle müşterilerimize en iyi hizmeti sunuyoruz.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 text-blue-600 dark:text-blue-400">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Kaliteli Portföy</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Özenle seçilmiş kaliteli devremülk fırsatlarını sizlerle buluşturuyoruz.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Öne Çıkan İlanlar */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Öne Çıkan Devremülk Fırsatları</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
              En popüler ve avantajlı devremülk fırsatlarımızı keşfedin.
            </p>
          </div>
          
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : featuredListings.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredListings.map((ilan) => (
                <Link key={ilan.id} href={`/ilanlar/${ilan.id}`}>
                  <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm overflow-hidden transition-all hover:shadow-lg hover:translate-y-[-5px]">
                    {ilan.image_url ? (
                      <div className="h-64 relative overflow-hidden">
                        <Image 
                          src={ilan.image_url} 
                          alt={ilan.baslik} 
                          className="w-full h-full object-cover transition-transform hover:scale-105"
                          width={400}
                          height={300}
                        />
                        <div className="absolute top-4 left-4 px-3 py-1 bg-blue-600 text-white text-xs font-medium rounded-full">
                          Devremülk
                        </div>
                      </div>
                    ) : (
                      <div className="h-64 bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 text-gray-400 dark:text-gray-500">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                        </svg>
                      </div>
                    )}
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{ilan.baslik}</h3>
                      
                      <div className="flex flex-wrap gap-3 mt-3 mb-4">
                        {ilan.donem && (
                          <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs font-medium rounded-full">
                            {ilan.donem}
                          </span>
                        )}
                        {ilan.oda_sayisi && (
                          <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs font-medium rounded-full">
                            {ilan.oda_sayisi}
                          </span>
                        )}
                        {ilan.kisi_sayisi && (
                          <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs font-medium rounded-full">
                            {ilan.kisi_sayisi} Kişilik
                          </span>
                        )}
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-xl font-bold text-blue-600 dark:text-blue-400">{ilan.fiyat}</span>
                        <span className="text-sm text-gray-500 dark:text-gray-400">{ilan.hafta && `${ilan.hafta} Hafta`}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white dark:bg-gray-900 rounded-xl shadow-sm">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16 text-gray-400 mx-auto mb-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
              <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-2">Şu anda öne çıkan ilan bulunmuyor</h3>
              <p className="text-gray-500 dark:text-gray-400 mb-4">Daha sonra tekrar kontrol edin veya tüm ilanlarımıza göz atın.</p>
              <Link href="/ilanlar" className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                Tüm İlanlar
              </Link>
            </div>
          )}
          
          <div className="text-center mt-10">
            <Link href="/ilanlar" className="inline-flex items-center text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium group">
              Tüm devremülk ilanları için tıklayın
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* İletişim CTA */}
      <section className="py-20 bg-blue-600 dark:bg-blue-800">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="text-center md:text-left mb-8 md:mb-0">
              <h2 className="text-3xl font-bold text-white mb-4">Devremülk hakkında bilgi mi almak istiyorsunuz?</h2>
              <p className="text-blue-100 max-w-xl">
                Uzman ekibimiz devremülk konusundaki tüm sorularınızı yanıtlamak için hazır. Hemen iletişime geçin.
              </p>
            </div>
            <div>
              <Link href="/iletisim" className="inline-flex items-center bg-white text-blue-600 hover:bg-gray-100 px-6 py-4 rounded-lg font-medium transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
                Hemen İletişime Geçin
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
