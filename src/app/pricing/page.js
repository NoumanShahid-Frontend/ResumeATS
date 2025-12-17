export default function PricingPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">Choose Your Plan</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Get the ATS optimization tools you need to land your dream job
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-6 max-w-6xl mx-auto mb-16">
          {/* Free Plan */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h3 className="text-2xl font-bold mb-2">Free Scan</h3>
            <div className="text-4xl font-bold mb-6">$0</div>
            <ul className="space-y-3 mb-8">
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                1 scan per month
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                Basic ATS score
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                Top 3 issues
              </li>
              <li className="flex items-center">
                <span className="text-gray-400 mr-2">✗</span>
                Detailed analysis
              </li>
            </ul>
            <button className="w-full border border-gray-300 py-3 rounded-lg hover:bg-gray-50">
              Get Started
            </button>
          </div>

          {/* Single Report */}
          <div className="bg-white rounded-lg shadow-lg p-8 border-2 border-blue-600 relative">
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white px-4 py-1 rounded-full text-sm">
              Most Popular
            </div>
            <h3 className="text-2xl font-bold mb-2">Single Report</h3>
            <div className="text-4xl font-bold mb-6">$4.99</div>
            <ul className="space-y-3 mb-8">
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                Full ATS analysis
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                Side-by-side comparison
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                Optimized resume download
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                AI cover letter
              </li>
            </ul>
            <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700">
              Buy Now
            </button>
          </div>

          {/* Monthly Plan */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h3 className="text-2xl font-bold mb-2">Monthly</h3>
            <div className="text-4xl font-bold mb-6">$14.99<span className="text-lg">/mo</span></div>
            <ul className="space-y-3 mb-8">
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                Unlimited scans
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                All Single Report features
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                Multiple templates
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                LinkedIn optimization
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                Resume version manager
              </li>
            </ul>
            <button className="w-full bg-gray-900 text-white py-3 rounded-lg hover:bg-gray-800">
              Start Free Trial
            </button>
          </div>

          {/* Annual Plan */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h3 className="text-2xl font-bold mb-2">Annual</h3>
            <div className="text-4xl font-bold mb-2">$99<span className="text-lg">/year</span></div>
            <div className="text-green-600 text-sm mb-4">Save $80/year</div>
            <ul className="space-y-3 mb-8">
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                Everything in Monthly
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                Priority support
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                Job board integration
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                Career coaching calls
              </li>
            </ul>
            <button className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700">
              Get Annual Plan
            </button>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div className="bg-white rounded-lg p-6">
              <h3 className="font-semibold mb-2">Can I cancel anytime?</h3>
              <p className="text-gray-600">Yes, you can cancel your subscription at any time. No questions asked.</p>
            </div>
            <div className="bg-white rounded-lg p-6">
              <h3 className="font-semibold mb-2">Is my data secure?</h3>
              <p className="text-gray-600">Absolutely. We use enterprise-grade encryption and never share your personal information.</p>
            </div>
            <div className="bg-white rounded-lg p-6">
              <h3 className="font-semibold mb-2">Do you offer refunds?</h3>
              <p className="text-gray-600">Yes, we offer a 30-day money-back guarantee if you're not satisfied.</p>
            </div>
          </div>
        </div>

        {/* B2B CTA */}
        <div className="bg-gradient-to-r from-gray-900 to-gray-700 text-white rounded-lg p-12 mt-16 text-center">
          <h2 className="text-3xl font-bold mb-4">Enterprise & University Solutions</h2>
          <p className="text-xl mb-8 opacity-90">
            Bulk licensing, white-label options, and custom integrations available
          </p>
          <button className="bg-white text-gray-900 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100">
            Request Enterprise Demo
          </button>
        </div>
      </div>
    </div>
  );
}