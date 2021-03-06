import { GetStaticProps } from 'next';
import Head from 'next/head';
import { getPrismicClient } from '../../services/prismic';
import Prismic from '@prismicio/client';
import Link from 'next/link'

import {RichText} from 'prismic-dom'
import styles from './styles.module.scss';

type Posts = {
    slug: string,
    title: string,
    excerpt: string,
    updatedAt:string,
}
type Data = {
    title: string,
    content: {
        type: string,
        text: string,
    }[],

}
interface PostsProps{
    posts: Posts[]
}

export default function Posts({posts}: PostsProps){
    return(
        <>
        <Head>
            <title> Posts | Ignews</title>
        </Head>
        <main className={styles.container}>
            <div className={styles.posts}>
                {posts.map(post => (
                    <Link href={`/posts/${post.slug}`} key={post.slug}>
                        <a>
                            <time>{post.updatedAt}</time>
                            <strong>{post.title}</strong>
                            <p>{post.excerpt}</p>
                        </a>
                    </Link>
                ))}
            </div>
        </main>
        </>
    );
}

export const getStaticProps: GetStaticProps  =  async () =>{
    const prismic = getPrismicClient()

    const response = await prismic.query<Data>([
        Prismic.predicates.at('document.type', 'publication') //busca os documentos no Prismic que são do tipo publication
    ],{
        fetch: ['publication.title', 'publication.content'],
        pageSize: 100,
    })

    // console.log(JSON.stringify(response, null, 2)) //------- console para ver toda a estrutura da resposta.

    const posts = response.results.map(post => {
        return{
            slug: post.uid,
            title: RichText.asText(post.data.title),
            excerpt: post.data.content.find(content => content.type == 'paragraph')?.text ?? '', //se encontrar o paragrafo ele retorna o texte, se não retorna a string vazia.
            updatedAt: new Date(post.last_publication_date).toLocaleDateString('pt-BR', {
                day:'2-digit',
                month: 'long',
                year: 'numeric',
            })
        }
    })
    return{ 
        props: {
            posts
        }
    }
}