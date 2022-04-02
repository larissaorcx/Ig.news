import { useEffect } from 'react';
import { GetStaticPaths, GetStaticProps } from 'next'
import { useSession } from 'next-auth/client';
import {useRouter} from 'next/router';
import Head from 'next/head'
import Link from 'next/link'
import { RichText } from 'prismic-dom';

import { getPrismicClient } from '../../../services/prismic';

import styles from '../post.module.scss'

interface PostPreviewProps {
  post: {
    slug: string;
    title: string;
    content: string;
    updatedAt: string;
  }
}

export const getStaticPaths: GetStaticPaths = async () => {

  return {
    paths: [],
    fallback: 'blocking'
    // fallback: true -> se tentar acessar uma pagina que ainda
    // nao foi gerada de forma estatica, carrega o conteudo pelo
    // lado do cliente.

    // fallback: false -> se tentar acessar uma pagina que ainda
    // nao foi gerada de forma estatica, retorna 404

    // fallback: 'blocking' -> se tentar acessar uma pagina que ainda
    // nao foi gerada de forma estatica, tentar carregar o conteudo
    // na camada next (SSR)
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params;

  if ( slug === 'favicon.png' ) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      }
    }
  }

  const prismic = getPrismicClient();

  const response = await prismic.getByUID('post', String(slug), {})

  const post = {
    slug,
    title: RichText.asText(response.data.title),
    content: RichText.asHtml(response.data.content.splice(0, 3)),
    updatedAt: new Date(response.last_publication_date).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    })
  }

  return {
    props: {
      post
    },
    revalidate: 60 * 30, // 30 minutos
  }
}

export default function PostPreview({ post }: PostPreviewProps) {
  const [session] = useSession()
  const router = useRouter()

  useEffect(() => {
    if (session?.activeSubscription) {
      router.push(`/posts/${post.slug}`)
    }
  }, [session, router, post])

  return (
    <>
      <Head>
        <title>{post.title} | Ignews</title>
      </Head>

      <main className={styles.container}>
        <article className={styles.post}>
          <h1>{post.title} | Ignews</h1>
          <time>{post.updatedAt}</time>
          <div 
            className={`${styles.postContent} ${styles.previewContent}`}
            dangerouslySetInnerHTML={{__html: post.content}} 
          />

          <div className={styles.continueReading}>
            Wanna continue reading?
            <Link href="/">
              <a href="">Subscribe now 🤗</a>
            </Link>
          </div>
        </article>
      </main>
    </>
  )
}

