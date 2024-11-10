import '../css/Partenaires.css'
import React, { useState, useEffect } from 'react';

const Partenaires = () => {
  const [donneesPage, setDonneesPage] = useState(null);

  useEffect(() => {
    const recupererPage = async () => {
      try {
        const reponse = await fetch('http://site-formation.local/wp-json/wp/v2/pages/14');
        if (!reponse.ok) {
          throw new Error('Échec de la récupération de la page');
        }

        const donnees = await reponse.json();
        setDonneesPage(donnees);
      } catch (erreur) {
        console.error(erreur);
      }
    };

    recupererPage();
  }, []);

  if (!donneesPage) {
    return <div>Chargement en cours...</div>;
  }

  return (
    <div>
      <h1>{donneesPage.title.rendered}</h1>
      <div dangerouslySetInnerHTML={{ __html: donneesPage.content.rendered }} />
    </div>
  );
};

export default Partenaires;
