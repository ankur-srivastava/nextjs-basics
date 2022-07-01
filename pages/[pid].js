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

export async function getStaticProps(context) {
    // Call Backend to get data
    const {params} = context
    const productId = params.pid

    const filePath = path.join(process.cwd(), 'dummy-backend.json')
    const dummyDataJson = await fs.readFile(filePath)
    const dummyData = JSON.parse(dummyDataJson)

    if(dummyData.products.length === 0) {
        return {
            notFound: true
        }
    }

    const product = dummyData.products.find(product => product.id === productId)
    return {
        props: {
            loadedProduct: product
        }
    }
}

export async function getStaticPaths() {
    return {
      paths: [
        { params: { pid: 'p1' } },
        { params: { pid: 'p2' } },
        { params: { pid: 'p3' } }
      ],
      fallback: 'blocking'
    }
  }

export default ProductDetailPage
