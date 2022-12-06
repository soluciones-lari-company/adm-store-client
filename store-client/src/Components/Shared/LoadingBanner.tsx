
interface ILoadingBanner {
    title?: string,
    message?: string
}

const LoadingBanner = (props: ILoadingBanner) => {
    return (<>
    <div className="card-px text-center py-20 my-10">
        <h2 className="fs-2x fw-bold mb-10">{props.title}</h2>
        <p className="text-gray-400 fs-4 fw-semibold mb-10">{props.message}
        </p>
        <h5>Cargando.....<span className="spinner-border spinner-border-sm align-middle ms-2"></span></h5>
    </div>
    </>
    )
}

export default LoadingBanner;