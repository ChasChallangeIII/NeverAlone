import { useState } from 'react';
import './ContactForm.css';

const ContactForm = () => {
    const [submitted, setSubmitted] = useState(false);
    const [formData, setFormData] = useState({
    email: '',
    phone: '',
    message: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        setSubmitted(true);
    };

    return (
            <div className="contact-form-wrapper">
            <div className="contact-form">
                <h2 className="contact-form__title">Kontakta oss</h2>
                {submitted ? (
                <p className="contact-form__success-message">Tack för ditt meddelande!</p>
                ) : (
                <form onSubmit={handleSubmit} className="contact-form__form">
                    <label className="contact-form__label">
                    E-post:
                    <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="din@mail.com"
                        className="contact-form__input"
                    />
                    </label>
                    <label className="contact-form__label">
                    Telefon:
                    <input
                        type="tel"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="070-123 45 67"
                        className="contact-form__input"
                    />
                    </label>
                    <label className="contact-form__label">
                    Meddelande:
                    <textarea
                        name="message"
                        required
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Skriv ditt meddelande här..."
                        className="contact-form__textarea"
                    />
                    </label>
                    <button type="submit" className="contact-form__button">Skicka</button>
                </form>
                )}
            </div>
            </div>
        );
    }
export default ContactForm;
