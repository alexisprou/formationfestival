import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/Articles.css';
import he from 'he';


const ArticleList = () => {
  // Stock les articles depuis l'api de Wordpress
  const [articles, setArticles] = useState([]);

  // filtres sélectionnés pour les jours (vendredi,samedi,dimanche),horaires, types(animations, concerts) et lieux
  const [selectedDays, setSelectedDays] = useState([]);
  const [selectedHoraires, setSelectedHoraires] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedLieux, setSelectedLieux] = useState([]);

  // UseEffect pour effectuer une requête à l'api WordPress pour le rendu initial
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        // Requête GET pour obtenir les articles depuis l'API WordPress
        const response = await axios.get('http://site-formation.local/wp-json/wp/v2/posts?per_page=100');
        
        // Met a jours le state Articles  
        setArticles(response.data);
      } catch (error) {
        // Affiche une erreur en cas d'échec
        console.error('Error fetching articles:', error);
      }
    };

    // Appel la fonction fetchArticles au chargement
    fetchArticles();
  }, []);

  // ******************************************************************************************* Filtres

  // Fonction pour mettre à jour les filtres de jours
  const updateDaysCheckboxes = (option) => {
    setSelectedDays((prevSelectedDays) => {
      // Vérifier si l'option est déjà sélectionnée
      if (prevSelectedDays.includes(option)) {
        // Décocher si déjà coché
        return prevSelectedDays.filter((day) => day !== option);
      } else {
        // Cocher et décocher les autres jours
        return [option];
      }
    });
  };

  // Fonction pour mettre à jour les filtres de types
  const updateTypesCheckboxes = (option) => {
    setSelectedTypes((prevSelectedTypes) => {
      // Vérifier si l'option est Animations ou Concerts
      const isAnimationsOrConcerts = ['14', '15'].includes(option);

      // Vérifier si l'option est déjà sélectionnée
      if (prevSelectedTypes.includes(option)) {
        // Décocher si déjà coché
        return prevSelectedTypes.filter((type) => type !== option);
      } else {
        // Cocher et décocher l'autre type si nécessaire
        return isAnimationsOrConcerts ? [option] : ['14', '15'];
      }
    });
  };

  // Fonction pour mettre à jour les filtres d'horaires
  const updateHorairesCheckboxes = (option) => {
    setSelectedHoraires((prevSelectedHoraires) => {
      // Vérifier si l'option est déjà sélectionnée
      if (prevSelectedHoraires.includes(option)) {
        // Décocher si déjà coché
        return prevSelectedHoraires.filter((horaire) => horaire !== option);
      } else {
        // Cocher et décocher les autres horaires
        return [option];
      }
    });
  };

  // Fonction pour mettre à jour les filtres de lieux
  const updateLieuxCheckboxes = (option) => {
    setSelectedLieux((prevSelectedLieux) => {
      // Vérifier si l'option est déjà sélectionnée
      if (prevSelectedLieux.includes(option)) {
        // Décocher si déjà coché
        return prevSelectedLieux.filter((lieu) => lieu !== option);
      } else {
        // Cocher et décocher les autres lieux
        return [option];
      }
    });
  };

  // Filtre les articles en fonction des filtres sélectionnés
  const filteredArticles = articles.filter((article) => {
    // Vérifie si le jour de l'article correspond aux jours sélectionnés
    const isDayMatch = selectedDays.length === 0 || selectedDays.some((day) => article.categories.includes(parseInt(day, 10)));
    
    // Vérifie si le type de l'article correspond aux types sélectionnés
    const isTypeMatch = selectedTypes.length === 0 || selectedTypes.some((type) => article.categories.includes(parseInt(type, 10)));
    
    // Vérifie si l'horaire de l'article correspond aux horaires sélectionnés
    const isHoraireMatch = selectedHoraires.length === 0 || selectedHoraires.some((horaire) => article.categories.includes(parseInt(horaire, 10)));
    
    // Vérifie si le lieu de l'article correspond aux lieux sélectionnés
    const isLieuMatch = selectedLieux.length === 0 || selectedLieux.some((lieu) => article.categories.includes(parseInt(lieu, 10)));

    // Retourne true si l'article correspond à tous les filtres sélectionnés
    return isDayMatch && isTypeMatch && isHoraireMatch && isLieuMatch;
  });

  // ********************************************************************************* Section de filtres

  // Rendu du composant
  return (
    <div>
      <div className='filtre-groupe'>
        <div className="filtre-jours">
          <h3>Dates</h3>
          <form id="filtre-jours">
            <label>
              <input
                type="checkbox"
                name="choix"
                value="21"
                checked={selectedDays.includes('21')}
                onChange={() => updateDaysCheckboxes('21')}
              /> Vendredi
            </label>
            <label>
              <input
                type="checkbox"
                name="choix"
                value="6"
                checked={selectedDays.includes('6')}
                onChange={() => updateDaysCheckboxes('6')}
              /> Samedi
            </label>
            <label>
              <input
                type="checkbox"
                name="choix"
                value="16"
                checked={selectedDays.includes('16')}
                onChange={() => updateDaysCheckboxes('16')}
              /> Dimanche
            </label>
          </form>
        </div>
        

        <div className="filtre-horraires">
          <h3>Horaires</h3>
          <form id="filtre-horraires">
            <label>
              <input
                type="checkbox"
                name="choix"
                value="9"
                checked={selectedHoraires.includes('9')}
                onChange={() => updateHorairesCheckboxes('9')}
              /> 10 Heures
            </label>
            <label>
              <input
                type="checkbox"
                name="choix"
                value="11"
                checked={selectedHoraires.includes('11')}
                onChange={() => updateHorairesCheckboxes('11')}
              /> 12 Heures
            </label>
            <label>
              <input
                type="checkbox"
                name="choix"
                value="13"
                checked={selectedHoraires.includes('13')}
                onChange={() => updateHorairesCheckboxes('13')}
              /> 14 Heures
            </label>
            <label>
              <input
                type="checkbox"
                name="choix"
                value="24"
                checked={selectedHoraires.includes('24')}
                onChange={() => updateHorairesCheckboxes('24')}
              /> 16 Heures
            </label>
            <label>
              <input
                type="checkbox"
                name="choix"
                value="9"
                checked={selectedHoraires.includes('11')}
                onChange={() => updateHorairesCheckboxes('11')}
              /> 12 Heures
            </label>
            <label>
              <input
                type="checkbox"
                name="choix"
                value="28"
                checked={selectedHoraires.includes('28')}
                onChange={() => updateHorairesCheckboxes('28')}
              /> 20 Heures
            </label>
            <label>
              <input
                type="checkbox"
                name="choix"
                value="30"
                checked={selectedHoraires.includes('30')}
                onChange={() => updateHorairesCheckboxes('30')}
              /> 22 Heures
            </label>
          </form>
        </div>


        <div className="filtre-types">
          <h3>Types</h3>
          <form id="filtre-types">
            <label>
              <input
                type="checkbox"
                name="choix"
                value="14"
                checked={selectedTypes.includes('14')}
                onChange={() => updateTypesCheckboxes('14')}
              /> Animations
            </label>
            <label>
              <input
                type="checkbox"
                name="choix"
                value="15"
                checked={selectedTypes.includes('15')}
                onChange={() => updateTypesCheckboxes('15')}
              /> Concerts
            </label>
          </form>
        </div>

        <div className="filtre-lieux">
          <h3>Lieux</h3>
          <form id="filtre-lieux">
            <label>
              <input
                type="checkbox"
                name="choix"
                value="36"
                checked={selectedLieux.includes('36')}
                onChange={() => updateLieuxCheckboxes('36')}
              /> Scène principale
            </label>
            <label>
              <input
                type="checkbox"
                name="choix"
                value="35"
                checked={selectedLieux.includes('35')}
                onChange={() => updateLieuxCheckboxes('35')}
              /> Scène 2
            </label>
            <label>
              <input
                type="checkbox"
                name="choix"
                value="34"
                checked={selectedLieux.includes('34')}
                onChange={() => updateLieuxCheckboxes('34')}
              /> Scène 3
            </label>
            <label>
              <input
                type="checkbox"
                name="choix"
                value="33"
                checked={selectedLieux.includes('33')}
                onChange={() => updateLieuxCheckboxes('33')}
              /> Scène 4
            </label>
            <label>
              <input
                type="checkbox"
                name="choix"
                value="32"
                checked={selectedLieux.includes('32')}
                onChange={() => updateLieuxCheckboxes('32')}
              /> Scène 5
            </label>
            <label>
              <input
                type="checkbox"
                name="choix"
                value="38"
                checked={selectedLieux.includes('38')}
                onChange={() => updateLieuxCheckboxes('38')}
              /> Plage
            </label>
            <label>
              <input
                type="checkbox"
                name="choix"
                value="37"
                checked={selectedLieux.includes('37')}
                onChange={() => updateLieuxCheckboxes('37')}
              /> Piscine
            </label>
          </form>
        </div>
      </div>

      {/* Section d'affichage des articles filtrés */}
      <div>
        <h2>Liste des Articles</h2>
        <ul className="article-list">
          {/* Mapping à travers les articles filtrés pour les afficher */}
          {filteredArticles.map((article) => (
            <li key={article.id} className="article-item">
              <h3><a href={article.link}>{he.decode(article.title.rendered)}</a></h3>
              {article.content && (
                <div dangerouslySetInnerHTML={{ __html: article.content.rendered }} />
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ArticleList;
