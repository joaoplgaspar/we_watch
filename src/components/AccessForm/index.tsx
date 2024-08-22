import styles from './AccessForm.module.scss'
import { Link } from 'react-router-dom';
import Input from 'components/Input';
import ButtonSubmit from 'components/ButtonSubmit';
import { IAccessForm } from 'types/Components';
import classNames from 'classnames';

export default function AccessForm ({
    action,
    login,
    register,
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    error
}: IAccessForm) {

    const renderConfirmPasswordInput = () => (
        register && setConfirmPassword && confirmPassword != null ? (
        <Input 
            type="password" 
            value={confirmPassword} 
            onChange={(e) => setConfirmPassword(e.target.value)} 
            placeholder="Confirmar senha" 
            required
            label='Confirme sua senha'
        />
        ) : null
    );

    const linkText = login ? 'Não tem uma conta?' : 'Já tem uma conta?';
    const linkHref = login ? '/register' : '/login';
    const linkAction = login ? 'Criar Conta' : 'Entrar em conta existente';
    const title = login ? 'Entrar' : 'Registrar';

    return (
        <form onSubmit={(event) => action(event)} 
            className={classNames({
                [styles.form__container]: true,
                [styles.form__error]: error === '' ? false : true
            })}
        >
            <h1>{title}</h1>
            <p className={styles.error_message}>{error}</p>
            <Input 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                placeholder="Email" 
                required
                label='Email'   
            />
            <Input 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                placeholder="Senha" 
                required
                label='Senha'
            />
            {renderConfirmPasswordInput()}
            
            <p className={styles.link}>
                <span>{linkText}</span><Link to={linkHref} className={styles.link_a}>{linkAction}</Link>
            </p>
            <ButtonSubmit>{title}</ButtonSubmit>
        </form>
    );
};
