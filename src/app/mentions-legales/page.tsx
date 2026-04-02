import { Metadata } from 'next'
import Breadcrumbs from '@/components/layout/Breadcrumbs'

export const metadata: Metadata = {
  title: 'Mentions Légales | Hortense de Ruidiaz',
  description:
    'Mentions légales du site hortensederuidiaz.com — Photographe & Drone à Bordeaux.',
}

export default function MentionsLegalesPage() {
  return (
    <main className="min-h-screen bg-cream">
      <Breadcrumbs items={[{ label: "Mentions légales" }]} />
      <section className="bg-sand/40 py-20 md:py-28">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h1 className="font-serif text-4xl font-bold tracking-tight text-charcoal md:text-5xl">
            Mentions Légales
          </h1>
          <p className="mt-4 font-sans text-warmgray">
            Dernière mise à jour : mars 2026
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-6 py-16 md:py-24">
        <div className="space-y-12 font-sans text-base leading-relaxed text-charcoal/90">
          <article>
            <h2 className="font-serif text-2xl font-semibold text-charcoal">
              1. Éditeur du site
            </h2>
            <div className="mt-4 space-y-1">
              <p>
                Le site{' '}
                <a href="https://hortensederuidiaz.com" className="text-sage underline underline-offset-2 transition-colors hover:text-gold">
                  hortensederuidiaz.com
                </a>{' '}
                est édité par&nbsp;:
              </p>
              <ul className="ml-5 mt-3 list-disc space-y-1 text-warmgray">
                <li><strong className="text-charcoal">Nom :</strong> Hortense de Ruidiaz</li>
                <li><strong className="text-charcoal">Statut :</strong> Micro-entreprise / Entrepreneur individuel</li>
                <li><strong className="text-charcoal">SIRET :</strong> [en cours d&apos;immatriculation]</li>
                <li><strong className="text-charcoal">Adresse :</strong> Bordeaux, France</li>
                <li><strong className="text-charcoal">E-mail :</strong>{' '}
                  <a href="mailto:contact@hortensederuidiaz.com" className="text-sage underline underline-offset-2 transition-colors hover:text-gold">
                    contact@hortensederuidiaz.com
                  </a>
                </li>
                <li><strong className="text-charcoal">Directrice de la publication :</strong> Hortense de Ruidiaz</li>
              </ul>
            </div>
          </article>

          <article>
            <h2 className="font-serif text-2xl font-semibold text-charcoal">
              2. Hébergement
            </h2>
            <div className="mt-4 space-y-1">
              <p>Le site est hébergé par&nbsp;:</p>
              <ul className="ml-5 mt-3 list-disc space-y-1 text-warmgray">
                <li><strong className="text-charcoal">Hébergeur :</strong> Vercel Inc.</li>
                <li><strong className="text-charcoal">Adresse :</strong> 440 N Barranca Ave #4133, Covina, CA 91723, États-Unis</li>
                <li><strong className="text-charcoal">Site web :</strong>{' '}
                  <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" className="text-sage underline underline-offset-2 transition-colors hover:text-gold">
                    vercel.com
                  </a>
                </li>
              </ul>
            </div>
          </article>

          <article>
            <h2 className="font-serif text-2xl font-semibold text-charcoal">
              3. Propriété intellectuelle
            </h2>
            <div className="mt-4 space-y-3">
              <p>
                L&apos;ensemble du contenu présent sur le site hortensederuidiaz.com — incluant, de façon non limitative, les photographies, textes, graphismes, logos, icônes, vidéos et mises en page — est la propriété exclusive de Hortense de Ruidiaz, sauf mention contraire.
              </p>
              <p>
                Toute reproduction, distribution, modification, adaptation, retransmission ou publication, même partielle, de ces éléments est strictement interdite sans l&apos;accord écrit préalable de Hortense de Ruidiaz.
              </p>
              <p>
                Les photographies présentées sur ce site sont protégées par le droit d&apos;auteur conformément aux articles L.111-1 et suivants du Code de la propriété intellectuelle.
              </p>
            </div>
          </article>

          <article>
            <h2 className="font-serif text-2xl font-semibold text-charcoal">
              4. Données personnelles &amp; RGPD
            </h2>
            <div className="mt-4 space-y-3">
              <p>
                Conformément au Règlement Général sur la Protection des Données (RGPD — Règlement UE 2016/679) et à la loi Informatique et Libertés du 6&nbsp;janvier 1978 modifiée, vous disposez des droits suivants concernant vos données personnelles&nbsp;:
              </p>
              <ul className="ml-5 list-disc space-y-1 text-warmgray">
                <li>Droit d&apos;accès</li>
                <li>Droit de rectification</li>
                <li>Droit à l&apos;effacement</li>
                <li>Droit à la limitation du traitement</li>
                <li>Droit à la portabilité des données</li>
                <li>Droit d&apos;opposition</li>
              </ul>
              <p>
                <strong>Données collectées :</strong> lorsque vous utilisez le formulaire de contact, les données suivantes peuvent être collectées&nbsp;: nom, prénom, adresse e-mail, numéro de téléphone et le contenu de votre message. Ces données sont utilisées uniquement dans le but de répondre à votre demande et ne sont jamais transmises à des tiers.
              </p>
              <p>
                <strong>Durée de conservation :</strong> vos données sont conservées pendant une durée maximale de 3&nbsp;ans à compter de votre dernier contact, sauf obligation légale contraire.
              </p>
              <p>
                Pour exercer vos droits, vous pouvez nous contacter à l&apos;adresse&nbsp;:{' '}
                <a href="mailto:contact@hortensederuidiaz.com" className="text-sage underline underline-offset-2 transition-colors hover:text-gold">
                  contact@hortensederuidiaz.com
                </a>
              </p>
            </div>
          </article>

          <article>
            <h2 className="font-serif text-2xl font-semibold text-charcoal">
              5. Cookies
            </h2>
            <div className="mt-4 space-y-3">
              <p>
                Le site hortensederuidiaz.com peut utiliser des cookies strictement nécessaires au fonctionnement du site. Aucun cookie de traçage publicitaire ou de profilage n&apos;est déposé sans votre consentement explicite.
              </p>
              <p>
                <strong>Cookies techniques :</strong> ces cookies sont indispensables à la navigation sur le site et ne peuvent pas être désactivés.
              </p>
              <p>
                Vous pouvez configurer votre navigateur pour refuser les cookies. Cela pourrait cependant altérer votre expérience de navigation.
              </p>
            </div>
          </article>

          <article>
            <h2 className="font-serif text-2xl font-semibold text-charcoal">
              6. Contact
            </h2>
            <div className="mt-4 space-y-3">
              <p>Pour toute question relative aux présentes mentions légales ou au fonctionnement du site, vous pouvez nous contacter&nbsp;:</p>
              <ul className="ml-5 list-disc space-y-1 text-warmgray">
                <li><strong className="text-charcoal">Par e-mail :</strong>{' '}
                  <a href="mailto:contact@hortensederuidiaz.com" className="text-sage underline underline-offset-2 transition-colors hover:text-gold">
                    contact@hortensederuidiaz.com
                  </a>
                </li>
                <li><strong className="text-charcoal">Par courrier :</strong> Hortense de Ruidiaz — Bordeaux, France</li>
              </ul>
            </div>
          </article>

          <hr className="border-sand" />

          <p className="text-center text-sm text-warmgray">
            &copy; {new Date().getFullYear()} Hortense de Ruidiaz. Tous droits réservés.
          </p>
        </div>
      </section>
    </main>
  )
}
