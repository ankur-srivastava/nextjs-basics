import { useEffect, useState } from "react"

const LastSalesPage = (props) => {
    const [sales, setSales] = useState()
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        setIsLoading(true)
        fetch('https://react-4612b-default-rtdb.firebaseio.com/sales.json')
            .then(response => response.json())
            .then(data => {
                const salesDataArray = []
                for(const key in data) {
                    salesDataArray.push({id: key, username: data[key].username, volume: data[key].volume})
                }
                setSales(salesDataArray)
                setIsLoading(false)
            })
    }, [])

    if (isLoading) {
        return <p>Loading ...</p>
    }
    if(!sales) {
        return <p>No Data Yet</p>
    }
    return <ul>
        {sales.map(sale => (
            <li key={sale.id}>
                {sale.username} - {sale.volume}
            </li>
        ))}
    </ul>
}

export default LastSalesPage
