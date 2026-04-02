# SEO — Partie 2 : Images et Médias, Video SEO, Maillage Interne, SEO Technique

## Légende des annotations

**Types de site :** ⭐ Tous | 🏢 Vitrine | 🛍️ E-commerce | ✍️ Blog/Éditorial | 📍 Local (complément)

**Priorités :** P0 Nécessaire | P1 Base | P2 Amélioré | P3 Performant | PX Contextuel (effort élevé, gain potentiellement fort selon le projet)

## Images et médias

### Formats et compression

- Privilégier le format WebP pour toutes les images du site. WebP offre une compression 25 à 34 % supérieure au JPEG et 26 % supérieure au PNG à qualité visuelle équivalente | ⭐ P0 |
- Utiliser AVIF pour les images lourdes (hero images, visuels pleine largeur) quand la compatibilité navigateur est assurée (environ 93 % de couverture en 2025). Prévoir un fallback WebP ou JPEG via l'élément HTML `<picture>` | ⭐ P3 |
- Compresser systématiquement chaque image avant upload. Cible : poids inférieur à 200 Ko par image, idéalement inférieur à 100 Ko pour les images secondaires | ⭐ P0 |
- Dimensionner les images à la taille d'affichage maximale réelle. Ne jamais uploader une image de 4 000 px si elle s'affiche à 1 200 px | ⭐ P0 |
- Utiliser des images responsives (attribut srcset) pour servir des tailles adaptées selon le viewport (mobile, tablette, desktop) | ⭐ P2 |
- Spécifier systématiquement les attributs width et height sur chaque balise `<img>` pour prévenir les décalages de mise en page (CLS) | ⭐ P0 |
- [Webflow] Webflow génère automatiquement des variantes responsives et convertit les images en WebP via son CDN (Fastly). Vérifier que la compression automatique est activée dans Site Settings. Pour les images nécessitant un contrôle fin (hero images, illustrations), optimiser manuellement avant upload | ⭐ P0 |

### Attributs alt

- Rédiger un texte alt descriptif, concis et contextuellement pertinent pour chaque image porteuse de sens. Longueur recommandée : 5 à 15 mots (maximum 125 caractères pour la compatibilité lecteurs d'écran) | ⭐ P0 |
- Intégrer le mot-clé de la page naturellement dans l'alt text quand c'est pertinent, sans forcer. Ne jamais bourrer de mots-clés | ⭐ P0 |
- Décrire ce que l'image montre réellement, pas ce qu'elle est censée signifier (test : imaginer qu'on décrit l'image par téléphone à quelqu'un qui ne la voit pas) | ⭐ P0 |
- Laisser l'attribut alt vide (alt="") pour les images purement décoratives (séparateurs, arrière-plans, icônes sans fonction) | ⭐ P1 |
- Pour les images utilisées comme liens, l'alt text doit décrire la destination du lien, pas l'image elle-même | ⭐ P1 |
- [Webflow] L'alt text se renseigne dans le panneau Image Settings de chaque élément image. Webflow AI peut générer des alt texts automatiquement (en masse ou individuellement) ; toujours relire et corriger les propositions | ⭐ P0 |
- [Webflow] Sur un site multilingue avec Localization, l'alt-text défini dans l'Asset Manager global n'est pas traduisible par locale. Pour qu'un alt-text soit localisable, il doit être défini au niveau de l'élément image dans le Designer ou via un champ CMS dédié, jamais uniquement dans l'Asset Manager | ⭐ PX |

### Nommage des fichiers

- Renommer chaque fichier image avant upload avec un nom descriptif contenant le mot-clé pertinent. Exemple : cuisine-sur-mesure-chene-massif.webp | ⭐ P0 |
- Séparer les mots par des tirets (-). Ne jamais utiliser d'underscores, d'espaces ou de caractères spéciaux | ⭐ P0 |
- Proscrire les noms génériques (IMG_1234.jpg, photo1.png, sans-titre.webp) | ⭐ P0 |

### Légendes

- Ajouter une légende contextuelle sous les images importantes (photos produits, illustrations de processus, infographies). Les légendes sont parmi les textes les plus lus d'une page | 🛍️ P1 | 🏢✍️ P2 |
- Utiliser la légende pour renforcer le message ou apporter une information complémentaire (conversion : la légende peut inclure un bénéfice client ou un appel à l'action discret) | ⭐ P2 |

### Image sitemap

- Inclure les images stratégiques dans le sitemap XML pour faciliter leur découverte et leur indexation par Google Images | 🛍️ P2 | 🏢 PX |
- [Webflow] Le sitemap généré automatiquement par Webflow n'inclut pas les images de manière détaillée. Pour les sites à forte composante visuelle (portfolio, e-commerce), envisager un sitemap image complémentaire via un outil tiers ou du custom code | 🛍️ PX | 🏢 PX |

### Lazy loading

- Appliquer le lazy loading (loading="lazy") à toutes les images situées en dessous de la ligne de flottaison (below the fold) | ⭐ P0 |
- Ne PAS appliquer le lazy loading aux images au-dessus de la ligne de flottaison (hero image, logo, première image visible). Ces images doivent charger immédiatement pour ne pas dégrader le LCP | ⭐ P0 |
- [Webflow] Webflow propose le lazy loading natif dans les paramètres de chaque image (Settings > Loading > Lazy). L'appliquer sélectivement | ⭐ P0 |

### Documents PDF

- Pour tout fichier PDF destiné à être trouvé via la recherche organique, appliquer les optimisations suivantes : nommer le fichier avec les mots-clés cibles en minuscules séparés par des tirets, renseigner le titre du document (60 caractères max), créer des liens internes optimisés depuis les pages thématiquement proches, compresser le fichier, et s'assurer que le contenu est textuel et non sous forme d'image (le texte doit être copiable). [Webflow] Les PDFs sont uploadés via le panel Assets ou hébergés en externe ; les métadonnées de titre se configurent dans les propriétés du document (ex. Adobe Acrobat) avant upload | ✍️🛍️ PX |

## Video SEO

### Fondamentaux

- Héberger chaque vidéo sur une page dédiée (watch page) avec du contenu textuel contextuel autour de la vidéo (introduction, résumé, points clés) | ⭐ P1 |
- Intégrer une transcription complète de la vidéo sur la page. Les transcriptions fournissent du contenu indexable et améliorent l'accessibilité | ⭐ P2 |
- Ajouter des sous-titres (captions) pour améliorer l'engagement et l'accessibilité | ⭐ P2 |
- Nommer le fichier vidéo de manière descriptive (ex : guide-installation-parquet-chene.mp4) | ⭐ P0 |
- Durée minimale : 30 secondes pour être éligible aux résultats enrichis Google | ⭐ P0 |

### Optimisation des vidéos YouTube intégrées sur le site (embed iframe)

- Pour chaque vidéo YouTube intégrée via iframe sur le site : optimiser le titre (mot-clé en début, moins de 60 caractères), la description (200 à 300 mots, mots-clés naturels, timestamps), et les tags (5 à 7 tags pertinents) directement sur YouTube | ⭐ P1 |
- Ajouter des chapitres (timestamps) dans la description YouTube pour activer les "Key Moments" dans Google Search | ⭐ P2 |
- Créer un thumbnail personnalisé, visuellement engageant, avec un texte court lisible en petit format (conversion : le thumbnail est le premier déclencheur de clic) | ⭐ P1 |
- S'assurer que Googlebot peut accéder à la page contenant la vidéo ET au fichier vidéo lui-même (ne pas bloquer les URL vidéo dans robots.txt) | ⭐ P0 |
- [Webflow] Intégrer les vidéos YouTube via un embed code ou le composant natif Video de Webflow. Préférer le chargement différé (lazy load de l'iframe) pour limiter l'impact sur le LCP | ⭐ P1 |

### Connexion bidirectionnelle YouTube et site

**Depuis YouTube vers le site :**
- Ajouter l'URL du site comme lien vérifié dans les paramètres de la chaîne YouTube (Channel Settings > Links). Ce lien vérifié renforce l'association entre les deux propriétés aux yeux de Google | ⭐ P1 |
- Inclure un lien vers la page pertinente du site dans la description de chaque vidéo (idéalement dans les 2 à 3 premières lignes visibles avant le "Afficher plus") | ⭐ P1 |
- Utiliser les YouTube Cards (fiches) pour insérer des liens cliquables vers le site pendant la lecture de la vidéo | ⭐ P2 |
- Utiliser les End Screens (écrans de fin) pour proposer un lien vers le site dans les 20 dernières secondes de la vidéo | ⭐ P2 |

**Depuis le site vers YouTube :**
- Lier vers la chaîne YouTube depuis le site (footer, page À propos, ou page dédiée aux ressources vidéo) | ⭐ P1 |
- Le schema SameAs reliant l'entité du site à l'URL de la chaîne YouTube est traité dans le Guide AIO | ⭐ P1 |

### Schema markup vidéo

- Implémenter le schema VideoObject en JSON-LD sur chaque page contenant une vidéo. Propriétés requises : name, description, thumbnailUrl, uploadDate, duration, contentUrl ou embedUrl (les spécifications techniques détaillées sont dans le Guide AIO) | ⭐ P2 |
- Utiliser le schema Clip pour les vidéos longues segmentées en chapitres | ⭐ P3 |
- Utiliser SeekToAction pour activer les moments clés dans les résultats Google | ⭐ P3 |
- Pour les livestreams : utiliser le schema BroadcastEvent pour afficher un badge "LIVE" dans les SERP | ⭐ PX |
- Valider le markup via Google Rich Results Test avant publication | ⭐ P2 |
- [Webflow] Intégrer le JSON-LD VideoObject dans le custom code `<head>` de la page concernée, ou dans un embed HTML sur la page si les données sont dynamiques (CMS) | ⭐ P2 |

## Maillage interne

### Logique de linking

- Chaque page publiée doit recevoir au minimum 2 à 3 liens internes depuis d'autres pages du site. Aucune page ne doit rester orpheline (sans aucun lien interne pointant vers elle) | ⭐ P0 |
- Lier en priorité depuis les pages à forte autorité (pages recevant des backlinks externes, pages bien positionnées) vers les pages stratégiques à renforcer | ⭐ P2 |
- Placer les liens internes contextuels dans le corps du contenu, de préférence dans les premiers paragraphes (les liens placés haut dans la page reçoivent plus de poids) | ⭐ P1 |
- Viser 5 à 10 liens internes contextuels par page de 2 000 mots (environ un lien tous les 200 à 300 mots). Adapter selon la longueur du contenu | ⭐ P1 |
- Ne jamais appliquer l'attribut rel="nofollow" aux liens internes. Laisser le PageRank circuler librement entre les pages du site | ⭐ P0 |
- Mettre à jour le maillage interne à chaque publication de nouveau contenu : identifier les pages existantes pertinentes et y ajouter un lien vers le nouveau contenu | ⭐ P1 |

### Anchor texts

- Utiliser des anchor texts descriptifs contenant le mot-clé de la page cible. Exemple : "découvrez notre guide du branding" plutôt que "cliquez ici" | ⭐ P0 |
- Varier les anchor texts pointant vers une même page cible (variations sémantiques, synonymes) pour éviter la suroptimisation | ⭐ P1 |
- Ne jamais utiliser le même anchor text exact pour pointer vers deux pages différentes : cela génère de la confusion pour Google sur la page cible pertinente | ⭐ P0 |
- Éviter les anchor texts génériques ("en savoir plus", "lire la suite", "cliquez ici") sauf pour des liens de navigation où le contexte environnant clarifie la destination | ⭐ P1 |

### Distribution du PageRank interne

- Structurer le maillage de manière hiérarchique : la page d'accueil distribue vers les pages piliers, les pages piliers distribuent vers leurs satellites | ⭐ P1 |
- Les pages recevant le plus de backlinks externes doivent être reliées aux pages stratégiques à positionner | ⭐ P2 |
- Limiter le nombre total de liens internes par page (navigations comprises) à un maximum raisonnable (pas de seuil officiel Google, mais au-delà de 100 à 150 liens par page, le PageRank transmis par lien se dilue significativement) | ⭐ P1 |

### Liens sortants (outbound links)

- Intégrer des liens sortants vers des sources de référence (études, données officielles, documentation) dans les contenus éditoriaux et les pages à fort contenu. Google interprète les liens vers des sources fiables comme un signal de qualité et de fiabilité | ✍️ P1 | 🏢🛍️ P2 |
- Les liens sortants doivent pointer vers des sources autoritaires et pertinentes par rapport au contexte (pas de liens artificiels vers des sites sans rapport) | ⭐ P1 |
- Ne pas abuser des liens sortants : 2 à 5 par article ou page longue suffisent. L'objectif est d'appuyer les affirmations clés, pas de lier chaque phrase | ⭐ P1 |
- Appliquer rel="nofollow" uniquement sur les liens sponsorisés ou les liens vers des sources non vérifiées. Les liens sortants éditoriaux vers des sources de confiance restent en dofollow | ⭐ P1 |

### Breadcrumbs (fil d'Ariane)

- Implémenter un fil d'Ariane sur toutes les pages intérieures du site. Le fil d'Ariane renforce la compréhension de la hiérarchie par Google et facilite la navigation utilisateur | ⭐ P1 |
- Utiliser des liens `<a>` cliquables dans le breadcrumb (chaque niveau est un lien vers la page parente) | ⭐ P1 |
- La position du fil d'Ariane dans la page a un impact SEO faible : en l'absence de contrainte UX forte, il peut être placé en bas de page pour garantir sa présence sur les vues mobiles sans encombrer le header. L'important est sa présence systématique, son balisage schema BreadcrumbList et l'utilisation d'ancres descriptives | ⭐ P3 |
- Le schema BreadcrumbList associé est traité dans le Guide AIO | ⭐ P1 |
- [Webflow] Construire le breadcrumb manuellement ou via un composant réutilisable. Pour les pages CMS, utiliser les champs dynamiques (catégorie, nom de la page) pour générer le breadcrumb automatiquement | ⭐ P1 |

### Pages orphelines

- Identifier et éliminer systématiquement les pages orphelines (pages sans aucun lien interne pointant vers elles) | ⭐ P0 |
- Chaque page indexable doit être accessible via au moins un chemin de navigation interne | ⭐ P0 |
- [Webflow] Vérifier les pages orphelines lors de chaque ajout de contenu. Les pages créées dans le CMS mais non liées depuis aucune page ou collection list restent techniquement orphelines pour les crawlers | ⭐ P1 |

## SEO technique

### Vitesse de chargement et Core Web Vitals

- **LCP (Largest Contentful Paint)** : cible inférieure à 2,5 secondes. Optimiser l'image ou l'élément le plus volumineux visible au-dessus de la ligne de flottaison (hero image, bannière). Précharger cette ressource critique via `<link rel="preload">` | ⭐ P0 |
- Ajouter l'attribut `fetchpriority="high"` sur l'image hero (l'image LCP above the fold) pour indiquer au navigateur de la charger en priorité absolue. Ne pas utiliser cet attribut sur plusieurs images simultanément : la compétition de bande passante annule le bénéfice. [Webflow] Ajouter l'attribut via un embed custom ou un script ciblant l'image hero dans le Head Code de la page concernée | ⭐ P2 |
- **INP (Interaction to Next Paint)** : cible inférieure à 200 ms. Minimiser le JavaScript bloquant, différer les scripts non essentiels, optimiser les gestionnaires d'événements. INP a remplacé FID en mars 2024 et mesure la réactivité sur l'ensemble de la session, pas uniquement la première interaction | ⭐ P1 |
- **CLS (Cumulative Layout Shift)** : cible inférieure à 0,1. Spécifier les dimensions (width/height) de toutes les images, vidéos et éléments embarqués. Réserver l'espace pour les publicités et les embeds tiers. Charger les polices avec font-display: swap | ⭐ P0 |
- Google évalue les Core Web Vitals au 75e percentile des visites réelles (données CrUX). Les trois métriques doivent passer le seuil "Good" pour que la page soit classée performante | ⭐ P1 |
- Surveiller les Core Web Vitals dans Google Search Console (rapport dédié) et PageSpeed Insights | ⭐ P1 |
- [Webflow] Webflow offre de bonnes performances natives grâce au code propre, au CDN Fastly intégré et à la minification automatique du CSS/JS. Les principaux leviers d'optimisation restent : compression des images uploadées, limitation des animations lourdes et des scripts tiers (tracking, chat widgets, pixels), et utilisation parcimonieuse des interactions Webflow | ⭐ P1 |
- Utiliser `<link rel="preconnect">` pour les domaines tiers incontournables (Google Fonts, Google Analytics, scripts de tracking). Le preconnect anticipe la connexion réseau et réduit le temps de chargement de ces ressources | ⭐ P1 |
- Limiter le nombre de variantes de polices chargées (poids et styles). Privilégier 2 à 3 variantes maximum. Favoriser les polices hébergées localement ou via le CDN du site plutôt que les appels externes à Google Fonts (élimine une requête DNS + connexion tierce impactant le LCP) | ⭐ P1 |
- [Webflow] Webflow charge les Google Fonts via son propre CDN quand elles sont sélectionnées dans le Designer. Pour les polices custom uploadées, s'assurer qu'elles sont au format WOFF2 (meilleure compression) et que font-display: swap est appliqué | ⭐ P1 |

### Mobile-first indexing

- Concevoir le site en mobile-first : Google utilise la version mobile pour l'indexation et le classement | ⭐ P0 |
- S'assurer que tout le contenu visible sur desktop est également présent et accessible sur mobile (pas de contenu masqué uniquement sur mobile) | ⭐ P0 |
- Tester la navigation, la lisibilité et l'ergonomie tactile sur des appareils réels, pas uniquement via le redimensionnement navigateur | ⭐ P1 |
- [Webflow] Webflow est nativement responsive. Vérifier et ajuster chaque breakpoint (mobile portrait, mobile paysage, tablette) pour s'assurer que le contenu reste intégralement accessible et lisible | ⭐ P0 |

### Crawl budget

- Optimiser le crawl budget en bloquant le crawl des pages sans valeur SEO (pages utilitaires, pages de remerciement, résultats de recherche interne) via meta robots noindex ou robots.txt | ⭐ P1 |
- Minimiser les chaînes de redirections (chaque redirection consomme du crawl budget). Corriger les redirections en chaîne pour pointer directement vers la destination finale | ⭐ P1 |
- Corriger les erreurs 404 sur les pages recevant du trafic ou des backlinks (rediriger en 301 vers la page la plus pertinente) | ⭐ P1 |

### Robots.txt

- Configurer le fichier robots.txt pour bloquer le crawl des ressources inutiles (pages d'administration, dossiers techniques) | ⭐ P0 |
- Ne jamais bloquer les fichiers CSS, JavaScript et images nécessaires au rendu de la page : Googlebot doit y accéder pour rendre les pages correctement, évaluer la compatibilité mobile et comprendre la structure visuelle ; un blocage entraîne une dégradation directe du rendu, de l'indexation et des positions | ⭐ P0 |
- Ne pas confondre blocage du crawl et désindexation : une URL bloquée dans le robots.txt peut rester indexée par Google si elle est référencée par un lien externe, et apparaître dans les résultats sans extrait. Pour désindexer une page, utiliser la balise meta robots `noindex` sur une page crawlable (non bloquée) afin que Googlebot puisse détecter et appliquer la directive | ⭐ P1 |
- Respecter les règles syntaxiques du robots.txt : encodage ASCII ou UTF-8 obligatoire, directives sensibles à la casse, regex complexes à éviter car tous les robots ne les interprètent pas uniformément. Indiquer l'emplacement du sitemap XML via une URL absolue dans le fichier | ⭐ P1 |
- Autoriser explicitement les crawlers des moteurs génératifs si la visibilité GEO est souhaitée (les directives spécifiques sont traitées dans le Guide AIO) | ⭐ P2 |
- [Webflow] Le robots.txt est configurable dans Site Settings > SEO > Robots.txt. Un seul champ global pour l'ensemble du site. Chaque modification est appliquée immédiatement à la publication. En l'absence de besoin spécifique, le limiter à la référence au sitemap XML. Tout code custom ou embed tiers (scripts analytics, widgets) doit être vérifié pour éviter qu'il ne génère des ressources bloquées | ⭐ P0 |

### Sitemap XML

- Générer un sitemap XML incluant toutes les pages indexables du site. Exclure les pages en noindex, les pages redirigées et les URL non canoniques | ⭐ P0 |
- Soumettre le sitemap dans Google Search Console et Bing Webmaster Tools | ⭐ P0 |
- S'assurer que le sitemap se met à jour automatiquement à chaque ajout ou suppression de page | ⭐ P0 |
- [Webflow] Webflow génère automatiquement un sitemap XML accessible à /sitemap.xml. Il inclut toutes les pages publiées et les items CMS. Vérifier régulièrement que les pages non souhaitées (pages de test, pages archivées) n'y figurent pas | ⭐ P1 |
- Pour les sites à fort rythme de publication (e-commerce, blog), envisager IndexNow : protocole qui notifie Bing, Yandex et d'autres moteurs en temps réel à chaque publication ou modification, sans attendre le passage des crawlers. Google ne supporte pas encore officiellement IndexNow (expérimentation en cours). [Webflow] Webflow ne supporte pas IndexNow nativement (impossible d'héberger le fichier clé à la racine du domaine en raison de l'architecture CDN). Workarounds disponibles : outil tiers (Sight AI, Flozi) ou fichier clé hébergé sur S3 avec redirection 301 depuis Webflow | ⭐ PX |

### Redirections 301

- Implémenter une redirection 301 pour chaque URL modifiée ou supprimée afin de conserver le PageRank acquis et d'éviter les erreurs 404 | ⭐ P0 |
- Ne jamais utiliser de redirections 302 (temporaires) pour des changements permanents d'URL | ⭐ P0 |
- Éviter les chaînes de redirections (A > B > C). Chaque redirection doit pointer directement vers la destination finale | ⭐ P1 |
- [Webflow] Les redirections 301 se configurent dans Site Settings > Publishing > 301 Redirects. Webflow n'impose pas de limite fixe sur le nombre de redirections, mais recommande de ne pas dépasser 1 000 règles pour éviter une dégradation des performances. Un import CSV en masse écrase toutes les redirections existantes : toujours exporter avant d'importer. Pour les migrations importantes, planifier les redirections en amont et prioriser les pages à fort trafic/backlinks | ⭐ P0 |

### Gestion des erreurs 404

- Créer une page 404 personnalisée utile (conversion : proposer un moteur de recherche interne, des liens vers les pages populaires et un message engageant plutôt qu'un simple "page introuvable") | ⭐ P1 |
- Monitorer les erreurs 404 dans Google Search Console et corriger les plus critiques (pages avec backlinks, pages à fort trafic historique) | ⭐ P1 |
- Distinguer les vraies 404 (page supprimée sans remplacement) des soft 404 (page qui retourne un code 200 mais affiche un contenu d'erreur). Les soft 404 gaspillent le crawl budget | ⭐ P2 |
- [Webflow] Webflow permet de personnaliser la page 404 dans Page Settings > 404 Page | ⭐ P1 |

### Staging et environnements de test

- S'assurer que l'environnement de staging/préproduction n'est pas indexé par les moteurs de recherche | ⭐ P0 |
- [Webflow] Le sous-domaine .webflow.io est automatiquement en noindex via une balise meta robots. Ne jamais modifier ce comportement. Vérifier après chaque publication que le domaine personnalisé (et non le .webflow.io) est utilisé comme canonical dans toutes les pages | ⭐ P0 |

### HTTPS et sécurité

- Servir l'intégralité du site en HTTPS. Le certificat SSL est un signal de classement confirmé par Google | ⭐ P0 |
- Rediriger toutes les variantes HTTP vers HTTPS | ⭐ P0 |
- [Webflow] Le certificat SSL est fourni et renouvelé automatiquement par Webflow pour tous les sites hébergés sur la plateforme. Aucune configuration manuelle nécessaire | ⭐ P0 |
- [Webflow] Le HSTS (HTTP Strict Transport Security) est activé automatiquement sur tous les plans non-Enterprise depuis juillet 2024. Pour les sites Enterprise, il se configure manuellement via Site Settings > Publishing > Advanced publishing options (3 niveaux disponibles : HSTS seul, HSTS avec sous-domaines, HSTS Preload). Attention : activer HSTS Preload avec sous-domaines peut rendre le site inaccessible si un sous-domaine utilise HTTP | ⭐ P2 |

### Hreflang (multilingue)

- Pour les sites ciblant plusieurs langues ou régions, implémenter les balises hreflang pour indiquer à Google la version linguistique de chaque page | ⭐ PX |
- Chaque page doit contenir un hreflang auto-référent + un hreflang vers chaque version alternative | ⭐ PX |
- [Webflow] Le module Localization (disponible depuis 2023) génère automatiquement les balises hreflang dans le `<head>` et dans le sitemap XML pour chaque locale activée. C'est la solution recommandée pour les sites multilingues sur Webflow. Pour les implémentations hreflang sans Localization (ex. : site géré manuellement en plusieurs langues), injecter le code via custom code dans le `<head>` de chaque page ou via Weglot | ⭐ PX |
- [Webflow] Localization : chaque locale secondaire est facturée mensuellement en supplément du plan site (paliers Essentials, Standard, Advanced jusqu'à 10 locales). Intégrer ce coût dans le chiffrage dès la phase d'architecture. Incompatibilité totale entre Localization et E-Commerce : les collections produits et catégories ne peuvent pas être localisées | ⭐ PX |
- [Webflow] Les liens internes stockés dans des champs CMS (ex. : URL d'une page cible dans un champ texte ou Reference) ne sont pas localisés automatiquement. Un lien vers `/about` en locale primaire reste `/about` pour toutes les locales secondaires, au lieu de devenir `/de/about`. Contournement : utiliser des liens relatifs avec préfixe locale codé en dur, ou du JavaScript de réécriture côté client. Source fréquente de bugs UX en production sur les sites multilingues | ⭐ PX |
