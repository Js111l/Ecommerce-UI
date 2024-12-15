import { ColorRing } from "react-loader-spinner";
import { t } from 'i18next';

const LoaderContainer = ()=>{

    return (
        <div >
            <ColorRing
                visible={true}
                ariaLabel="color-ring-loading"
                wrapperStyle={{}}
                wrapperClass="color-ring-wrapper"
                colors={['#000000']}
            />
            <label
                style={{ marginTop: '10px', width: '200px', display: 'block' }}>
                {t('global.loading')}
            </label>
        </div>
    )

}

export default LoaderContainer;