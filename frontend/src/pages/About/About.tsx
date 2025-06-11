import { useState, useEffect } from 'react';
import {
  Shield,
  Users,
  FileText,
  CheckCircle,
  Bell,
  BarChart3,
  Link,
  Lock,
  ChevronRight,
  Globe,
  TrendingUp,
  Star,
  ArrowRight
} from 'lucide-react';

// Mock theme store values - replace with your actual theme store
const useThemeStore = () => ({
  bondiBlue: '#0891b2',
  blackBrown: '#292524',
  mainBlue: '#1e40af',
  lightBlue: '#e0f2fe',
  redBrown: '#92400e'
});

import logo from "@/assets/img/logo.png"

function About() {
  const { bondiBlue, blackBrown, mainBlue, redBrown } = useThemeStore();
  const [activeFeature, setActiveFeature] = useState(0);
  const [animatedStats, setAnimatedStats] = useState({ users: 0, requests: 0, approval: 0 });

  // Animate stats on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedStats({ users: 250, requests: 1500, approval: 94 });
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const features = [
    {
      icon: <FileText className="w-6 h-6" />,
      title: 'Smart Request Management',
      description: 'AI-powered form validation and intelligent routing based on request complexity.',
      detailedDescription: 'Our system uses advanced AI algorithms to validate travel requests in real-time, ensuring all necessary information is provided before submission. This reduces back-and-forth communication and speeds up the approval process.',
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      icon: <CheckCircle className="w-6 h-6" />,
      title: 'Automated Workflows',
      description: 'Dynamic approval chains that adapt based on destination, budget, and urgency.',
      detailedDescription: 'Our automated workflows intelligently adjust approval paths based on various factors such as travel destination, budget limits, and urgency. This ensures that requests are routed to the appropriate approvers without unnecessary delays.',
      gradient: 'from-emerald-500 to-teal-500'
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: 'Advanced Analytics',
      description: 'Real-time insights with predictive analytics for travel pattern optimization.',
      detailedDescription: 'Utilizing habit tracking, our analytics engine provides real-time insights into travel patterns, helping organizations optimize their travel policies and reduce costs. Predictive analytics forecast future travel needs based on historical data.',
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: 'Global Integration',
      description: 'Seamless connectivity with international booking platforms and compliance systems.',
      detailedDescription: 'Weekly Plan integrates with leading global booking platforms, ensuring compliance with international travel regulations. This allows for a streamlined booking experience and adherence to local laws and policies.',
      gradient: 'from-orange-500 to-red-500'
    }
  ];

  const systemComponents = [
    {
      title: 'Security Features',
      icon: <Shield className="w-5 h-5" />,
      points: ['Multi-factor authentication with biometric support', 'End-to-end encryption with AES-256', 'POPIA compliance with automated audit trails'],
      color: redBrown,
      bgGradient: 'from-red-50 to-orange-50'
    },
    {
      title: 'User Authentication',
      icon: <Users className="w-5 h-5" />,
      points: ['Dynamic role-based access with permission inheritance', 'Single sign-on integration with Active Directory', 'Granular permission management'],
      color: mainBlue,
      bgGradient: 'from-blue-50 to-indigo-50'
    },
    {
      title: 'Travel Request Submission',
      icon: <FileText className="w-5 h-5" />,
      points: ['Drag-and-drop document management', 'Smart form auto-completion', 'Mobile-responsive design with offline capability'],
      color: bondiBlue,
      bgGradient: 'from-cyan-50 to-blue-50'
    },
    {
      title: 'Approval Process',
      icon: <CheckCircle className="w-5 h-5" />,
      points: ['Parallel and sequential approval workflows', 'Conditional logic based on request parameters', 'Escalation management with SLA tracking'],
      color: '#059669',
      bgGradient: 'from-emerald-50 to-green-50'
    },
    {
      title: 'Notifications',
      icon: <Bell className="w-5 h-5" />,
      points: ['Multi-channel notifications (email, SMS, push)', 'Customizable notification preferences', 'Real-time status updates with read receipts'],
      color: '#7c3aed',
      bgGradient: 'from-purple-50 to-violet-50'
    },
    {
      title: 'Dashboards',
      icon: <BarChart3 className="w-5 h-5" />,
      points: ['Personalized widgets with drag-and-drop customization', 'Interactive charts with drill-down capabilities', 'Export functionality to multiple formats'],
      color: '#dc2626',
      bgGradient: 'from-rose-50 to-red-50'
    },
    {
      title: 'Reporting',
      icon: <TrendingUp className="w-5 h-5" />,
      points: ['Automated report scheduling and distribution', 'Custom report builder with visual query designer', 'Advanced filtering and grouping options'],
      color: '#ea580c',
      bgGradient: 'from-orange-50 to-amber-50'
    },
    {
      title: 'Integration',
      icon: <Link className="w-5 h-5" />,
      points: ['RESTful API with OpenAPI documentation', 'Webhook support for real-time data sync', 'Pre-built connectors for popular enterprise systems'],
      color: '#0891b2',
      bgGradient: 'from-cyan-50 to-sky-50'
    },
    {
      title: 'Data Security',
      icon: <Lock className="w-5 h-5" />,
      points: ['Automated backup with point-in-time recovery', 'Geo-redundant storage across multiple regions', 'Comprehensive disaster recovery procedures'],
      color: '#4338ca',
      bgGradient: 'from-indigo-50 to-blue-50'
    },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-32 w-96 h-96 bg-gradient-to-br from-blue-200/30 to-purple-200/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-32 w-96 h-96 bg-gradient-to-br from-cyan-200/30 to-blue-200/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative px-6 py-12">
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto mb-20">
          <div className="text-center space-y-8">
            <div className="flex justify-center items-center gap-6 mb-8">
              <div className="relative">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-2xl flex items-center justify-center shadow-2xl">
                  {/* <Zap className="w-10 h-10 text-black" /> */}
                  {/* logo */}
                  <img src={logo} alt="Logo" className="absolute inset-0 w-full h-full object-cover" />
                </div>
                <div
                  style={{ backgroundColor: bondiBlue }}
                  className="absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                </div>
              </div>
              <div className="text-left">
                <h1 className="text-6xl font-black bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent">
                  About
                </h1>
                <div className="flex items-center gap-2 mt-2">
                  <div className="h-1 w-12 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full"></div>
                  <span className="text-sm font-medium text-gray-500">Weekly Plan</span>
                </div>
              </div>
            </div>

            <div className="max-w-4xl mx-auto">
              <p className="text-xl leading-relaxed mb-8" style={{ color: blackBrown }}>
                Weekly Plan revolutionizes the travel request and approval ecosystem within MISA through
                <span className="font-semibold text-blue-600"> intelligent automation</span>,
                <span className="font-semibold text-purple-600"> seamless integration</span>, and
                <span className="font-semibold text-cyan-600"> enterprise-grade security</span>.
              </p>

              {/* Stats Row */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
                {[
                  { label: 'Active Users', value: animatedStats.users, suffix: '+', icon: <Users className="w-6 h-6" />, color: 'from-blue-500 to-cyan-500' },
                  { label: 'Monthly Requests', value: animatedStats.requests, suffix: '+', icon: <FileText className="w-6 h-6" />, color: 'from-purple-500 to-pink-500' },
                  { label: 'Approval Rate', value: animatedStats.approval, suffix: '%', icon: <TrendingUp className="w-6 h-6" />, color: 'from-emerald-500 to-teal-500' }
                ].map((stat, idx) => (
                  <div key={idx} className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-white mb-4`}>
                      {stat.icon}
                    </div>
                    <div className="text-3xl font-bold text-gray-800 mb-1">
                      {stat.value}{stat.suffix}
                    </div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Interactive Features Section */}
        <section className="max-w-7xl mx-auto mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4" style={{ color: bondiBlue }}>
              Next-Generation Features
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover how our advanced capabilities transform the travel management experience
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-4">
              {features.map((feature, idx) => (
                <div
                  key={idx}
                  className={`p-6 rounded-2xl cursor-pointer transition-all duration-300 ${activeFeature === idx
                    ? 'bg-white shadow-2xl transform scale-105'
                    : 'bg-white/60 hover:bg-white/80'
                    }`}
                  onClick={() => setActiveFeature(idx)}
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center text-white`}>
                      {feature.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold mb-2" style={{ color: blackBrown }}>
                        {feature.title}
                      </h3>
                      <p className="text-gray-600">{feature.description}</p>
                    </div>
                    <ChevronRight className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${activeFeature === idx ? 'rotate-90' : ''
                      }`} />
                  </div>
                </div>
              ))}
            </div>

            <div className="relative">
              <div className="bg-gradient-to-br from-white/80 to-blue-50/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-white/20">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${features[activeFeature].gradient} flex items-center justify-center text-white mb-6`}>
                  {features[activeFeature].icon}
                </div>
                <h3 className="text-2xl font-bold mb-4" style={{ color: blackBrown }}>
                  {features[activeFeature].title}
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {features[activeFeature].detailedDescription}
                </p>
                <button className="flex items-center p-2 gap-2 text-blue-600 font-medium hover:gap-4 transition-all duration-300">
                  Learn More <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Enhanced System Components */}
        <section className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4" style={{ color: bondiBlue }}>
              System Architecture
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Built on enterprise-grade infrastructure with modular components for maximum scalability
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {systemComponents.map(({ title, icon, points, color, bgGradient }, idx) => (
              <div
                key={idx}
                className={`group relative bg-gradient-to-br ${bgGradient} rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-white/20 hover:transform hover:scale-105`}
              >
                {/* Header */}
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-lg"
                    style={{ backgroundColor: color }}
                  >
                    {icon}
                  </div>
                  <h3 className="text-xl font-semibold" style={{ color: blackBrown }}>
                    {title}
                  </h3>
                </div>

                {/* Points */}
                <ul className="space-y-3">
                  {points.map((point, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm" style={{ color: blackBrown }}>
                      <div className="w-2 h-2 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: color }}></div>
                      <span className="leading-relaxed">{point}</span>
                    </li>
                  ))}
                </ul>

                {/* Hover Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>

                {/* Star Rating */}
                <div className="flex gap-1 mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <section className="max-w-4xl mx-auto mt-20 text-center">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12 text-white shadow-2xl">
            <h3 className="text-3xl font-bold mb-4">Ready to Transform Your Travel Management?</h3>
            <p className="text-lg mb-8 opacity-90">
              Join hundreds of organizations already using Weekly Plan to streamline their travel processes
            </p>
            <button className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold hover:transform hover:scale-105 transition-all duration-300 shadow-lg">
              Get Started Today
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}

export default About;