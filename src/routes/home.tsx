export default function Home() {
  return (
    <>
      <h2 className='text-3xl font-bold text-slate-100 mb-4'>
        🚀 Welcome to the React Dimension
      </h2>
      <p className='text-slate-200 text-lg mb-6'>
        You've successfully entered the React Scaffold universe! This
        interdimensional portal is ready for your cosmic coding adventures.
      </p>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mt-8'>
        <div className='bg-slate-700 p-6 rounded-lg'>
          <h3 className='text-xl font-semibold text-slate-100 mb-2'>
            ⚡ React Router v7
          </h3>
          <p className='text-slate-300 text-sm'>
            Navigate between dimensions with the latest routing technology
          </p>
        </div>
        <div className='bg-slate-700 p-6 rounded-lg'>
          <h3 className='text-xl font-semibold text-slate-100 mb-2'>
            🎨 Tailwind CSS
          </h3>
          <p className='text-slate-300 text-sm'>
            Style your universe with utility-first CSS framework
          </p>
        </div>
        <div className='bg-slate-700 p-6 rounded-lg'>
          <h3 className='text-xl font-semibold text-slate-100 mb-2'>
            🛡️ Error Boundaries
          </h3>
          <p className='text-slate-300 text-sm'>
            Protected from reality glitches and portal malfunctions
          </p>
        </div>
      </div>
    </>
  );
}
