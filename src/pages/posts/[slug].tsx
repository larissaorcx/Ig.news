import { GetServerSideProps } from "next";
import { getSession } from "next-auth/client";
import Head from "next/head";
import { RichText } from "prismic-dom";
import React from "react";

import { getPrismicClient } from "../../services/prismic";

import styles from './post.module.scss'

interface PostsProps{
    post: {
        slug: string,
        title: string,
        content: string,
        excerpt: string,
        updateAt:string,
    }
}

export default function Post({post}: PostsProps){
    return (
        <>
            <Head>
                <title>{post.title} | Ignews</title>
            </Head>

            <main>
                <article className={styles.post}>
                    <h1>{post.title}</h1>
                    <time>{post.updateAt}</time>

                    <div className={styles.postContent} dangerouslySetInnerHTML={{__html: post.content}}/> 
                </article>
            </main>
        </>
    );

}

export const getServerSideProps: GetServerSideProps = async ({req, params}) => {
    const session = await getSession({ req }) //busca a requisição nos cokies para saber se o usuario tem acesso ao conteudo ou não

    const {slug} = params; //acesso ao slug desejado pelo params

    if(!session?.activeSubscription){ //usuario não logado
        return{
            redirect: {
                destination:'/',
                permanent: false,
            }
        }
    }

    const prismic = getPrismicClient(req)
    const response = await prismic.getByUID('publication', String(slug), {}) 

    if (!response) {
        return {
          redirect: {
            destination: '/',
            permanent: false
          }
        }
      }

    const post = {
        slug,
        title: RichText.asText(response.data.title),
        content: RichText.asHtml(response.data.content),
        updateAt: new Date(response.last_publication_date).toLocaleDateString('pt-BR', {
            day:'2-digit',
            month: 'long',
            year: 'numeric',
        })
    };

    return{
        props: {
            post,
        },
        redirect: 60 * 30, //30 min
    }
}
