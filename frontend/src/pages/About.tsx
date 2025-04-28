import useThemeStore from "./themeStore";
import logo from "@/assets/img/logo.png"

function About() {
  const { bondiBlue, blackBrown, mainBlue, lightBlue, redBrown } = useThemeStore();

  return (
    <main className="max-w-7xl mx-auto px-6 py-12">
      <section className="space-y-10">
        {/* Header */}
        <div className="text-center space-y-4">

          <div className="justify-center flex gap-4 items-center">
            <img src={logo} width={60} height={60} alt="" />
            <h1
              className="text-5xl font-extrabold"
              style={{ color: mainBlue }}
            >
              About
            </h1>
          </div>

          <p className="text-lg max-w-3xl mx-auto" style={{ color: blackBrown }}>
            Weekly Plan simplifies and optimizes the travel request and approval process within MISA, connecting employees, managers, and admins in a secure, efficient system.
          </p>
        </div>

        {/* Core Functionalities */}
        <section className="space-y-6">
          <h2
            className="text-3xl font-bold"
            style={{ color: bondiBlue }}
          >
            Core Functionalities
          </h2>
          <ul className="list-disc pl-6 space-y-2 text-base" style={{ color: blackBrown }}>
            <li>Submit detailed travel requests including dates, destinations, and required services.</li>
            <li>Automated approval workflows with notifications at each step.</li>
            <li>Personalized dashboards for request tracking and management.</li>
            <li>Advanced reporting tools with exportable options.</li>
            <li>Integration with HR and Finance systems, plus APIs for service providers.</li>
          </ul>
        </section>

        {/* System Components with Cards */}
        <section className="space-y-8">
          <h2
            className="text-3xl font-bold"
            style={{ color: bondiBlue }}
          >
            System Components
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { title: 'Security Features', points: ['Secure login and authentication.', 'Data encryption and compliance (POPIA).'] },
              { title: 'User Authentication', points: ['Role-based access controls ensuring the right access levels.'] },
              { title: 'Travel Request Submission', points: ['Intuitive online forms with document attachments.'] },
              { title: 'Approval Process', points: ['Managers can approve, reject, or request further information.', 'Admins handle final processing.'] },
              { title: 'Notifications', points: ['Employees and managers receive real-time status updates.'] },
              { title: 'Dashboards', points: ['Customized views for employees, managers, and admins.'] },
              { title: 'Reporting', points: ['Generate, customize, and export detailed reports.'] },
              { title: 'Integration', points: ['Seamless connection with HR, finance, and external APIs.'] },
              { title: 'Data Security', points: ['Full encryption, backups, and disaster recovery.'] },
            ].map(({ title, points }, idx) => (
              <div
                key={idx}
                className="rounded-2xl p-6 shadow-lg space-y-4"
                style={{ backgroundColor: lightBlue }}
              >
                <h3
                  className="text-xl font-semibold"
                  style={{ color: redBrown }}
                >
                  {title}
                </h3>
                <ul className="list-disc pl-5 space-y-1 text-sm" style={{ color: blackBrown }}>
                  {points.map((point, i) => (
                    <li key={i}>{point}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}


export default About;
