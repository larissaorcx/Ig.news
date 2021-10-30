import style from './styles.module.scss'

import { FaGithub } from 'react-icons/fa'
import { FiX } from 'react-icons/fi'

export function SingInButtom(){
    const isUserLoggerIn = true;

    return(
        isUserLoggerIn ?(
            <button type="button" className={style.SingInButtom}>
            <FaGithub color="#04d361"/>
            Ingrid Oliveira

            <FiX color="#737380" className={style.closeIncon} />
            </button>
        ):(
            <button type="button" className={style.SingInButtom}>
            <FaGithub color="#eba417"/>
            Sign In With Github
            </button>
        )
    );
}