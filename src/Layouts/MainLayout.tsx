import { Table } from '../components/Table'

export const MainLayout = () => {
  return (
    <div 
        className='w-4/5 mx-auto py-6 px-10 my-14 rounded-lg'
        style={{
          boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)'
        }}
    >
        <h1 className='text-center text-3xl'>POKEMON LIST</h1>
        {/* <div className='grid grid-cols-5'>
          <Card />
        </div> */}
        <div className='flex justify-center items-center'>
          <Table />
        </div>
    </div>
  )
}
