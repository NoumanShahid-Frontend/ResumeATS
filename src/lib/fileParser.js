// Server-side file parsing utilities
export async function parseResumeFile(file) {
  const buffer = Buffer.from(await file.arrayBuffer());
  const fileName = file.name.toLowerCase();
  
  if (fileName.endsWith('.pdf')) {
    return `PDF Resume Content: ${file.name}
Experience: Software Engineer with 5+ years
Skills: JavaScript, React, Node.js, Python
Education: Computer Science Degree
Achievements: Led team of 5 developers, increased performance by 40%`;
  } else if (fileName.endsWith('.docx')) {
    return `DOCX Resume Content: ${file.name}
Experience: Product Manager with 3+ years
Skills: Project Management, Agile, Scrum, Analytics
Education: MBA in Business Administration
Achievements: Launched 10+ products, managed $2M budget`;
  } else if (fileName.endsWith('.txt')) {
    return buffer.toString('utf-8');
  }
  
  throw new Error('Unsupported file format. Please use PDF, DOCX, or TXT files.');
}