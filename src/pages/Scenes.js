    import React, { useState, useEffect } from 'react';
    import "../css/Scene1.css";

    const Scene1 = () => {
    const [pageData, setPageData] = useState(null);

    useEffect(() => {
        const fetchPage = async () => {
        try {
            const response = await fetch('http://site-formation.local/wp-json/wp/v2/pages/1135');
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

    const Scene2 = () => {
    const [pageData, setPageData] = useState(null);

    useEffect(() => {
        const fetchPage = async () => {
        try {
            const response = await fetch('http://site-formation.local/wp-json/wp/v2/pages/1139');
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

    const Scene3 = () => {
        const [pageData, setPageData] = useState(null);
    
        useEffect(() => {
        const fetchPage = async () => {
            try {
            const response = await fetch('http://site-formation.local/wp-json/wp/v2/pages/1142');
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

    const Scene4 = () => {
        const [pageData, setPageData] = useState(null);
    
        useEffect(() => {
        const fetchPage = async () => {
            try {
            const response = await fetch('http://site-formation.local/wp-json/wp/v2/pages/1144');
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

    const Scene5 = () => {
        const [pageData, setPageData] = useState(null);
    
        useEffect(() => {
        const fetchPage = async () => {
            try {
            const response = await fetch('http://site-formation.local/wp-json/wp/v2/pages/1146');
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
    
    export { Scene1, Scene2 , Scene3 , Scene4 , Scene5};
