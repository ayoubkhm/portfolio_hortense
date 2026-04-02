# SEO — Partie 3 : Local SEO, E-E-A-T, Content Freshness, Contenu IA, Trust Signals

## Légende des annotations

**Types de site :** ⭐ Tous | 🏢 Vitrine | 🛍️ E-commerce | ✍️ Blog/Éditorial | 📍 Local (complément)

**Priorités :** P0 Nécessaire | P1 Base | P2 Amélioré | P3 Performant | PX Contextuel (effort élevé, gain potentiellement fort selon le projet)

## Local SEO

### Google Business Profile (GBP)

- Créer et vérifier un profil Google Business Profile pour chaque établissement physique. La vérification est indispensable pour accéder aux fonctionnalités avancées et apparaître dans le Local Pack | 📍 P0 |
- Pour les entreprises sans adresse publique (e-commerce pur, prestataires à domicile, indépendants), créer une fiche en statut "Établissement de services de proximité" (Service Area Business) : l'adresse est renseignée pour validation mais masquée publiquement, et jusqu'à 20 zones de desserte (villes, codes postaux) sont définies à la place. Ce statut permet de collecter des avis Google et de bénéficier d'un Knowledge Panel sur les recherches de marque. Limite : une adresse physique affichée pèse davantage dans le positionnement local qu'une simple zone de desserte | 📍 P1 |
- Remplir 100 % des champs disponibles : nom de l'entreprise, adresse, téléphone, site web, horaires, description (750 caractères max), catégories, attributs, zone de service | 📍 P0 |
- Sélectionner la catégorie principale avec précision (elle détermine les requêtes locales pour lesquelles le profil apparaît). Ajouter 3 à 5 catégories secondaires pertinentes | 📍 P0 |
- Rédiger la description en intégrant naturellement les mots-clés locaux et les services principaux. Inclure la zone géographique ciblée, la proposition de valeur et un appel à l'action | 📍 P1 |
- Ajouter des photos de qualité professionnelle : extérieur, intérieur, équipe, produits/services, ambiance. Les profils avec photos reçoivent 42 % plus de demandes d'itinéraire et 35 % plus de clics vers le site (données BrightLocal) | 📍 P1 |
- Publier des Google Posts régulièrement (1 à 2 par semaine minimum) : actualités, offres, événements, nouveautés. Les Posts maintiennent le profil actif et fournissent des opportunités supplémentaires de classement sur des mots-clés locaux | 📍 P2 |
- Note : Google a retiré en 2024 deux fonctionnalités GBP : la messagerie instantanée (chat GBP, retirée en juillet 2024) et les sites web hébergés sur GBP (Websites retirés en mars 2024). Ne pas se reposer sur ces canaux dans une stratégie locale. Rediriger les contacts vers le site, le téléphone ou un formulaire | 📍 P1 |
- Gérer la section Questions/Réponses : publier proactivement les questions fréquentes avec des réponses détaillées contenant des mots-clés locaux | 📍 P2 |
- Lier le GBP vers la page locale dédiée du site (pas vers la page d'accueil, sauf pour les entreprises mono-établissement) | 📍 P0 |

### NAP consistency (Name, Address, Phone)

- S'assurer que le nom, l'adresse et le numéro de téléphone sont strictement identiques sur le GBP, le site web, et tous les annuaires et citations tiers | 📍 P0 |
- Aucune variation : pas d'abréviation sur un support et le mot complet sur un autre (ex : "Bd" vs "Boulevard", "St" vs "Saint") | 📍 P0 |
- Afficher le NAP complet sur chaque page du site, idéalement dans le footer (visible sur toutes les pages) | 📍 P0 |
- Utiliser le schema LocalBusiness pour structurer le NAP sur le site (les spécifications techniques du schema sont traitées dans le Guide AIO) | 📍 P1 |

### Pages locales

- Créer une page locale dédiée pour chaque ville ou zone géographique ciblée. Chaque page locale doit offrir un contenu unique et substantiel (pas de simple duplication avec remplacement du nom de ville) | 📍 P1 |
- Contenu minimum par page locale : description du service dans le contexte local, avantages spécifiques à la zone, témoignages clients locaux, informations pratiques (accès, horaires), carte intégrée | 📍 P1 |
- Optimiser le H1, le meta title et la meta description de chaque page locale avec le format : "[Service] + [Ville/Zone]" | 📍 P0 |
- Inclure des références locales authentiques (noms de quartiers, points de repère, spécificités de la zone) pour démontrer une connaissance réelle du territoire | 📍 P2 |
- Intégrer une Google Map embarquée sur chaque page locale | 📍 P1 |
- [Webflow] Créer les pages locales via une CMS Collection "Villes" ou "Zones" avec des champs dynamiques (ville, description locale, témoignages, coordonnées GPS pour la carte). Le Collection Template génère automatiquement une page par item. Pour les réseaux multi-locations larges, tenir compte de la limite de 5 000 items par collection et du plan CMS retenu (2 000 items sur CMS, 10 000 sur Business) | 📍 P1 |

### Stratégie multi-locations

- Créer un profil GBP distinct pour chaque établissement physique | 📍 PX |
- Créer une page locale unique sur le site pour chaque établissement, avec son propre contenu, ses propres témoignages et ses propres informations de contact | 📍 PX |
- Structurer l'URL en /locations/nom-de-la-ville/ ou /ville/ selon l'arborescence du site | 📍 PX |
- Lier chaque profil GBP vers sa page locale dédiée (pas vers une page commune) | 📍 PX |
- Chaque page locale doit contenir son propre schema LocalBusiness (traité dans le Guide AIO) | 📍 PX |

### Avis et gestion de la réputation

- Solliciter activement les avis clients après chaque prestation ou achat. Faciliter le processus avec un lien direct vers la page d'avis Google (disponible dans le GBP via le bouton "Demander des avis" ou via le lien de partage/QR code) | 📍 P1 | 🛍️ P1 |
- Répondre à chaque avis (positifs et négatifs) de manière personnalisée. Les réponses personnalisées renforcent la confiance et fournissent du contenu supplémentaire indexable | 📍 P1 | 🛍️ P1 |
- Pour les avis négatifs : répondre de manière constructive, reconnaître le problème, proposer une solution. Ne jamais ignorer un avis négatif | 📍 P1 | 🛍️ P1 |
- Viser une note moyenne supérieure à 4,0 et un volume d'avis en croissance régulière (les avis récents pèsent plus que les anciens dans l'algorithme local) | 📍 P2 |
- Diversifier les plateformes d'avis selon le secteur : Google, Pages Jaunes, TripAdvisor (restauration/tourisme), Trustpilot (e-commerce), plateformes sectorielles | 📍 P2 | 🛍️ P2 |

### Citations et annuaires locaux

- Inscrire l'entreprise dans les annuaires locaux et nationaux de référence : Pages Jaunes, Yelp, 118 712, annuaires sectoriels, chambres de commerce locales | 📍 P1 |
- Maintenir la cohérence NAP sur chaque citation | 📍 P0 |
- Privilégier la qualité et la pertinence des citations plutôt que la quantité. Les citations provenant de sources locales et sectorielles reconnues ont plus de poids | 📍 P2 |

### Link building local

- Obtenir des liens depuis les sites des partenaires commerciaux locaux, fournisseurs, clients (échange de visibilité avec lien) | 📍 P2 |
- Sponsoriser ou participer à des événements locaux (associations, clubs sportifs, événements caritatifs) qui génèrent un lien depuis le site de l'organisateur | 📍 P3 |
- Adhérer aux chambres de commerce, associations professionnelles et réseaux d'entreprises locaux. Ces organismes publient généralement un annuaire de membres avec un lien vers le site | 📍 P2 |
- Proposer des témoignages ou des études de cas aux fournisseurs et partenaires en échange d'une publication avec lien sur leur site | 📍 P3 |
- Les liens locaux les plus efficaces proviennent de sites éditorialement pertinents et géographiquement proches (médias locaux, blogs locaux, sites d'associations du territoire) | 📍 P3 |

## E-E-A-T (signaux on-site)

### Experience (Expérience)

- Intégrer des preuves d'expérience de terrain dans le contenu : études de cas, récits de projets réalisés, photos de processus, captures d'écran de résultats, exemples concrets issus de la pratique | ⭐ P1 |
- Utiliser la première personne ou des formulations indiquant une expérience vécue quand le contexte le permet ("Après 5 ans d'accompagnement de clients e-commerce, nous constatons que...") | 🏢✍️ P2 |
- Inclure des marqueurs temporels et des données chiffrées issues de l'expérience réelle (conversion : les chiffres concrets augmentent la crédibilité et le taux de conversion) | ⭐ P2 |
- Pour les pages produits et services : intégrer des témoignages clients détaillés décrivant leur expérience d'utilisation | 🛍️🏢 P1 |

### Expertise

- Créer une page auteur dédiée pour chaque contributeur de contenu. La page auteur doit présenter : nom complet, photo, parcours professionnel, qualifications pertinentes, domaines d'expertise, liens vers des publications ou profils professionnels (LinkedIn, portfolios) | ✍️ P1 | 🏢 P2 |
- Ajouter un byline (signature auteur) sur chaque article de blog et contenu éditorial, avec un lien vers la page auteur | ✍️ P1 |
- Utiliser le schema Person et ProfilePage sur les pages auteurs (spécifications dans le Guide AIO) | ✍️ P2 | 🏢 P3 |
- Pour les sujets YMYL (santé, finance, juridique) : mentionner explicitement les qualifications professionnelles, certifications et accréditations de l'auteur | ⭐ P0 |
- Démontrer l'expertise par la profondeur du contenu : couverture exhaustive, terminologie spécialisée maîtrisée, références à des sources primaires | ⭐ P1 |

### Authoritativeness (Autorité)

- Créer une page "À propos" détaillée présentant l'entreprise, son histoire, sa mission, ses valeurs, ses réalisations et son équipe | ⭐ P0 |
- Publier une page "Références" ou "Portfolio" avec les clients accompagnés, les projets réalisés et les résultats obtenus | 🏢 P1 |
- Afficher les prix, récompenses, certifications et accréditations professionnelles sur le site | ⭐ P2 |
- Lier vers les mentions médias, interviews, publications tierces où l'entreprise ou ses membres sont cités | ⭐ P3 |
- Citer des sources fiables dans le contenu (études, rapports, données officielles) avec des liens sortants vers ces sources. Google interprète les liens sortants vers des sources de référence comme un signal de fiabilité | ⭐ P1 |

### Trustworthiness (Fiabilité)

- La fiabilité est le pilier central de E-E-A-T selon Google : sans fiabilité, les autres signaux perdent leur valeur | ⭐ P0 |
- Afficher des informations de contact complètes et facilement accessibles (adresse, téléphone, email, formulaire de contact) | ⭐ P0 |
- Utiliser une adresse email sur domaine propre (contact@marque.fr) plutôt qu'une adresse générique (Gmail, Hotmail). Un email sur domaine propre renforce la crédibilité de l'entité aux yeux de Google et des LLMs qui croisent les sources pour valider l'existence d'une marque | ⭐ P1 |
- Rendre les informations légales accessibles : mentions légales, CGV/CGU, politique de confidentialité, politique de cookies | ⭐ P0 |
- Garantir l'exactitude factuelle de tout le contenu publié. Mettre en place un processus de relecture et de vérification des faits avant publication | ⭐ P0 |
- Corriger publiquement les erreurs lorsqu'elles sont identifiées (dates de correction, notes éditoriales) | ✍️ P2 | 🏢🛍️ P3 |
- Pour le e-commerce : afficher les conditions de retour, les garanties, les méthodes de paiement sécurisées, les certifications de sécurité | 🛍️ P0 |
- Publier une page "Politique éditoriale" (editorial policy) décrivant les standards de qualité du contenu, le processus de révision, les critères de publication et les qualifications des auteurs. Ce signal de transparence est particulièrement fort pour les sites avec un blog actif ou les sujets YMYL | ✍️ P2 | 🏢 P3 |

## Content freshness

### Signaux de fraîcheur

- Afficher la date de publication ET la date de dernière mise à jour sur chaque article de blog et contenu éditorial. Google utilise ces dates comme signal de fraîcheur | ✍️ P0 | 🏢🛍️ P1 |
- Formater les dates de manière non ambiguë (ex : "15 mars 2026" et non "15/03/26") | ⭐ P0 |
- Ne pas modifier la date de mise à jour sans apporter de changement substantiel au contenu (Google détecte les fausses mises à jour) | ⭐ P0 |
- Utiliser le schema datePublished et dateModified sur chaque page de contenu (spécifications dans le Guide AIO) | ✍️ P1 | 🏢🛍️ P2 |
- [Webflow] Les Collections CMS disposent de champs date natifs (Date, DateTime). Créer deux champs dédiés "Date de publication" et "Date de mise à jour" dans chaque collection de contenu, les afficher sur la page et les injecter dans le JSON-LD via un embed dynamique. Ne jamais s'appuyer uniquement sur la date système de l'item CMS : elle ne reflète pas les mises à jour de contenu si elles passent par un re-publish sans modification du champ date | ✍️ P1 | 🏢🛍️ P2 |

### Stratégie de mise à jour

- Auditer le contenu existant tous les 3 à 6 mois pour identifier les articles obsolètes, les données périmées et les liens cassés | ⭐ P2 |
- Mettre à jour les contenus existants performants plutôt que d'en créer de nouveaux sur le même sujet. Google favorise les pages mises à jour régulièrement | ✍️ P1 | 🏢🛍️ P2 |
- Lors de la mise à jour : actualiser les données chiffrées, ajouter les évolutions récentes, enrichir avec de nouveaux exemples, supprimer les informations devenues incorrectes | ⭐ P2 |
- Republier les contenus mis à jour significativement avec une date de modification actualisée | ✍️ P1 |
- Planifier un calendrier éditorial intégrant à la fois du contenu neuf et des mises à jour de contenu existant | ✍️ P2 | 🏢🛍️ P3 |

### Contenus evergreen vs contenus d'actualité

- Concevoir la majorité du contenu comme evergreen (pertinent sur la durée) : guides, tutoriels, pages services, FAQ | ⭐ P1 |
- Les contenus d'actualité (tendances, nouveautés) servent à signaler l'activité du site et à capter des requêtes ponctuelles. Les intégrer au calendrier éditorial sans qu'ils deviennent la majorité du corpus | ✍️ P2 |
- Archiver ou rediriger les contenus d'actualité devenus obsolètes pour éviter l'accumulation de pages thin | ✍️ P2 |

### Content pruning (élagage de contenu)

- Identifier les pages à faible performance qui diluent l'autorité thématique du site : pages à zéro trafic organique depuis 6+ mois, pages thin (contenu insuffisant), pages redondantes couvrant le même sujet qu'une autre page plus performante | ⭐ P2 |
- Pour chaque page identifiée, choisir l'action appropriée : consolider (fusionner le contenu avec une page plus forte et rediriger en 301), mettre à jour (enrichir si le sujet reste pertinent), supprimer et rediriger en 301 (si le sujet n'est plus pertinent) | ⭐ P2 |
- Ne jamais supprimer une page sans vérifier si elle reçoit des backlinks. Si oui, rediriger en 301 vers la page la plus pertinente pour conserver le PageRank | ⭐ P1 |
- Le pruning améliore le crawl budget (moins de pages inutiles à crawler), la topical authority (suppression de la dilution) et la qualité globale perçue par Google | ⭐ P2 |
- Intégrer le pruning dans le calendrier éditorial : audit de contenu semestriel pour les sites à forte production, annuel pour les sites vitrines | ✍️ P2 | 🏢🛍️ P3 |

## Contenu généré par IA

### Position officielle Google

- Google ne pénalise pas le contenu généré par IA en tant que tel. La position officielle (Google Search Central) est claire : le contenu est évalué sur sa qualité et son utilité, pas sur sa méthode de production | ⭐ P0 |
- Ce qui est pénalisé : le contenu produit en masse par IA sans valeur ajoutée, sans supervision humaine, et dont l'objectif principal est de manipuler les classements (classé "scaled content abuse" dans les spam policies de Google) | ⭐ P0 |
- Les Quality Rater Guidelines (mise à jour janvier 2025) précisent qu'un contenu dont la quasi-totalité est générée par IA sans effort, originalité ni valeur ajoutée peut recevoir la note la plus basse ("Lowest") | ⭐ P0 |

### Bonnes pratiques

- Utiliser l'IA comme outil d'assistance à la création, pas comme générateur autonome. Chaque contenu doit passer par une supervision humaine : vérification factuelle, enrichissement avec des données originales, ajout d'expérience et d'expertise personnelles | ⭐ P0 |
- Apporter une valeur ajoutée que l'IA seule ne peut pas fournir : expérience de terrain, données propriétaires, exemples concrets, analyse originale, point de vue argumenté | ⭐ P0 |
- Ne pas publier de contenu IA brut (non relu, non enrichi). Réécrire et personnaliser chaque contenu pour qu'il reflète l'expertise et la voix de la marque | ⭐ P0 |
- Vérifier systématiquement l'exactitude de toutes les données factuelles, citations et références générées par l'IA | ⭐ P0 |

### Disclosure (transparence)

- Ajouter une mention d'utilisation de l'IA quand les lecteurs s'attendent raisonnablement à savoir comment le contenu a été produit (recommandation Google, pas obligation) | ⭐ P2 |
- Ne pas attribuer un byline d'auteur à l'IA. La mention de l'IA doit se faire sous forme de disclosure ("Cet article a été rédigé avec l'assistance d'outils IA et vérifié par [nom de l'auteur]") | ⭐ P1 |
- Pour les images générées par IA : intégrer les métadonnées IPTC DigitalSourceType TrainedAlgorithmicMedia (recommandation Google pour le e-commerce et Google Merchant Center) | 🛍️ P1 |
- Pour les fiches produits e-commerce : les descriptions et titres générés par IA doivent être signalés séparément selon les policies de Google Merchant Center | 🛍️ P1 |

## Trust signals

### SSL et sécurité

- Servir l'intégralité du site en HTTPS (couvert en détail dans la section SEO technique de la Partie 2) | ⭐ P0 |
- [Webflow] Certificat SSL automatique et renouvelé par Webflow | ⭐ P0 |

### Pages légales obligatoires

- Publier une page "Mentions légales" conforme à la législation française (identification de l'éditeur, hébergeur, directeur de publication) | ⭐ P0 |
- Publier une page "Politique de confidentialité" détaillant la collecte, le traitement et le stockage des données personnelles (conformité RGPD) | ⭐ P0 |
- Publier une page "Conditions Générales de Vente" pour les sites e-commerce (incluant les conditions de retour, le droit de rétractation et ses délais, conformément à l'obligation d'information précontractuelle) | 🛍️ P0 |
- Publier une page "Conditions Générales d'Utilisation" si le site propose un service ou un espace membre | 🏢🛍️ P1 |
- Publier une page "Politique de cookies" expliquant les cookies utilisés et les modalités de consentement | ⭐ P0 |
- Rendre ces pages accessibles depuis le footer de toutes les pages du site | ⭐ P0 |

### Signaux de confiance on-site

- Afficher les logos clients, partenaires et certifications sur les pages stratégiques (accueil, pages services). Ces éléments agissent à la fois comme preuve sociale et signal de fiabilité (conversion : les logos reconnus réduisent la friction et augmentent la confiance) | ⭐ P1 |
- Intégrer des témoignages clients attribuables à une personne réelle : nom, entreprise et photo quand c'est possible. Un témoignage signé et contextualisé surpasse un avis anonyme en crédibilité (conversion : les témoignages détaillés et authentiques réduisent la friction). Il est possible de sélectionner les passages les plus pertinents et de reformuler pour la lisibilité, à condition que le client valide la version publiée et que le sens original soit préservé (conformité directive Omnibus) | ⭐ P1 |
- Afficher les notes et avis agrégés (schema AggregateRating traité dans le Guide AIO) | 🛍️ P1 | 🏢 P2 |
- Pour le e-commerce : afficher les badges de paiement sécurisé, les garanties de livraison, un résumé clair des conditions de retour (en complément des CGV) et les certifications de sécurité de manière visible sur les pages produits et le checkout (conversion : la réassurance est un levier critique de conversion au moment de l'achat) | 🛍️ P0 |
- Inclure une page "Contact" complète avec adresse physique, numéro de téléphone, email et formulaire de contact. La présence d'une adresse physique est un signal de fiabilité fort | ⭐ P0 |
- Pour les prestataires de services : afficher les certifications professionnelles, les affiliations à des organismes reconnus et les accréditations pertinentes | 🏢 P2 |
