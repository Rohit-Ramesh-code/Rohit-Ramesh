import { useRef } from 'react';
import { FileText, Download } from 'lucide-react';
import resumePdf from '@/assets/Rohit_Ramesh_Resume.pdf';

function StaticResume() {
  return (
    <div className="w-full h-[500px] rounded-xl shadow-lg overflow-hidden bg-white">
      <iframe
        src={resumePdf}
        title="Resume"
        className="w-full h-full"
        style={{ border: 'none' }}
      />
    </div>
  );
}

export default function Resume() {
  const sectionRef = useRef<HTMLDivElement>(null);

  return (
    <section id="resume" className="min-h-screen py-20 px-4" ref={sectionRef}>
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-glow">
          My <span className="text-primary">Resume</span>
        </h2>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="h-[500px] w-full">
            <StaticResume />
          </div>

          <div className="space-y-8">
            <div className="glass-effect p-8 rounded-xl space-y-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-4 bg-primary/20 rounded-lg glow-primary">
                  <FileText className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold">Professional Resume</h3>
                  <p className="text-muted-foreground">Download or view my latest resume</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="p-4 bg-muted/30 rounded-lg">
                  <h4 className="font-semibold mb-2 text-primary">Education</h4>
                  <p className="text-sm text-muted-foreground">
                    University of Cincinnati<br />
                    Double major in Computer Science and Business Analytics
                  </p>
                </div>

                <div className="p-4 bg-muted/30 rounded-lg">
                  <h4 className="font-semibold mb-2 text-secondary">Experiences</h4>
                  <p className="text-sm text-muted-foreground">
                    Undergraduate Research Fellow - Extended Reality Lab<br />
                    Phillips Edison & Company - Software Engineering Intern
                  </p>
                </div>
              </div>

              <a
                href={resumePdf}
                download="Rohit_Ramesh_Resume.pdf"
                className="w-full inline-flex items-center justify-center gap-3 px-6 py-4 bg-primary text-primary-foreground rounded-lg font-semibold hover:scale-105 transition-transform glow-primary"
              >
                <Download className="w-5 h-5" />
                Download Resume (PDF)
              </a>

              <p className="text-sm text-center text-muted-foreground">
                Your resume PDF is available for download.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
