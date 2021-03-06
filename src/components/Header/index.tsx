import { SingInButton } from '../SignInButton'
import {ActiveLink} from '../ActiveLink'

import Img from 'next/image'

import styles from './styles.module.scss'

export function Header(){


    return(
        <header className={styles.headerContainer}>
            <div className={styles.headerContent}>
                <Img src="/images/logo.svg" alt="Logo" width={100}height={100}/>

                <nav>
                    <ActiveLink activeClassName={ styles.active } href="/">
                        <a>Home</a>
                    </ActiveLink>
                    <ActiveLink activeClassName={ styles.active } href="/posts" prefetch>
                        <a>Posts</a>
                    </ActiveLink>
                    
                </nav>

                <SingInButton />
            </div>
         
        </header>
    )
}