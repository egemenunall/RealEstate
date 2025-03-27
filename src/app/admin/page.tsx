"use client";

import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabase";
import { useRouter } from "next/navigation";

// Admin panel sabit şifresi (gerçek uygulamada bunu Supabase'de saklayabilirsiniz)
const ADMIN_PASSWORD = "emlak123";

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  
  // İlan ekleme state'leri
  const [baslik, setBaslik] = useState("");
  const [fiyat, setFiyat] = useState("");
  const [durum, setDurum] = useState("Devremülk");
  const [metrekare, setMetrekare] = useState("");
  const [odaSayisi, setOdaSayisi] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [imageUrl2, setImageUrl2] = useState("");
  const [imageUrl3, setImageUrl3] = useState("");
  const [imageUrl4, setImageUrl4] = useState("");
  const [imageUrl5, setImageUrl5] = useState("");
  const [donem, setDonem] = useState("");
  const [kisiSayisi, setKisiSayisi] = useState("");
  const [sozlesmeNo, setSozlesmeNo] = useState("");
  const [tapu, setTapu] = useState(true);
  const [hafta, setHafta] = useState("");
  
  // İlan listeleme state'i
  const [ilanlar, setIlanlar] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState("ekle");
  
  const router = useRouter();

  // Şifre kontrolü
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setError("");
      // Başarılı giriş bilgisini session storage'a kaydedelim
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('adminAuthenticated', 'true');
      }
    } else {
      setError("Şifre yanlış. Lütfen tekrar deneyin.");
    }
    
    setLoading(false);
  };
  
  // Sayfa yüklendiğinde session kontrolü
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const isAuth = sessionStorage.getItem('adminAuthenticated') === 'true';
      setIsAuthenticated(isAuth);
      
      if (isAuth) {
        fetchIlanlar();
      }
    }
  }, []);
  
  // İlanları getir
  const fetchIlanlar = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("ilanlar")
      .select("*")
      .order('id', { ascending: false });
    
    if (error) {
      console.error("İlanları çekerken hata oluştu:", error.message);
    } else {
      setIlanlar(data || []);
    }
    setLoading(false);
  };

  // İlan ekleme
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // String tarihi yerinde hazırlayalım
    const today = new Date();
    // ISO formatında tarih oluşturalım (YYYY-MM-DD)
    const tarihISO = today.toISOString().split('T')[0];
    const tarihGoruntuleme = `${today.getDate().toString().padStart(2, '0')}.${(today.getMonth() + 1).toString().padStart(2, '0')}.${today.getFullYear()}`;

    const { error } = await supabase.from("ilanlar").insert([
      {
        baslik,
        fiyat,
        durum,
        metrekare,
        oda_sayisi: odaSayisi,
        image_url: imageUrl,
        image_url2: imageUrl2,
        image_url3: imageUrl3,
        image_url4: imageUrl4,
        image_url5: imageUrl5,
        // Devremülk özellikleri
        donem,
        kisi_sayisi: kisiSayisi,
        sozlesme_no: sozlesmeNo,
        tapu,
        hafta,
        // ISO formatında tarih gönderelim
        tarih: tarihISO,
      },
    ]);

    if (error) {
      console.error("İlan eklenirken bir hata oluştu:", error.message);
      alert(`İlan eklenirken hata oluştu: ${error.message}`);
      
      // Tarih formatıyla ilgili hata varsa yeniden deneyelim
      if (error.message.includes("date/time")) {
        try {
          const { error: retryError } = await supabase.from("ilanlar").insert([
            {
              baslik,
              fiyat,
              durum,
              metrekare,
              oda_sayisi: odaSayisi,
              image_url: imageUrl,
              image_url2: imageUrl2,
              image_url3: imageUrl3,
              image_url4: imageUrl4,
              image_url5: imageUrl5,
              donem,
              kisi_sayisi: kisiSayisi,
              sozlesme_no: sozlesmeNo,
              tapu,
              hafta,
              // Sadece string olarak tarih gönderelim
              tarih: tarihGoruntuleme,
            },
          ]);
          
          if (!retryError) {
            alert("İlan başarıyla eklendi!");
            // Form alanlarını temizle
            setBaslik("");
            setFiyat("");
            setDurum("");
            setMetrekare("");
            setOdaSayisi("");
            setImageUrl("");
            setImageUrl2("");
            setImageUrl3("");
            setImageUrl4("");
            setImageUrl5("");
            setDonem("");
            setKisiSayisi("");
            setSozlesmeNo("");
            setHafta("");
            
            // İlanları yeniden getir
            fetchIlanlar();
          } else {
            alert(`İkinci denemede de hata oluştu: ${retryError.message}`);
          }
        } catch (e) {
          console.error("İkinci deneme hatası:", e);
        }
      }
    } else {
      alert("İlan başarıyla eklendi!");
      // Form alanlarını temizle
      setBaslik("");
      setFiyat("");
      setDurum("");
      setMetrekare("");
      setOdaSayisi("");
      setImageUrl("");
      setImageUrl2("");
      setImageUrl3("");
      setImageUrl4("");
      setImageUrl5("");
      setDonem("");
      setKisiSayisi("");
      setSozlesmeNo("");
      setHafta("");
      
      // İlanları yeniden getir
      fetchIlanlar();
    }
    
    setLoading(false);
  };
  
  // İlan silme
  const handleDeleteIlan = async (id: number) => {
    if (window.confirm("Bu ilanı silmek istediğinize emin misiniz?")) {
      setLoading(true);
      
      const { error } = await supabase
        .from("ilanlar")
        .delete()
        .eq('id', id);
      
      if (error) {
        console.error("İlan silinirken hata oluştu:", error.message);
        alert(`İlan silinemedi: ${error.message}`);
      } else {
        alert("İlan başarıyla silindi!");
        fetchIlanlar();
      }
      
      setLoading(false);
    }
  };
  
  // Admin panelden çıkış
  const handleLogout = () => {
    setIsAuthenticated(false);
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem('adminAuthenticated');
    }
  };

  // Henüz giriş yapılmadıysa giriş formunu göster
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 px-4">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-8 w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Admin Paneli</h1>
            <p className="text-gray-600 dark:text-gray-300 mt-2">Devam etmek için lütfen giriş yapın</p>
          </div>
          
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}
          
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Şifre
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                required
              />
            </div>
            
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium transition-colors disabled:opacity-50"
            >
              {loading ? "Giriş Yapılıyor..." : "Giriş Yap"}
            </button>
          </form>
          
          <div className="mt-6 text-center">
            <button
              onClick={() => router.push("/")}
              className="text-blue-600 dark:text-blue-400 hover:underline text-sm"
            >
              Ana Sayfaya Dön
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Admin panel içeriği
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Admin Paneli</h1>
        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg text-sm"
        >
          Çıkış Yap
        </button>
      </div>
      
      {/* Tab menü */}
      <div className="flex border-b border-gray-200 dark:border-gray-700 mb-6">
        <button
          onClick={() => setActiveTab("ekle")}
          className={`py-2 px-4 font-medium text-sm ${
            activeTab === "ekle"
              ? "border-b-2 border-blue-500 text-blue-600 dark:text-blue-400"
              : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
          }`}
        >
          İlan Ekle
        </button>
        <button
          onClick={() => {fetchIlanlar(); setActiveTab("listele")}}
          className={`py-2 px-4 font-medium text-sm ${
            activeTab === "listele"
              ? "border-b-2 border-blue-500 text-blue-600 dark:text-blue-400"
              : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
          }`}
        >
          İlanları Yönet
        </button>
      </div>
      
      {/* İlan ekleme formu */}
      {activeTab === "ekle" && (
        <div className="bg-white dark:bg-gray-800 shadow-md rounded-xl p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Yeni Devremülk İlanı Ekle</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Başlık
                </label>
                <input
                  type="text"
                  value={baslik}
                  onChange={(e) => setBaslik(e.target.value)}
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Fiyat
                </label>
                <input
                  type="text"
                  value={fiyat}
                  onChange={(e) => setFiyat(e.target.value)}
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  required
                  placeholder="Örn: 1.250.000₺"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Dönem
                </label>
                <select
                  value={donem}
                  onChange={(e) => setDonem(e.target.value)}
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  required
                >
                  <option value="">Seçiniz</option>
                  <option value="Yüksek Beyaz">Yüksek Beyaz</option>
                  <option value="Yüksek Kırmızı">Yüksek Kırmızı</option>
                  <option value="Orta Sezon">Orta Sezon</option>
                  <option value="Düşük Sezon">Düşük Sezon</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Oda Sayısı
                </label>
                <select
                  value={odaSayisi}
                  onChange={(e) => setOdaSayisi(e.target.value)}
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  required
                >
                  <option value="">Seçiniz</option>
                  <option value="1+0">1+0</option>
                  <option value="1+1">1+1</option>
                  <option value="2+1">2+1</option>
                  <option value="3+1">3+1</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Kişi Sayısı
                </label>
                <input
                  type="text"
                  value={kisiSayisi}
                  onChange={(e) => setKisiSayisi(e.target.value)}
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  placeholder="Örn: 4+1"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Sözleşme No
                </label>
                <input
                  type="text"
                  value={sozlesmeNo}
                  onChange={(e) => setSozlesmeNo(e.target.value)}
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  placeholder="Örn: AD56365"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Hafta Sayısı
                </label>
                <input
                  type="text"
                  value={hafta}
                  onChange={(e) => setHafta(e.target.value)}
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  placeholder="Örn: 7"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Tapu Durumu
                </label>
                <select
                  value={tapu ? "var" : "yok"}
                  onChange={(e) => setTapu(e.target.value === "var")}
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                >
                  <option value="var">Var</option>
                  <option value="yok">Yok</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Metrekare
                </label>
                <input
                  type="text"
                  value={metrekare}
                  onChange={(e) => setMetrekare(e.target.value)}
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  placeholder="Örn: 120"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Görsel URL (Ana Görsel)
                </label>
                <input
                  type="text"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  placeholder="Örn: https://images.unsplash.com/photo-..."
                  required
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Görsel URL 2
                </label>
                <input
                  type="text"
                  value={imageUrl2}
                  onChange={(e) => setImageUrl2(e.target.value)}
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  placeholder="Örn: https://images.unsplash.com/photo-..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Görsel URL 3
                </label>
                <input
                  type="text"
                  value={imageUrl3}
                  onChange={(e) => setImageUrl3(e.target.value)}
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  placeholder="Örn: https://images.unsplash.com/photo-..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Görsel URL 4
                </label>
                <input
                  type="text"
                  value={imageUrl4}
                  onChange={(e) => setImageUrl4(e.target.value)}
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  placeholder="Örn: https://images.unsplash.com/photo-..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Görsel URL 5
                </label>
                <input
                  type="text"
                  value={imageUrl5}
                  onChange={(e) => setImageUrl5(e.target.value)}
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  placeholder="Örn: https://images.unsplash.com/photo-..."
                />
              </div>
            </div>
            
            <button
              type="submit"
              disabled={loading}
              className="py-2 px-6 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50"
            >
              {loading ? "Ekleniyor..." : "İlanı Ekle"}
            </button>
          </form>
        </div>
      )}
      
      {/* İlanları listeleme ve yönetme */}
      {activeTab === "listele" && (
        <div className="bg-white dark:bg-gray-800 shadow-md rounded-xl p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            İlanları Yönet ({ilanlar.length} ilan)
          </h2>
          
          {loading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : ilanlar.length === 0 ? (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              Henüz ilan eklenmemiş.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      ID
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Başlık
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Fiyat
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Dönem
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Oda Sayısı
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Tarih
                    </th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      İşlemler
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {ilanlar.map((ilan) => (
                    <tr key={ilan.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                        {ilan.id}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                        {ilan.baslik}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                        {ilan.fiyat}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                        {ilan.donem || "-"}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                        {ilan.oda_sayisi || "-"}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {ilan.tarih}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => handleDeleteIlan(ilan.id)}
                          className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                        >
                          Sil
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Admin;
