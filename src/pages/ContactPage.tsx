import React, { useState } from 'react'
import TabContainer from '../components/layout/TabContainer'
import SEOHead from '../components/shared/SEOHead'
import Alert from '../components/shared/Alert'
import Card from '../components/shared/Card'

const ContactPage: React.FC = () => {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    // Netlify handles the actual submission via HTML attributes, 
    // but we can prevent default to show a success message if we want to handle it via AJAX.
    // However, for a simple implementation, we can let it redirect to a generic success page 
    // or use AJAX. Let's stick to a solid HTML form that Netlify's crawler will pick up.
    // To show a success message without page reload, we can use fetch.
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(formData as any).toString(),
    })
      .then(() => setSubmitted(true))
      .catch((error) => alert(error))
  }

  return (
    <TabContainer title="Kontakt" subtitle="Masz propozycje ulepszenia strony lub współpracy?">
      <SEOHead 
        title="Kontakt | Kalkulator Kredytowy"
        description="Skontaktuj się z nami w sprawie kalkulatora kredytowego. Wyślij wiadomość przez formularz kontaktowy."
      />
      <div className="max-w-2xl mx-auto">
        {submitted ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-6">✅</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Wiadomość wysłana!</h2>
            <p className="text-gray-600 mb-8">Dziękujemy za kontakt. Odpowiemy tak szybko, jak to możliwe.</p>
            <button 
              onClick={() => setSubmitted(false)}
              className="text-blue-600 font-semibold hover:underline"
            >
              Wyślij kolejną wiadomość
            </button>
          </div>
        ) : (
          <Card>
            <form 
              name="contact" 
              method="POST" 
              data-netlify="true" 
              netlify-honeypot="bot-field"
              onSubmit={handleSubmit}
              className="space-y-6"
            >
              <input type="hidden" name="form-name" value="contact" />
              <p className="hidden">
                <label>Don’t fill this out if you’re human: <input name="bot-field" /></label>
              </p>

              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Imię / Nazwa
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  placeholder="Twoje imię..."
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-50 focus:border-blue-500 outline-none transition-all"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Adres e-mail
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  placeholder="twoj@email.pl"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-50 focus:border-blue-500 outline-none transition-all"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                   Treść wiadomości
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  placeholder="W czym możemy pomóc?"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-50 focus:border-blue-500 outline-none transition-all"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20"
              >
                Wyślij wiadomość
              </button>
              
              <p className="text-xs text-center text-gray-400 mt-4">
                Twoje dane są bezpieczne i służą wyłącznie do udzielenia odpowiedzi na zapytanie.
              </p>
            </form>
          </Card>
        )}
        
        <div className="mt-12">
          <Alert type="info" icon="💡">
            <p className="text-sm">
              Znalazłeś błąd w wyliczeniach? A może masz pomysł na nową funkcję? 
              Napisz do nas – każdą wiadomość czytamy osobiście.
            </p>
          </Alert>
        </div>
      </div>
    </TabContainer>
  )
}

export default ContactPage
