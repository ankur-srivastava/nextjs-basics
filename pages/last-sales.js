import { useEffect, useState } from "react"
import useSWR from "swr"

const LastSalesPage = (props) => {
    const [sales, setSales] = useState(props.sales)
    // const [isLoading, setIsLoading] = useState(false)

    const fetcher = (url) => fetch(url).then((res) => res.json());

    const { data, error } = useSWR('https://react-4612b-default-rtdb.firebaseio.com/sales.json', fetcher)

    useEffect(() => {
        if(data) {
            const salesDataArray = []
            for(const key in data) {
                salesDataArray.push({id: key, username: data[key].username, volume: data[key].volume})
            }
            setSales(salesDataArray)
        }
    }, [data])

    // useEffect(() => {
    //     setIsLoading(true)
    //     fetch('https://react-4612b-default-rtdb.firebaseio.com/sales.json')
    //         .then(response => response.json())
    //         .then(data => {
    //             const salesDataArray = []
    //             for(const key in data) {
    //                 salesDataArray.push({id: key, username: data[key].username, volume: data[key].volume})
    //             }
    //             setSales(salesDataArray)
    //             setIsLoading(false)
    //         })
    // }, [])

    if(error) {
        return <p>Failed to Load</p>
    }
    
    if (!data && !sales) {
        return <p>Loading ...</p>
    }
    
    return <ul>
        {sales.map(sale => (
            <li key={sale.id}>
                {sale.username} - {sale.volume}
            </li>
        ))}
    </ul>
}

export async function getStaticProps() {
    const response = await fetch('https://react-4612b-default-rtdb.firebaseio.com/sales.json')
    const responseJson = await response.json()
    const salesDataArray = []
    for(const key in responseJson) {
        salesDataArray.push({id: key, username: data[key].username, volume: data[key].volume})
    }
    return {
        props: {
            sales: salesDataArray
        },
        revalidate: 10
    }
}

export default LastSalesPage
