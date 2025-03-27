"use client";

import { useState } from "react";
import Head from "next/head";

export default function IletisimPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Burada gerçek bir form gönderme işlemi yapılabilir (email servisi, api çağrısı vb)
    // Şimdilik sahte bir işlem olarak 1 saniye bekletiyoruz
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: ""
      });
      
      // 5 saniye sonra başarı mesajını kaldır
      setTimeout(() => {
        setSubmitted(false);
      }, 5000);
    }, 1000);
  };

  return (
    <div className="container mx-auto py-12 px-4">
      <Head>
        <title>İletişim - Unison Gayrimenkul</title>
        <meta name="description" content="Unison Gayrimenkul ile iletişime geçin. Adresimiz: MERDİVENKÖY MAH. DİKYOL SK. B Blok No:2 İç Kapı:179, Kadıköy/İstanbul" />
        
        {/* Schema.org yapılandırılmış veri */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "RealEstateAgent",
              "name": "Unison Gayrimenkul",
              "image": "https://unisongayrimenkul.com/images/logo.png",
              "url": "https://unisongayrimenkul.com",
              "telephone": "+902161234567",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "MERDİVENKÖY MAH. DİKYOL SK. B Blok No:2 İç Kapı:179",
                "addressLocality": "Kadıköy",
                "addressRegion": "İstanbul",
                "postalCode": "34000",
                "addressCountry": "TR"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": "40.981544",
                "longitude": "29.043018"
              },
              "openingHoursSpecification": [
                {
                  "@type": "OpeningHoursSpecification",
                  "dayOfWeek": [
                    "Monday",
                    "Tuesday",
                    "Wednesday",
                    "Thursday",
                    "Friday"
                  ],
                  "opens": "09:00",
                  "closes": "18:00"
                }
              ]
            })
          }}
        />
      </Head>

      {/* Başlık Bölümü */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">İletişim</h1>
        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Sorularınız için bize ulaşabilir veya ofisimizi ziyaret edebilirsiniz.
        </p>
      </div>

      {/* Ana İçerik - Form ve İletişim Bilgileri */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
        {/* İletişim Formu */}
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 md:p-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Bize Mesaj Gönderin</h2>
            
            {submitted ? (
              <div className="bg-green-100 dark:bg-green-900 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-200 rounded-lg p-4 mb-6">
                <p className="text-center">Mesajınız başarıyla gönderildi. En kısa sürede size dönüş yapacağız.</p>
              </div>
            ) : null}
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Adınız Soyadınız
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    E-posta Adresiniz
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    required
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Telefon Numaranız
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Konu
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    required
                  >
                    <option value="">Lütfen Seçin</option>
                    <option value="Genel Bilgi">Genel Bilgi</option>
                    <option value="Satış">Satış</option>
                    <option value="Kiralama">Kiralama</option>
                    <option value="Değerleme">Değerleme</option>
                    <option value="İş Birliği">İş Birliği</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Mesajınız
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  required
                ></textarea>
              </div>
              
              <div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition-colors disabled:opacity-50 flex items-center justify-center w-full md:w-auto"
                >
                  {isSubmitting ? (
                    <>
                      <span className="animate-spin inline-block mr-2 w-4 h-4 border-t-2 border-white rounded-full"></span>
                      Gönderiliyor...
                    </>
                  ) : "Mesajı Gönder"}
                </button>
              </div>
            </form>
          </div>
        </div>
        
        {/* İletişim Bilgileri */}
        <div>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 md:p-8 mb-8">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">İletişim Bilgilerimiz</h2>
            
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="bg-blue-100 dark:bg-blue-900 rounded-full p-2 mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-blue-600 dark:text-blue-400">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 dark:text-white">Adres</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    MERDİVENKÖY MAH. DİKYOL SK.<br />
                    B Blok No:2 İç Kapı:179<br />
                    Kadıköy/İstanbul
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-blue-100 dark:bg-blue-900 rounded-full p-2 mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-blue-600 dark:text-blue-400">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 dark:text-white">Telefon</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    İletişim için form doldurunuz
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-blue-100 dark:bg-blue-900 rounded-full p-2 mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-blue-600 dark:text-blue-400">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 dark:text-white">E-posta</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    İletişim için form doldurunuz
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 md:p-8">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Çalışma Saatlerimiz</h2>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-300">Pazartesi - Cuma</span>
                <span className="font-medium text-gray-900 dark:text-white">09:00 - 18:00</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-300">Cumartesi</span>
                <span className="font-medium text-gray-900 dark:text-white">10:00 - 14:00</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-300">Pazar</span>
                <span className="font-medium text-gray-900 dark:text-white">Kapalı</span>
              </div>
            </div>
            
            <div className="mt-8">
              <h3 className="font-semibold text-gray-800 dark:text-white mb-2">Sosyal Medya</h3>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  <span className="sr-only">Facebook</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"></path>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  <span className="sr-only">Instagram</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.059 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"></path>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  <span className="sr-only">Twitter</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  <span className="sr-only">LinkedIn</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"></path>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Google Harita */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden mb-16">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white p-6">Konum</h2>
        <div className="aspect-w-16 aspect-h-9 h-[450px]">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3011.605335133439!2d29.0770247!3d40.9860953!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cab85dbb5bb09d%3A0x73d5d33facc7c986!2zTWVyZGl2ZW5rw7Z5LCBEaWt5b2wgU2suLCAzNDczMiBLYWTEsWvDtnkvxLBzdGFuYnVs!5e0!3m2!1str!2str!4v1711294354071!5m2!1str!2str" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full h-full"
          ></iframe>
        </div>
      </div>

      {/* S.S.S. */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 md:p-8 mb-16">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Sık Sorulan Sorular</h2>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Gayrimenkul değerleme hizmeti veriyor musunuz?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Evet, profesyonel değerleme uzmanlarımız ile gayrimenkulünüzün güncel piyasa değerini belirleyebiliyoruz. Detaylı bilgi için bizimle iletişime geçebilirsiniz.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Satış sürecinde hangi hizmetleri sağlıyorsunuz?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Gayrimenkulünüzün pazarlanması, potansiyel alıcıların bulunması, görüşmelerin düzenlenmesi, fiyat müzakereleri ve tüm yasal işlemlerin takibi konusunda kapsamlı hizmet sunuyoruz.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Devremülk nedir?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Devremülk, bir tatil tesisinin belirli bir süre (genellikle bir veya iki hafta) için kullanım hakkının satın alınmasıdır. Bu süre her yıl aynı dönemde tekrarlanır ve tapu ile güvence altına alınır.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 