import { SingInButtom } from '../SignInButtom'
import {ActiveLink} from '../ActiveLink'

import Link from 'next/link'
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

                <SingInButtom />
            </div>
         
        </header>
    )
}