# Glossaire & Index des Guides

Ce document sert de carte de navigation pour l'ensemble des Knowledge Files. Il indique où trouver chaque sujet, les règles de propriété (quel guide est la référence unique pour chaque thème), et le système d'annotations utilisé dans tous les guides.

## Comment utiliser ces guides

Ces guides sont des référentiels de bonnes pratiques, pas des checklists à appliquer mécaniquement. L'agent est invité à s'en servir comme base de raisonnement, puis à adapter ses recommandations au projet réel.

**Ces guides sont des référentiels, pas des checklists.** Chaque bullet est une recommandation valide dans son contexte. L'objectif est de savoir où chercher la bonne recommandation, pas d'exécuter l'intégralité d'un guide sur chaque projet. Un site vitrine de 10 pages et un e-commerce de 5 000 références n'appellent pas les mêmes priorités, même si les deux lisent les mêmes guides.

**Les niveaux de priorité sont des points de départ, pas des règles absolues.** P0 est calibré pour le cas général du type de site annoté. Le contexte projet (budget, maturité SEO, objectifs, historique) prime toujours sur la priorité par défaut. Un P0 pour un e-commerce n'est pas un P0 pour un blog éditorial qui ne vend rien.

**Les annotations de type de site sont indicatives du périmètre d'application, pas de la fréquence d'application.** ⭐ signifie "applicable à tous les types de sites dans leur contexte naturel", pas "à faire sur chaque page du site". Un bullet ⭐ sur la structure answer-first s'applique aux pages ciblant des requêtes interrogatives, pas à une page CGV. Un bullet 🛍️ sur les variantes produit ne concerne que les sites e-commerce ayant un catalogue avec variantes.

**L'expertise de l'agent est la couche finale.** Ces guides synthétisent les meilleures pratiques du secteur à une date donnée. Ils ne remplacent pas l'analyse de la situation spécifique : secteur d'activité, niveau de concurrence SERP, ressources disponibles, contraintes techniques, priorités business du client. Face à une recommandation du guide qui ne s'applique pas au projet, l'agent l'écarte. Face à une situation non couverte, l'agent raisonne par analogie à partir des principes sous-jacents.

## Système d'annotations

### Types de site

| Emoji | Code | Description |
|-------|------|-------------|
| ⭐ | Tous | Applicable à tous les types de sites |
| 🏢 | V | Site vitrine (indépendant, consultant, agence, SaaS) |
| 🛍️ | C | Site e-commerce |
| ✍️ | B | Blog ou contenu éditorial |
| 📍 | L | Local (complément d'un site vitrine ou e-commerce ciblant une zone géographique) |

Les combinaisons sont possibles : 🏢📍 = vitrine local, 🛍️📍 = e-commerce local, 🏢✍️ = vitrine avec blog.

### Niveaux de priorité

| Code | Nom | Définition | Critères |
|------|-----|------------|----------|
| P0 | Nécessaire | Stricte nécessaire pour être indexé et référencé au minimum | Risque élevé si absent, souvent effort faible |
| P1 | Base | Bon référencement standard, à faire systématiquement | Quickwins à gain réel, fondations SEO solides |
| P2 | Amélioré | Avantage concurrentiel | Effort modéré, gain mesurable |
| P3 | Performant | Optimisation poussée, gain systématique | Effort modéré à élevé, toujours pertinent si le budget le permet |
| PX | Contextuel | Effort élevé, gain potentiellement fort selon le projet | Pertinence à évaluer au cas par cas selon le type de site et les objectifs |

La priorité est calculée selon 3 critères pondérés :
1. **Impact négatif si absent** (risque) : le site est-il pénalisé ou invisible sans cet élément ?
2. **Temps de travail** (effort) : quickwin ou chantier long ?
3. **Gain réel** (pertinence) : est-ce que ça déplace concrètement les positions, le trafic ou la conversion ?

## Inventaire des guides

### SEO_1 — Architecture, Contenu & Métadonnées

Fondations de la structure du site et du contenu on-page.

**Sujets couverts :**
- Arborescence du site (profondeur de clic, silos, page dédiée par intention)
- Structure d'URL (slugs, hiérarchie, convention de nommage)
- Pagination (e-commerce, blog)
- Filtres à facettes (e-commerce, indexation sélective)
- Topical authority (clusters de pages services ET clusters éditoriaux, deux modèles distincts)
- Modèle hub & spoke / cocon sémantique
- Couverture thématique
- Balises Hn (hiérarchie, cannibalisation)
- Densité et placement des mots-clés
- Longueur de contenu par type de page (fourchettes indicatives à adapter selon l'analyse concurrentielle)
- Structure des paragraphes
- Unicité du contenu
- Meta title, meta description, canonical
- Open Graph et Twitter Cards
- Meta robots (index/noindex, staging)

### SEO_2 — Images, Video, Maillage & Technique

Optimisation des médias, du maillage interne et de l'infrastructure technique.

**Sujets couverts :**
- Formats et compression d'images (WebP, AVIF, fallbacks)
- Attributs alt (rédaction, longueur, images liens, images décoratives)
- Nommage des fichiers images
- Légendes
- Image sitemap
- Lazy loading (sélectif : below the fold uniquement)
- Video SEO (fondamentaux, vidéos YouTube intégrées, connexion bidirectionnelle YouTube/site, schema VideoObject)
- Maillage interne (logique de linking, nombre de liens, mise à jour)
- Anchor texts (descriptifs, variation, pièges à éviter)
- Distribution du PageRank interne
- Liens sortants (outbound links vers sources de référence)
- Breadcrumbs (fil d'Ariane comme outil de maillage)
- Pages orphelines
- Core Web Vitals (LCP, INP, CLS avec seuils techniques)
- fetchpriority="high" (optimisation LCP image hero)
- Optimisation des polices (variantes, hébergement, preconnect)
- Mobile-first indexing
- Crawl budget
- Robots.txt
- Sitemap XML
- IndexNow (notification temps réel, limite Webflow)
- Redirections 301 (pas de limite fixe, recommandation 1 000 règles maximum, wildcards disponibles)
- Gestion des erreurs 404 et soft 404
- Staging (.webflow.io)
- HTTPS et HSTS (activation automatique Webflow juillet 2024)
- Hreflang (multilingue)
- SEO des documents PDF

### SEO_3 — Local, EEAT, Freshness, IA & Trust

SEO local, signaux de qualité et de confiance, gestion du contenu dans le temps.

**Sujets couverts :**
- Google Business Profile (configuration, catégories, photos, Posts, Q&A)
- GBP sans adresse physique (Service Area Business, zone de desserte)
- NAP consistency
- Pages locales (contenu unique par zone, CMS Collection Webflow)
- Stratégie multi-locations
- Avis et gestion de la réputation
- Citations et annuaires locaux
- Link building local (partenaires, événements, associations, CCI)
- E-E-A-T : Experience (preuves de terrain, études de cas)
- E-E-A-T : Expertise (pages auteurs, bylines, YMYL)
- E-E-A-T : Authoritativeness (page À propos, portfolio, mentions médias, liens sortants)
- E-E-A-T : Trustworthiness (fiabilité, contact, email domaine propre, exactitude, politique éditoriale)
- Content freshness (dates, signaux de fraîcheur, stratégie de mise à jour)
- Contenus evergreen vs contenus d'actualité
- Content pruning (élagage, consolidation, audit semestriel/annuel)
- Contenu généré par IA (position Google, bonnes pratiques, supervision humaine)
- Disclosure IA (transparence, métadonnées IPTC, Google Merchant Center)
- Trust signals : SSL, pages légales françaises (mentions légales, RGPD, CGV, CGU, cookies)
- Signaux de confiance on-site (logos, témoignages, badges, réassurance e-commerce)

### GEO — Generative Engine Optimization

Optimisation pour être cité par les moteurs génératifs (Google AI Overviews, ChatGPT, Perplexity, Gemini).

**Sujets couverts :**
- Fonctionnement des moteurs génératifs (RAG, sélection de sources, évaluation par fragments)
- Différences entre plateformes (Google AI Overviews, ChatGPT Search, Perplexity, Gemini)
- Structure pour la citabilité (answer-first 200 mots, chunks autonomes 50-150 mots, enrichissement factuel, bloc "Ce qu'il faut retenir")
- Types de contenus à produire pour le GEO (comparatifs, listicles, guides, FAQ, données structurées, études de cas)
- Signaux d'autorité GEO (autorité de marque, présence multi-plateforme, mentions non liées, earned media)
- Digital PR et relations presse
- Présence sur les plateformes communautaires (Reddit, LinkedIn, YouTube, forums)
- Optimisation sémantique (couverture topicale, entités nommées, nomenclature stable, relations sémantiques)
- Stratégie branded vs non-branded queries
- Différenciation GEO vs SEO classique
- Différenciation GEO vs AEO
- Préparation à la recherche agentique (agentic search, contenus decision-ready)
- KPIs et suivi (fréquence de citation, part de voix IA, trafic referral, limites actuelles)

### AEO — Answer Engine Optimization

Optimisation pour les featured snippets, People Also Ask, voice search et réponses zero-click.

**Sujets couverts :**
- Types de résultats ciblés (featured snippets 4 formats, PAA, knowledge panels, voice search, rich results)
- Recherche et sourcing des questions AEO (Google Suggest, PAA mining, outils, questions clients, forums)
- Priorisation des requêtes (snippet capturable, alignement conversion, volume, faisabilité)
- Structure "answer-first" (réponse directe 40-60 mots, format adapté au type de snippet, scope d'application par type de page)
- Anticipation des questions de suivi (multi-turn)
- Optimisation pour les sous-requêtes (query fan-out)
- Balisage des questions (Hn en format question, patterns de formulation)
- Schema markup dédié AEO (FAQPage, HowTo, QAPage, Speakable — mention du rôle, specs techniques dans le Guide AIO)
- Optimisation voice search (formulations conversationnelles, longue traîne, voice search local)
- Contenu FAQ (rédaction, placement, intégration au maillage et à la conversion)
- AEO spécifique e-commerce (pages décision d'achat, comparatifs, fiches produits optimisées snippet)
- Stratégie zero-click (branding dans les snippets, mesure d'impact)

### AIO — AI Optimization

Structuration technique pour les LLMs et les systèmes IA. Propriétaire exclusif de toutes les spécifications schema markup.

**Sujets couverts :**
- Rôle du schema (facilitateur, pas garantie de visibilité IA)
- Format JSON-LD et implémentation (placement, blocs multiples)
- Graphe d'entités et @id (unicité, références croisées, pas de duplication)
- Structure @graph (regroupement multi-entités dans un seul bloc)
- Validation (Rich Results Test, Schema Markup Validator, post-publication)
- Schema markup complet (18 types) : Organization, WebSite, WebPage, BreadcrumbList, Article/BlogPosting, Person/ProfilePage, LocalBusiness, Product/Offer, AggregateRating/Review, Service, FAQPage, HowTo, QAPage, Speakable, VideoObject/Clip/SeekToAction/BroadcastEvent, Event, SiteNavigationElement
- Propriétés GEO à forte valeur : isAccessibleForFree, additionalProperty (Product), serviceOutput (Service), knowsAbout
- Cartographie "quel schema sur quelle page" (12 types de pages)
- HTML sémantique (balises HTML5 : main, article, section, nav, header, footer, aside)
- Parsabilité pour les LLMs (paragraphes autonomes, résumés, triplets sémantiques)
- SameAs (profils sociaux, GBP, Wikidata, Wikipedia)
- Entités et Knowledge Graph (renforcement, knowsAbout, construction progressive)
- Fichier llms.txt (convention, format, statut d'adoption, llms-full.txt, section Optional, implémentation Webflow)
- Workflow Webflow complet pour le schema (statique vs dynamique CMS, erreurs fréquentes, validation post-publication)
- Accessibilité des crawlers IA (distinction entraînement vs recherche/citation : GPTBot, Google-Extended, ClaudeBot, Applebot-Extended, Meta-ExternalAgent pour l'entraînement ; OAI-SearchBot, PerplexityBot pour la visibilité dans les réponses IA)

### SXO — Search Experience Optimization

Couche expérience utilisateur et conversion. Tout ce qui se passe après le clic.

**Sujets couverts :**
- Architecture de conversion (funnel awareness > consideration > decision, parcours vitrine vs e-commerce)
- Landing pages (structure optimale, above the fold, placement CTA, preuve sociale, urgence)
- Signaux comportementaux (dwell time, scroll depth, pogo-sticking, taux de rebond)
- Impact UX des Core Web Vitals (perception utilisateur, pas les seuils techniques)
- Navigation et UX (menu 5-7 items, breadcrumb comme outil UX, recherche interne, accessibilité WCAG)
- Microcopy et copywriting de conversion (boutons, formulaires, erreurs, confirmation)
- Preuves sociales on-site (témoignages, chiffres, logos, avis produits, études de cas)
- Mobile-first UX (zones tactiles, zone de pouce, simplification, breakpoints Webflow)
- Maillage orienté conversion (CTA contextuels, cross-selling, upselling, Reference Fields Webflow)
- Cookie consent et RGPD (bandeau non intrusif, "Refuser tout" visible, solutions tierces Webflow)
- Personnalisation et A/B testing (Webflow Optimize, add-on payant, alternatives tierces)
- E-commerce UX (pages catégories, produits épuisés, processus panier/checkout, navigation supprimée au checkout, réassurance)

## Règles de propriété des sujets

Chaque sujet est traité dans un seul guide propriétaire. Les autres guides peuvent y faire référence sans le détailler.

| Sujet | Guide propriétaire | Autres guides qui y font référence |
|-------|-------------------|--------------------------------------|
| Schema markup (specs JSON-LD, propriétés, validation) | AIO | AEO (mention du rôle), SEO_2 (VideoObject mention), SEO_3 (LocalBusiness mention) |
| E-E-A-T (signaux on-site) | SEO_3 | GEO (signaux d'autorité off-site uniquement) |
| Featured snippets | AEO | GEO (différenciation avec AI Overviews) |
| Core Web Vitals (seuils techniques) | SEO_2 | SXO (impact UX perçu uniquement) |
| Structure des contenus (Hn, mots-clés) | SEO_1 | AIO (parsabilité LLMs), AEO (format answer-first) |
| Maillage interne (logique SEO, anchors, PageRank) | SEO_2 | SXO (maillage comme parcours de conversion) |
| Breadcrumbs | SEO_2 (maillage) + AIO (schema) | SXO (navigation UX) |
| Content freshness | SEO_3 | GEO (fraîcheur comme signal de citation IA) |
| Contenu généré par IA | SEO_3 | — |
| Pages locales et GBP | SEO_3 | AIO (schema LocalBusiness) |
| Cookie consent et RGPD | SXO | — |
| Crawlers IA et robots.txt | AIO | GEO (mention de la décision stratégique) |
| llms.txt | AIO | GEO (mention de l'existence) |
| Video SEO | SEO_2 | AIO (schema VideoObject specs) |
| FAQ (rédaction, placement, stratégie) | AEO | AIO (schema FAQPage specs) |
| Architecture de conversion et funnel | SXO | — |
| Signaux comportementaux (dwell time, pogo-sticking) | SXO | — |
| Voice search | AEO | — |
| Digital PR et earned media | GEO | — |
| Recherche agentique (agentic search) | GEO | — |
| IndexNow | SEO_2 | — |
| HSTS | SEO_2 | — |
| Email domaine propre (signal Trust) | SEO_3 | — |
| GBP sans adresse physique (SAB) | SEO_3 | — |
| fetchpriority="high" | SEO_2 | — |
| additionalProperty, serviceOutput, isAccessibleForFree | AIO | — |
| Bloc "Ce qu'il faut retenir" (GEO) | GEO | — |
| llms-full.txt et section Optional | AIO | — |

## Cartographie par type de page

L'agent utilise ce tableau comme point d'entrée : pour chaque type de page à créer, il identifie les guides à consulter en priorité et les schemas à implémenter.

| Type de page | Guides prioritaires | Schemas à implémenter |
|---|---|---|
| Accueil | SEO_1 (contenu, mots-clés), SEO_3 (E-E-A-T, Trust), AIO (schema), GEO (entités) | WebSite + Organization (ou LocalBusiness) + BreadcrumbList |
| À propos | SEO_3 (E-E-A-T Expertise + Authoritativeness), AIO (schema), GEO (autorité d'entité) | AboutPage + Person (founder) > worksFor > Organization |
| Contact | SEO_3 (Trustworthiness, NAP), AIO (schema), SEO_1 (maillage) | ContactPage + Organization (avec contactPoint) |
| Page service / prestation | SEO_1 (contenu, clusters), AEO (FAQ, snippets), AIO (schema), SXO (conversion) | WebPage + Service (avec serviceOutput, areaServed) + BreadcrumbList + FAQPage |
| Page locale | SEO_3 (local SEO, GBP, NAP), AIO (schema), SEO_1 (contenu) | WebPage + LocalBusiness (avec geo, openingHours) + BreadcrumbList |
| Page catégorie (e-commerce) | SEO_1 (arborescence, filtres), SXO (UX catégorie), AIO (schema), AEO (snippets) | CollectionPage + BreadcrumbList + FAQPage |
| Fiche produit | SEO_1 (contenu), SXO (UX produit, réassurance), AIO (schema), AEO (snippets) | Product + Offer + BreadcrumbList + AggregateRating + FAQPage |
| Article de blog | SEO_1 (contenu, Hn), SEO_3 (freshness, E-E-A-T), AEO (FAQ, snippets), GEO (citabilité), AIO (schema) | BlogPosting + Person (author) + Organization (publisher) + BreadcrumbList |
| Page FAQ dédiée | AEO (rédaction, structure), AIO (schema) | FAQPage > Question > acceptedAnswer |
| Page tutoriel / guide | AEO (HowTo), SEO_1 (contenu long), GEO (citabilité), AIO (schema) | HowTo + BreadcrumbList |
| Page portfolio / listing | SEO_1 (arborescence), AIO (schema), SXO (UX listing) | CollectionPage > ItemList + BreadcrumbList |
| Page légale (CGV, mentions, RGPD) | SEO_3 (Trust signals), AIO (schema, WebPage) | WebPage (sous-type pertinent) |

## Contrainte technique transversale

Tous les sites sont construits via **Webflow**. Chaque guide intègre les spécificités et limitations Webflow directement dans les recommandations concernées, préfixées par [Webflow].

Points Webflow transversaux à retenir :
- Le contenu Webflow est rendu en HTML statique côté serveur (bon pour le crawl)
- Webflow génère automatiquement un sitemap XML, des canonicals auto-référents, et gère le SSL
- Le staging .webflow.io est automatiquement en noindex
- Le robots.txt est global (un seul champ dans Site Settings)
- Le schema doit être implémenté manuellement (custom code ou embed CMS)
- Webflow AI peut générer des meta descriptions, alt texts et schema mais les résultats doivent toujours être vérifiés
- Les redirections 301 n'ont pas de limite fixe (recommandation : ne pas dépasser 1 000 règles pour éviter une dégradation des performances). Les wildcards via capture groups sont disponibles. Pas de redirections par regex complexes
- Le hreflang est géré automatiquement via le module Localization (disponible depuis 2023). Sans Localization, implémenter via custom code ou Weglot
- Le llms.txt n'est pas natif (workaround nécessaire, spécifications dans le guide AIO)

Contraintes architecturales critiques à évaluer en amont de chaque projet (détail complet dans SEO_1) :
- 20 collections sur le plan CMS, 40 sur le plan Business (dont 3 réservées si E-Commerce activé sur les deux plans)
- 10 champs Reference et Multi-Reference combinés par collection maximum (relevé de 5 à 10 pour tous les plans en juillet 2024)
- Seuils d'items : 2 000 (plan CMS), 10 000 de base (plan Business, extensible à 20 000 via add-ons payants)
- Pas de relations many-to-many natives (collection pivot requise)
- Slugs e-commerce non modifiables : `/products/` et `/categories/` sont réservés et figés
- URLs CMS toujours plates (un seul niveau de profondeur : `/collection/item/`), pas de sous-dossiers natifs
- Incompatibilité totale entre le module E-Commerce et le module Localization : les collections produits ne peuvent pas être localisées
