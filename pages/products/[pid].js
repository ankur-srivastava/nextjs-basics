import { Fragment } from "react"
import path from 'path'
import fs from 'fs/promises'

const ProductDetailPage = (props) => {
    const {loadedProduct} = props

    return <Fragment>
        <h1>{loadedProduct.title}</h1>
        <p>{loadedProduct.description}</p>
    </Fragment>
}

const getData = async () => {
    const filePath = path.join(process.cwd(), 'dummy-backend.json')
    const dummyDataJson = await fs.readFile(filePath)
    const data = JSON.parse(dummyDataJson)
    return data
}

export async function getStaticProps(context) {
    // Call Backend to get data
    const {params} = context
    const productId = params.pid

    const data = await getData()

    if(data.products.length === 0) {
        return {
            notFound: true
        }
    }

    const product = data.products.find(product => product.id === productId)
    return {
        props: {
            loadedProduct: product
        }
    }
}

export async function getStaticPaths() {
    const data = await getData()
    const ids = data.products.map(product => product.id)
    const paramsArray = ids.map(id => ({params: {pid: id}}))

    return {
      paths: paramsArray,
      fallback: 'blocking'
    }
  }

export default ProductDetailPage
