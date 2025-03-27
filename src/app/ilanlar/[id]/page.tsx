"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useParams } from "next/navigation";
import Image from "next/image";
import Head from "next/head";

// İlan tipi
type Ilan = {
  id: number;
  baslik: string;
  fiyat: string;
  tarih: string;
  image_url?: string;
  durum?: string;
  metrekare?: string;
  oda_sayisi?: string;
  donem?: string; // Dönem bilgisi (yüksek beyaz, vb)
  kisi_sayisi?: string; // Kişi sayısı
  sozlesme_no?: string; // Sözleşme numarası
  tapu?: boolean; // Tapu durumu
  hafta?: string; // Hafta sayısı
  // Ek resimler için alan
  image_url2?: string;
  image_url3?: string;
  image_url4?: string;
  image_url5?: string;
};

export default function IlanDetay() {
  const { id } = useParams();
  const [ilan, setIlan] = useState<Ilan | null>(null);
  const [benzerIlanlar, setBenzerIlanlar] = useState<Ilan[]>([]);
  const [loading, setLoading] = useState(true);
  const [benzerLoading, setBenzerLoading] = useState(true);
  const [activeImage, setActiveImage] = useState<string | undefined>(undefined);

  // İlan detaylarını çekme
  useEffect(() => {
    const fetchIlan = async () => {
      const { data, error } = await supabase
        .from("ilanlar")
        .select("*")
        .eq("id", Number(id))
        .single();

      if (error) {
        console.error("İlan çekerken hata oluştu:", error);
      } else {
        setIlan(data);
        setActiveImage(data.image_url);
        // İlan çekildikten sonra benzer ilanları çek
        fetchBenzerIlanlar(data);
      }
      setLoading(false);
    };

    const fetchBenzerIlanlar = async (currentIlan: Ilan) => {
      // Benzer ilanları çekmek için aynı dönem veya oda sayısı olan ilanları kullan
      const { data, error } = await supabase
        .from("ilanlar")
        .select("*")
        .or(`donem.eq.${currentIlan.donem},oda_sayisi.eq.${currentIlan.oda_sayisi}`)
        .neq("id", currentIlan.id) // Mevcut ilanı hariç tut
        .limit(3);

      if (error) {
        console.error("Benzer ilanları çekerken hata oluştu:", error);
      } else {
        setBenzerIlanlar(data || []);
      }
      setBenzerLoading(false);
    };

    if (id) {
      fetchIlan();
    }
  }, [id]);

  // İlanın tüm resimlerini bir diziye topla
  const getAllImages = (ilan: Ilan | null) => {
    if (!ilan) return [];
    
    const images = [];
    if (ilan.image_url) images.push(ilan.image_url);
    if (ilan.image_url2) images.push(ilan.image_url2);
    if (ilan.image_url3) images.push(ilan.image_url3);
    if (ilan.image_url4) images.push(ilan.image_url4);
    if (ilan.image_url5) images.push(ilan.image_url5);
    
    return images;
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!ilan) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <div className="bg-white dark:bg-gray-800 shadow-md rounded-xl p-8 text-center max-w-md">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16 text-red-500 mx-auto mb-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
          </svg>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">İlan bulunamadı</h1>
          <p className="text-gray-600 dark:text-gray-300 mb-4">Aradığınız ilan mevcut değil veya kaldırılmış olabilir.</p>
          <Link href="/ilanlar" className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
            İlanlara Dön
          </Link>
        </div>
      </div>
    );
  }

  const ilanImages = getAllImages(ilan);

  return (
    <div className="container mx-auto px-4 py-8">
      {ilan && (
        <Head>
          <title>{ilan.baslik} - Unison Gayrimenkul</title>
          <meta name="description" content={`${ilan.donem} dönem, ${ilan.oda_sayisi} odalı, ${ilan.kisi_sayisi} kişilik devremülk fırsatı. Tapu durumu: ${ilan.tapu ? 'Var' : 'Yok'}, Hafta: ${ilan.hafta}`} />
          
          {/* Schema.org yapılandırılmış veri */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "Product",
                "name": ilan.baslik,
                "description": `${ilan.donem} dönem, ${ilan.oda_sayisi} odalı, ${ilan.kisi_sayisi} kişilik devremülk fırsatı. Hafta: ${ilan.hafta}`,
                "brand": {
                  "@type": "Brand",
                  "name": "Unison Gayrimenkul"
                },
                "offers": {
                  "@type": "Offer",
                  "priceCurrency": "TRY",
                  "price": ilan.fiyat.replace(/[^\d]/g, ''),
                  "availability": "https://schema.org/InStock"
                },
                "image": ilan.image_url
              })
            }}
          />
        </Head>
      )}
      
      <div className="mb-8">
        <Link href="/ilanlar" className="inline-flex items-center text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
          Tüm İlanlar
        </Link>
      </div>

      <div className="container mx-auto py-12 px-4">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Resim Alanı */}
            <div className="lg:order-1 order-2">
              <div className="p-6 lg:p-8">
                <div className="aspect-w-16 aspect-h-9 mb-6">
                  {activeImage ? (
                    <Image 
                      src={activeImage} 
                      alt={ilan.baslik} 
                      className="rounded-lg object-cover w-full h-full"
                      width={800}
                      height={500}
                    />
                  ) : (
                    <div className="bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center h-[300px]">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-20 h-20 text-gray-400 dark:text-gray-500">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                      </svg>
                    </div>
                  )}
                </div>

                {/* Galeri */}
                {ilanImages.length > 1 && (
                  <div className="grid grid-cols-5 gap-2">
                    {ilanImages.map((image, index) => (
                      <div 
                        key={index} 
                        className={`aspect-w-1 aspect-h-1 cursor-pointer ${activeImage === image ? 'ring-2 ring-blue-500' : ''}`}
                        onClick={() => setActiveImage(image)}
                      >
                        <Image 
                          src={image} 
                          alt={`${ilan.baslik} resim ${index + 1}`} 
                          className="rounded-md object-cover w-full h-full"
                          width={150}
                          height={150}
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Bilgi Alanı */}
            <div className="lg:order-2 order-1">
              <div className="p-6 lg:p-8">
                <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 text-xs font-medium rounded-full mb-4">
                  Devremülk
                </span>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">{ilan.baslik}</h1>
                
                <div className="flex items-center mb-6">
                  <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">{ilan.fiyat}</span>
                </div>

                <div className="mb-6">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Özellikler</h2>
                  <div className="grid grid-cols-2 gap-4">
                    {ilan.sozlesme_no && (
                      <div className="flex items-center text-gray-700 dark:text-gray-300">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2 text-blue-600 dark:text-blue-400">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                        </svg>
                        <span className="font-medium">Sözleşme No:</span>
                        <span className="ml-2">{ilan.sozlesme_no}</span>
                      </div>
                    )}
                    {ilan.oda_sayisi && (
                      <div className="flex items-center text-gray-700 dark:text-gray-300">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2 text-blue-600 dark:text-blue-400">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" />
                        </svg>
                        <span className="font-medium">Oda:</span>
                        <span className="ml-2">{ilan.oda_sayisi}</span>
                      </div>
                    )}
                    {ilan.kisi_sayisi && (
                      <div className="flex items-center text-gray-700 dark:text-gray-300">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2 text-blue-600 dark:text-blue-400">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                        </svg>
                        <span className="font-medium">Kişi Sayısı:</span>
                        <span className="ml-2">{ilan.kisi_sayisi}</span>
                      </div>
                    )}
                    {ilan.donem && (
                      <div className="flex items-center text-gray-700 dark:text-gray-300">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2 text-blue-600 dark:text-blue-400">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                        </svg>
                        <span className="font-medium">Dönem:</span>
                        <span className="ml-2">{ilan.donem}</span>
                      </div>
                    )}
                    {ilan.hafta && (
                      <div className="flex items-center text-gray-700 dark:text-gray-300">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2 text-blue-600 dark:text-blue-400">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                        </svg>
                        <span className="font-medium">Hafta:</span>
                        <span className="ml-2">{ilan.hafta} Hafta</span>
                      </div>
                    )}
                    <div className="flex items-center text-gray-700 dark:text-gray-300">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2 text-blue-600 dark:text-blue-400">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                      </svg>
                      <span className="font-medium">İlan Tarihi:</span>
                      <span className="ml-2">{ilan.tarih}</span>
                    </div>
                    <div className="flex items-center text-gray-700 dark:text-gray-300">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2 text-blue-600 dark:text-blue-400">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                      </svg>
                      <span className="font-medium">Tapu:</span>
                      <span className="ml-2">{ilan.tapu ? "Var" : "Yok"}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col space-y-3">
                  <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-medium transition-colors flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                    </svg>
                    İlan Sahibini Ara
                  </button>
                  
                  <button className="w-full bg-white hover:bg-gray-100 text-blue-600 border border-gray-300 py-3 px-6 rounded-lg font-medium transition-colors flex items-center justify-center dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-blue-400 dark:border-gray-600">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                    </svg>
                    Mesaj Gönder
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Benzer İlanlar */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Benzer Devremülk İlanları</h2>
          
          {benzerLoading ? (
            <div className="flex justify-center items-center py-8">
              <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : benzerIlanlar.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {benzerIlanlar.map((benzerIlan) => (
                <Link key={benzerIlan.id} href={`/ilanlar/${benzerIlan.id}`}>
                  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden cursor-pointer hover:shadow-md transition-shadow">
                    <div className="h-48 relative">
                      {benzerIlan.image_url ? (
                        <Image 
                          src={benzerIlan.image_url} 
                          alt={benzerIlan.baslik} 
                          className="w-full h-full object-cover"
                          width={400}
                          height={300}
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 text-gray-400 dark:text-gray-500">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                          </svg>
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-gray-900 dark:text-white line-clamp-1">{benzerIlan.baslik}</h3>
                      <div className="mt-2 flex justify-between items-center">
                        <span className="font-semibold text-blue-600 dark:text-blue-400">{benzerIlan.fiyat}</span>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          {benzerIlan.oda_sayisi && `${benzerIlan.oda_sayisi}`}
                          {benzerIlan.donem && ` · ${benzerIlan.donem}`}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 bg-gray-50 dark:bg-gray-700 rounded-xl">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 text-gray-400 mx-auto mb-2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
              <p className="text-gray-500 dark:text-gray-400">Benzer ilan bulunamadı.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
