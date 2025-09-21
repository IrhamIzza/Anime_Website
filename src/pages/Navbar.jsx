export default function Navbar() {
  return (
    <>
      <div className="flex justify-between items-center bg-gray-900">
        <div className="flex items-center">
          <img src="https://i.pinimg.com/originals/b4/c4/f4/b4c4f4e5d5e6e2f6f2e4f5f6e7f8f9.png" alt="logo" className="w-16 h-16 mr-4" />
          <h1 className="text-3xl font-bold">Anime Website</h1>
        </div>
        <div className="flex items-center">
          <a href="#" className="text-blue-500 hover:text-blue-700">Home</a>
          <a href="#" className="text-blue-500 hover:text-blue-700">About</a>
          <a href="#" className="text-blue-500 hover:text-blue-700">Contact</a>
        </div>
      </div>
    </>  
  )
}