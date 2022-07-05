const UserIdPage = (props) => {
    return <h1>{props.id}</h1>
}

export const getServerSideProps = async (context) => {
    const { params } = context
    const uid = params.uid
    return {
        props: {
            id: uid
        }
    }
}

export default UserIdPage
