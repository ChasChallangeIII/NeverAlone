import React from 'react'
import ContactForm from '../../components/ContactForm/ContactForm'
import '../../styles/Help.css';

const Help = () => {
  return (
    <main className="help-page">
      <section className="help-section">
        <h1>Behöver du hjälp?</h1>
        <p>Fyll i formuläret till vår support</p>
        <p>Vi ämnar att återkoppla inom 24h.</p>
        <ContactForm />
      </section>
    </main>
  )
}

export default Help
