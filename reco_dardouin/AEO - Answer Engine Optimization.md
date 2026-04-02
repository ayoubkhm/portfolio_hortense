# AEO — Answer Engine Optimization

## Légende des annotations

**Types de site :** ⭐ Tous | 🏢 Vitrine | 🛍️ E-commerce | ✍️ Blog/Éditorial | 📍 Local (complément)

**Priorités :** P0 Nécessaire | P1 Base | P2 Amélioré | P3 Performant | PX Contextuel (effort élevé, gain potentiellement fort selon le projet)

## Types de résultats ciblés

### Featured snippets (position zéro)

- Les featured snippets extraient un passage d'une page unique et l'affichent au-dessus des résultats organiques classiques. Ils existent en 4 formats : paragraphe (réponse textuelle), liste (numérotée ou à puces), tableau, vidéo (avec timestamp) | ⭐ P1 |
- Les featured snippets sont souvent réutilisés par les moteurs IA comme point de départ de leurs réponses. Capturer un featured snippet renforce à la fois la visibilité classique et la visibilité générative | ⭐ P1 |
- Pour être éligible au featured snippet, la page doit déjà se positionner dans le top 10 organique pour la requête ciblée | ⭐ P0 |

### People Also Ask (PAA)

- Les boîtes PAA affichent des questions connexes sous forme de liste déroulante dans les SERP. Chaque réponse est extraite d'une page web avec un lien vers la source | ⭐ P1 |
- Les PAA sont une opportunité de visibilité pour des pages qui ne sont pas en position 1 : Google peut extraire une réponse PAA d'une page positionnée en page 2 | ⭐ P2 |
- Identifier les PAA affichées pour les requêtes cibles et créer du contenu répondant spécifiquement à chacune de ces questions | ⭐ P2 |

### Knowledge panels

- Les knowledge panels apparaissent pour les requêtes de marque et d'entités. Ils sont alimentés par le Knowledge Graph de Google (traité dans le Guide AIO pour le volet technique entités/schema) | ⭐ P2 |

### Voice search results

- Les résultats de recherche vocale s'appuient sur les featured snippets et les réponses directes. L'assistant vocal lit une seule réponse à haute voix : l'objectif est d'être cette réponse unique | ⭐ P2 |
- 76 % des recherches vocales ont une intention locale ("près de moi", "ouvert maintenant", "le plus proche"). La recherche vocale est un canal prioritaire pour le SEO local. Par ailleurs, environ 20 % des recherches sur les applications Google sont effectuées par la voix, toutes intentions confondues | 📍 P2 |

### Rich results

- Les rich results (résultats enrichis) affichent des informations structurées directement dans les SERP : FAQ déroulantes, étapes HowTo, avis étoilés, prix produits, événements. Les types de schema associés sont traités dans le Guide AIO | ⭐ P1 |

## Recherche et priorisation des questions AEO

### Méthodologie de sourcing des questions

- **Google Suggest** : taper le début d'une requête dans Google et noter les suggestions automatiques. Tester avec "comment", "pourquoi", "quel", "combien" + le sujet principal | ⭐ P1 |
- **Chaînes de PAA (PAA mining)** : pour chaque requête cible, noter les 4 à 6 questions PAA affichées. Cliquer sur chaque PAA pour révéler de nouvelles questions connexes. Répéter sur 2 à 3 niveaux de profondeur pour cartographier l'arbre complet des questions autour d'un sujet. Cette méthode produit 20 à 50 questions exploitables par thématique | ⭐ P1 |
- **Outils dédiés** : AlsoAsked, AnswerThePublic, la fonctionnalité "Questions" de Semrush/Ahrefs permettent d'extraire les questions recherchées autour d'un mot-clé à grande échelle | ⭐ P1 |
- **Questions clients directes** : recenser les questions posées par les clients en avant-vente (emails, formulaires de contact, appels). Ce sont les questions à plus fort potentiel de conversion car elles correspondent aux objections et besoins réels | 🏢🛍️ P0 |
- **Recherche interne du site** : si le site dispose d'un moteur de recherche interne, analyser les termes recherchés pour identifier les questions récurrentes | 🛍️ P2 |
- **Forums et communautés sectoriels** : identifier les questions posées sur Reddit, Quora, forums spécialisés dans le secteur. Ces formulations reflètent le langage naturel des utilisateurs | ⭐ P2 |
- **Avis clients et FAQ concurrents** : les avis négatifs contiennent souvent des questions implicites ("je n'ai pas compris comment..."). Les FAQ des concurrents révèlent les questions standard du secteur | ⭐ P2 |

### Priorisation des requêtes

- **Critère 1 : Snippet existant capturable** : prioriser les questions pour lesquelles Google affiche déjà un featured snippet détenu par un site à autorité inférieure ou avec une réponse de qualité moyenne. Ce sont les opportunités les plus rapides à saisir | ⭐ P1 |
- **Critère 2 : Alignement avec le parcours de conversion** : prioriser les questions de phase de considération et de décision ("combien coûte", "X vs Y", "quel [produit] pour [besoin]") par rapport aux questions purement informationnelles génériques (conversion : ces questions attirent un trafic plus qualifié) | 🏢🛍️ P1 |
- **Critère 3 : Volume de recherche** : à potentiel de conversion égal, prioriser les questions à plus fort volume. Mais ne pas ignorer les questions à faible volume si elles sont fortement alignées avec le parcours de conversion | ⭐ P1 |
- **Critère 4 : Faisabilité** : évaluer si le site a l'autorité suffisante pour se positionner en top 10 sur la requête (prérequis pour le featured snippet). Si l'écart d'autorité est trop important, cibler d'abord des questions moins concurrentielles | ⭐ P1 |

## Structure "answer-first"

### Réponse directe en tête de section

- La structure answer-first s'applique aux pages et sections dont l'objectif est de répondre à une requête interrogative (guides, FAQ, tutoriels, comparatifs, pages service avec section "Comment ça marche", articles de blog). Elle ne s'applique pas aux pages transactionnelles (panier, checkout), institutionnelles (mentions légales, CGV) ou de navigation (accueil, catégorie pure). Sur ces pages AEO, placer une réponse concise de 40 à 60 mots en tête de chaque section ciblée. Cette réponse doit être autonome et directement extractible par Google | ⭐ P0 |
- 44 % des citations de l'ensemble des moteurs génératifs (LLMs) proviennent du premier tiers du contenu d'une page (SE Ranking, novembre 2025). Sur les pages ciblant des requêtes questions, le début de page est déterminant pour la citabilité | ⭐ P0 |
- Sur les pages optimisées answer-first, développer après la réponse directe avec le contexte, les détails, les preuves et les nuances. Structure : réponse courte > développement > exemples > sources | ⭐ P1 |
- Sur les pages AEO ciblant une requête question, utiliser des phrases déclaratives claires et éviter les introductions vagues ("Dans cet article, nous allons voir..."). Aller droit à la réponse dès la première phrase | ⭐ P0 |

### Format adapté au type de featured snippet ciblé

- **Snippet paragraphe** : répondre en 40 à 60 mots dans un paragraphe unique, commençant par une définition ou une affirmation factuelle directe | ⭐ P1 |
- **Snippet liste** : utiliser une liste numérotée ou à puces de 3 à 10 items, chaque item faisant moins de 15 mots. Placer un H2 ou H3 sous forme de question juste avant la liste | ⭐ P1 |
- **Snippet tableau** : structurer la comparaison en tableau HTML avec des en-têtes de colonnes clairs (2 à 5 colonnes). Idéal pour les comparatifs "X vs Y" et les grilles de spécifications | 🛍️ P1 | 🏢✍️ P2 |
- **Snippet vidéo** : ajouter des chapitres avec timestamps dans la description YouTube. Google peut extraire un extrait vidéo et l'afficher dans les SERP (lié à la section Video SEO du Guide SEO Partie 2) | ⭐ P2 |
- Identifier le format de snippet actuellement affiché pour chaque requête cible et répliquer ce format dans le contenu optimisé | ⭐ P1 |

### Anticipation des questions de suivi (multi-turn)

- Les moteurs IA gèrent des conversations à plusieurs tours. Un utilisateur qui pose une première question va enchaîner avec des questions de suivi. Sur les pages guides, FAQ et comparatives, le contenu doit anticiper et couvrir cette chaîne de questions | ⭐ P2 |
- Sur les pages ciblant une question principale, identifier les 3 à 5 questions de suivi les plus probables et y répondre dans les sections suivantes. Exemple : "Combien coûte un site Webflow ?" → "Quels sont les coûts mensuels ?" → "Webflow ou WordPress, lequel est moins cher ?" | ⭐ P2 |
- Sur les pages longues ciblant des parcours multi-étapes, structurer comme une progression logique : définition > fonctionnement > coût > comparaison > choix. Cette structure reflète le cheminement naturel de l'utilisateur | ⭐ P1 |

### Optimisation pour les sous-requêtes (query fan-out)

- Les moteurs IA décomposent une question complexe en plusieurs sous-requêtes internes. "Quel est le meilleur CMS pour un e-commerce de bijoux artisanaux ?" génère : "meilleur CMS e-commerce 2026", "CMS adapté petit catalogue", "e-commerce artisanat" | ⭐ P2 |
- S'assurer que le contenu se positionne sur ces sous-requêtes individuelles, pas uniquement sur la question globale. Intégrer les variantes courtes des requêtes comme H2/H3 dans la page | ⭐ P2 |
- Produire des contenus qui couvrent à la fois la question globale ET chaque facette spécifique. Un guide exhaustif qui répond à toutes les sous-requêtes a plus de chances d'être sélectionné comme source qu'une page répondant uniquement à la question principale | ⭐ P2 |

## Balisage des questions

### Utilisation des Hn en format question

- Sur les pages et sections ciblant des requêtes interrogatives, formuler les H2 et H3 sous forme de questions naturelles correspondant aux requêtes réelles des utilisateurs. Exemple : "Combien coûte un site Webflow ?" plutôt que "Tarification". Cette pratique ne s'applique pas aux pages institutionnelles, transactionnelles ou de navigation | ⭐ P1 |
- Sur ces pages, aligner les formulations sur le langage naturel des utilisateurs, pas sur le jargon technique ou marketing. Les utilisateurs posent des questions complètes, pas des mots-clés isolés | ⭐ P1 |
- Sur ces pages, varier les formulations interrogatives : "Comment", "Pourquoi", "Combien", "Quel est", "Quelle est la différence entre". Chaque type de question attire un format de snippet différent | ⭐ P1 |
- Chaque H2/H3 question doit être immédiatement suivi de sa réponse directe (pas d'un autre sous-titre ni d'une introduction) | ⭐ P0 |

### Patterns de formulation efficaces

- Les questions "Comment [action] ?" génèrent des snippets en liste (étapes numérotées) | ⭐ P1 |
- Les questions "Qu'est-ce que [concept] ?" génèrent des snippets en paragraphe (définition) | ⭐ P1 |
- Les questions "[X] vs [Y]" ou "Quel est le meilleur [catégorie] ?" génèrent des snippets en tableau ou en liste | ⭐ P1 |
- Les questions "Combien coûte [service/produit] ?" sont à fort potentiel de conversion. Y répondre avec une fourchette de prix et les facteurs qui influencent le tarif (conversion : la transparence tarifaire réduit la friction et qualifie le prospect) | 🛍️🏢 P1 |

## Schema markup dédié AEO

Les types de schema ci-dessous sont mentionnés pour leur rôle AEO. Les spécifications techniques complètes (structure JSON-LD, propriétés requises/recommandées, implémentation Webflow) sont traitées dans le Guide AIO.

- **FAQPage** : baliser les sections FAQ avec le schema FAQPage pour les rendre éligibles aux rich results FAQ déroulantes dans les SERP. Chaque paire question-réponse correspond au format d'extraction des moteurs IA | ⭐ P1 |
- **HowTo** : baliser les contenus tutoriels et guides étape par étape pour les rendre éligibles aux rich results avec étapes affichées dans les SERP | ✍️ P1 | 🏢🛍️ P2 |
- **QAPage** : baliser les pages structurées en une question unique avec sa réponse détaillée (distinct de FAQPage qui contient plusieurs Q&A) | ⭐ P2 |
- **Speakable** : identifier les sections de contenu optimisées pour la lecture à haute voix par les assistants vocaux. Spécifier les passages de 20 à 30 mots formulés en langage parlé naturel | ⭐ P3 |

## Optimisation voice search

### Formulations conversationnelles

- Rédiger des réponses en langage parlé naturel, comme si on répondait oralement à un interlocuteur. Les requêtes vocales sont formulées en phrases complètes, pas en mots-clés ("quel est le meilleur restaurant italien à Bordeaux" plutôt que "restaurant italien Bordeaux") | ⭐ P2 |
- Cibler les requêtes longue traîne conversationnelles (5 à 10 mots). Les requêtes vocales sont en moyenne 3 à 5 mots plus longues que les requêtes tapées | ⭐ P2 |
- Optimiser la réponse vocale idéale : une phrase unique de 20 à 30 mots répondant directement à la question. Cette phrase doit pouvoir être lue à haute voix de manière fluide | ⭐ P3 |

### Voice search local

- La recherche vocale est fortement orientée local ("près de moi", "ouvert maintenant", "le plus proche"). Optimiser les pages locales et le Google Business Profile pour répondre à ces requêtes vocales (lié au Guide SEO Partie 3, section Local SEO) | 📍 P1 |
- Inclure des réponses aux questions pratiques locales dans le contenu : horaires, adresse, moyens de transport, parking, accessibilité | 📍 P1 |

## Contenu FAQ

### Règles de rédaction

- Rédiger chaque réponse FAQ en commençant par la réponse directe (1 à 2 phrases), suivie du développement si nécessaire. Longueur idéale par réponse : 40 à 80 mots pour le snippet, jusqu'à 200 mots avec le développement | ⭐ P1 |
- Formuler les questions en reprenant les formulations exactes des utilisateurs (issues du sourcing PAA, Google Suggest, questions clients) | ⭐ P1 |
- Éviter les questions trop vagues ("Pourquoi nous choisir ?") au profit de questions spécifiques et recherchées ("Combien coûte une refonte de site Webflow ?") | ⭐ P1 |
- Ne pas répéter la question dans la réponse. Commencer directement par l'information | ⭐ P0 |

### Placement dans la page

- Intégrer une section FAQ en bas de chaque page service, page catégorie et article de blog. La FAQ capte les requêtes longue traîne et fournit des blocs citables aux moteurs IA | ⭐ P1 |
- Les FAQ peuvent également être dispersées dans le contenu (chaque H2/H3 en question avec sa réponse) plutôt que regroupées en fin de page. Les deux approches fonctionnent | ⭐ P2 |
- Limiter la FAQ à 5 à 10 questions par page pour maintenir la pertinence et éviter la dilution thématique | ⭐ P1 |

### Intégration au maillage

- Utiliser les réponses FAQ comme points d'entrée vers les pages approfondies du site. Chaque réponse peut contenir un lien interne vers la page qui traite le sujet en détail | ⭐ P2 |
- Les FAQ des pages services doivent couvrir les questions de la phase de considération (tarifs, processus, délais, garanties) pour alimenter le parcours de conversion (conversion : la FAQ lève les objections et qualifie le prospect) | 🏢🛍️ P1 |

## AEO spécifique e-commerce

### Pages de décision d'achat

- Créer des pages "Best [produit] for [besoin/profil]" structurées en liste avec réponse directe en tête. Ce format est le plus cité par les moteurs IA pour les requêtes d'achat | 🛍️ P1 |
- Créer des pages comparatives "[Produit A] vs [Produit B]" avec un tableau de comparaison structuré (caractéristiques, prix, avantages/inconvénients) et une recommandation claire par profil d'utilisateur | 🛍️ P1 |
- Répondre aux questions de décision produit : "quelle taille choisir pour [produit]", "quel [produit] pour [usage spécifique]", "[produit] convient-il pour [cas d'usage]". Ces questions sont au plus proche de la conversion | 🛍️ P0 |

### Optimisation des fiches produits pour les snippets

- Structurer les fiches produits avec une réponse factuelle en 40 à 60 mots en haut de page (nom du produit, usage principal, caractéristique différenciante, fourchette de prix) | 🛍️ P1 |
- Intégrer une FAQ produit de 3 à 5 questions répondant aux interrogations courantes : compatibilité, dimensions, entretien, garantie, livraison | 🛍️ P1 |
- Les tableaux de spécifications techniques sont facilement extractibles par les moteurs IA. Structurer en HTML avec des en-têtes de colonnes clairs | 🛍️ P1 |
- Intégrer les avis clients qui contiennent des réponses naturelles aux questions fréquentes. Les avis authentiques renforcent la crédibilité de la page pour les moteurs IA | 🛍️ P2 |

## Stratégie zero-click

### Tirer de la valeur sans clic

- Environ 60 % des recherches Google se terminent sans clic (zero-click). Ce chiffre est en augmentation avec les AI Overviews. L'AEO ne vise pas uniquement le clic mais aussi l'exposition de marque | ⭐ P1 |
- Inclure le nom de marque dans les passages susceptibles d'être extraits comme featured snippet. Même sans clic, la marque est vue et mémorisée par l'utilisateur | ⭐ P1 |
- Rédiger des réponses qui créent le besoin d'en savoir plus : fournir la réponse directe mais laisser entrevoir une profondeur supplémentaire accessible uniquement sur le site (conversion : transformer la visibilité zero-click en visite qualifiée) | ⭐ P2 |

### Mesure de l'impact zero-click

- Monitorer dans Google Search Console les requêtes à forte impression mais faible CTR : ce sont des indicateurs de présence en featured snippet ou AI Overview | ⭐ P1 |
- Suivre l'évolution du volume de recherches de marque (branded searches) : une augmentation corrèle avec une exposition accrue via les réponses directes | ⭐ P2 |
- Mesurer les conversions indirectes : utilisateurs qui découvrent la marque via un snippet et reviennent plus tard en recherche directe | ⭐ P3 |

## Spécificités Webflow

- [Webflow] Intégrer les FAQ via des composants Accordion natifs de Webflow ou via des éléments CMS avec un design déroulant. S'assurer que le contenu des FAQ est présent dans le HTML statique (pas chargé uniquement en JavaScript) pour être crawlable par Google. Les interactions Webflow basées sur JavaScript masquent le contenu visuellement mais le laissent présent dans le DOM HTML : il est donc crawlable. Éviter les solutions tierces (embeds JS externes) qui chargent le contenu de manière asynchrone | ⭐ P1 |
- [Webflow] Le schema FAQPage et HowTo doit être implémenté via du custom code (embed ou `<head>`) car Webflow ne génère pas automatiquement ces schemas. Les spécifications d'implémentation sont dans le Guide AIO | ⭐ P1 |
- [Webflow] Pour les pages CMS (articles de blog, produits), utiliser les rich text fields pour structurer le contenu en Q&A avec des Hn en format question. Le contenu en rich text est rendu en HTML statique et est pleinement crawlable | ⭐ P1 |
- [Webflow] Pour les tableaux comparatifs (snippets tableau), utiliser un embed HTML custom ou le composant Table natif de Webflow. S'assurer que le tableau est en HTML pur avec des balises `<table>`, `<th>`, `<td>` et non un layout en div/flexbox | ⭐ P1 |
