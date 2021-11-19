import Head from 'next/head'
import styles from './styles.module.scss'


export default function Posts(){
    return(
        <>
        <Head>
            <title> Posts | Ignews</title>
        </Head>
        <main className={styles.container}>
            <div className={styles.posts}>
                <a href="#">
                    <time>12 de Março 2021</time>
                    <strong>
                        Oi
                    </strong>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente corrupti ab veritatis nisi neque. Ut, doloremque! Exercitationem, culpa odio. Commodi quidem quibusdam labore mollitia id nobis! Voluptatem, numquam? Quos, ex?</p>
                </a>
                <a href="#">
                    <time>12 de Março 2021</time>
                    <strong>
                        Oi
                    </strong>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente corrupti ab veritatis nisi neque. Ut, doloremque! Exercitationem, culpa odio. Commodi quidem quibusdam labore mollitia id nobis! Voluptatem, numquam? Quos, ex?</p>
                </a>
                <a href="#">
                    <time>12 de Março 2021</time>
                    <strong>
                        Oi
                    </strong>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente corrupti ab veritatis nisi neque. Ut, doloremque! Exercitationem, culpa odio. Commodi quidem quibusdam labore mollitia id nobis! Voluptatem, numquam? Quos, ex?</p>
                </a>
            </div>
        </main>
        </>
    );
}