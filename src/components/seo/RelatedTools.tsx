import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import Card from '../shared/Card'

const RelatedTools: React.FC = () => {
  const location = useLocation()
  
  const tools = [
    { 
      title: 'Kalkulator Raty', 
      path: '/kalkulator-raty-kredytu/', 
      desc: 'Oblicz miesięczną ratę i koszt całkowity.' 
    },
    { 
      title: 'Zdolność Kredytowa', 
      path: '/zdolnosc-kredytowa/', 
      desc: 'Sprawdź ile możesz pożyczyć od banku.' 
    },
    { 
      title: 'Raty Równe vs Malejące', 
      path: '/raty-rowne-czy-malejace/', 
      desc: 'Porównaj dwa systemy spłat kredytu.' 
    },
    { 
      title: 'Symulacja WIBOR', 
      path: '/symulacja-wibor/', 
      desc: 'Zobacz jak zmiana stóp zmieni Twoją ratę.' 
    },
    { 
      title: 'Pełne FAQ', 
      path: '/faq-kredyt-hipoteczny/', 
      desc: 'Odpowiedzi na 20 kluczowych pytań.' 
    },
  ]

  // Filter out current page
  const filteredTools = tools.filter(tool => tool.path !== location.pathname).slice(0, 4)

  return (
    <section className="mt-12">
      <h3 className="text-xl font-bold text-gray-900 mb-6 px-4">Powiązane narzędzia</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 px-4">
        {filteredTools.map((tool) => (
          <Link key={tool.path} to={tool.path}>
            <Card className="h-full hover:shadow-md transition-shadow cursor-pointer bg-white border-blue-50">
              <h4 className="font-bold text-blue-600 mb-1">{tool.title}</h4>
              <p className="text-xs text-gray-500">{tool.desc}</p>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  )
}

export default RelatedTools
