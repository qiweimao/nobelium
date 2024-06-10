import { clientConfig } from '@/lib/server/config'
import { getAllPosts } from '@/lib/notion'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Head from 'next/head'
import { useConfig } from '@/lib/config'
import cn from 'classnames'

import { Suspense } from 'react';
import { unstable_noStore as noStore } from 'next/cache';
import Link from 'next/link';
import Image from 'next/image';

export async function getStaticProps () {
  const posts = await getAllPosts({ includePages: false })
  const postsToShow = posts.slice(0, clientConfig.postsPerPage)
  const totalPosts = posts.length
  const showNext = totalPosts > clientConfig.postsPerPage
  return {
    props: {
      page: 1, // current page is 1
      postsToShow,
      showNext
    },
    revalidate: 1
  }
}

function Badge(props) {
  return (
    <a
      {...props}
      target="_blank"
      className="inline-flex items-center rounded border border-neutral-200 bg-neutral-50 p-1 text-sm leading-4 text-neutral-900 no-underline dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-100"
    />
  );
}

const Portfolio = () => {
  const BLOG = useConfig()
  const layout = ""
  const fullWidth = false

  const url = BLOG.path.length ? `${BLOG.link}/${BLOG.path}` : BLOG.link
  const meta = {
    title: BLOG.title,
    type: 'website',
    description: 'A Geotechnical Engineer\'s Journey into IoT',
  }

  return (
    <div>
      <Head>
        <title>{meta.title}</title>
        {/* <meta content={BLOG.darkBackground} name="theme-color" /> */}
        <meta name="robots" content="follow, index" />
        <meta charSet="UTF-8" />
        {BLOG.seo.googleSiteVerification && (
          <meta
            name="google-site-verification"
            content={BLOG.seo.googleSiteVerification}
          />
        )}
        {BLOG.seo.keywords && (
          <meta name="keywords" content={BLOG.seo.keywords.join(', ')} />
        )}
        <meta name="description" content={meta.description} />
        <meta property="og:locale" content={BLOG.lang} />
        <meta property="og:title" content={meta.title} />
        <meta property="og:description" content={meta.description} />
        <meta
          property="og:url"
          content={meta.slug ? `${url}/${meta.slug}` : url}
        />
        <meta
          property="og:image"
          content={`${BLOG.ogImageGenerateURL}/${encodeURIComponent(
            meta.title
          )}.png?theme=dark&md=1&fontSize=125px&images=https%3A%2F%2Fnobelium.vercel.app%2Flogo-for-dark-bg.svg`}
        />
        <meta property="og:type" content={meta.type} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:description" content={meta.description} />
        <meta name="twitter:title" content={meta.title} />
        <meta
          name="twitter:image"
          content={`${BLOG.ogImageGenerateURL}/${encodeURIComponent(
            meta.title
          )}.png?theme=dark&md=1&fontSize=125px&images=https%3A%2F%2Fnobelium.vercel.app%2Flogo-for-dark-bg.svg`}
        />
        {meta.type === 'article' && (
          <>
            <meta
              property="article:published_time"
              content={meta.date}
            />
            <meta property="article:author" content={BLOG.author} />
          </>
        )}
      </Head>
      <div
        className={`wrapper ${BLOG.font === 'serif' ? 'font-serif' : 'font-sans'
          }`}
      >
        <Header
          navBarTitle={layout === 'blog' ? meta.title : null}
          fullWidth={fullWidth}
        />
        <main className={cn(
          'flex-grow transition-all',
          layout !== 'blog' && ['self-center px-4', 'w-full max-w-2xl']
        )}>
          <article className={cn('flex flex-col', 'items-center')}>
            <article className="mb-6 md:mb-8">
              <header className="flex flex-col justify-between md:flex-row md:items-baseline">
                <h2 className="text-lg md:text-xl font-medium mb-2 cursor-pointer text-black dark:text-gray-100">
                  <p>Hi, I&apos;m Qiwei Mao 👋</p>
                </h2>
              </header>
              <main>
                <p className="leading-8 text-gray-700 dark:text-gray-300">
                  <p>I&apos;m a geotechnical engineer with a passion for IoT systems. I&apos;m exploring low-power microcontrollers and LoRa communication systems to enable both hobbyist remote monitoring solutions and industrial-grade monitoring or control systems.</p>
                  <p>
                    <Badge href="https://github.com/qiweimao">
                      <img
                        alt="Github logomark light mode"
                        src="/github-mark-light.svg"
                        className="!mr-1 dark:hidden"
                        width="14"
                        height="14"
                      />
                      <img
                        alt="Github logomark dark mode"
                        src="/github-mark-dark.svg"
                        className="!mr-1 hidden dark:block"
                        width="14"
                        height="14"
                      />
                      Github
                    </Badge>
                    {` `}
                    <Badge href="https://www.linkedin.com/in/qiwei-mao">
                      <img
                        alt="LinkedIn logomark"
                        src="linkedin.svg"
                        className="!mr-1"
                        width="14"
                        height="14"
                      />
                      LinkedIn
                    </Badge>
                  </p>
                </p>
              </main>
            </article>
          </article>
        </main>
        <Footer fullWidth={fullWidth} />
      </div>
    </div>
  )
};

export default Portfolio;

