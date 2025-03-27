import Image from "next/image";

export default function HakkimizdaPage() {
  return (
    <div className="container mx-auto py-12 px-4">
      {/* Başlık Bölümü */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Hakkımızda</h1>
        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Unison Gayrimenkul olarak müşterilerimize en iyi hizmeti sunmak ve gayrimenkul sektöründe 
          güvenilir bir danışman olmak için çalışıyoruz.
        </p>
      </div>

      {/* Hikayemiz Bölümü */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-8 mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Hikayemiz</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Unison Gayrimenkul, 2010 yılında İzmir'de kurulmuş, sektörde güvenilir hizmet anlayışıyla 
              çalışan bir gayrimenkul danışmanlık firmasıdır. Kurulduğumuz günden bu yana müşterilerimizin 
              ihtiyaçlarını en iyi şekilde anlayarak, onlara en uygun çözümleri sunmayı hedefledik.
            </p>
            <p className="text-gray-600 dark:text-gray-300">
              Deneyimli ekibimiz ve sektördeki uzmanlığımızla, gayrimenkul alım, satım ve kiralama 
              süreçlerinde müşterilerimize güvenilir bir yol arkadaşı olmaya devam ediyoruz. Müşteri 
              memnuniyetini her zaman ön planda tutarak, şeffaf ve dürüst iş anlayışımızla sektörde 
              fark yaratıyoruz.
            </p>
          </div>
          <div className="relative aspect-video rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-700">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="p-6 text-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 mx-auto mb-3 text-gray-400">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" />
                </svg>
                <p className="text-gray-500">Ofis binamız görseli</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Değerlerimiz Bölümü */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-8">Değerlerimiz</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 transition-transform hover:scale-105">
            <div className="bg-blue-100 dark:bg-blue-900 rounded-full p-3 w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-blue-600 dark:text-blue-400">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white text-center mb-2">Güvenilirlik</h3>
            <p className="text-gray-600 dark:text-gray-300 text-center">
              Müşterilerimize her zaman doğru ve şeffaf bilgi vererek güven temelli ilişkiler kuruyoruz.
            </p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 transition-transform hover:scale-105">
            <div className="bg-blue-100 dark:bg-blue-900 rounded-full p-3 w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-blue-600 dark:text-blue-400">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0012 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.01.143 2.01.317 3 .52m-3-.52l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.988 5.988 0 01-2.031.352 5.988 5.988 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L18.75 4.971zm-16.5.52c.99-.203 1.99-.377 3-.52m0 0l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.989 5.989 0 01-2.031.352 5.989 5.989 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L5.25 4.971z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white text-center mb-2">Adil Yaklaşım</h3>
            <p className="text-gray-600 dark:text-gray-300 text-center">
              Her müşterimize eşit ve adil davranarak, taraflar arasında dengeli ilişkiler kuruyoruz.
            </p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 transition-transform hover:scale-105">
            <div className="bg-blue-100 dark:bg-blue-900 rounded-full p-3 w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-blue-600 dark:text-blue-400">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white text-center mb-2">Müşteri Odaklılık</h3>
            <p className="text-gray-600 dark:text-gray-300 text-center">
              Müşterilerimizin beklentilerini anlamak ve en iyi çözümü sunmak için özenle çalışıyoruz.
            </p>
          </div>
        </div>
      </div>

      {/* Ekibimiz Bölümü */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-8 mb-16">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">Ekibimiz</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className="text-center">
              <div className="relative w-32 h-32 mx-auto rounded-full overflow-hidden mb-4 bg-gray-200 dark:bg-gray-700">
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 text-gray-400">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                {item === 1 ? "Ahmet Yılmaz" : item === 2 ? "Ayşe Kaya" : item === 3 ? "Mehmet Demir" : "Zeynep Çelik"}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                {item === 1 ? "Genel Müdür" : item === 2 ? "Satış Direktörü" : item === 3 ? "Pazarlama Uzmanı" : "Müşteri İlişkileri"}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Rakamlarla Biz Bölümü */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-8">Rakamlarla Biz</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 text-center">
            <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">13+</div>
            <p className="text-gray-600 dark:text-gray-300">Yıllık Deneyim</p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 text-center">
            <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">1500+</div>
            <p className="text-gray-600 dark:text-gray-300">Satılan Mülk</p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 text-center">
            <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">2200+</div>
            <p className="text-gray-600 dark:text-gray-300">Kiralanan Mülk</p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 text-center">
            <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">3000+</div>
            <p className="text-gray-600 dark:text-gray-300">Memnun Müşteri</p>
          </div>
        </div>
      </div>

      {/* Vizyon-Misyon Bölümü */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Vizyonumuz</h2>
          <p className="text-gray-600 dark:text-gray-300">
            Gayrimenkul sektöründe öncü ve yenilikçi çözümler sunan, müşteri memnuniyeti ile anılan, 
            şeffaf ve güvenilir bir kuruluş olmak. Türkiye'de ve global pazarda saygın bir gayrimenkul 
            danışmanlık şirketi olma hedefimiz doğrultusunda, sektörün standartlarını yükseltmeye 
            katkıda bulunmak istiyoruz.
          </p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Misyonumuz</h2>
          <p className="text-gray-600 dark:text-gray-300">
            Müşterilerimize gayrimenkul alım, satım ve kiralama süreçlerinde doğru bilgiler vererek, 
            onların ihtiyaçlarına en uygun gayrimenkulleri bulmalarını sağlamak. Uzman kadromuzla, 
            gayrimenkul danışmanlığı sürecinde müşterilerimize güvenilir, şeffaf ve kaliteli hizmet 
            vermek temel misyonumuzdur.
          </p>
        </div>
      </div>
    </div>
  );
} 