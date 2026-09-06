const escapeLatex = (value = "") => {
  return String(value)
    .replace(/\\/g, "\\textbackslash{}")
    .replace(/&/g, "\\&")
    .replace(/%/g, "\\%")
    .replace(/\$/g, "\\$")
    .replace(/#/g, "\\#")
    .replace(/_/g, "\\_")
    .replace(/{/g, "\\{")
    .replace(/}/g, "\\}")
    .replace(/~/g, "\\textasciitilde{}")
    .replace(/\^/g, "\\textasciicircum{}");
};

export function buildJakeResumeLatex(data = {}) {
  const personal = data.personal || {};
  const education = data.education || [];
  const experience = data.experience || [];
  const projects = data.projects || [];
  const skills = data.skills || {};
  const achievements = data.achievements || [];
  const certifications = data.certifications || [];

  const educationSection = education
    .filter((item) => item.school || item.degree)
    .map(
      (item) => `
\\resumeSubheading
  {${escapeLatex(item.school || "")}}
  {${escapeLatex(item.location || "")}}
  {${escapeLatex(item.degree || "")}}
  {${escapeLatex(item.duration || "")}}
`
    )
    .join("");

  const experienceSection = experience
    .filter((item) => item.company || item.role)
    .map(
      (item) => `
\\resumeSubheading
  {${escapeLatex(item.company || "")}}
  {${escapeLatex(item.location || "")}}
  {${escapeLatex(item.role || "")}}
  {${escapeLatex(item.duration || "")}}
`
    )
    .join("");

  const projectSection = projects
    .filter((item) => item.name)
    .map(
      (item) => `
\\resumeProjectHeading
  {\\textbf{${escapeLatex(item.name)}} $|$ ${escapeLatex(
        item.tech || ""
      )}}
  {}
\\resumeItemListStart
  \\resumeItem{${escapeLatex(item.description || "")}}
\\resumeItemListEnd
`
    )
    .join("");

  const achievementSection = achievements
    .filter(Boolean)
    .map(
      (item) => `
\\resumeItem{${escapeLatex(item)}}
`
    )
    .join("");

  const certificationSection = certifications
    .filter(Boolean)
    .map(
      (item) => `
\\resumeItem{${escapeLatex(item)}}
`
    )
    .join("");

  return `%-------------------------
% Resume generated from Resume AI Builder
% Jake's Resume inspired format
%-------------------------

\\documentclass[letterpaper,11pt]{article}

\\usepackage{latexsym}
\\usepackage[empty]{fullpage}
\\usepackage{titlesec}
\\usepackage{marvosym}
\\usepackage[usenames,dvipsnames]{color}
\\usepackage{verbatim}
\\usepackage{enumitem}
\\usepackage[hidelinks]{hyperref}
\\usepackage{fancyhdr}
\\usepackage[english]{babel}
\\usepackage{tabularx}
\\input{glyphtounicode}

\\pdfgentounicode=1

\\pagestyle{fancy}
\\fancyhf{}
\\fancyfoot{}
\\renewcommand{\\headrulewidth}{0pt}
\\renewcommand{\\footrulewidth}{0pt}

\\addtolength{\\oddsidemargin}{-0.5in}
\\addtolength{\\evensidemargin}{-0.5in}
\\addtolength{\\textwidth}{1in}
\\addtolength{\\topmargin}{-0.5in}
\\addtolength{\\textheight}{1.0in}

\\urlstyle{same}

\\raggedbottom
\\raggedright
\\setlength{\\tabcolsep}{0in}

\\titleformat{\\section}{
  \\vspace{-4pt}\\scshape\\raggedright\\large
}{}{0em}{}[\\color{black}\\titlerule \\vspace{-5pt}]

\\pdfgentounicode=1

\\newcommand{\\resumeItem}[1]{
  \\item\\small{
    {#1 \\vspace{-2pt}}
  }
}

\\newcommand{\\resumeSubheading}[4]{
  \\vspace{-2pt}\\item
    \\begin{tabular*}{0.97\\textwidth}[t]{l@{\\extracolsep{\\fill}}r}
      \\textbf{#1} & #2 \\\\
      \\textit{\\small#3} & \\textit{\\small #4} \\\\
    \\end{tabular*}\\vspace{-7pt}
}

\\newcommand{\\resumeProjectHeading}[2]{
    \\item
    \\begin{tabular*}{0.97\\textwidth}{l@{\\extracolsep{\\fill}}r}
      \\small#1 & #2 \\\\
    \\end{tabular*}\\vspace{-7pt}
}

\\newcommand{\\resumeItemListStart}{\\begin{itemize}}
\\newcommand{\\resumeItemListEnd}{\\end{itemize}\\vspace{-5pt}}
\\newcommand{\\resumeSubHeadingListStart}{\\begin{itemize}[leftmargin=0.15in, label={}]}
\\newcommand{\\resumeSubHeadingListEnd}{\\end{itemize}}

\\begin{document}

%----------HEADING----------
\\begin{center}
    {\\Huge \\scshape ${escapeLatex(personal.name || "Your Name")}} \\\\ \\vspace{2pt}
    \\small
    ${escapeLatex(personal.email || "")}
    ${personal.phone ? ` $|$ ${escapeLatex(personal.phone)}` : ""}
    ${personal.location ? ` $|$ ${escapeLatex(personal.location)}` : ""}
    
    ${personal.linkedin ? `\\\\ \\href{${personal.linkedin}}{LinkedIn}` : ""}
    ${personal.github ? ` $|$ \\href{${personal.github}}{GitHub}` : ""}
    ${personal.portfolio ? ` $|$ \\href{${personal.portfolio}}{Portfolio}` : ""}
\\end{center}

%-----------EDUCATION-----------
\\section{Education}
\\resumeSubHeadingListStart
${educationSection}
\\resumeSubHeadingListEnd

%-----------EXPERIENCE-----------
\\section{Experience}
\\resumeSubHeadingListStart
${experienceSection}
\\resumeSubHeadingListEnd

%-----------PROJECTS-----------
\\section{Projects}
\\resumeSubHeadingListStart
${projectSection}
\\resumeSubHeadingListEnd

%-----------TECHNICAL SKILLS-----------
\\section{Technical Skills}
\\begin{itemize}[leftmargin=0.15in, label={}]
\\small{
\\item{
\\textbf{Languages}{: ${escapeLatex(skills.languages || "")} } \\\\
\\textbf{Frameworks}{: ${escapeLatex(skills.frameworks || "")} } \\\\
\\textbf{Tools}{: ${escapeLatex(skills.tools || "")} } \\\\
\\textbf{Databases}{: ${escapeLatex(skills.databases || "")}
}}
\\end{itemize}

%-----------ACHIEVEMENTS-----------
\\section{Achievements}
\\resumeSubHeadingListStart
${achievementSection}
\\resumeSubHeadingListEnd

%-----------CERTIFICATIONS-----------
\\section{Certifications}
\\resumeSubHeadingListStart
${certificationSection}
\\resumeSubHeadingListEnd

\\end{document}
`;
}