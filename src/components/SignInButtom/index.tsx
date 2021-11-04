import style from './styles.module.scss'

import { signIn, signOut, useSession } from 'next-auth/client'

import { FaGithub } from 'react-icons/fa'
import { FiX } from 'react-icons/fi'

export function SingInButtom(){
    const [session] = useSession();

    return(
        session ?(
            <button type="button" className={style.SingInButtom} onClick={() => signOut()}>
            <FaGithub color="#04d361"/>
            {session.user.name}

            <FiX color="#737380" className={style.closeIncon} />
            </button>
        ):(
            <button type="button" className={style.SingInButtom} onClick={() => signIn('github')}>

            <FaGithub color="#eba417"/>
            Sign In With Github
            </button>
        )
    );
}