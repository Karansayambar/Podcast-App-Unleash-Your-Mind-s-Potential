import ReactLoading from 'react-loading';

const Loading = ({type, color}) => {
    return(
        <>
        <ReactLoading className='loading' type={type} color={color} height={20} width={50}/>
        </>
    )
}

export default Loading