const TitleCardC = (props: any) => {
    return (
        <span className="d-inline-block position-relative">
            <span className="d-inline-block mb-2 fs-2tx fw-bold">
                {props.children}
            </span>
            <span className="d-inline-block position-absolute h-1px bottom-0 end-0 start-0 bg-success translate rounded"></span>
        </span>
    )
}

export default TitleCardC;