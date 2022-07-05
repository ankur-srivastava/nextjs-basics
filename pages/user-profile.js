const UserProfile = (props) => {
    return <h1>{props.username}</h1>
}

export async function getServerSideProps(context) {
    return {
        props: {
            username: 'Ankur'
        }
    }
}

export default UserProfile
