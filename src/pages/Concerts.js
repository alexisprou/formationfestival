import React, { useState, useEffect } from 'react';
import '../css/Concerts.css'

const Concerts = () => {
  const [pageData, setPageData] = useState(null);

  useEffect(() => {
    const fetchPage = async () => {
      try {
        const response = await fetch('http://site-formation.local/wp-json/wp/v2/pages/12');
        if (!response.ok) {
          throw new Error('Échec de la récupération de la page');
        }

        const data = await response.json();
        setPageData(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPage();
  }, []);

  if (!pageData) {
    return <div>Chargement en cours...</div>;
  }

  return (
    <div>
      <h1>{pageData.title.rendered}</h1>
      <div dangerouslySetInnerHTML={{ __html: pageData.content.rendered }} />
    </div>
  );
};

export default Concerts;
