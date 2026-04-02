import { Metadata } from 'next'
import Breadcrumbs from '@/components/layout/Breadcrumbs'

export const metadata: Metadata = {
  title: 'Politique de Confidentialit\u00e9 | Hortense de Ruidiaz',
  description:
    'Politique de confidentialit\u00e9 et protection des donn\u00e9es personnelles (RGPD) du site hortensederuidiaz.com \u2014 Photographe & Drone \u00e0 Bordeaux.',
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Accueil',
      item: 'https://hortensederuidiaz.com',
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Politique de confidentialit\u00e9',
      item: 'https://hortensederuidiaz.com/politique-confidentialite',
    },
  ],
}

export default function PolitiqueConfidentialitePage() {
  return (
    <main className="min-h-screen bg-cream">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Breadcrumbs items={[{ label: "Politique de confidentialit\u00e9" }]} />
      <section className="bg-sand/40 py-20 md:py-28">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h1 className="font-serif text-4xl font-bold tracking-tight text-charcoal md:text-5xl">
            Politique de Confidentialit&eacute;
          </h1>
          <p className="mt-4 font-sans text-warmgray">
            Derni&egrave;re mise &agrave; jour : avril 2026
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-6 py-16 md:py-24">
        <div className="space-y-12 font-sans text-base leading-relaxed text-charcoal/90">
          <article>
            <h2 className="font-serif text-2xl font-semibold text-charcoal">
              1. Responsable du traitement
            </h2>
            <div className="mt-4 space-y-3">
              <p>
                Le responsable du traitement des donn&eacute;es personnelles collect&eacute;es sur le site{' '}
                <a href="https://hortensederuidiaz.com" className="text-sage underline underline-offset-2 transition-colors hover:text-gold">
                  hortensederuidiaz.com
                </a>{' '}
                est&nbsp;:
              </p>
              <ul className="ml-5 list-disc space-y-1 text-warmgray">
                <li><strong className="text-charcoal">Nom :</strong> Hortense de Ruidiaz</li>
                <li><strong className="text-charcoal">Adresse :</strong> Bordeaux, France</li>
                <li><strong className="text-charcoal">E-mail :</strong>{' '}
                  <a href="mailto:contact@hortensederuidiaz.com" className="text-sage underline underline-offset-2 transition-colors hover:text-gold">
                    contact@hortensederuidiaz.com
                  </a>
                </li>
              </ul>
            </div>
          </article>

          <article>
            <h2 className="font-serif text-2xl font-semibold text-charcoal">
              2. Donn&eacute;es collect&eacute;es
            </h2>
            <div className="mt-4 space-y-3">
              <p>
                Dans le cadre de l&apos;utilisation du site, les donn&eacute;es personnelles suivantes peuvent &ecirc;tre collect&eacute;es&nbsp;:
              </p>
              <ul className="ml-5 list-disc space-y-1 text-warmgray">
                <li><strong className="text-charcoal">Via le formulaire de contact :</strong> nom, adresse e-mail, num&eacute;ro de t&eacute;l&eacute;phone, contenu du message</li>
                <li><strong className="text-charcoal">Cookies techniques :</strong> cookies strictement n&eacute;cessaires au fonctionnement du site</li>
              </ul>
            </div>
          </article>

          <article>
            <h2 className="font-serif text-2xl font-semibold text-charcoal">
              3. Finalit&eacute;s du traitement
            </h2>
            <div className="mt-4 space-y-3">
              <p>Les donn&eacute;es personnelles collect&eacute;es sont utilis&eacute;es pour les finalit&eacute;s suivantes&nbsp;:</p>
              <ul className="ml-5 list-disc space-y-1 text-warmgray">
                <li>R&eacute;pondre &agrave; vos demandes de contact et de renseignements</li>
                <li>Gestion de la relation client&egrave;le</li>
              </ul>
            </div>
          </article>

          <article>
            <h2 className="font-serif text-2xl font-semibold text-charcoal">
              4. Base l&eacute;gale du traitement
            </h2>
            <div className="mt-4 space-y-3">
              <p>Le traitement de vos donn&eacute;es repose sur&nbsp;:</p>
              <ul className="ml-5 list-disc space-y-1 text-warmgray">
                <li><strong className="text-charcoal">Votre consentement</strong> (article 6.1.a du RGPD) &mdash; lors de l&apos;envoi du formulaire de contact</li>
                <li><strong className="text-charcoal">L&apos;int&eacute;r&ecirc;t l&eacute;gitime</strong> (article 6.1.f du RGPD) &mdash; pour assurer la s&eacute;curit&eacute; et le bon fonctionnement du site</li>
              </ul>
            </div>
          </article>

          <article>
            <h2 className="font-serif text-2xl font-semibold text-charcoal">
              5. Dur&eacute;e de conservation
            </h2>
            <div className="mt-4 space-y-3">
              <p>
                Vos donn&eacute;es personnelles sont conserv&eacute;es pendant une dur&eacute;e maximale de <strong>3&nbsp;ans</strong> &agrave; compter de votre dernier contact, sauf obligation l&eacute;gale contraire.
              </p>
              <p>
                Au-del&agrave; de cette p&eacute;riode, vos donn&eacute;es sont supprim&eacute;es ou anonymis&eacute;es.
              </p>
            </div>
          </article>

          <article>
            <h2 className="font-serif text-2xl font-semibold text-charcoal">
              6. Destinataires des donn&eacute;es
            </h2>
            <div className="mt-4 space-y-3">
              <p>
                Vos donn&eacute;es personnelles ne sont transmises &agrave; <strong>aucun tiers</strong>. Elles sont uniquement accessibles par Hortense de Ruidiaz dans le cadre des finalit&eacute;s d&eacute;crites ci-dessus.
              </p>
            </div>
          </article>

          <article>
            <h2 className="font-serif text-2xl font-semibold text-charcoal">
              7. Vos droits
            </h2>
            <div className="mt-4 space-y-3">
              <p>
                Conform&eacute;ment au R&egrave;glement G&eacute;n&eacute;ral sur la Protection des Donn&eacute;es (RGPD &mdash; R&egrave;glement UE 2016/679) et &agrave; la loi Informatique et Libert&eacute;s du 6&nbsp;janvier 1978 modifi&eacute;e, vous disposez des droits suivants&nbsp;:
              </p>
              <ul className="ml-5 list-disc space-y-1 text-warmgray">
                <li><strong className="text-charcoal">Droit d&apos;acc&egrave;s :</strong> obtenir la confirmation que des donn&eacute;es vous concernant sont trait&eacute;es et en obtenir une copie</li>
                <li><strong className="text-charcoal">Droit de rectification :</strong> demander la correction de donn&eacute;es inexactes ou incompl&egrave;tes</li>
                <li><strong className="text-charcoal">Droit &agrave; l&apos;effacement :</strong> demander la suppression de vos donn&eacute;es personnelles</li>
                <li><strong className="text-charcoal">Droit &agrave; la portabilit&eacute; :</strong> recevoir vos donn&eacute;es dans un format structur&eacute; et lisible</li>
                <li><strong className="text-charcoal">Droit d&apos;opposition :</strong> vous opposer au traitement de vos donn&eacute;es</li>
                <li><strong className="text-charcoal">Droit &agrave; la limitation :</strong> demander la limitation du traitement de vos donn&eacute;es</li>
              </ul>
              <p>
                Vous disposez &eacute;galement du droit d&apos;introduire une r&eacute;clamation aupr&egrave;s de la{' '}
                <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer" className="text-sage underline underline-offset-2 transition-colors hover:text-gold">
                  CNIL
                </a>.
              </p>
            </div>
          </article>

          <article>
            <h2 className="font-serif text-2xl font-semibold text-charcoal">
              8. Exercer vos droits
            </h2>
            <div className="mt-4 space-y-3">
              <p>
                Pour exercer l&apos;un de vos droits, vous pouvez nous contacter &agrave; l&apos;adresse suivante&nbsp;:
              </p>
              <p>
                <a href="mailto:contact@hortensederuidiaz.com" className="text-sage underline underline-offset-2 transition-colors hover:text-gold">
                  contact@hortensederuidiaz.com
                </a>
              </p>
              <p>
                Nous nous engageons &agrave; r&eacute;pondre &agrave; votre demande dans un d&eacute;lai de 30&nbsp;jours suivant sa r&eacute;ception.
              </p>
            </div>
          </article>

          <article>
            <h2 className="font-serif text-2xl font-semibold text-charcoal">
              9. Cookies
            </h2>
            <div className="mt-4 space-y-3">
              <p>
                Le site hortensederuidiaz.com utilise uniquement des <strong>cookies techniques</strong> strictement n&eacute;cessaires au bon fonctionnement du site. Aucun cookie de tra&ccedil;age publicitaire ou de profilage n&apos;est d&eacute;pos&eacute;.
              </p>
              <p>
                Vous pouvez configurer votre navigateur pour refuser les cookies. Cela pourrait cependant alt&eacute;rer votre exp&eacute;rience de navigation.
              </p>
            </div>
          </article>

          <article>
            <h2 className="font-serif text-2xl font-semibold text-charcoal">
              10. Modifications de la politique
            </h2>
            <div className="mt-4 space-y-3">
              <p>
                La pr&eacute;sente politique de confidentialit&eacute; peut &ecirc;tre mise &agrave; jour &agrave; tout moment. Nous vous invitons &agrave; la consulter r&eacute;guli&egrave;rement.
              </p>
              <p>
                <strong>Derni&egrave;re mise &agrave; jour :</strong> avril 2026
              </p>
            </div>
          </article>

          <hr className="border-sand" />

          <p className="text-center text-sm text-warmgray">
            &copy; {new Date().getFullYear()} Hortense de Ruidiaz. Tous droits r&eacute;serv&eacute;s.
          </p>
        </div>
      </section>
    </main>
  )
}
