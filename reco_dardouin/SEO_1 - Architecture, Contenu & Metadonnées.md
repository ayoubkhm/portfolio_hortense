# SEO — Partie 1 : Architecture, Topical Authority, Contenu On-Page, Métadonnées

## Légende des annotations

**Types de site :** ⭐ Tous | 🏢 Vitrine | 🛍️ E-commerce | ✍️ Blog/Éditorial | 📍 Local (complément)

**Priorités :** P0 Nécessaire | P1 Base | P2 Amélioré | P3 Performant | PX Contextuel (effort élevé, gain potentiellement fort selon le projet)

## Architecture du site

### Arborescence

- Limiter la profondeur de clic à 3 niveaux maximum depuis la page d'accueil (accueil > catégorie > page finale). Chaque page stratégique doit être accessible en 3 clics ou moins | ⭐ P0 |
- Organiser les pages en silos thématiques : chaque silo regroupe un univers sémantique cohérent (ex : un service, une catégorie produit, un sujet éditorial). Les pages d'un silo se lient entre elles en priorité | ⭐ P1 |
- Créer une page pilier (hub) par silo, servant de point d'entrée et de distribution du PageRank vers les pages enfants | ⭐ P1 |
- Éviter les structures plates (toutes les pages au même niveau) et les structures trop profondes (plus de 4 niveaux) | ⭐ P0 |
- Prévoir une page dédiée par intention de recherche distincte. Ne jamais regrouper deux intentions différentes sur une même page | ⭐ P0 |
- [Webflow] Structurer l'arborescence via les dossiers de pages (Page Folders) pour les pages statiques et via les CMS Collections pour les contenus dynamiques (articles, produits, projets). Chaque Collection génère automatiquement des URL enfants sous le slug de la Collection | ⭐ P0 |
- [Webflow] Limites CMS à intégrer dès la conception de l'arborescence : 20 collections sur le plan CMS, 40 sur le plan Business (dont 3 réservées si E-Commerce activé sur les deux plans) ; 2 000 items sur le plan CMS, 10 000 items de base sur le plan Business (extensible à 20 000 via add-ons payants) ; 10 champs Reference et Multi-Reference combinés par collection maximum (limite relevée de 5 à 10 pour tous les plans lors de la mise à jour Webflow de juillet 2024). Dépasser ces seuils en cours de projet impose une refonte coûteuse de l'architecture | ⭐ P0 |
- [Webflow] Les relations many-to-many ne sont pas supportées nativement. Le champ Multi-Reference fonctionne en one-to-many. Simuler un many-to-many nécessite une collection pivot intermédiaire avec deux champs Reference, ce qui consomme 2 des 10 champs Reference disponibles par collection | ⭐ P1 |

### Structure d'URL

- Utiliser des URL courtes, lisibles, en minuscules, sans caractères spéciaux ni accents | ⭐ P0 |
- Inclure le mot-clé principal dans le slug de chaque page | ⭐ P0 |
- Séparer les mots par des tirets (-). Ne jamais utiliser d'underscores (_) ni d'espaces | ⭐ P0 |
- Refléter la hiérarchie du site dans l'URL (ex : /services/branding/ plutôt que /page-branding/) | ⭐ P1 |
- Supprimer les mots vides (le, la, de, et, un) du slug sauf si leur retrait nuit à la compréhension | ⭐ P1 |
- Attribuer un slug définitif avant publication. Tout changement ultérieur impose une redirection 301 | ⭐ P0 |
- Définir le slug de chaque page indépendamment de la balise title et du H1 : cela permet de modifier les éléments de contenu (title, H1, libellé de navigation) sans altérer l'URL et perdre l'historique de popularité de la page | ⭐ P1 |
- Définir dès la création du site une convention cohérente sur le trailing slash (avec ou sans `/` en fin d'URL) et l'appliquer uniformément à tous les liens internes, sitemaps et canonicals : Google traite les deux variantes comme des URLs distinctes, et l'incohérence génère du contenu dupliqué et un gaspillage de budget de crawl | ⭐ P1 |
- [Webflow] Le slug est configurable dans Page Settings > URL Slug pour les pages statiques, et dans le champ Slug de chaque item CMS pour les pages dynamiques. Webflow génère automatiquement le slug depuis le titre ; toujours le vérifier et le raccourcir manuellement. Le déconnecter du nom de page dès la création, avant la première publication. Webflow génère les URLs sans trailing slash ; s'assurer que les liens internes et blocs de maillage reproduisent ce format sans variation | ⭐ P0 |
- [Webflow] Les collections CMS génèrent des URLs à un seul niveau de profondeur : `/collection-slug/item-slug`. Il est impossible d'obtenir des structures comme `/blog/categorie/article`. Compenser par des Page Folders pour le premier niveau de hiérarchie, des slugs encodant la catégorie, et un maillage interne et des breadcrumbs solides | ⭐ P1 |
- [Webflow] En E-Commerce, les slugs de collection sont réservés et non modifiables : `/products/` pour les produits, `/categories/` pour les catégories. Impossible de les remplacer par `/boutique/` ou tout autre préfixe. Contournement : utiliser une collection CMS classique pour les pages produits avec le slug souhaité, et gérer le panier via un outil tiers (Snipcart, Foxy, CartGenie). Critique pour les sites francophones ou multilingues | 🛍️ P0 |
- [Webflow] Les produits e-commerce sont limités à 3 groupes d'options (taille, couleur, matière) et 50 combinaisons de variantes maximum par produit. Un produit à 8 couleurs × 7 tailles (56 combinaisons) dépasse ce plafond. Anticiper cette contrainte dès la conception du catalogue : elle est bloquante pour les catalogues mode, textile ou tout produit à forte matrice de variantes. Si le catalogue l'exige, évaluer Shopify plutôt que Webflow E-Commerce | 🛍️ P0 |
- [Webflow] Webflow E-Commerce ne supporte pas le multi-devises natif. La devise est définie au niveau du site et ne peut pas être changée sans remettre tous les produits en brouillon. Bloquant pour tout projet e-commerce ciblant plusieurs marchés avec des devises distinctes. Contournement partiel via des outils tiers (Monto, CartGenie) pour la conversion d'affichage, mais au prix de la perte du panier natif Webflow ou d'une complexité d'intégration significative | 🛍️ P0 |

### Pagination (e-commerce, blog)

- Implémenter la pagination avec des liens <a> HTML crawlables (pas de chargement JavaScript pur) | 🛍️✍️ P0 |
- Chaque page paginée doit porter une balise canonical auto-référente (ne pas pointer toutes les pages paginées vers la page 1) | 🛍️✍️ P1 |
- Fournir un accès direct aux premières et dernières pages de la pagination | 🛍️✍️ P2 |
- [Webflow] La pagination native du CMS génère des liens crawlables. Vérifier que le paramètre ?page=X n'est pas bloqué dans robots.txt | 🛍️✍️ P0 |

### Gestion des filtres à facettes (e-commerce)

- Indexer uniquement les combinaisons de filtres correspondant à un volume de recherche réel (ex : "chaussures running homme") | 🛍️ P2 |
- Bloquer l'indexation des combinaisons sans volume via une balise meta robots noindex ou via canonical vers la page catégorie parente | 🛍️ P2 |
- Éviter la génération d'URL infinies par combinaison de filtres multiples | 🛍️ P1 |
- Privilégier des URL statiques pour les filtres indexables (/chaussures/running/homme/) plutôt que des paramètres dynamiques (?couleur=noir&taille=42) | 🛍️ PX |
- [Webflow] Webflow ne gère pas nativement les filtres à facettes. Utiliser Finsweet CMS Filter ou une solution JavaScript custom. S'assurer que les filtres indexables génèrent des pages CMS statiques dédiées plutôt que du filtrage côté client invisible pour les crawlers | 🛍️ PX |

## Topical Authority

### Clusters de contenu

La logique de clusters s'applique à tous les types de sites, pas uniquement aux blogs. Deux modèles coexistent et peuvent se combiner.

**Modèle 1 : Cluster de pages services (sites vitrines, indépendants, prestataires)**

- Chaque offre ou expertise principale constitue un cluster. La page service principale est le pilier (hub) | 🏢 P1 |
- Les pages satellites sont les sous-services, pages tarifs, FAQ dédiées, pages processus/méthode, portfolios filtrés, études de cas, pages locales rattachées au service | 🏢 P2 |
- Nombre de satellites : 3 à 8 pages par cluster selon l'étendue de l'offre. Un indépendant avec une offre ciblée peut avoir des clusters de 3 à 5 pages | 🏢 P2 |
- Longueur du pilier service : 1 000 à 2 000 mots (pas besoin d'un contenu de 3 000 mots pour un pilier service) | 🏢 P1 |
- Exemple : Photographe mariage > page pilier "Photographe mariage Bordeaux" + satellites "Reportage cérémonie", "Séance couple", "Tarifs mariage", "Portfolio mariages", "FAQ photographe mariage" | 🏢📍 P2 |

**Modèle 2 : Cluster éditorial (blogs, guides, ressources)**

- Un sujet éditorial central constitue le pilier (guide complet, page ressource) | ✍️ P1 |
- Les articles satellites traitent chacun un sous-sujet ou une question spécifique liée au pilier | ✍️ P1 |
- Nombre de satellites : 8 à 15 articles par cluster | ✍️ P2 |
- Longueur du pilier éditorial : 2 000 à 3 000 mots | ✍️ P1 |
- Le cluster éditorial peut renforcer un cluster de services en ciblant les intentions informationnelles qui alimentent le parcours vers la conversion | 🏢✍️ P2 |

**Règles communes aux deux modèles**

- Définir 4 à 6 piliers thématiques maximum pour que le site soit perçu comme expert de sa niche | ⭐ P1 |
- Relier chaque page satellite vers la page pilier ET entre les pages satellites du même cluster via des ancres sémantiquement pertinentes | ⭐ P1 |
- Ne pas lier systématiquement entre clusters différents : le maillage inter-clusters reste ciblé et stratégique (uniquement quand la pertinence sémantique le justifie) | ⭐ P2 |

### Modèle hub & spoke / cocon sémantique

- La page pilier (hub) traite le sujet en largeur et distribue le PageRank vers les pages satellites (spokes) | ⭐ P1 |
- Les pages satellites traitent chacune un aspect précis en profondeur et remontent du PageRank vers le hub | ⭐ P1 |
- Chaque page satellite doit couvrir intégralement son sous-sujet pour éviter le contenu thin. Minimum recommandé : 800 mots pour un article éditorial, 300 à 600 mots pour une page satellite service (à adapter au cas par cas selon l'analyse concurrentielle) | ⭐ P1 |
- Cartographier le cluster avant la rédaction : lister toutes les questions, sous-sujets et angles à couvrir pour garantir l'exhaustivité thématique | ⭐ P1 |

### Couverture thématique

- Identifier toutes les entités, questions (People Also Ask), et sous-sujets liés au pilier via la recherche de mots-clés et l'analyse des SERP | ⭐ P2 |
- Couvrir l'ensemble du spectre d'intentions : informationnelle, navigationnelle, commerciale, transactionnelle | ⭐ P2 |
- Mettre à jour le cluster régulièrement pour intégrer de nouveaux sous-sujets émergents | ⭐ P3 |
- Produire un contenu qui surpasse en profondeur et en complétude les pages concurrentes positionnées en top 5 | ⭐ P3 |

## Contenu on-page

### Balises Hn

- Utiliser une seule balise H1 par page, contenant le mot-clé principal. Longueur : 20 à 70 caractères | ⭐ P0 |
- Maintenir une hiérarchie stricte : H1 > H2 > H3 > H4. Ne jamais sauter un niveau (pas de H1 directement suivi d'un H3) | ⭐ P0 |
- Utiliser les H2 pour les sections principales et les H3 pour les sous-sections. Les H4+ sont réservés aux subdivisions fines | ⭐ P0 |
- Intégrer des variations sémantiques du mot-clé principal et des mots-clés secondaires dans les H2 et H3 | ⭐ P1 |
- Formuler les Hn comme des promesses de contenu claires. Chaque Hn doit annoncer précisément le contenu de la section qui suit (conversion : le lecteur doit vouloir continuer) | ⭐ P1 |
- Éviter la cannibalisation : aucun H1 de page ne doit cibler le même mot-clé principal qu'un autre H1 du site | ⭐ P0 |
- [Webflow] Attribuer les niveaux Hn via le panneau de styles (Typography > Tag) et non uniquement via la taille visuelle. Webflow permet de dissocier le style visuel du tag HTML sémantique | ⭐ P0 |

### Densité et placement des mots-clés

- Placer le mot-clé principal dans les 100 premiers mots du contenu | ⭐ P0 |
- Intégrer le mot-clé principal naturellement 3 à 5 fois pour un contenu de 1 000 mots (pas de ratio fixe, privilégier la fluidité) | ⭐ P0 |
- Utiliser des synonymes, des co-occurrences et des entités sémantiquement liées sur l'ensemble du texte pour renforcer la pertinence thématique | ⭐ P1 |
- Ne jamais forcer un mot-clé au détriment de la lisibilité. Google évalue la naturalité du langage via les modèles NLP (BERT, MUM) | ⭐ P0 |
- Placer les mots-clés secondaires dans les H2/H3, les légendes d'images, les listes et les premières phrases de paragraphes | ⭐ P1 |

### Longueur de contenu par type de page

- **Page d'accueil** : 500 à 1 000 mots. Présenter la proposition de valeur, les services/produits clés, et fournir les liens d'entrée vers les silos (conversion : concentrer le message sur le bénéfice client et les CTA principaux) | ⭐ P0 |
- **Page service/prestation** : 1 000 à 2 000 mots. Couvrir le service en détail : description, bénéfices, processus, résultats, FAQ (conversion : intégrer des preuves sociales et un CTA clair) | 🏢 P0 |
- **Page catégorie (e-commerce)** : 300 à 800 mots de contenu éditorial en introduction et/ou en pied de page, en plus de la grille produits. Cibler le mot-clé catégorie | 🛍️ P1 |
- **Fiche produit** : 300 à 1 000 mots selon la complexité. Description unique, caractéristiques techniques, bénéfices utilisateur, FAQ produit (conversion : réduire les frictions d'achat avec la réassurance et les avis) | 🛍️ P0 |
- **Article de blog** : 1 500 à 3 000 mots pour les sujets piliers, 800 à 1 500 mots pour les articles satellites. Ajuster selon la profondeur nécessaire pour surpasser la concurrence SERP | ✍️ P0 |
- **Page pilier** : 2 000 à 3 000 mots. Couvrir le sujet de manière exhaustive avec renvois vers les pages satellites | ⭐ P1 |

Toutes ces fourchettes sont des repères indicatifs. Les adapter systématiquement au cas par cas selon l'analyse concurrentielle des SERP ciblées : analyser la longueur et la profondeur des pages positionnées en top 5 pour calibrer le volume nécessaire.

### Structure des paragraphes

- Limiter chaque paragraphe à 3 à 4 phrases maximum. Les blocs courts favorisent la lisibilité et la scannabilité | ⭐ P1 |
- Commencer chaque paragraphe par l'information la plus importante (structure pyramide inversée) | ⭐ P1 |
- Alterner texte, sous-titres, listes, visuels et encadrés pour rythmer la page (conversion : maintenir l'engagement et le scroll depth) | ⭐ P1 |
- Utiliser des listes à puces ou numérotées pour les énumérations de 3 items ou plus | ⭐ P1 |
- Insérer un résumé ou un point clé en tête de chaque section longue pour faciliter la scannabilité et la parsabilité par les moteurs | ⭐ P2 |

### Unicité du contenu

- Chaque page doit offrir un contenu unique. Aucune duplication totale ou partielle entre pages du site | ⭐ P0 |
- Pour les pages produits similaires, différencier significativement la description, les bénéfices et l'angle rédactionnel | 🛍️ P0 |
- Ne jamais reprendre le contenu d'un site tiers. Réécrire intégralement toute information sourcée | ⭐ P0 |
- Lors du partage de contenus via flux RSS, plateformes de curation ou partenariats éditoriaux, toujours fournir une version tronquée ou reformulée : republier le texte intégral sur des tiers identifie ces pages comme sources concurrentes et peut diluer la popularité de la version originale | ✍️ P2 |
- Ne pas utiliser `display:none` pour masquer du contenu textuel aux utilisateurs tout en le laissant accessible dans le code HTML : Google rend les feuilles de style CSS et détecte cette pratique de dissimulation de mots-clés, qui peut entraîner une pénalité manuelle pour cloaking. Distinguer cet usage des patterns UX légitimes (accordéons, onglets) où le contenu est fonctionnellement masqué et non dissimulé à des fins SEO | ⭐ P0 |

## Métadonnées

### Meta title

- Longueur : 50 à 60 caractères (environ 580 pixels). Au-delà, troncature probable dans les SERP desktop | ⭐ P0 |
- Placer le mot-clé principal dans les 3 à 5 premiers mots (poids algorithmique décroissant de gauche à droite) | ⭐ P0 |
- Unicité : attribuer un meta title unique à chaque page du site. Aucune duplication | ⭐ P0 |
- Cannibalisation : s'assurer qu'aucune autre page ne cible le même mot-clé principal dans son title | ⭐ P0 |
- Inclure un bénéfice client, un élément différenciant ou un déclencheur émotionnel après le mot-clé (conversion). Exemple : "Plombier Lyon | Intervention en 30 min, 7j/7" | ⭐ P1 |
- Marque : placer le nom de marque en fin de title, séparé par un pipe "|". Omettre si le title atteint déjà 55+ caractères | ⭐ P1 |
- Ne pas suroptimiser : un title naturel et engageant génère un meilleur CTR qu'un empilement de mots-clés | ⭐ P0 |
- Aligner le meta title avec le H1 : les deux doivent partager le même mot-clé principal. Un écart trop important augmente le risque de réécriture par Google | ⭐ P1 |
- [Webflow] Configurable par page dans Page Settings > SEO Settings > Title Tag. Pour les pages CMS, utiliser les champs dynamiques du Collection Template pour générer des titles uniques automatiquement (ex : {Nom du produit} | {Catégorie} | {Marque}) | ⭐ P0 |

### Meta description

- Longueur : 140 à 160 caractères (environ 920 pixels desktop). Sur mobile, viser plutôt 120 à 140 caractères | ⭐ P0 |
- Intégrer le mot-clé principal naturellement (mis en gras par Google dans les SERP quand il correspond à la requête) | ⭐ P0 |
- Rédiger comme un argumentaire de clic : bénéfice principal + preuve ou chiffre + appel à l'action implicite (conversion). Exemple : "Découvrez nos 15 modèles de cuisine sur mesure. Devis gratuit en 24h. Livraison et pose incluses." | ⭐ P1 |
- Unicité : attribuer une meta description unique à chaque page | ⭐ P0 |
- Ne pas dupliquer le contenu du meta title | ⭐ P0 |
- Ne pas utiliser de guillemets doubles (Google tronque la description au guillemet) | ⭐ P1 |
- [Webflow] Configurable dans Page Settings > SEO Settings > Meta Description. Pour les pages CMS, utiliser les champs dynamiques. Webflow AI peut proposer une version ; toujours la retravailler manuellement pour maximiser le CTR | ⭐ P0 |

### Canonical

- Attribuer une balise canonical auto-référente à chaque page indexable | ⭐ P0 |
- En cas de contenu dupliqué ou quasi-dupliqué (ex : variantes de filtres, versions avec paramètres UTM), pointer la canonical vers la page principale | 🛍️ P0 | 🏢✍️ P1 |
- La canonical doit utiliser l'URL absolue avec le protocole HTTPS et le domaine personnalisé | ⭐ P0 |
- [Webflow] Généré automatiquement en auto-référent. Configurable manuellement dans Page Settings > SEO Settings > Canonical URL si nécessaire. Vérifier systématiquement que le domaine personnalisé est utilisé (pas le sous-domaine .webflow.io) | ⭐ P0 |

### Open Graph et Twitter Cards

- Renseigner les balises og:title, og:description, og:image et og:url pour chaque page | ⭐ P1 |
- og:title : peut différer du meta title pour être plus engageant sur les réseaux sociaux (pas de contrainte SEO) | ⭐ P2 |
- og:description : résumé accrocheur du contenu, 100 à 200 caractères | ⭐ P1 |
- og:image : image au format 1200x630 px minimum pour un affichage optimal sur Facebook et LinkedIn. Fichier < 5 Mo | ⭐ P1 |
- Renseigner les balises twitter:card (valeur "summary_large_image" pour la plupart des pages), twitter:title, twitter:description et twitter:image pour X (anciennement Twitter). Le préfixe technique twitter: reste inchangé malgré le renommage de la plateforme. Si les balises og: sont correctement renseignées, X les utilise en fallback automatique, rendant les balises twitter: utiles mais non bloquantes | ⭐ P2 |
- [Webflow] Configurable par page dans Page Settings > Open Graph Settings. Pour les pages CMS, mapper les champs dynamiques (image, titre, description) vers les champs OG dans le Collection Template | ⭐ P1 |

### Meta robots

- Par défaut, laisser les pages stratégiques en index, follow (comportement par défaut si aucune balise n'est spécifiée) | ⭐ P0 |
- Appliquer noindex, follow aux pages sans valeur SEO mais utiles pour la navigation (pages de remerciement, pages utilitaires, résultats de recherche interne, pages de politique de confidentialité si souhaité) | ⭐ P1 |
- Appliquer noindex aux pages de staging, aux pages de test et aux contenus non finalisés | ⭐ P0 |
- Ne jamais appliquer nofollow aux liens internes du site (le nofollow gaspille le PageRank interne) | ⭐ P0 |
- [Webflow] Configurable dans Page Settings > SEO Settings via la case "Exclude this page from search results" (ajoute un noindex). Le staging .webflow.io est automatiquement en noindex par Webflow (vérifier que cette option reste active dans Site Settings) | ⭐ P0 |
