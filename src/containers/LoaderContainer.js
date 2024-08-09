import { ColorRing } from "react-loader-spinner";

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
                Proszę czekać, operacja w toku...
            </label>
        </div>
    )

}

export default LoaderContainer;