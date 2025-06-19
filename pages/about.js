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

import miata from 'public/homepage/miata.JPG'
import breadboard from 'public/homepage/breadboard.jpeg'
import qiwei_mao_portrait_2 from 'public/homepage/qiwei_mao_portrait_2.JPG'
import nomi_2 from 'public/homepage/nomi_2.jpeg'
import jeep from 'public/homepage/jeep.JPG'
import qiwei_mao_portrait_1 from 'public/homepage/qiwei_mao_portrait_1.JPG'

import YouTubeEmbed from '@/components/YouTubeEmbed';

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

function Badge({ children, ...props }) {
  return (
    <a
      {...props}
      target="_blank"
      className="inline-flex items-center rounded border border-neutral-200 bg-neutral-50 p-1 text-sm leading-4 text-neutral-900 no-underline dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-100"
    >
      {children}
    </a>
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
          content={"https://www.qiweimao.dev/Qiwei_Mao_og_image.jpg"}
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
                <h1 className="text-lg md:text-xl font-medium mb-2 cursor-pointer text-black dark:text-gray-100">
                  About
                </h1>
              </header>
              <main>
                <p className="leading-8 text-gray-700 dark:text-gray-300">
                  Hi, I&apos;m Qiwei Mao, a geotechnical engineer with a passion for IoT systems. My focus lies in exploring low-power microcontrollers (MCUs) and LoRa communication systems to develop both hobbyist remote monitoring solutions and industrial-grade monitoring or control systems.
                </p>
                <p className="leading-8 text-gray-700 dark:text-gray-300">
                  With integrated circuits becoming increasingly powerful, compact, energy-efficient, and affordable, MCUs can now handle complex tasks with multi-core processing while maintaining connectivity through Bluetooth, WiFi, and local radio transmission systems like LoRa.
                </p>
                <p className="leading-8 text-gray-700 dark:text-gray-300">
                  This technological advancement opens up immense possibilities, particularly in the civil engineering industry, where legacy companies are often slow to adopt new technologies. The advent of Raspberry Pi demonstrated how hobbyists could create reliable and advanced systems, though energy consumption remained an issue. Now, with MCUs&apos; enhanced capabilities, they can read sensors, manage cameras, and simultaneously act as web servers or open up APIs to clients.
                </p>
                <p className="leading-8 text-gray-700 dark:text-gray-300">
                  By developing reliable hardware systems based on these new MCUs and user-friendly UI interfaces, older systems cannot compete in terms of cost, reliability, or energy efficiency.
                </p>
                <p className="leading-8 text-gray-700 dark:text-gray-300">
                  If you are interested in my work, let&apos;s collaborate on Github.
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

