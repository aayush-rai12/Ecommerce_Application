'use client'

const sizes = [
  { size: 'S', chest: '102', length: '69' },
  { size: 'M', chest: '108', length: '72' },
  { size: 'L', chest: '116', length: '75' },
  { size: 'XL', chest: '124', length: '78' },
]

export default function FitGuide() {
  return (
    <div className="min-h-screen bg-black text-white p-10">
      
      <h1 className="text-5xl font-bold mb-8">
        MEN&apos;S FIT GUIDE
      </h1>

      <div className="overflow-x-auto rounded-xl border border-white/10">
        <table className="w-full">
          
          <thead className="bg-white/10">
            <tr>
              <th className="p-4 text-left">SIZE</th>
              <th className="p-4 text-left">CHEST</th>
              <th className="p-4 text-left">LENGTH</th>
            </tr>
          </thead>

          <tbody>
            {sizes.map((item) => (
              <tr
                key={item.size}
                className="border-t border-white/10 hover:bg-white/5"
              >
                <td className="p-4">{item.size}</td>
                <td className="p-4">{item.chest} cm</td>
                <td className="p-4">{item.length} cm</td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>

    </div>
  )
}