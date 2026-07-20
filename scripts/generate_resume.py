from fpdf import FPDF
import os

class ResumePDF(FPDF):
    def footer(self):
        # Add page number to footer
        self.set_y(-12)
        self.set_font("Helvetica", "I", 8)
        self.set_text_color(128, 128, 128)
        self.cell(0, 10, f"Page {self.page_no()}", align="C")

def create_resume():
    pdf = ResumePDF()
    pdf.set_margins(12, 12, 12)
    pdf.add_page()
    
    # 1. Header (Name)
    pdf.set_font("Helvetica", "B", 18)
    pdf.set_text_color(26, 36, 43) # Sleek slate navy
    pdf.cell(0, 8, "CHINTAPALLI VENKATA SAI SANTOSH", align="C", new_x="LMARGIN", new_y="NEXT")
    
    # Contact Row 1
    pdf.set_font("Helvetica", "", 9)
    pdf.set_text_color(80, 80, 80)
    contact_info = "Hyderabad, Telangana, India  |  +91 63040 24574  |  saichintapalli6@gmail.com"
    pdf.cell(0, 4.5, contact_info, align="C", new_x="LMARGIN", new_y="NEXT")
    
    # Contact Row 2
    socials = "LinkedIn: linkedin.com/in/sai-santosh-chintapalli  |  GitHub: github.com/saichintapalli6-bit"
    pdf.cell(0, 4.5, socials, align="C", new_x="LMARGIN", new_y="NEXT")
    
    # Thin Dividers
    pdf.set_draw_color(220, 220, 220)
    pdf.line(12, pdf.get_y() + 2, 198, pdf.get_y() + 2)
    pdf.set_y(pdf.get_y() + 4)
    
    # Helper for Section Title
    def section_header(title):
        pdf.set_y(pdf.get_y() + 2)
        pdf.set_font("Helvetica", "B", 10.5)
        pdf.set_text_color(12, 100, 180) # Premium royal blue accent
        pdf.cell(0, 5, title, new_x="LMARGIN", new_y="NEXT")
        pdf.set_draw_color(12, 100, 180)
        pdf.line(12, pdf.get_y(), 198, pdf.get_y())
        pdf.set_y(pdf.get_y() + 1.5)
        
    # Professional Summary
    section_header("PROFESSIONAL SUMMARY")
    pdf.set_font("Helvetica", "", 9)
    pdf.set_text_color(50, 50, 50)
    summary_text = (
        "Highly motivated Master of Computer Applications (MCA) graduate, Full Stack Developer, and Machine Learning Engineer "
        "with active expertise in software engineering pipelines. Accomplished in backend development (Python, Node.js), modern "
        "frontend architectures (React, Next.js), and predictive models (TensorFlow, Scikit-Learn). Experienced in blockchain bidding "
        "ledgers, automated ETL pipelines, and executive dashboards (Power BI). Proven track record of optimizing SQL queries, "
        "pruning script runtime latencies, and implementing biometrics authentication systems."
    )
    pdf.multi_cell(0, 4.2, summary_text, new_x="LMARGIN", new_y="NEXT")
    
    # Technical Skills
    section_header("CORE TECHNICAL SKILLS")
    
    def skill_line(category, items):
        pdf.set_font("Helvetica", "B", 8.5)
        pdf.set_text_color(60, 60, 60)
        pdf.cell(42, 4.0, category + ": ")
        pdf.set_font("Helvetica", "", 8.5)
        pdf.set_text_color(50, 50, 50)
        pdf.cell(0, 4.0, items, new_x="LMARGIN", new_y="NEXT")
        
    skill_line("Programming Languages", "Python, JavaScript, Java, C, SQL, HTML5, CSS3")
    skill_line("Frameworks & Libraries", "React.js, Next.js, Node.js, Express.js, Django, Flask, React Native, Redux")
    skill_line("ML, Analytics & BI", "TensorFlow, Scikit-Learn, XGBoost, Pandas, NumPy, OpenCV, Power BI")
    skill_line("Databases & System Tools", "MongoDB, MySQL, SQL Server, Git, GitHub, VS Code, Linux OS, Figma, Jupyter")

    # Experience
    section_header("PROFESSIONAL EXPERIENCE")
    
    def job_entry(role, company, period, bullets):
        pdf.set_font("Helvetica", "B", 9.5)
        pdf.set_text_color(30, 30, 30)
        # Role left, Period right
        pdf.cell(120, 4.5, role)
        pdf.set_font("Helvetica", "B", 8.5)
        pdf.set_text_color(100, 100, 100)
        pdf.cell(0, 4.5, period, align="R", new_x="LMARGIN", new_y="NEXT")
        
        # Company
        pdf.set_font("Helvetica", "I", 8.5)
        pdf.set_text_color(12, 100, 180)
        pdf.cell(0, 4, company, new_x="LMARGIN", new_y="NEXT")
        
        # Bullets
        pdf.set_font("Helvetica", "", 8.5)
        pdf.set_text_color(50, 50, 50)
        for bullet in bullets:
            pdf.cell(4, 4.0, "-", align="C")
            pdf.multi_cell(0, 4.0, bullet, new_x="LMARGIN", new_y="NEXT")
        pdf.set_y(pdf.get_y() + 1.0)
        
    job_entry(
        "Power BI Analyst Intern", 
        "Advanced Analytics Corporation  |  Hyderabad, India", 
        "June 2025 - August 2025",
        [
            "Designed and deployed interactive executive dashboards monitoring core business KPIs, handling datasets exceeding 10,000 transaction rows.",
            "Automated ETL routines using Python scripts (Pandas and NumPy), reducing manual data cleansing efforts and improving speed.",
            "Wrote dynamic DAX expressions to compute business indicators and rolling multi-variable projections.",
            "Partnered with database engineers to refactor SQL schemas, yielding a 45% reduction in dashboard loading latencies."
        ]
    )

    job_entry(
        "Python Developer Intern", 
        "FutureWeb Technologies  |  Hyderabad, India", 
        "December 2024 - February 2025",
        [
            "Developed and optimized modular REST API endpoints using Flask and Django frameworks to support high-throughput applications.",
            "Integrated trained Scikit-Learn ML classification pipelines into relational MySQL data routes.",
            "Designed advanced database indexes and cached structures, improving execution speed of analytical operations by 30%.",
            "Restructured internal script algorithms using efficient data structures to parse bulk logging datasets."
        ]
    )

    # Key Projects
    section_header("KEY PROJECTS & CORE PORTFOLIO")
    
    def proj_entry(title, tech, desc):
        pdf.set_font("Helvetica", "B", 9.0)
        pdf.set_text_color(30, 30, 30)
        pdf.cell(100, 4.2, title)
        pdf.set_font("Helvetica", "I", 8.0)
        pdf.set_text_color(100, 100, 100)
        pdf.cell(0, 4.2, "Tech: " + tech, align="R", new_x="LMARGIN", new_y="NEXT")
        
        pdf.set_font("Helvetica", "", 8.5)
        pdf.set_text_color(50, 50, 50)
        pdf.cell(4, 3.8, "-")
        pdf.multi_cell(0, 3.8, desc, new_x="LMARGIN", new_y="NEXT")
        pdf.set_y(pdf.get_y() + 0.8)

    proj_entry(
        "Multi-Level Authentication System", 
        "React, Node.js, Express, MongoDB, JWT, WebAuthn", 
        "Built secure role-based gate incorporating biometric credentials. Engineered MFA handshakes maintaining verification responses in under 80ms."
    )
    proj_entry(
        "Smart Vehicle Procurement System", 
        "Next.js, Django, PostgreSQL, Solidity, EVM Ledger", 
        "Created decentralized bidding ledger. Formulated off-chain hashing pipelines to minimize EVM gas, cutting auditing cycles by 50%."
    )
    proj_entry(
        "Amphibian & Reptile Classifier", 
        "Python, TensorFlow, Keras, Flask, OpenCV, NumPy", 
        "Programmed deep learning CNN achieving 96.4% test classification accuracy. Configured Flask REST API for image uploads with under 120ms latency."
    )
    proj_entry(
        "Real Estate Price Prediction", 
        "Python, Scikit-Learn, XGBoost, Pandas, FastAPI, Power BI", 
        "Developed spatial valuation regression model. Integrated FastAPI endpoint serving inferences, achieving R2 validation score of 0.892."
    )

    # Education
    section_header("EDUCATION")
    
    def edu_entry(degree, school, period, grade_info):
        pdf.set_font("Helvetica", "B", 9.0)
        pdf.set_text_color(30, 30, 30)
        pdf.cell(120, 4.5, degree)
        pdf.set_font("Helvetica", "B", 8.5)
        pdf.set_text_color(100, 100, 100)
        pdf.cell(0, 4.5, period, align="R", new_x="LMARGIN", new_y="NEXT")
        
        pdf.set_font("Helvetica", "", 8.5)
        pdf.set_text_color(80, 80, 80)
        pdf.cell(120, 4, school)
        pdf.set_font("Helvetica", "B", 8.5)
        pdf.set_text_color(50, 50, 50)
        pdf.cell(0, 4, grade_info, align="R", new_x="LMARGIN", new_y="NEXT")
        pdf.set_y(pdf.get_y() + 1.0)

    edu_entry("Master of Computer Applications (MCA)", "State University Institution", "2023 - 2025", "CGPA: 8.8 / 10.0")
    edu_entry("Bachelor of Science (B.Sc) in Computer Science", "Affiliated Science College", "2020 - 2023", "CGPA: 9.2 / 10.0")

    # Achievements
    section_header("KEY HONORS & EXTRACURRICULAR ACHIEVEMENTS")
    pdf.set_font("Helvetica", "", 8.5)
    pdf.set_text_color(50, 50, 50)
    
    def ach_line(ach):
        pdf.cell(4, 4.0, "*", align="C")
        pdf.multi_cell(0, 4.0, ach, new_x="LMARGIN", new_y="NEXT")

    ach_line("Awarded Best Design Presentation in the 2025 Academic Project Symposium.")
    ach_line("Engineered community student database dashboard handles 15,000 Requests/min syncing in 300ms.")
    ach_line("Recipient of the Undergraduate Merit Academic Scholarship across three consecutive terms (2020 - 2023).")

    os.makedirs("public", exist_ok=True)
    pdf.output("public/CHINTAPALLI_VENKATA_SAI_SANTOSH_RESUME.pdf")
    print("Resume PDF successfully compiled.")

if __name__ == "__main__":
    create_resume()
