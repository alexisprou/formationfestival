import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Accueil from './pages/Accueil';
import Billeterie from './pages/Billeterie';
import Carte from './pages/Carte';
import Concerts from './pages/Concerts';
import Faq from './pages/Faq';
import Partenaires from './pages/Partenaires'
import Programme from './pages/Programme';
import Reseaux from './pages/Reseauxsociaux';
import Entree from './pages/Entree';
import { Scene1, Scene2 , Scene3 , Scene4 , Scene5}  from './pages/Scenes';
import { Stand1, Stand2} from './pages/Stands';


export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Accueil />} />
        <Route path="billeterie" element={<Billeterie />} />
        <Route path="carte" element={<Carte />} />
        <Route path="concerts" element={<Concerts />} />
        <Route path="faq" element={<Faq />} />
        <Route path="partenaires" element={<Partenaires />} />
        <Route path="programme" element={<Programme />} />
        <Route path="reseaux" element={<Reseaux />} />
        <Route path="entree" element={<Entree />} />
        <Route path="scene/1" element={<Scene1 />} />
        <Route path="scene/2" element={<Scene2 />} />
        <Route path="scene/3" element={<Scene3 />} />
        <Route path="scene/4" element={<Scene4 />} />
        <Route path="scene/5" element={<Scene5 />} />
        <Route path="stand/1" element={<Stand1 />} />
        <Route path="stand/2" element={<Stand2 />} />
      </Routes>
    </>
  );
}
