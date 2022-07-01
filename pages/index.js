import path from 'path'
import fs from 'fs/promises'
import Link from 'next/link'

function HomePage(props) {
  const { products } = props

  return (
    <ul>
      {products.map((product) => (
        <li key={product.id}><Link href={`/${product.id}`}>{product.title}</Link></li>
      ))}
    </ul>
  );
}

export async function getStaticProps(context) {
  const filePath = path.join(process.cwd(), 'dummy-backend.json')
  const dummyDataJson = await fs.readFile(filePath)
  const dummyData = JSON.parse(dummyDataJson)

  if(dummyData.products.length === 0) {
    return {
      notFound: true
    }
  }

  return {
    props: {
      products: dummyData.products
    },
    revalidate: 10
  }
}

export default HomePage;
