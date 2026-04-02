# SXO — Search Experience Optimization

## Légende des annotations

**Types de site :** ⭐ Tous | 🏢 Vitrine | 🛍️ E-commerce | ✍️ Blog/Éditorial | 📍 Local (complément)

**Priorités :** P0 Nécessaire | P1 Base | P2 Amélioré | P3 Performant | PX Contextuel (effort élevé, gain potentiellement fort selon le projet)

## Architecture de conversion

### Structure de funnel on-site

- Structurer le site selon les 3 phases du parcours utilisateur : awareness (découverte) > consideration (évaluation) > decision (action). Chaque phase correspond à un type de page et un type de contenu distinct. Les bullets suivants détaillent le rôle et le contenu de chaque phase selon le type de site : tous les sites n'activent pas les trois phases avec la même intensité (ex : un site vitrine sans blog n'a pas nécessairement de phase awareness éditoriale) | ⭐ P1 |
- **Awareness** : articles de blog, guides, contenus informationnels. Objectif : capter l'attention, démontrer l'expertise. CTA de transition vers la phase suivante (ex : "Découvrir nos solutions", lien vers page service) | ✍️ P1 |
- **Consideration** : pages services, comparatifs, études de cas, témoignages, FAQ. Objectif : convaincre et lever les objections. CTA vers la phase décision (ex : "Demander un devis", "Voir les tarifs") | 🏢🛍️ P0 |
- **Decision** : pages tarifs, formulaire de contact, page panier/checkout. Objectif : convertir. Minimiser les frictions, maximiser la réassurance | ⭐ P0 |

### Parcours vitrine vs e-commerce

- **Site vitrine** : le parcours type est contenu informationnel > page service > page contact/devis. Le site doit guider l'utilisateur vers la prise de contact à chaque étape sans être intrusif | 🏢 P0 |
- **Site e-commerce** : le parcours type est contenu informationnel ou recherche produit > page catégorie > fiche produit > panier > checkout. Chaque étape doit réduire les frictions et augmenter la confiance | 🛍️ P0 |
- Hiérarchiser les pages selon l'intention : les pages à forte intention transactionnelle (services, produits, tarifs, contact) doivent être accessibles en 1 à 2 clics depuis n'importe quelle page du site | ⭐ P0 |

## Landing pages

### Structure optimale

- **Above the fold** (visible sans scroll) : titre clair axé bénéfice client (pas sur l'entreprise), sous-titre expliquant la proposition de valeur, CTA principal visible et contrasté, un élément visuel pertinent (image produit, illustration, vidéo courte) | ⭐ P0 |
- Les utilisateurs forment un jugement de confiance dans les 10 premières secondes. Le contenu above the fold détermine si l'utilisateur continue ou repart | ⭐ P0 |
- **Structure de la page complète** : proposition de valeur (above the fold) > bénéfices détaillés > preuve sociale (témoignages, logos, chiffres) > explication du processus ou du produit > FAQ répondant aux objections > CTA de clôture | ⭐ P1 |
- Chaque section de la page doit avancer l'utilisateur dans sa décision. Pas de contenu qui ne sert ni l'information ni la conversion | ⭐ P1 |

### Placement des CTA

- Placer le CTA principal above the fold, puis le répéter à intervalles réguliers (après chaque section majeure). Un utilisateur convaincu à n'importe quel point de la page doit pouvoir agir immédiatement | ⭐ P0 |
- Varier la formulation des CTA selon leur position dans la page : CTA informatif en haut ("Découvrir l'offre"), CTA engageant au milieu ("Voir les tarifs"), CTA d'action en bas ("Demander un devis gratuit") | ⭐ P1 |
- Les CTA doivent être visuellement distincts du reste de la page (couleur contrastée, taille suffisante, espace blanc autour). Un CTA qui se fond dans le design est un CTA invisible | ⭐ P0 |
- [Webflow] Utiliser les interactions Webflow pour ajouter des micro-animations subtiles sur les boutons CTA (changement de couleur au hover, léger grossissement). Ces micro-interactions attirent l'attention sans alourdir la page | ⭐ P2 |

### Preuve sociale et urgence

- Intégrer les preuves sociales au plus près des CTA : témoignage client juste avant le formulaire de contact, logos clients juste après la proposition de valeur, avis étoilés à côté du bouton d'achat | ⭐ P1 |
- Utiliser l'urgence ou la rareté uniquement quand elles sont réelles (stock limité vérifié, places restantes, offre à durée déterminée). Les fausses urgences dégradent la confiance | 🛍️ P2 |

## Signaux comportementaux

### Leviers d'optimisation

- **Dwell time** (temps passé sur la page) : augmenter la profondeur et la richesse du contenu, intégrer des éléments interactifs (vidéos, calculateurs, configurateurs), structurer en sections scannables qui invitent au scroll | ⭐ P1 |
- **Scroll depth** (profondeur de scroll) : alterner les formats (texte, visuel, témoignage, CTA) pour maintenir l'engagement. Les pages où plus de 70 % du contenu est lu corrèlent positivement avec un meilleur classement | ⭐ P1 |
- **Pogo-sticking** (retour immédiat aux SERP après un clic) : la cause principale est un décalage entre la promesse du snippet (title + description) et le contenu de la page. Aligner systématiquement le meta title et le H1 avec le contenu réel de la page | ⭐ P0 |
- **Taux de rebond** : un taux de rebond élevé n'est pas toujours négatif (un utilisateur qui trouve sa réponse immédiatement peut rebondir satisfait). Le signal problématique est la combinaison rebond + retour SERP (pogo-sticking) | ⭐ P1 |
- Utiliser GA4 et Microsoft Clarity pour identifier les zones de friction : pages à fort taux de sortie, zones de clic mort (dead clicks), scroll abandonnés | ⭐ P2 |

## Impact UX des Core Web Vitals

- Les seuils techniques des Core Web Vitals (LCP, INP, CLS) sont traités dans le Guide SEO Partie 2. Cette section couvre uniquement l'impact perçu par l'utilisateur | ⭐ P0 |
- Un LCP lent (plus de 2,5 secondes) génère une perception de lenteur qui augmente les rebonds. 53 % des utilisateurs mobiles quittent un site qui met plus de 3 secondes à charger | ⭐ P0 |
- Un CLS élevé (décalages visuels) provoque des clics accidentels, de la frustration et une perte de confiance. L'impact est particulièrement fort sur mobile où l'écran est petit et les zones tactiles proches | ⭐ P0 |
- Un INP élevé (réactivité lente) donne l'impression que le site est "cassé" ou ne répond pas. Les formulaires, filtres et éléments interactifs non réactifs entraînent des abandons | ⭐ P1 |
- L'amélioration des Core Web Vitals de "Poor" à "Good" peut augmenter les taux de conversion de 18 à 25 % selon les études 2025, sans augmentation de trafic | ⭐ P1 |

## Navigation et UX

### Menu et structure de navigation

- Le menu principal doit contenir 5 à 7 items maximum. Au-delà, la surcharge cognitive réduit l'efficacité de la navigation | ⭐ P0 |
- Les libellés du menu doivent être explicites et orientés utilisateur ("Nos services", "Tarifs", "Contact") plutôt que créatifs mais ambigus ("Découvrir", "Explorer", "L'univers") | ⭐ P0 |
- Placer les items les plus importants pour la conversion (services, produits, tarifs, contact) en position prioritaire dans le menu (les premiers et derniers items sont les plus mémorisés) | ⭐ P1 |
- Sur mobile, utiliser un menu hamburger avec des items suffisamment espacés pour le toucher tactile (minimum 44x44 px par zone de clic selon WCAG) | ⭐ P0 |

### Fil d'Ariane comme outil de navigation

- Le fil d'Ariane (breadcrumb) est traité dans le Guide SEO Partie 2 pour le maillage interne et dans le Guide AIO pour le schema BreadcrumbList. Côté SXO, le breadcrumb réduit la désorientation, permet un retour rapide aux niveaux supérieurs et diminue l'utilisation du bouton "retour" du navigateur (qui entraîne du pogo-sticking) | ⭐ P1 |

### Recherche interne

- Implémenter un moteur de recherche interne sur les sites avec plus de 20 pages ou un catalogue produits. La recherche interne est un indicateur fort d'intention utilisateur | 🛍️ P0 | 🏢✍️ P2 |
- Afficher la barre de recherche de manière visible (header ou menu). Les résultats doivent être pertinents, rapides et formatés clairement | 🛍️ P0 |
- Analyser les termes de recherche interne (via GA4) pour identifier les contenus manquants et les intentions non satisfaites | 🛍️ P2 | 🏢✍️ P3 |
- [Webflow] Webflow propose un composant de recherche natif (Search Component). Pour les sites e-commerce nécessitant une recherche avancée (filtres, suggestions), utiliser une solution tierce (Finsweet CMS Search, Algolia) | 🛍️ P1 |

### Accessibilité WCAG comme levier UX

- Respecter les principes d'accessibilité WCAG 2.1 niveau AA : contraste suffisant (ratio 4.5:1 pour le texte), navigation au clavier, textes alternatifs sur les images, hiérarchie des titres cohérente, labels sur les formulaires | ⭐ P0 |
- L'accessibilité bénéficie au SEO (HTML sémantique, alt texts) et à la conversion (plus d'utilisateurs peuvent interagir avec le site). Les sites accessibles touchent un public plus large et réduisent les frictions | ⭐ P1 |
- [Webflow] Utiliser le panneau Audit intégré de Webflow pour détecter les problèmes d'accessibilité (contraste, alt manquants, structure Hn). Compléter avec un audit via axe DevTools ou WAVE | ⭐ P1 |

### Messages d'erreur et états vides

- Personnaliser la page 404 avec un message utile, un moteur de recherche et des liens vers les pages populaires (traité aussi dans le Guide SEO Partie 2 côté technique) | ⭐ P1 |
- Sur les pages de résultats de recherche vides : proposer des suggestions alternatives, des catégories populaires ou un CTA de contact | 🛍️ P1 |

## Microcopy et copywriting de conversion

### Boutons et CTA

- Formuler les boutons en verbe d'action + bénéfice : "Obtenir mon devis gratuit" plutôt que "Envoyer" ou "Soumettre" | ⭐ P0 |
- Ajouter une micro-réassurance sous le CTA principal quand c'est pertinent : "Sans engagement", "Réponse sous 24h", "Paiement sécurisé", "Satisfait ou remboursé" | ⭐ P1 |

### Formulaires

- Réduire le nombre de champs au strict minimum. Chaque champ supplémentaire réduit le taux de complétion. Pour un formulaire de contact : nom, email, message. Ajouter le téléphone uniquement si nécessaire | ⭐ P0 |
- Utiliser des labels clairs au-dessus de chaque champ (pas uniquement des placeholders qui disparaissent à la saisie) | ⭐ P0 |
- Afficher des messages d'erreur contextuels en temps réel (à côté du champ concerné, pas en haut de page après soumission). Formuler les erreurs de manière constructive ("Veuillez entrer un email valide" plutôt que "Erreur dans le champ email") | ⭐ P1 |
- Afficher une page ou un message de confirmation clair après soumission, précisant les prochaines étapes ("Nous vous recontactons sous 24h") | ⭐ P0 |
- [Webflow] Les formulaires natifs Webflow couvrent les cas simples (nom, email, message, téléphone) avec redirection vers une page de confirmation ou affichage d'un message inline. Limitations à anticiper : pas de logique conditionnelle (champs qui apparaissent selon les réponses précédentes), validation limitée à l'obligatoire et au format email, pas de pré-remplissage dynamique depuis les paramètres d'URL. Pour les formulaires à logique avancée (qualification, devis multi-étapes, enquêtes), utiliser une solution tierce embarquée : Tally (gratuit, RGPD), Typeform ou HubSpot Forms si un CRM est connecté | 🏢🛍️ P1 |

## Preuves sociales on-site

- Afficher les témoignages clients aux points stratégiques du parcours de conversion : sur les pages services (après la description), sur les landing pages (avant le CTA), sur les pages produits (sous la description) | ⭐ P1 |
- Intégrer des chiffres de preuve sociale quand ils sont disponibles : nombre de clients accompagnés, projets réalisés, années d'expérience, note moyenne des avis, nombre d'avis | ⭐ P1 |
- Afficher les logos clients sur la page d'accueil et les pages services. Privilégier les logos reconnaissables ou représentatifs du secteur cible | 🏢 P1 |
- Pour le e-commerce : afficher les avis produits directement sur la fiche produit avec un système de filtrage (par note, par pertinence, par date). Les produits avec avis convertissent significativement mieux que ceux sans avis | 🛍️ P0 |
- Intégrer des études de cas détaillées (problème > solution > résultat chiffré) sur les pages à forte intention de conversion | 🏢 P2 |

## Mobile-first UX

- Concevoir chaque page en partant de la version mobile, puis adapter vers le desktop (pas l'inverse). Plus de 60 % des recherches se font sur mobile | ⭐ P0 |
- Dimensionner les zones tactiles à 44x44 px minimum (recommandation WCAG/Apple). Espacer les éléments cliquables pour éviter les clics accidentels | ⭐ P0 |
- Simplifier le contenu sur mobile : réduire les textes de description longs, prioriser les informations essentielles, utiliser des accordions pour le contenu secondaire | ⭐ P1 |
- Les CTA doivent être accessibles avec le pouce (zone de pouce naturelle : bas de l'écran et centre). Éviter de placer les boutons d'action uniquement en haut de page sur mobile | ⭐ P1 |
- Tester l'expérience sur des appareils réels à connexion variable (pas uniquement en Wi-Fi). Les performances perçues en 3G/4G sont le vrai benchmark | ⭐ P1 |
- [Webflow] Vérifier et ajuster chaque breakpoint Webflow (mobile portrait 320px, mobile paysage 480px, tablette 768px). Les éléments masqués sur mobile (display: none) ne doivent pas contenir de contenu SEO critique | ⭐ P0 |

## Maillage orienté conversion

- Intégrer des CTA contextuels dans le corps des articles de blog pointant vers les pages services ou produits correspondants. Le maillage interne n'est pas uniquement un outil SEO, c'est un parcours de conversion | ✍️ P1 |
- En fin d'article informationnel, proposer la prochaine étape logique du parcours : "Vous cherchez [solution] ? Découvrez notre [service/produit]" | ✍️ P1 |
- Sur les pages produits e-commerce : intégrer des sections de cross-selling ("Les clients ont aussi acheté") et d'upselling ("Version premium disponible") pour augmenter le panier moyen | 🛍️ P1 |
- Sur les pages catégories : mettre en avant les produits populaires ou les meilleures ventes pour guider les utilisateurs indécis | 🛍️ P1 |
- [Webflow] Utiliser les CMS Reference Fields et Multi-Reference Fields pour créer des liens dynamiques entre contenus liés (articles > services, produits > produits complémentaires) | ⭐ P1 |

## Cookie consent et RGPD

- Le bandeau cookies est souvent le premier élément d'interaction avec le site. Un bandeau mal conçu dégrade l'expérience immédiate et peut masquer le contenu above the fold | ⭐ P0 |
- Utiliser un bandeau non intrusif qui n'occupe pas plus de 20 à 25 % de la hauteur de l'écran mobile. Éviter les modales plein écran qui bloquent l'accès au contenu | ⭐ P0 |
- Proposer un bouton "Refuser tout" aussi visible et accessible que le bouton "Accepter tout" (obligation RGPD et bonne pratique UX) | ⭐ P0 |
- Le bandeau ne doit pas provoquer de décalages de mise en page (CLS). Réserver l'espace du bandeau ou utiliser un bandeau fixe en bas de page qui ne pousse pas le contenu | ⭐ P1 |
- [Webflow] Utiliser une solution tierce RGPD compatible Webflow (Iubenda, CookieBot, Axeptio, Finsweet Cookie Consent). Les solutions natives Webflow ne couvrent pas toutes les exigences RGPD françaises | ⭐ P0 |

## Personnalisation et A/B testing

- [Webflow] Webflow Optimize est un add-on payant distinct des plans site (tarification à partir de $299/mois selon les plans disponibles). Il permet des tests A/B et de la personnalisation conditionnelle (contenu différent selon la source de trafic, la géolocalisation, le segment visiteur). Tester les titres, les CTA et les mises en page pour identifier les variantes les plus performantes. Pour les budgets plus contraints, des alternatives tierces comme Optibase (intégration native Webflow, plans à partir de $19/mois) ou VWO permettent des tests A/B sans Webflow Optimize | ⭐ P3 |
- Prioriser les tests A/B sur les éléments à plus fort impact de conversion : titre principal de la landing page, formulation du CTA, structure de la page (ordre des sections), formulaire (nombre de champs) | ⭐ P3 |
- Ne pas tester trop de variables simultanément. Un seul changement par test pour isoler l'impact de chaque variable | ⭐ P3 |

## E-commerce : UX spécifique

### Pages catégories

- Les pages catégories doivent faciliter la comparaison rapide : grille produits avec image, nom, prix et note visible sans cliquer. Proposer des options de tri (prix, popularité, nouveauté) et de filtrage (taille, couleur, prix) | 🛍️ P0 |
- Les filtres doivent être réactifs (résultats mis à jour sans rechargement de page) et afficher le nombre de résultats pour chaque option de filtre | 🛍️ P1 |
- Sur mobile, les filtres doivent être accessibles via un bouton "Filtrer" ouvrant un panneau dédié (pas un empilement de dropdowns qui pousse le contenu produit) | 🛍️ P1 |

### Gestion des produits épuisés

- Ne jamais supprimer une fiche produit épuisée qui reçoit du trafic ou des backlinks. Afficher clairement l'indisponibilité et proposer des alternatives (produits similaires, notification de retour en stock, pré-commande) | 🛍️ P0 |
- Si le produit est définitivement retiré du catalogue : rediriger en 301 vers le produit de remplacement ou la catégorie parente | 🛍️ P0 |
- [Webflow] Utiliser un champ CMS "Disponibilité" (switch ou select) pour gérer l'affichage conditionnel du statut de stock et du bouton d'achat. Synchroniser avec le schema Product.availability dans le Guide AIO | 🛍️ P1 |

### Processus panier et checkout

- Réduire le nombre d'étapes entre l'ajout au panier et la confirmation de commande. Chaque étape supplémentaire augmente le taux d'abandon. Viser 3 étapes maximum : panier > informations/livraison > paiement | 🛍️ P0 |
- Supprimer le menu de navigation principal (header, liens de catégories, footer de navigation) sur la page checkout. Tout lien sortant du tunnel d'achat à cette étape est une porte de sortie supplémentaire. Conserver uniquement le logo (lien vers l'accueil) et les éléments de réassurance | 🛍️ P1 |
- Afficher un récapitulatif de commande visible en permanence pendant le checkout (produits, quantités, prix, frais de livraison, total). Pas de frais cachés révélés tardivement (première cause d'abandon de panier) | 🛍️ P0 |
- Proposer le checkout invité (sans obligation de créer un compte). La création de compte forcée est la deuxième cause d'abandon de panier | 🛍️ P0 |
- Afficher les logos de paiement sécurisé, les garanties de livraison et les conditions de retour de manière visible pendant tout le processus de checkout | 🛍️ P0 |
- Optimiser le formulaire de checkout : auto-complétion de l'adresse, validation en temps réel, clavier numérique pour les champs numériques sur mobile, enregistrement des données en cas de retour | 🛍️ P1 |
- [Webflow] Webflow Ecommerce gère nativement le checkout complet (panier, page checkout, confirmation de commande) personnalisable visuellement dans le Designer. Paiements via Stripe, PayPal, Apple Pay, Google Pay. Limitations natives : 3 champs additionnels maximum au checkout, pas de multi-devise, pas de Klarna/Afterpay, pas de récupération de panier abandonné (nécessite Zapier + outil email). Si ces limites sont bloquantes, envisager Snipcart ou Foxy en complément | 🛍️ P0 |

### Réassurance tout au long du parcours

- Afficher les éléments de réassurance à chaque étape du parcours d'achat, pas uniquement au checkout : livraison gratuite dès X€, retours gratuits, paiement sécurisé, garantie satisfait ou remboursé | 🛍️ P0 |
- Placer une barre de réassurance synthétique (icônes + texte court) sous le header ou au-dessus du footer, visible sur toutes les pages | 🛍️ P1 |
- Sur les fiches produits : afficher les délais de livraison estimés, les options de paiement disponibles et les conditions de retour directement sous le bouton d'achat | 🛍️ P0 |
