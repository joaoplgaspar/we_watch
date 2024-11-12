import { IFlatrate } from 'types/IMedia'
import styles from '../WatchProviders.module.scss'

interface ProviderItemProps {
    provider: IFlatrate
}

export default function ProviderItem({provider}: ProviderItemProps) {
    console.log(provider)

    return (
        <div className={styles.provider_item}>
            <img src={`https://image.tmdb.org/t/p/w92${provider.logo_path}`} alt={provider.provider_name} />
            <p className={styles.provider_name}>{provider.provider_name}</p>
        </div>
    )
}
