import React from 'react';

import '../sass/contact.scss';

function Contact() {
  return (
    <article className='contact_container'>
      <header>
        <h1 className='contact_title'>Kontakt</h1>
      </header>
      <section className='contact_content'>
        <section className='application_sources'>
          <p className='contact_text'>
            API użyte na stronie do pobrania danych dotyczących filmów, seriali,
            osób pochodzą z strony{' '}
            <a
              href='https://www.themoviedb.org/'
              target='_blank'
              rel='noopener noreferrer'
            >
              The Movie Database
            </a>
            .
          </p>
          <p className='contact_subtitle'>Inne elementy użyte na stronie</p>
          <p className='contact_text'>
            Czcionka Open Sans z{' '}
            <a
              href='https://fonts.google.com/'
              target='_blank'
              rel='noopener noreferrer'
            >
              Google Fonts
            </a>
            .
          </p>
          <p className='contact_text'>
            Ikony z{' '}
            <a
              href='https://fontawesome.com/'
              target='_blank'
              rel='noopener noreferrer'
            >
              Font Awesome
            </a>
            .
          </p>
        </section>
        <section className='application_creator'>
          <p className='contact_text'>
            Aplikacja stworzona przez Marta Zaorska.
          </p>
          <p className='contact_subtitle'>
            Jeśli chcesz się ze mną skontaktować lub zobaczyć moje inne prace
          </p>
          <p className='contact_text'>marta.zaorska2@gmail.com</p>
          <p className='contact_text socials'>
            <a
              href='https://github.com/martazaorska'
              target='_blank'
              rel='noopener noreferrer'
            >
              <i className='fab fa-github' />
            </a>
            <a
              href='https://martazaorska.github.io/portfolio/'
              target='_blank'
              rel='noopener noreferrer'
            >
              <i className='fas fa-home' />
            </a>
            <a
              href='https://www.facebook.com/marta.zaorska.31'
              target='_blank'
              rel='noopener noreferrer'
            >
              <i className='fab fa-facebook' />
            </a>
          </p>
        </section>
      </section>
      <footer className='contact_footer'>
        <p className='contact_copyright'>
          &copy; Marta Zaorska {new Date().getFullYear()}
        </p>
      </footer>
    </article>
  );
}

export default Contact;
