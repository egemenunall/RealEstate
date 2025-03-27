"use client";

import { supabase } from "../../lib/supabase";
import { useEffect, useState } from "react";
import Link from "next/link";
import Head from "next/head";

// İlan tipi
type Ilan = {
  id: number;
  baslik: string;
  fiyat: string;
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

const Ilanlar = () => {
  const [ilanlar, setIlanlar] = useState<Ilan[]>([]);
  const [loading, setLoading] = useState(true);
  const [filtre, setFiltre] = useState({
    fiyatMin: "",
    fiyatMax: "",
    aramaTerimi: "",
    donem: "",
    oda_sayisi: ""
  });

  // Veritabanından ilanları çekme
  useEffect(() => {
    const fetchIlanlar = async () => {
      const { data, error } = await supabase.from("ilanlar").select("*");

      if (error) {
        console.error("İlanları çekerken hata oluştu:", error);
      } else {
        setIlanlar(data || []);
      }
      setLoading(false);
    };

    fetchIlanlar();
  }, []);

  // Filtreleme fonksiyonu
  const filtrelenmisIlanlar = ilanlar.filter((ilan) => {
    // Fiyat aralığı filtresi
    const fiyatDeger = parseFloat(ilan.fiyat.replace(/[^\d.-]/g, ""));
    if (filtre.fiyatMin && fiyatDeger < parseFloat(filtre.fiyatMin)) {
      return false;
    }
    if (filtre.fiyatMax && fiyatDeger > parseFloat(filtre.fiyatMax)) {
      return false;
    }

    // Dönem filtresi
    if (filtre.donem && ilan.donem !== filtre.donem) {
      return false;
    }

    // Oda sayısı filtresi
    if (filtre.oda_sayisi && ilan.oda_sayisi !== filtre.oda_sayisi) {
      return false;
    }

    // Arama terimi filtresi
    if (
      filtre.aramaTerimi &&
      !ilan.baslik.toLowerCase().includes(filtre.aramaTerimi.toLowerCase())
    ) {
      return false;
    }

    return true;
  });

  const handleFiltreChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFiltre((prev) => ({ ...prev, [name]: value }));
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-12 px-4">
      <Head>
        <title>Devremülk İlanları - Unison Gayrimenkul</title>
        <meta name="description" content="Unison Gayrimenkul'un devremülk ilanları. Dönem, oda sayısı ve diğer özelliklere göre filtreleyebilir, en uygun devremülk fırsatlarını bulabilirsiniz." />
        
        {/* Schema.org yapılandırılmış veri */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ItemList",
              "itemListElement": filtrelenmisIlanlar.slice(0, 10).map((ilan, index) => ({
                "@type": "ListItem",
                "position": index + 1,
                "item": {
                  "@type": "Product",
                  "name": ilan.baslik,
                  "url": `https://unisongayrimenkul.com/ilanlar/${ilan.id}`,
                  "image": ilan.image_url,
                  "description": `${ilan.donem} dönem, ${ilan.oda_sayisi} odalı devremülk`,
                  "offers": {
                    "@type": "Offer",
                    "priceCurrency": "TRY",
                    "price": ilan.fiyat.replace(/[^\d]/g, ''),
                    "availability": "https://schema.org/InStock"
                  }
                }
              }))
            })
          }}
        />
      </Head>
      
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Devremülk İlanları</h1>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Size en uygun devremülk fırsatlarını burada bulabilirsiniz. Filtreleme seçeneklerini kullanarak aradığınız özelliklerdeki ilanları listeleyebilirsiniz.
          </p>
        </div>

        {/* Filtreler */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mb-8">
          <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Filtrele</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label htmlFor="donem" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Dönem
              </label>
              <select
                id="donem"
                name="donem"
                value={filtre.donem}
                onChange={handleFiltreChange}
                className="w-full p-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="">Tümü</option>
                <option value="Yüksek Beyaz">Yüksek Beyaz</option>
                <option value="Yüksek Kırmızı">Yüksek Kırmızı</option>
                <option value="Orta Sezon">Orta Sezon</option>
                <option value="Düşük Sezon">Düşük Sezon</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="oda_sayisi" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Oda Sayısı
              </label>
              <select
                id="oda_sayisi"
                name="oda_sayisi"
                value={filtre.oda_sayisi}
                onChange={handleFiltreChange}
                className="w-full p-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="">Tümü</option>
                <option value="1+0">1+0</option>
                <option value="1+1">1+1</option>
                <option value="2+1">2+1</option>
                <option value="3+1">3+1</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="fiyatMin" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Min. Fiyat
              </label>
              <input
                type="number"
                id="fiyatMin"
                name="fiyatMin"
                value={filtre.fiyatMin}
                onChange={handleFiltreChange}
                className="w-full p-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="Min. Fiyat"
              />
            </div>
            
            <div>
              <label htmlFor="fiyatMax" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Max. Fiyat
              </label>
              <input
                type="number"
                id="fiyatMax"
                name="fiyatMax"
                value={filtre.fiyatMax}
                onChange={handleFiltreChange}
                className="w-full p-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="Max. Fiyat"
              />
            </div>
            
            <div className="md:col-span-4">
              <label htmlFor="aramaTerimi" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Arama
              </label>
              <input
                type="text"
                id="aramaTerimi"
                name="aramaTerimi"
                value={filtre.aramaTerimi}
                onChange={handleFiltreChange}
                className="w-full p-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="Anahtar kelime"
              />
            </div>
          </div>
        </div>

        {/* İlanlar Listesi */}
        {filtrelenmisIlanlar.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtrelenmisIlanlar.map((ilan) => (
            <Link key={ilan.id} href={`/ilanlar/${ilan.id}`}>
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden transition-all hover:shadow-lg hover:translate-y-[-5px] cursor-pointer">
                  {ilan.image_url ? (
                    <div className="h-48 relative overflow-hidden">
                      <img src={ilan.image_url} alt={ilan.baslik} className="w-full h-full object-cover" />
                      <span className="absolute top-4 left-4 px-3 py-1 bg-blue-600 text-white text-xs font-medium rounded-full">
                        Devremülk
                      </span>
                    </div>
                  ) : (
                    <div className="h-48 bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 text-gray-400 dark:text-gray-500">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                      </svg>
                    </div>
                  )}
                  <div className="p-6">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white line-clamp-1">{ilan.baslik}</h2>
                    
                    {/* Özellikler */}
                    <div className="flex flex-wrap gap-4 mt-3 text-sm text-gray-500 dark:text-gray-400">
                      {ilan.oda_sayisi && (
                        <div className="flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-1">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" />
                          </svg>
                          {ilan.oda_sayisi}
                        </div>
                      )}
                      {ilan.donem && (
                        <div className="flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-1">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                          </svg>
                          {ilan.donem}
                        </div>
                      )}
                      {ilan.hafta && (
                        <div className="flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-1">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                          </svg>
                          {ilan.hafta} Hafta
                        </div>
                      )}
                    </div>
                    
                <div className="mt-4 flex justify-between items-center">
                      <span className="text-xl font-bold text-blue-600 dark:text-blue-400">{ilan.fiyat}</span>
                      <span className="text-sm text-gray-400 dark:text-gray-500">{ilan.tarih}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
              </div>
        ) : (
          <div className="text-center py-12 bg-gray-50 dark:bg-gray-800 rounded-xl">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16 text-gray-400 dark:text-gray-500 mx-auto mb-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
            <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-2">İlan Bulunamadı</h3>
            <p className="text-gray-500 dark:text-gray-400">Arama kriterlerinize uygun ilan bulunamadı. Lütfen filtreleri değiştirerek tekrar deneyin.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Ilanlar;
