<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class ServiceController extends Controller
{
    private $services = [
        'missions-comptables' => [
            'slug' => 'missions-comptables',
            'title' => 'Missions Comptables',
            'description' => 'Nous assurons la tenue et le suivi complet de votre comptabilité, avec des états financiers fiables et conformes aux normes en vigueur.',
            'image' => '/storage/images/services/business-man-financial-inspector-secretary-making-report-calculating-checking-balance-internal-revenue-service-inspector-checking-document-audit-concept.webp',
            'longDescription' => "Notre service de missions comptables offre une solution complète pour la gestion de votre comptabilité. Nous nous chargeons de la tenue de vos livres comptables, de l'établissement de vos états financiers et de la production des déclarations fiscales et sociales. Notre équipe d'experts comptables certifiés vous accompagne tout au long de l'année pour assurer la conformité de votre entreprise avec les réglementations en vigueur.",
            'features' => [
                "Tenue complète de la comptabilité",
                "Établissement des états financiers",
                "Déclarations fiscales et sociales",
                "Analyse des ratios et indicateurs clés",
                "Conseils pour l'optimisation fiscale",
                "Accompagnement personnalisé"
            ],
            'benefits' => [
                [
                    'title' => 'Gain de temps',
                    'description' => 'Libérez-vous des tâches administratives chronophages',
                    'icon' => 'Clock'
                ],
                [
                    'title' => 'Sécurité',
                    'description' => 'Conformité garantie avec la réglementation en vigueur',
                    'icon' => 'Shield'
                ],
                [
                    'title' => 'Analyse approfondie',
                    'description' => 'Tableaux de bord et indicateurs clés pour piloter votre entreprise',
                    'icon' => 'BarChart2'
                ]
            ]
        ],
        'conseil-gestion' => [
            'slug' => 'conseil-gestion',
            'title' => 'Missions de conseil-gestion',
            'description' => 'Un conseil stratégique et opérationnel pour optimiser la performance de votre entreprise et renforcer vos outils de pilotage.',
            'image' => '/storage/images/services/business-team-discussing-their-ideas-office.webp',
            'longDescription' => "Notre service de conseil en gestion vous accompagne dans l'optimisation de votre entreprise. Nous vous proposons des solutions sur mesure pour améliorer votre performance opérationnelle et stratégique. Nos conseillers expérimentés vous aident à identifier les opportunités d'amélioration et à mettre en place les meilleures pratiques de gestion.",
            'features' => [
                "Analyse stratégique",
                "Optimisation des processus",
                "Amélioration de la performance",
                "Développement des outils de pilotage",
                "Accompagnement au changement",
                "Suivi et évaluation"
            ],
            'benefits' => [
                [
                    'title' => 'Stratégie optimisée',
                    'description' => 'Développement de stratégies sur mesure pour votre croissance',
                    'icon' => 'TrendingUp'
                ],
                [
                    'title' => 'Performance accrue',
                    'description' => 'Amélioration continue de vos performances opérationnelles',
                    'icon' => 'BarChart2'
                ],
                [
                    'title' => 'Expertise dédiée',
                    'description' => 'Accompagnement par des experts en gestion',
                    'icon' => 'Users'
                ]
            ]
        ],
        'audit' => [
            'slug' => 'audit',
            'title' => "Missions d'audit",
            'description' => "Nous réalisons des audits financiers et organisationnels approfondis afin d'identifier les risques et garantir la fiabilité de vos données.",
            'image' => '/storage/images/services/working-process-startup-businessman-working-wood-table-with-new-finance-project-modern-notebook-table-pen-holding-hand.webp',
            'longDescription' => "Notre service d'audit vous offre une évaluation indépendante et professionnelle de vos processus financiers et organisationnels. Nous identifions les risques et les opportunités d'amélioration pour renforcer la fiabilité de vos informations financières et la maîtrise de vos processus clés.",
            'features' => [
                "Audit financier",
                "Audit organisationnel",
                "Analyse des risques",
                "Recommandations d'amélioration",
                "Contrôle interne",
                "Rapport détaillé"
            ],
            'benefits' => [
                [
                    'title' => 'Transparence',
                    'description' => 'Évaluation claire et objective de vos processus',
                    'icon' => 'Eye'
                ],
                [
                    'title' => 'Sécurité',
                    'description' => 'Identification des risques et des opportunités',
                    'icon' => 'Shield'
                ],
                [
                    'title' => 'Conformité',
                    'description' => 'Respect des normes et réglementations en vigueur',
                    'icon' => 'CheckCircle'
                ]
            ]
        ],
        'sociales-rh' => [
            'slug' => 'sociales-rh',
            'title' => 'Missions sociales et RH',
            'description' => 'Un accompagnement personnalisé dans la gestion de vos ressources humaines : contrats, paie, déclarations sociales et obligations légales.',
            'image' => '/storage/images/services/female-applicant-interviewed-by-hr-mangers.webp',
            'longDescription' => "Notre service social et RH vous accompagne dans la gestion quotidienne de vos ressources humaines. Nous vous aidons à gérer les contrats de travail, les bulletins de paie, les déclarations sociales et toutes vos obligations légales en matière de gestion du personnel.",
            'features' => [
                "Gestion des contrats",
                "Établissement des bulletins de paie",
                "Déclarations sociales",
                "Conformité légale",
                "Gestion des congés",
                "Relations sociales"
            ],
            'benefits' => [
                [
                    'title' => 'Gestion simplifiée',
                    'description' => 'Simplifiez la gestion administrative de vos ressources humaines',
                    'icon' => 'ClipboardList'
                ],
                [
                    'title' => 'Sécurité juridique',
                    'description' => 'Respect des obligations légales en matière de droit du travail',
                    'icon' => 'Shield'
                ],
                [
                    'title' => 'Performance RH',
                    'description' => 'Optimisation de la gestion de vos ressources humaines',
                    'icon' => 'Users'
                ]
            ]
        ],
        'juridiques' => [
            'slug' => 'juridiques',
            'title' => 'Missions juridiques',
            'description' => "Nous vous accompagnons dans vos démarches juridiques : création d'entreprise, rédaction de statuts, assemblées générales et formalités.",
            'image' => '/storage/images/services/closeup-gavel-judgement-concept.webp',
            'longDescription' => "Notre service juridique vous accompagne dans toutes les étapes de la vie de votre entreprise. De la création à la transmission en passant par le développement, nos experts vous conseillent et vous assistent dans vos démarches juridiques pour sécuriser votre activité.",
            'features' => [
                "Création d'entreprise",
                "Rédaction de statuts",
                "Assemblées générales",
                "Formalités légales",
                "Conseil en propriété intellectuelle",
                "Contentieux"
            ],
            'benefits' => [
                [
                    'title' => 'Sécurité juridique',
                    'description' => 'Protection de vos intérêts et sécurisation de vos activités',
                    'icon' => 'Shield'
                ],
                [
                    'title' => 'Expertise dédiée',
                    'description' => 'Accompagnement par des experts en droit des affaires',
                    'icon' => 'UserCheck'
                ],
                [
                    'title' => 'Gestion des risques',
                    'description' => 'Identification et prévention des risques juridiques',
                    'icon' => 'AlertTriangle'
                ]
            ]
        ],
        'fiscales' => [
            'slug' => 'fiscales',
            'title' => 'Missions fiscales',
            'description' => "Un suivi rigoureux de vos obligations fiscales et l'optimisation de votre fiscalité pour sécuriser et alléger vos charges.",
            'image' => '/storage/images/services/mid-section-anonymous-male-accountant-calculating-financial-data.webp',
            'longDescription' => "Notre service fiscal vous accompagne dans la gestion de vos obligations fiscales et l'optimisation de votre situation. Nous vous aidons à comprendre et à anticiper les évolutions législatives pour sécuriser votre entreprise et optimiser votre fiscalité.",
            'features' => [
                "Déclarations fiscales",
                "Optimisation fiscale",
                "Contrôles fiscaux",
                "Contentieux fiscal",
                "Conseil en stratégie fiscale",
                "Veille réglementaire"
            ],
            'benefits' => [
                [
                    'title' => 'Optimisation fiscale',
                    'description' => 'Réduction légale de votre charge fiscale',
                    'icon' => 'DollarSign'
                ],
                [
                    'title' => 'Sécurité',
                    'description' => 'Respect des obligations fiscales en vigueur',
                    'icon' => 'Shield'
                ],
                [
                    'title' => 'Gain de temps',
                    'description' => 'Gestion simplifiée de vos déclarations fiscales',
                    'icon' => 'Clock'
                ]
            ]
        ],
        'smq' => [
            'slug' => 'smq',
            'title' => 'Mise en place S.M.Q',
            'description' => "Nous vous guidons dans la mise en place et le suivi d'un Système de Management de la Qualité, adapté à vos objectifs et exigences.",
            'image' => '/storage/images/services/reading-business-report.webp',
            'longDescription' => "Notre service d'accompagnement à la mise en place d'un Système de Management de la Qualité (SMQ) vous aide à structurer votre démarche qualité, à améliorer vos processus et à obtenir les certifications nécessaires à votre développement.",
            'features' => [
                "Diagnostic initial",
                "Accompagnement à la certification",
                "Formation des équipes",
                "Mise en place des processus",
                "Audits internes",
                "Amélioration continue"
            ],
            'benefits' => [
                [
                    'title' => 'Amélioration continue',
                    'description' => 'Optimisation continue de vos processus',
                    'icon' => 'RefreshCw'
                ],
                [
                    'title' => 'Reconnaissance',
                    'description' => 'Certification reconnue de votre système qualité',
                    'icon' => 'Award'
                ],
                [
                    'title' => 'Performance',
                    'description' => 'Amélioration de la performance globale',
                    'icon' => 'TrendingUp'
                ]
            ]
        ],
        'formation' => [
            'slug' => 'formation',
            'title' => 'Formation',
            'description' => 'Des programmes de formation ciblés et pratiques, destinés à renforcer les compétences de vos équipes dans leurs domaines d\'expertise.',
            'image' => '/storage/images/services/team-businessmen-listening-business-lecture-briefing.webp',
            'longDescription' => "Notre service de formation propose des programmes sur mesure pour développer les compétences de vos équipes. Nos formations couvrent un large éventail de domaines et sont animées par des experts reconnus dans leur spécialité.",
            'features' => [
                "Formations sur mesure",
                "Catalogue de formations",
                "Formateurs experts",
                "Évaluation des compétences",
                "Suivi post-formation",
                "Certifications"
            ],
            'benefits' => [
                [
                    'title' => 'Compétences accrues',
                    'description' => 'Développement des compétences de vos équipes',
                    'icon' => 'Users'
                ],
                [
                    'title' => 'Adaptabilité',
                    'description' => 'Formations adaptées à vos besoins spécifiques',
                    'icon' => 'Target'
                ],
                [
                    'title' => 'Performance',
                    'description' => 'Amélioration des performances individuelles et collectives',
                    'icon' => 'BarChart2'
                ]
            ]
        ],
        'gestion-projets' => [
            'slug' => 'gestion-projets',
            'title' => 'Gestion des projets',
            'description' => 'Nous vous assistons dans la planification, le suivi et la réussite de vos projets, en assurant qualité, respect des délais et efficacité.',
            'image' => '/storage/images/services/business-people-are-brainstorming.webp',
            'longDescription' => "Notre service de gestion de projet vous accompagne dans la réussite de vos projets, de l'idée à la réalisation. Nous mettons à votre disposition des méthodes et des outils éprouvés pour assurer le succès de vos projets dans le respect des délais, des coûts et de la qualité attendue.",
            'features' => [
                "Planification stratégique",
                "Gestion des parties prenantes",
                "Suivi des indicateurs clés",
                "Gestion des risques",
                "Reporting régulier",
                "Capitalisation des connaissances"
            ],
            'benefits' => [
                [
                    'title' => 'Efficacité',
                    'description' => 'Réalisation des projets dans les délais et le budget',
                    'icon' => 'CheckCircle'
                ],
                [
                    'title' => 'Transparence',
                    'description' => 'Suivi clair et régulier de l\'avancement',
                    'icon' => 'Eye'
                ],
                [
                    'title' => 'Résultats',
                    'description' => 'Atteinte des objectifs fixés',
                    'icon' => 'Target'
                ]
            ]
        ]
    ];

    public function show($service)
    {
        if (!array_key_exists($service, $this->services)) {
            abort(404);
        }

        return Inertia::render('Service', [
            'service' => $this->services[$service]
        ]);
    }
}
