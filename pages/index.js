import path from 'path'
import fs from 'fs/promises'

function HomePage(props) {
  const { products } = props

  return (
    <ul>
      {products.map((product) => (
        <li key={product.id}>{product.title}</li>
      ))}
    </ul>
  );
}

export async function getStaticProps() {
  const filePath = path.join(process.cwd(), 'dummy-backend.json')
  const dummyDataJson = await fs.readFile(filePath)
  const dummyData = JSON.parse(dummyDataJson)

  return {
    props: {
      products: dummyData.products
    }
  }
}

export default HomePage;
