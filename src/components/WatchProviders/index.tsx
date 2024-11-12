import styles from './WatchProviders.module.scss'
import { IMediaProviders, IFlatrate } from 'types/IMedia'
import ProviderItem from './ProviderItem'
import { useState, useEffect } from 'react'

interface WatchProvidersProps {
  results: IMediaProviders['results'] | undefined
}

export default function WatchProviders({results}: WatchProvidersProps) {
    const flatFilter = ['BR', 'US']
    const [selectedCountry, setSelectedCountry] = useState<string | null>(null)
    const [selectedProviders, setSelectedProviders] = useState<IFlatrate[]>([])

    useEffect(() => {
        if (results && flatFilter.length > 0) {
            const firstCountry = flatFilter.find(country => results[country])
            if (firstCountry) {
                handleCountrySelect(firstCountry)
            }
        }
    }, [results])

    if(!results) return <></>;
    
    const filteredResults = Object.entries(results).filter(([key]) => {
        return flatFilter.includes(key)
    })

    const handleCountrySelect = (country: string) => {
        setSelectedCountry(country)
        const providers = results[country]?.flatrate || 
                          results[country]?.rent || 
                          results[country]?.buy || 
                          []
        setSelectedProviders(providers)
    }

    const isProvidersAvailable = (country: string) => {
        return (
            results[country]?.flatrate?.length ||
            results[country]?.rent?.length ||
            results[country]?.buy?.length
        )
    }

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Onde assistir</h2>
            <div className={styles.providers}>
                <div className={styles.countryButtons}>
                    {filteredResults.map(([key]) => (
                        <button 
                            key={key}
                            onClick={() => handleCountrySelect(key)}
                            className={selectedCountry === key ? styles.activeButton : ''}
                            disabled={!isProvidersAvailable(key)}
                        >
                            {key}
                        </button>
                    ))}
                </div>
            
                {selectedProviders.length > 0 && (
                    <div className={styles.providers_list}>
                        {selectedProviders.map((provider) => (
                            <ProviderItem 
                                key={provider.provider_id} 
                                provider={provider} 
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}