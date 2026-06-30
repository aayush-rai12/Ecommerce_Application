export default function PolicyPage() {
  const policies = [
    {
      title: 'Shipping',
      desc: [
        'Orders are processed within 2–4 business days.',
        'Tracking details are shared after dispatch.',
        'Delivery time depends on your location.',
      ],
    },
    {
      title: 'Returns',
      desc: [
        'Returns accepted within 7 days of delivery.',
        'Items must be unused and in original condition.',
        'Refunds are processed after inspection.',
      ],
    },
    {
      title: 'Privacy',
      desc: [
        'Your information is kept secure and private.',
        'We never share customer data with third parties.',
        'Payments are securely processed.',
      ],
    },
    {
      title: 'Support',
      desc: [
        'Need help with sizing or orders?',
        'Reach out via Instagram or email anytime.',
      ],
    },
  ]

  return (
    <div className="min-h-screen bg-white text-black">

      {/* Hero */}
      <section className=" flex border-b border-zinc-200">
        <div className="max-w-6xl mx-auto px-6 py-10">


          <h1 className="text-6xl md:text-8xl font-bold leading-none">
            STORE POLICY
          </h1>

          <p className="mt-6 max-w-2xl text-black/60 leading-relaxed text-center">
            Everything you need to know about shipping,
            returns, privacy, and customer support.
          </p>
        </div>
      </section>

      {/* Cards */}
      <section className="max-w-6xl mx-auto px-6 py-10">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {policies.map((item, i) => (
            <div
              key={i}
              className="group rounded-3xl border border-zinc-200 bg-white p-8 hover:border-zinc-300 hover:bg-zinc-50 transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl font-semibold">
                  {item.title}
                </h2>

                <span className="text-zinc-200 text-5xl font-bold group-hover:text-zinc-300 transition">
                  0{i + 1}
                </span>
              </div>

              <div className="space-y-4">
                {item.desc.map((text, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 text-zinc-700"
                  >
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-zinc-200" />
                    <p className="leading-relaxed">
                      {text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}

        </div>
      </section>

      {/* Bottom */}
      <section className="border-t border-white/10">
        <div className="max-w-6xl mx-auto px-6 py-14 flex flex-col md:flex-row items-center justify-between gap-6">

          <div>
            <p className="text-2xl font-semibold">
              Need more help?
            </p>

            <p className="text-zinc-600 mt-2">
              Contact us anytime for sizing, orders, or support.
            </p>
          </div>

          <button className="px-8 py-4 rounded-full cursor-pointer bg-white text-black font-medium hover:bg-white/90 transition">
            Contact Us
          </button>

        </div>
      </section>

    </div>
  )
}