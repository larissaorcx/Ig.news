import { GetStaticPaths, GetStaticProps } from "next";
import { useSession } from "next-auth/client";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { RichText } from "prismic-dom";
import React, { useEffect } from "react";

import { getPrismicClient } from "../../../services/prismic";

import styles from '../post.module.scss'

interface PostPreviewProps{
    post: {
        slug: string,
        title: string,
        content: string,
        excerpt: string,
        updateAt:string,
    }
}

export default function PostPreview({ post }: PostPreviewProps){
    const [session] = useSession()
    const router = useRouter()

    useEffect(() => {
        if(session?.activeSubscription){
            router.push(`/posts/ ${post.slug}`)
        }
    }, [session, post.slug, router])

    return (
        <>
            <Head>
                <title>{post.title} | Ignews</title>
            </Head>

            <main>
                <article className={styles.post}>
                    <h1>{post.title}</h1>
                    <time>{post.updateAt}</time>

                    <div className={`${styles.postContent}  ${styles.previewContent}`} dangerouslySetInnerHTML={{__html: post.content}}/> 

                    <div className={styles.continueReading}>
                        Wanna continue reading?
                        <Link href="/">
                            <a>Subscribe now 🤗🤞</a>
                        </Link>
                    </div>
                </article>
            </main>
        </>
    );

}

export const getStaticPaths: GetStaticPaths = async () => {
    return{
        paths: [
            // preview de post gerados durante a build, como está vazio todos serão carregados conforme o primeiro acesso
            // {params: {slug: 'como-renomear-varios-arquivos-de-uma-vez-usando-o-terminal'}} sintaxe
        ],
        fallback: 'blocking' // só mostra o conteudo quando a página estiver carregada. página carregado pelo lado do servidor 
    }
}

export const getStaticProps: GetStaticProps = async ({params}) => {
   
    const {slug} = params; //acesso ao slug desejado pelo params

    const prismic = getPrismicClient()
    const response = await prismic.getByUID('publication', String(slug), {}) 

    const post = {
        slug,
        title: RichText.asText(response.data.title),
        content: RichText.asHtml(response.data.content.splice(0, 3)), // pega os três primeiros parágrafos do conteúdo
        updateAt: new Date(response.last_publication_date).toLocaleDateString('pt-BR', {
            day:'2-digit',
            month: 'long',
            year: 'numeric',
        })
    };

    return{
        props: {
            post,
        }
    }
}
