# GEO — Generative Engine Optimization

## Légende des annotations

**Types de site :** ⭐ Tous | 🏢 Vitrine | 🛍️ E-commerce | ✍️ Blog/Éditorial | 📍 Local (complément)

**Priorités :** P0 Nécessaire | P1 Base | P2 Amélioré | P3 Performant | PX Contextuel (effort élevé, gain potentiellement fort selon le projet)

## Fonctionnement des moteurs génératifs

### Mécanisme de sélection des sources

- Les moteurs génératifs (Google AI Overviews, ChatGPT Search, Perplexity, Gemini, Copilot) utilisent le Retrieval-Augmented Generation (RAG) : ils récupèrent des documents pertinents depuis le web, puis génèrent une réponse synthétique en citant les sources utilisées | ⭐ P1 |
- Le processus suit 4 étapes : (1) décomposition de la requête en sous-questions, (2) récupération de fragments de pages pertinents via recherche sémantique (vector embeddings) et correspondance par mots-clés, (3) évaluation et classement des sources candidates selon la pertinence, l'autorité et la fraîcheur, (4) génération de la réponse avec attribution des sources | ⭐ P1 |
- Les moteurs génératifs évaluent des fragments de pages (passages de 50 à 500 mots) plutôt que des pages entières. Chaque paragraphe doit pouvoir fonctionner comme une unité citable autonome | ⭐ P1 |
- 97 % des AI Overviews contiennent au moins une source positionnée dans le top 20 organique Google (seoClarity, 432 000 mots-clés, septembre 2025). Cela ne signifie pas que 97 % de toutes les citations proviennent du top 20 : selon seoClarity, 56 % des citations individuelles émanaient de pages dans le top 20, et 44 % de pages au-delà. Depuis la migration vers Gemini 3 (janvier 2026), ce chevauchement a fortement baissé : Ahrefs (863 000 mots-clés, février 2026) mesure seulement 38 % de chevauchement entre citations AIO et top 10, contre 76 % en juillet 2025. Le SEO classique reste un prérequis fort mais ne garantit plus à lui seul la visibilité générative | ⭐ P0 |

### Différences entre plateformes

- **Google AI Overviews** : puise principalement dans les pages indexées par Google. Favorise les pages bien positionnées organiquement, cite 3 à 6 sources par réponse. Depuis la migration vers Gemini 3 le 27 janvier 2026, la corrélation entre classement top 10 et citation AIO s'est effondrée : de 76 % (Ahrefs, juillet 2025) à 17-38 % selon les études (BrightEdge et Ahrefs, février 2026). Gemini 3 élargit sa sélection de sources, favorise le query fan-out (décomposition de la requête en sous-requêtes), et a remplacé 42 % des domaines précédemment cités | ⭐ P1 |
- **ChatGPT Search** : en mode navigation web, interroge Bing et sélectionne 3 à 10 sources. 87 % des citations correspondent au top 10 organique Bing. Favorise les sources encyclopédiques et les contenus factuels à attribution claire. Wikipedia apparaît dans environ 35 % des citations | ⭐ P2 |
- **Perplexity** : cite en moyenne 5 sources par réponse. Favorise les sites de revues spécialisées, les publications expertes et le contenu communautaire (Reddit représente environ 6,6 % des citations) | ⭐ P2 |
- **Gemini** : mélange sources autoritaires et contenu communautaire. Blogs (~39 %) et actualités (~26 %) dominent les citations. YouTube est le domaine individuel le plus cité (~3 %) | ⭐ P2 |

## Structure du contenu pour la citabilité

### Architecture "answer-first" pour les moteurs génératifs

- Placer une réponse directe et complète dans les 200 premiers mots de chaque page ou section. Les systèmes RAG évaluent la pertinence principalement sur le contenu d'ouverture | ⭐ P1 |
- Structurer chaque paragraphe comme une unité autonome de 50 à 150 mots pouvant être extraite et citée indépendamment du reste de la page. Les contenus structurés en chunks autonomes reçoivent 2,3x plus de citations que le contenu long non structuré | ⭐ P1 |
- Formuler des affirmations factuelles déclaratives claires (sujet + prédicat + objet). Les moteurs génératifs citent les pages les plus faciles à vérifier et à désambiguïser, pas les mieux écrites | ⭐ P1 |

### Enrichissement factuel et données vérifiables

- Intégrer des statistiques, des données chiffrées et des faits vérifiables tout au long du contenu. La recherche Princeton sur le GEO a démontré que l'ajout de citations et de statistiques peut améliorer la visibilité dans les réponses IA de 40 % | ⭐ P1 |
- Viser une densité factuelle d'environ une donnée chiffrée ou une référence sourcée tous les 150 à 200 mots | ✍️ P2 | 🏢🛍️ P3 |
- Citer les sources dans le corps du texte au point exact de la claim (citation inline), pas uniquement en bibliographie de fin d'article | ⭐ P1 |
- Ne jamais inventer de données. Chaque statistique doit être traçable vers une source primaire fiable | ⭐ P0 |

### Phrases et blocs citables

- Rédiger des définitions claires et concises pour chaque concept clé traité sur la page. Les définitions sont parmi les éléments les plus extraits par les moteurs génératifs | ⭐ P1 |
- Créer des blocs "Quick Answer" de moins de 300 caractères en tête de section, formulés en question-réponse. Ces blocs sont les plus susceptibles d'être extraits verbatim par les LLMs | ⭐ P2 |
- Conclure chaque page longue par un bloc récapitulatif intitulé "Ce qu'il faut retenir" ou "Points clés" : 3 à 5 phrases factuelles résumant les informations essentielles. Ce bloc constitue un deuxième point d'extraction pour les LLMs, distinct du résumé introductif, et capture les requêtes de type résumé ou synthèse | ⭐ P2 |
- Utiliser des listes structurées (top N, étapes numérotées, comparatifs) : 74 % des citations AI proviennent de contenus structurés en format liste ou classement | ⭐ P1 |

### Types de contenus à produire pour le GEO

- **Comparatifs et listicles** ("Top N", "X vs Y", "Meilleures alternatives à Z") : formats les plus cités par les LLMs. Les publier sur le blog du site ou chercher à être inclus dans les listicles tiers | ⭐ P1 |
- **Guides exhaustifs et pages ressources** : couvrent un sujet en profondeur et fournissent aux LLMs une source complète à citer pour de multiples sous-requêtes | ⭐ P1 |
- **FAQ détaillées avec réponses substantives** : chaque paire question-réponse constitue un bloc citable autonome. Aligner les questions sur les formulations réelles des utilisateurs | ⭐ P1 |
- **Pages de données structurées** (tableaux de prix, grilles de fonctionnalités, comparatifs de spécifications) : l'information tabulaire est facilement extractible par les LLMs | 🛍️ P1 | 🏢 P2 |
- **Études de cas et données propriétaires** : contenus exclusifs que les LLMs ne trouvent nulle part ailleurs, créant une obligation de citation | ⭐ P3 |
- Les pages services et pages produits pures sont rarement citées pour les requêtes informationnelles. Leur rôle GEO est d'être la "source de vérité" pour les requêtes de marque (branded queries) et de fournir les données structurées extraites par les LLMs | 🛍️🏢 P1 |

## Signaux d'autorité spécifiques GEO

### Autorité de marque et présence multi-plateforme

- L'autorité de marque (brand authority) est le prédicteur le plus fort de citation par les LLMs (corrélation 0,334 selon les études 2025). Renforcer la reconnaissance de marque au-delà du site web | ⭐ P2 |
- Maintenir une présence active sur 4+ plateformes où les LLMs puisent leurs informations : site web, YouTube, LinkedIn, Reddit, forums sectoriels. Les LLMs utilisent la présence multi-plateforme comme signal de corroboration | ⭐ P2 |
- Assurer la cohérence des entités (nom de marque, descriptions, chiffres clés) sur toutes les plateformes. Les moteurs génératifs recoupent les informations entre sources pour vérifier la fiabilité | ⭐ P1 |
- L'âge moyen des domaines cités par ChatGPT est de 17 ans. Les entités établies bénéficient d'un biais de persistance. Pour les marques récentes, compenser par la densité et la qualité des signaux d'autorité | ⭐ P2 |

### Mentions de marque et earned media

- Les mentions de marque non liées (sans backlink) sont un signal GEO fort. Les LLMs ne crawlent pas les graphes de liens comme Google : ils évaluent la fréquence et le contexte des mentions textuelles | ⭐ P2 |
- Les backlinks restent utiles pour le SEO classique (qui alimente le GEO), mais montrent une corrélation faible avec la visibilité LLM directe | ⭐ P1 |
- Obtenir des mentions dans des publications à haute autorité (médias nationaux, presse spécialisée, sites sectoriels de référence). Les LLMs favorisent les "earned media" (mentions tierces) par rapport au contenu propriétaire de marque | ⭐ P3 |
- Apparaître dans des listes comparatives et des articles "Top N" publiés par des tiers. Les contenus de type listicle sont parmi les plus cités par les moteurs génératifs | ⭐ P2 |

### Digital PR et relations presse

- Développer une stratégie de Digital PR ciblant les publications que les LLMs citent le plus : blogs spécialisés (~40 % des citations), actualités (~20 à 25 %), publications de revues sectorielles | ⭐ P3 |
- Produire des données originales, des études propriétaires ou des benchmarks exclusifs. Les contenus que personne d'autre ne possède constituent un levier de citation fort : les LLMs ont besoin de les citer faute d'alternative | ⭐ PX |
- Participer à des interviews, podcasts et publications tierces pour générer des mentions d'expert dans des contextes éditoriaux indépendants | ⭐ P3 |

### Présence sur les plateformes communautaires

- Participer activement sur Reddit dans les subreddits pertinents au secteur avec des réponses substantives et utiles (pas de promotion). Reddit représente environ 6,6 % des citations Perplexity et est de plus en plus cité par Gemini et Google AI Overviews | ⭐ P3 |
- Répondre aux questions sur les forums sectoriels et plateformes de Q&A (Quora, forums spécialisés) avec des réponses détaillées et sourcées. Les contenus communautaires à 3+ votes positifs entrent dans les données d'entraînement des LLMs | ⭐ P3 |
- Publier du contenu de valeur sur LinkedIn (articles longs, posts techniques) : LinkedIn figure parmi les sources les plus citées par les LLMs en 2025 | ⭐ P2 |
- Créer du contenu vidéo sur YouTube : YouTube est le domaine individuel le plus cité par Gemini (~3 % des citations) et les vidéos avec transcription fournissent du contenu textuel supplémentaire aux LLMs | ⭐ P3 |
- Sur toutes les plateformes communautaires, maintenir la cohérence du nom de marque et des informations factuelles pour renforcer le signal d'entité | ⭐ P1 |

## Optimisation sémantique pour les moteurs génératifs

### Couverture topicale et entités nommées

- Couvrir un sujet de manière exhaustive pour que la page soit considérée comme une source complète. Les moteurs génératifs favorisent les pages qui répondent à plusieurs sous-questions d'une même requête | ⭐ P1 |
- Nommer explicitement les entités (marques, personnes, lieux, produits, concepts) plutôt qu'utiliser des pronoms ou des formulations vagues. Écrire "Studio Darduini, agence de branding à Bordeaux" plutôt que "notre agence" | ⭐ P1 |
- Maintenir une nomenclature stable pour chaque entité sur l'ensemble du site. Les variations de nommage créent de l'ambiguïté pour les LLMs | ⭐ P0 |

### Relations sémantiques explicites

- Structurer le contenu en relations sujet-prédicat-objet claires. Les LLMs extraient les informations sous forme de triplets sémantiques | ⭐ P2 |
- Définir explicitement les relations entre entités : "Studio Darduini propose des services de branding pour les startups" plutôt que des formulations implicites | ⭐ P1 |
- Fournir le contexte nécessaire pour désambiguïser les entités. Si un terme a plusieurs significations, préciser celle qui s'applique | ⭐ P1 |

## Différenciation GEO vs SEO classique

### Ce qui change dans l'approche

- **SEO classique** : optimise pour une position dans une liste de liens. L'objectif est le clic. **GEO** : optimise pour être la source citée dans une réponse générée. L'objectif est l'inclusion et l'attribution | ⭐ P0 |
- En GEO, le contenu propriétaire de marque (pages services, pages produits) est rarement cité directement par les LLMs pour les requêtes informationnelles. Les LLMs préfèrent les sources tierces (médias, revues, comparatifs). Le contenu propriétaire reste essentiel comme "source de vérité" pour les requêtes de marque (branded queries) | ⭐ P1 |
- La fraîcheur du contenu pèse davantage en GEO qu'en SEO classique. Les contenus non mis à jour depuis plus de 6 mois perdent progressivement leur éligibilité à la citation | ✍️ P1 | 🏢🛍️ P2 |

### Ce qui ne change pas

- Le SEO classique reste le socle du GEO. Sans positions organiques solides, la visibilité générative est quasi nulle | ⭐ P0 |
- E-E-A-T s'applique avec la même force en GEO. Les signaux d'expertise, d'expérience et de fiabilité sont évalués par les moteurs génératifs pour décider quelles sources méritent d'être citées | ⭐ P0 |

### Stratégie branded vs non-branded queries

- Pour les **requêtes de marque** ("avis sur [marque]", "tarifs [marque]", "[marque] vs [concurrent]") : le site propriétaire est cité par les LLMs. Optimiser les pages produits, tarifs, FAQ et "À propos" avec des informations factuelles, structurées et à jour. Ce sont les "sources de vérité" que les LLMs consultent pour répondre aux questions sur la marque | ⭐ P1 |
- Pour les **requêtes non-branded informationnelles** ("comment choisir une agence de branding", "meilleur CMS pour e-commerce") : les LLMs citent presque exclusivement des sources tierces (médias, comparatifs, forums). La stratégie consiste à être mentionné dans ces contenus tiers via le earned media, les comparatifs et la présence communautaire, pas à optimiser son propre site | ⭐ P2 |
- Cartographier les requêtes cibles en deux colonnes (branded / non-branded) et attribuer une stratégie distincte à chacune : contenu propriétaire pour le branded, earned media et contenu tiers pour le non-branded | ⭐ P2 |

## Différenciation GEO vs AEO

- Les **featured snippets** (AEO) extraient un passage d'une page unique et l'affichent tel quel dans les SERP. Les **AI Overviews** (GEO) synthétisent des informations provenant de plusieurs sources en une réponse originale | ⭐ P1 |
- En AEO, l'objectif est d'être LE passage sélectionné. En GEO, l'objectif est d'être UNE des sources citées dans la synthèse | ⭐ P1 |
- Les stratégies de format diffèrent : l'AEO favorise les réponses concises et formatées (listes, tableaux, définitions). Le GEO favorise les contenus exhaustifs avec des données vérifiables et des chunks autonomes | ⭐ P2 |

## Préparation à la recherche agentique (agentic search)

- Les agents IA naviguent le web, comparent des options et exécutent des tâches pour l'utilisateur. OpenAI Operator, lancé en janvier 2025 (déprécié en août 2025 et intégré à ChatGPT en tant que "ChatGPT agent"), a constitué la première implémentation grand public. Ce mode de recherche agentique est désormais accessible via ChatGPT agent mode, Google Mariner et les équivalents concurrents. Ce mode de recherche est en pleine expansion | ⭐ PX |
- Pour être intégré dans les workflows agentiques, structurer les informations de manière lisible par les machines : tableaux de prix clairs, comparatifs de fonctionnalités en format tabulaire, instructions étape par étape numérotées, informations de contact et de réservation facilement extractibles | 🛍️🏢 PX |
- Les contenus "decision-ready" (qui permettent à un agent de prendre une décision ou d'exécuter une action sans navigation supplémentaire) auront un avantage en recherche agentique : disponibilité en stock, prix, délais, modalités de réservation | 🛍️ PX |

## KPIs et suivi de la visibilité générative

### Métriques à suivre

- **Fréquence de citation** : combien de fois la marque ou le domaine apparaît dans les réponses génératives pour les requêtes cibles | ⭐ P2 |
- **Part de voix IA (AI share of voice)** : proportion de mentions de la marque par rapport aux concurrents dans les réponses génératives | ⭐ P3 |
- **Position de citation** : rang de la source dans l'ordre des citations (être cité en premier a plus d'impact que d'être cité en cinquième) | ⭐ P3 |
- **Sentiment de citation** : comment la marque est présentée dans les réponses génératives (positivement, négativement, neutre) | ⭐ P3 |
- **Trafic AI referral** : trafic provenant des moteurs génératifs, identifiable dans GA4 via les sources de referral (chat.openai.com, perplexity.ai, etc.) | ⭐ P1 |

### Méthodes de suivi

- Effectuer des tests manuels réguliers : interroger ChatGPT, Perplexity, Gemini et Google AI Overviews sur les requêtes cibles de la marque. Noter les sources citées, la position et le contexte. Utiliser le mode incognito pour éviter la personnalisation | ⭐ P1 |
- Outils de monitoring automatisé (selon budget) : Semrush AIO, Peec AI, LLM Pulse, Geoptie permettent de suivre les citations, le sentiment et la part de voix à travers les plateformes IA | ⭐ PX |
- Corréler les métriques GEO avec les métriques SEO classiques (positions organiques, trafic, conversions) pour évaluer l'impact global | ⭐ P2 |

### Limites actuelles du suivi

- Le suivi GEO est encore immature par rapport au suivi SEO. Les réponses génératives varient selon l'utilisateur, le contexte et le moment. Les résultats des tests manuels ne sont pas parfaitement reproductibles | ⭐ P1 |
- Seulement 11 % des domaines sont cités à la fois par ChatGPT et Perplexity. Chaque plateforme a sa propre logique de sélection : le suivi doit couvrir plusieurs moteurs, pas un seul | ⭐ P2 |

## Spécificités Webflow

- Le GEO est principalement une discipline de contenu et de stratégie off-site. Webflow n'impose pas de contrainte spécifique pour le GEO au-delà de celles déjà couvertes dans les guides SEO et AIO | ⭐ P1 |
- Les optimisations techniques GEO pertinentes dans Webflow (schema markup, HTML sémantique, robots.txt pour les crawlers IA, llms.txt) sont traitées dans le Guide AIO | ⭐ P1 |
