# AIO — AI Optimization

## Légende des annotations

**Types de site :** ⭐ Tous | 🏢 Vitrine | 🛍️ E-commerce | ✍️ Blog/Éditorial | 📍 Local (complément)

**Priorités :** P0 Nécessaire | P1 Base | P2 Amélioré | P3 Performant | PX Contextuel (effort élevé, gain potentiellement fort selon le projet)

## Rôle du schema et de l'optimisation IA

- Le schema markup et le HTML sémantique aident les moteurs de recherche et les LLMs à comprendre, extraire et attribuer le contenu. Ce sont des facilitateurs de visibilité, pas des garanties d'inclusion dans les AI Overviews ou les citations LLM | ⭐ P1 |
- Le schema ne remplace pas la qualité du contenu, l'autorité du domaine ou les signaux E-E-A-T. Un schema parfait sur un contenu médiocre ne génère aucun résultat. Un contenu excellent sans schema perd des opportunités de résultats enrichis et de compréhension par les LLMs | ⭐ P1 |
- L'optimisation IA (HTML sémantique, parsabilité, llms.txt, crawlers) est une couche technique qui maximise les chances que le contenu de qualité soit correctement interprété et cité. Elle s'ajoute au SEO et au GEO, elle ne les remplace pas | ⭐ P1 |

## Schema markup : principes généraux

### Format et implémentation

- Utiliser exclusivement le format JSON-LD pour tous les schemas. C'est le format recommandé par Google, le plus simple à maintenir et le mieux supporté par les systèmes IA | ⭐ P0 |
- Placer le bloc `<script type="application/ld+json">` dans le `<head>` de la page ou juste avant `</body>`. Les deux emplacements sont valides | ⭐ P0 |
- Plusieurs blocs JSON-LD peuvent coexister sur une même page (un par entité distincte) | ⭐ P0 |
- Le contenu balisé en schema doit correspondre exactement au contenu visible par l'utilisateur. Ne jamais baliser des informations invisibles ou différentes de ce qui est affiché | ⭐ P0 |
- [Webflow] Implémenter le schema via le champ "Custom Code" dans Page Settings > `<head>` pour les schemas statiques (page par page). Pour les pages CMS dynamiques, utiliser un embed HTML dans le body contenant des champs dynamiques Webflow pour injecter les données variables (titre, description, date, image, prix) | ⭐ P0 |

### Graphe d'entités et @id

- Attribuer un @id unique et stable à chaque entité principale (Organization, Person, WebPage, Article, Product). Format recommandé : URL de la page + fragment (ex : "https://example.com/#organization", "https://example.com/blog/article/#article") | ⭐ P1 |
- Définir chaque entité une seule fois dans le graphe, puis la référencer partout via son @id. Exemple : l'auteur est défini dans le schema Person avec un @id, puis référencé dans chaque Article via "author": {"@id": "https://example.com/#founder"} | ⭐ P2 |
- Connecter les schemas entre eux pour former un graphe cohérent : Organization > WebSite > WebPage > Article > Person. Ce graphe aide les moteurs et les LLMs à comprendre les relations entre entités | ⭐ P2 |
- Ne jamais dupliquer les schemas. Un seul schema Organization par site, un seul schema WebSite par site, un schema WebPage par page | ⭐ P0 |

### Structure @graph

- Privilégier la structure @graph pour regrouper plusieurs entités dans un seul bloc JSON-LD. Le @graph est un tableau contenant tous les objets schema de la page, permettant de les interconnecter via @id dans un bloc unique | ⭐ P2 |
- Structure type d'un @graph pour une page :
  ```json
  {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "Organization", "@id": "https://example.com/#organization", ... },
      { "@type": "WebSite", "@id": "https://example.com/#website", "publisher": {"@id": "https://example.com/#organization"}, ... },
      { "@type": "WebPage", "@id": "https://example.com/page/#webpage", "isPartOf": {"@id": "https://example.com/#website"}, ... },
      { "@type": "BreadcrumbList", "@id": "https://example.com/page/#breadcrumb", ... }
    ]
  }
  ```
  | ⭐ P2 |
- Avantage dans Webflow : un seul bloc `<script type="application/ld+json">` dans le `<head>` au lieu de multiples blocs séparés. Plus propre, plus facile à maintenir, et réduit le risque de schemas conflictuels | ⭐ P2 |

### Validation

- Valider chaque schema via Google Rich Results Test (https://search.google.com/test/rich-results) pour vérifier l'éligibilité aux résultats enrichis | ⭐ P0 |
- Valider la syntaxe via Schema Markup Validator (https://validator.schema.org/) pour détecter les erreurs de structure | ⭐ P1 |
- Valider systématiquement après chaque publication ou modification de page. Les erreurs de schema (propriétés manquantes, URLs relatives, types incorrects) sont silencieuses et ne génèrent pas d'erreur visible | ⭐ P1 |
- [Webflow] Webflow AI peut générer du schema markup, mais les résultats doivent toujours être vérifiés manuellement. Erreurs fréquentes : URLs relatives au lieu d'absolues, propriétés requises manquantes, format de date incorrect | ⭐ P0 |

## Schema markup : types par type de page

### Organization (page d'accueil)

- Propriétés requises : @type, name, url | ⭐ P0 |
- Propriétés recommandées : logo (ImageObject), description, sameAs (tableau des URLs des profils sociaux, Google Business Profile, Wikipedia, Wikidata), contactPoint, address (PostalAddress), email, telephone, foundingDate, founder, knowsAbout (indique les domaines d'expertise aux systèmes IA) | ⭐ P1 |
- Pour les e-commerces : utiliser le sous-type OnlineStore avec les propriétés hasMerchantReturnPolicy et hasShippingService | 🛍️ P1 |
- Placer le schema Organization sur la page d'accueil uniquement. Les autres pages y font référence via @id | ⭐ P0 |

### WebSite (page d'accueil)

- Propriétés requises : @type, name, url | ⭐ P0 |
- Propriétés recommandées : potentialAction (SearchAction pour activer le sitelinks searchbox dans les SERP), publisher (référence @id vers Organization) | ⭐ P1 |
- SearchAction : spécifier l'URL du moteur de recherche interne avec le paramètre {search_term_string}. Éligibilité au sitelinks searchbox dans les SERP | ⭐ P2 |

### WebPage / pages génériques

- Propriétés requises : @type (WebPage ou sous-type : AboutPage, ContactPage, FAQPage, CollectionPage), name, url | ⭐ P1 |
- Propriétés recommandées : description, datePublished, dateModified, breadcrumb (référence @id vers BreadcrumbList), isPartOf (référence @id vers WebSite) | ⭐ P1 |
- Ajouter `isAccessibleForFree: true` sur les pages WebPage et Article dont le contenu est librement accessible sans abonnement ni paywall. Signal GEO : les moteurs génératifs favorisent les sources qu'ils peuvent effectivement lire. Omission si le contenu est partiellement ou totalement derrière une barrière d'accès | ⭐ P2 |

### BreadcrumbList (toutes pages intérieures)

- Implémenter un schema BreadcrumbList sur chaque page intérieure, reflétant exactement le fil d'Ariane visible | ⭐ P1 |
- Chaque élément de la liste est un ListItem avec position, name et item (URL absolue) | ⭐ P1 |

### Article / BlogPosting (blog, contenu éditorial)

- Propriétés requises : headline, author, datePublished, image | ✍️ P0 |
- Propriétés recommandées : dateModified, description, publisher (référence @id Organization), mainEntityOfPage (référence @id WebPage), wordCount, articleSection | ✍️ P1 |
- datePublished et dateModified en format ISO 8601 complet avec fuseau horaire (ex : "2026-03-24T10:00:00+02:00") | ✍️ P0 |

### Person (pages auteurs)

- Créer un schema Person pour chaque auteur avec : name, url (page auteur), jobTitle, worksFor (référence @id Organization), sameAs (LinkedIn, portfolios, profils tiers), image, description, knowsAbout | ✍️ P1 | 🏢 P2 |
- Le schema ProfilePage peut envelopper le schema Person sur les pages auteurs dédiées | ✍️ P2 |

### LocalBusiness (sites locaux)

- Propriétés requises : @type (LocalBusiness ou sous-type spécifique : Restaurant, Dentist, Plumber, etc.), name, address (PostalAddress), telephone | 📍 P0 |
- Propriétés recommandées : openingHoursSpecification, geo (GeoCoordinates avec latitude/longitude), url, image, priceRange, areaServed, sameAs (Google Business Profile URL, annuaires), aggregateRating, review | 📍 P1 |
- Créer un schema LocalBusiness distinct par établissement physique | 📍 P0 |

### Product et Offer (e-commerce)

- Propriétés requises Product : name, image | 🛍️ P0 |
- Propriétés requises Offer (imbriqué dans Product) : price, priceCurrency, availability (InStock, OutOfStock, PreOrder), url | 🛍️ P0 |
- Propriétés recommandées : description, sku, brand, aggregateRating, review, gtin (code-barres si applicable), color, size, material | 🛍️ P1 |
- Pour les produits artisanaux, techniques ou à forte valeur informationnelle (alimentaire, mode, beauté, B2B), utiliser `additionalProperty` (type `PropertyValue`) pour encoder des données sans propriété Schema.org dédiée : composition précise, procédé de fabrication, certifications, nombre d'heures d'atelier, type de teinture, origine géographique. Ces données sont directement exploitables par les LLMs pour répondre à des requêtes ultra-précises | 🛍️ P2 |
- availability doit refléter le statut réel du produit en temps réel. Une disponibilité incorrecte peut entraîner une action manuelle de Google | 🛍️ P0 |

### AggregateRating et Review

- Implémenter AggregateRating sur les pages recevant des avis : pages produits, pages services, page entreprise | 🛍️ P1 | 🏢📍 P2 |
- Propriétés requises AggregateRating : ratingValue, reviewCount ou ratingCount | ⭐ P0 |
- Les avis doivent provenir de vraies évaluations d'utilisateurs. Ne jamais fabriquer des avis ou des notes | ⭐ P0 |

### Service (sites vitrines, prestataires)

- Utiliser le type Service pour chaque prestation proposée avec : name, description, provider (référence @id Organization), areaServed, serviceType | 🏢 P2 |
- Ajouter `serviceOutput` pour décrire le livrable concret produit par la prestation (ex : "Site Webflow livré clé en main", "Identité visuelle complète avec guide d'utilisation"). Cette propriété aide les LLMs à comprendre précisément ce que le service produit | 🏢 P2 |
- Imbriquer Offer dans Service si un prix ou une fourchette de prix est affichable | 🏢 P2 |

### FAQPage

- Propriétés requises : mainEntity contenant un tableau de Question, chaque Question contenant acceptedAnswer avec un Answer.text | ⭐ P1 |
- Le texte de chaque Question.name et Answer.text doit correspondre exactement au contenu visible sur la page | ⭐ P0 |
- Réserver le schema FAQPage aux pages à fort signal E-E-A-T avec des Q&A éditoriales révisées. Ne pas le déployer massivement sur toutes les pages | ⭐ P1 |

### HowTo

- Propriétés requises : name, step (tableau de HowToStep avec name et text) | ✍️ P1 | 🏢🛍️ P2 |
- Propriétés recommandées : totalTime (durée ISO 8601), estimatedCost, image, supply, tool | ✍️ P2 |

### QAPage

- Utiliser QAPage pour les pages structurées autour d'une question unique avec sa réponse détaillée (distinct de FAQPage qui regroupe plusieurs Q&A) | ⭐ P2 |
- Propriétés : mainEntity contenant un Question avec name (la question) et acceptedAnswer ou suggestedAnswer contenant un Answer avec text | ⭐ P2 |

### Speakable

- Le schema Speakable identifie les sections de contenu optimisées pour la lecture à haute voix par les assistants vocaux (Google Assistant). Encore en beta, principalement pour les contenus anglais, mais applicable pour préparer l'avenir sur le marché francophone | ⭐ P3 |
- Implémenter via la propriété speakable dans un schema Article ou WebPage, contenant un tableau de cssSelector ou xpath pointant vers les passages ciblés | ⭐ P3 |
- Les passages ciblés doivent faire 20 à 30 mots, être formulés en langage parlé naturel et répondre directement à une question | ⭐ P3 |

### VideoObject

- Propriétés requises : name, description, thumbnailUrl, uploadDate, contentUrl ou embedUrl | ⭐ P2 |
- Propriétés recommandées : duration (ISO 8601, ex : PT5M30S), transcript, caption, publisher | ⭐ P2 |
- Pour les vidéos segmentées : ajouter Clip avec name, startOffset, endOffset, url | ⭐ P3 |
- Pour les Key Moments Google : implémenter SeekToAction avec potentialAction.target incluant {seek_offset} | ⭐ P3 |
- Pour les livestreams : utiliser BroadcastEvent avec isLiveBroadcast: true, startDate, endDate | ⭐ PX |

### Event

- Propriétés requises : name, startDate, location (Place ou VirtualLocation) | ⭐ PX |
- Propriétés recommandées : endDate, description, image, offers (Offer avec price, url, availability), organizer, performer | ⭐ PX |

### SiteNavigationElement

- Baliser les éléments de navigation principale du site pour que les moteurs et LLMs comprennent la structure de navigation | ⭐ P3 |
- Propriétés : name, url pour chaque élément de navigation | ⭐ P3 |

## Cartographie : quel schema sur quelle page

Cette section indique la combinaison de schemas à implémenter par type de page. Les schemas entre parenthèses sont conditionnels (implémenter si le contenu correspondant est présent sur la page).

### Page d'accueil
- Organization + WebSite + WebPage + BreadcrumbList + (SiteNavigationElement) | ⭐ P0 |
- Ajouter LocalBusiness en complément (pas en remplacement) d'Organization pour les sites locaux mono-établissement | 📍 P0 |

### Page service / prestation
- WebPage + Service + BreadcrumbList + (FAQPage) + (AggregateRating) | 🏢 P1 |

### Page catégorie (e-commerce)
- WebPage (sous-type CollectionPage) + BreadcrumbList + (FAQPage) | 🛍️ P1 |

### Fiche produit
- WebPage + Product + Offer + BreadcrumbList + (AggregateRating) + (FAQPage) | 🛍️ P0 |

### Article de blog / contenu éditorial
- WebPage + Article ou BlogPosting + BreadcrumbList + Person (via @id) + (FAQPage) + (HowTo) + (VideoObject) | ✍️ P0 |

### Page auteur
- WebPage (sous-type ProfilePage) + Person + BreadcrumbList | ✍️ P1 | 🏢 P2 |

### Page locale (ville/zone)
- WebPage + LocalBusiness + BreadcrumbList + (FAQPage) + (AggregateRating) | 📍 P0 |

### Page À propos
- WebPage (sous-type AboutPage) + BreadcrumbList | ⭐ P1 |

### Page Contact
- WebPage (sous-type ContactPage) + BreadcrumbList | ⭐ P1 |

### Page FAQ dédiée
- WebPage (sous-type FAQPage) + FAQPage + BreadcrumbList | ⭐ P1 |

### Page avec vidéo
- Ajouter VideoObject (+ Clip si chapitres) au schema existant de la page | ⭐ P2 |

### Page événement
- WebPage + Event + BreadcrumbList | ⭐ PX |

## HTML sémantique pour la parsabilité IA

### Balises structurelles

- Utiliser les balises HTML5 sémantiques pour structurer chaque page : `<header>` (en-tête de page), `<nav>` (navigation), `<main>` (contenu principal), `<article>` (contenu autonome), `<section>` (section thématique), `<aside>` (contenu annexe), `<footer>` (pied de page) | ⭐ P0 |
- Le contenu principal de chaque page doit être encapsulé dans `<main>`. Les LLMs utilisent cette balise pour identifier le contenu pertinent en priorité et ignorer les éléments de navigation, sidebar et footer | ⭐ P0 |
- Chaque article de blog ou contenu éditorial autonome doit être encapsulé dans `<article>` | ✍️ P0 |
- [Webflow] Webflow permet d'attribuer des balises sémantiques à chaque élément via le panneau Settings > Tag. Par défaut, Webflow utilise des `<div>`. Remplacer systématiquement par les balises sémantiques appropriées | ⭐ P0 |

### Parsabilité du contenu pour les LLMs

- Rédiger des paragraphes autonomes de 50 à 150 mots, chacun pouvant être extrait et compris indépendamment du reste de la page. Les systèmes RAG évaluent des fragments, pas des pages entières | ⭐ P1 |
- Commencer chaque section par un résumé ou une définition en 1 à 2 phrases. Ce résumé constitue le "chunk" le plus susceptible d'être cité | ⭐ P1 |
- Structurer les informations en relations sujet-prédicat-objet explicites. Les LLMs extraient les données sous forme de triplets sémantiques | ⭐ P2 |
- Éviter les références pronominales ambiguës. Nommer explicitement les entités à chaque occurrence importante | ⭐ P1 |

## Liens on-site et off-site : SameAs

- Renseigner la propriété sameAs dans le schema Organization avec les URLs de tous les profils officiels : LinkedIn, YouTube, Instagram, Facebook, X (Twitter), Google Business Profile, Pages Jaunes, Wikidata, Wikipedia (si existant) | ⭐ P1 |
- La cohérence des informations entre le site et tous les profils SameAs est critique. Les LLMs recoupent les données entre sources pour vérifier la fiabilité | ⭐ P1 |
- Pour les personnes (auteurs, fondateurs) : renseigner sameAs dans le schema Person avec LinkedIn, profils conférenciers, publications tierces | ✍️ P2 | 🏢 P2 |

## Entités et Knowledge Graph

### Renforcement des entités pour le Knowledge Graph Google

- Le Knowledge Graph de Google construit une base de données d'entités (marques, personnes, lieux, produits) et de leurs relations. Être présent dans le Knowledge Graph renforce la confiance des moteurs classiques et des LLMs | ⭐ P2 |
- Conditions pour renforcer une entité : cohérence du nom sur le site et toutes les plateformes externes, schema Organization/Person avec sameAs vers des sources autoritaires, présence sur Wikipedia/Wikidata (si éligible), mentions dans des sources tierces reconnues | ⭐ P2 |
- Utiliser la propriété knowsAbout dans le schema Organization et Person pour indiquer explicitement les domaines d'expertise aux systèmes IA. Cette propriété n'est pas requise par Google mais aide les LLMs à évaluer l'autorité thématique | ⭐ P2 |
- Maintenir une fiche Google Business Profile complète et vérifiée (lié au Guide SEO Partie 3). Le GBP alimente directement le Knowledge Graph pour les entités locales | 📍 P0 |
- Pour les marques nouvelles : la présence dans le Knowledge Graph se construit progressivement via l'accumulation de mentions cohérentes, de données structurées et de couverture médiatique. Ce n'est pas un résultat immédiat | ⭐ P3 |

## Fichier llms.txt

### Convention et utilité

- Le fichier llms.txt est une convention émergente (proposée par Jeremy Howard, llmstxt.org, septembre 2024) permettant de guider les LLMs vers les ressources les plus importantes du site. C'est un fichier Markdown placé à la racine du site (/llms.txt) | ⭐ PX |
- Aucun fournisseur IA majeur (OpenAI, Google, Anthropic) n'a officiellement confirmé utiliser ce fichier pour la sélection de sources en 2025-2026. L'adoption reste expérimentale (~10 % des domaines selon les analyses disponibles). L'effort d'implémentation est faible et le risque est nul | ⭐ PX |

### Format et contenu

- Le fichier commence par un H1 avec le nom du site/entreprise, suivi d'un blockquote de 1 à 3 phrases résumant l'activité | ⭐ PX |
- Lister les pages les plus importantes du site organisées par catégorie (services, produits, guides, documentation, FAQ, pages clés) avec un lien et une description courte pour chaque page | ⭐ PX |
- Utiliser une section `## Optional` pour signaler aux agents IA les ressources secondaires qu'ils peuvent ignorer si leur fenêtre de contexte est limitée. Cette section est une convention du format qui permet aux agents de prioriser la lecture | ⭐ PX |
- Ne pas lister toutes les pages du site. Le llms.txt est une sélection curatée des ressources à plus forte valeur | ⭐ PX |
- Aligner le llms.txt avec le robots.txt et le sitemap : ne pas diriger les LLMs vers des pages bloquées par le robots.txt ou exclues du sitemap | ⭐ PX |
- Pour les sites à fort contenu documentaire (SaaS, aide en ligne, ressources techniques), envisager un fichier `llms-full.txt` complémentaire : version étendue qui concatène le contenu textuel complet de toutes les pages référencées. Utile pour les agents IA et IDE (Cursor, Windsurf) qui peuvent ingérer un corpus entier en une seule requête. Limiter à 100 000 tokens maximum pour rester exploitable | ⭐ PX |

### Implémentation Webflow

- [Webflow] Webflow ne permet pas de créer un fichier .txt à la racine du site nativement. Options : (1) créer une page /llms-txt avec le contenu Markdown en texte brut et un redirect 301 depuis /llms.txt, (2) héberger le fichier sur un sous-domaine ou via une solution tierce, (3) utiliser Cloudflare Workers si le site est derrière Cloudflare | ⭐ PX |

## Workflow Webflow complet pour le schema markup

### Schema statique (pages uniques)

- Pour les pages statiques (accueil, à propos, contact, services) : injecter le JSON-LD dans Page Settings > Custom Code > `<head>`. Le contenu est codé en dur et ne change pas dynamiquement | ⭐ P0 |
- Adapter manuellement le schema pour chaque page statique (modifier le @type WebPage, les propriétés spécifiques, les descriptions) | ⭐ P0 |
- Le schema Organization et WebSite ne doit être injecté que sur la page d'accueil. Les autres pages y font référence via @id | ⭐ P0 |

### Schema dynamique (pages CMS)

- Pour les pages CMS (articles de blog, fiches produits, pages locales, projets) : insérer un embed HTML contenant le JSON-LD directement dans le Collection Template | ⭐ P0 |
- Utiliser les champs dynamiques Webflow pour injecter les données variables dans le schema : titre (headline/name), description, image, date de publication, slug (pour construire les URLs), prix, catégorie | ⭐ P0 |
- Créer des champs CMS dédiés pour les données schema non couvertes par les champs standard : champ "Schema Author Name", champ "Schema Price", champ "Schema Availability", etc. Cela garantit que les données schema sont toujours synchronisées avec le contenu affiché | 🛍️ P1 | ✍️ P1 |
- Limitation : les champs dynamiques Webflow ne permettent pas de générer du JSON conditionnel (if/else). Si un produit a parfois un prix et parfois non, le schema doit être structuré pour gérer les deux cas ou deux templates séparés doivent être utilisés | 🛍️ P2 |

### Erreurs fréquentes Webflow et prévention

- **URLs relatives** : Webflow peut générer des URLs relatives dans les champs dynamiques. Toujours préfixer avec le domaine complet (https://example.com) dans le schema. Utiliser un champ "Site URL" global si nécessaire | ⭐ P0 |
- **Propriétés requises manquantes** : vérifier que chaque schema contient toutes les propriétés requises par Google. Un schema Product sans Offer.price ou un Article sans author est invalide | ⭐ P0 |
- **Format de date incorrect** : les dates doivent être en ISO 8601 complet (2026-03-24T10:00:00+02:00). Le format de date par défaut Webflow peut ne pas correspondre. Créer un champ CMS de type texte (pas date) pour maîtriser le format exact injecté dans le schema | ✍️ P0 | 🛍️ P1 |
- **Schemas dupliqués** : si Webflow AI génère un schema ET un schema manuel est présent dans le custom code, les deux coexistent et créent des conflits. Désactiver la génération automatique Webflow AI si un schema manuel est en place | ⭐ P0 |
- **Contenu schema ≠ contenu visible** : chaque donnée dans le schema doit correspondre exactement au contenu affiché sur la page. Ne jamais inclure dans le schema des informations absentes du contenu visible | ⭐ P0 |

### Validation post-publication

- Après chaque publication ou modification de page, tester l'URL publiée (pas le staging .webflow.io) dans Google Rich Results Test pour vérifier que le schema est valide et éligible aux résultats enrichis | ⭐ P0 |
- Tester également dans Schema Markup Validator pour détecter les erreurs de syntaxe non couvertes par le Rich Results Test | ⭐ P1 |
- Pour les pages CMS : tester au moins 3 à 5 items CMS différents pour s'assurer que le template dynamique fonctionne correctement avec des données variables | ⭐ P1 |
- Planifier une validation trimestrielle de l'ensemble des schemas du site pour détecter les régressions (mise à jour Webflow, modification de template, ajout de scripts tiers) | ⭐ P2 |

## Accessibilité des crawlers IA

### Robots.txt et crawlers génératifs

- Les principaux crawlers IA à connaître, organisés par fonction. Entraînement (formation des modèles) : GPTBot (OpenAI), Google-Extended (Google), ClaudeBot (Anthropic), Applebot-Extended (Apple). Recherche et citation (visibilité dans les réponses IA) : OAI-SearchBot (ChatGPT Search), PerplexityBot (Perplexity). Meta-ExternalAgent (Meta AI) remplit les deux fonctions | ⭐ P1 |
- Décision stratégique : autoriser ou bloquer chaque crawler dans robots.txt. Bloquer un crawler empêche l'utilisation du contenu pour l'entraînement IA mais peut aussi réduire la visibilité dans les réponses de ce moteur | ⭐ P1 |
- Si la visibilité GEO est souhaitée (ce qui est le cas pour la plupart des sites clients) : autoriser OAI-SearchBot (visibilité ChatGPT Search) et PerplexityBot (visibilité Perplexity). GPTBot concerne l'entraînement OpenAI : l'autoriser contribue indirectement à la qualité des modèles mais n'est pas requis pour apparaître dans ChatGPT Search. Google-Extended concerne l'entraînement IA Google (pas la recherche standard) : le bloquer n'affecte ni le SEO classique ni les AI Overviews | ⭐ P1 |
- [Webflow] Configurer les directives dans Site Settings > SEO > Robots.txt. Exemple pour autoriser les crawlers IA de recherche :
  ```
  User-agent: OAI-SearchBot
  Allow: /
  User-agent: PerplexityBot
  Allow: /
  ```
  | ⭐ P1 |

### Accessibilité technique du contenu

- S'assurer que le contenu principal est rendu en HTML statique, pas uniquement via JavaScript côté client. Les crawlers IA ne rendent pas toujours le JavaScript | ⭐ P0 |
- [Webflow] Le contenu Webflow est rendu côté serveur en HTML statique. Les éléments chargés via des scripts tiers (widgets, embeds JS) peuvent ne pas être accessibles aux crawlers IA | ⭐ P0 |
- Les contenus derrière un paywall, une authentification ou un formulaire sont inaccessibles aux crawlers IA. S'assurer que le contenu destiné à être cité est librement accessible | ⭐ P0 |
