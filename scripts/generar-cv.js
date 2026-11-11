// Genera la hoja de vida en PDF (español e inglés) a partir de los datos de abajo.
// Uso: npm i playwright && npx playwright install chromium && node scripts/generar-cv.js
const { chromium } = require('playwright');
const path = require('path');

const contacto = {
  nombre: 'Sebastián Andrés Cruz Sierra',
  correo: 'sebastian.211105@hotmail.com',
  telefono: '+57 305 367 9355',
  linkedin: 'linkedin.com/in/sebastián-cruz-685040399',
  linkedinUrl: 'https://www.linkedin.com/in/sebasti%C3%A1n-cruz-685040399/',
  github: 'github.com/SCruzBDev',
  web: 'scruzbdev.github.io',
};

const textos = {
  es: {
    titulo: 'Desarrollador Full Stack Junior',
    ciudad: 'Medellín, Colombia',
    perfilT: 'Perfil',
    perfil:
      'Estudiante de Ingeniería de Sistemas en la UPB con certificación profesional de IBM en desarrollo full stack. He construido un sitio web en producción para una clienta real y un sistema de 11 microservicios en .NET 8. Me interesan el backend y la seguridad, y busco mi primer empleo o práctica como desarrollador.',
    expT: 'Experiencia',
    exp: [
      {
        rol: 'Desarrollador web · Proyecto para cliente',
        lugar: 'Nadia FX, Caracterización (Madrid, España)',
        puntos: [
          'Diseñé y desarrollé el sitio web completo: portafolio, servicios y contacto.',
          'Construí el flujo de reserva de citas que envía la solicitud por WhatsApp.',
          'Desarrollé un panel privado para que la clienta gestione su disponibilidad semanal.',
          'Monorepo en TypeScript con Astro, Hono y Zod; pruebas con Vitest y control de arquitectura.',
        ],
      },
    ],
    proyT: 'Proyectos',
    proy: [
      {
        nombre: 'Ecosistema Veterinaria & Tienda de Mascotas',
        stack: 'C# · .NET 8 · Kafka · PostgreSQL · MongoDB · Redis · Docker',
        desc: '11 microservicios con Clean Architecture, DDD y arquitectura orientada a eventos; una base de datos por servicio y patrones GoF (Strategy, State, Memento, Factory).',
      },
      {
        nombre: 'App web Django con evaluaciones',
        stack: 'Python · Django · SQLite',
        desc: 'Proyecto final de IBM: plataforma de cursos extendida con un módulo de evaluaciones y su modelo relacional.',
      },
      {
        nombre: 'Proyectos del certificado IBM',
        stack: 'Node.js · Express · React · Flask · MongoDB',
        desc: 'API REST de reseñas de libros con Express, tienda en React y servicios backend con Flask y MongoDB.',
      },
    ],
    eduT: 'Formación',
    edu: [
      { titulo: 'Ingeniería de Sistemas', lugar: 'Universidad Pontificia Bolivariana, Medellín', fecha: 'En curso' },
    ],
    certT: 'Certificaciones',
    cert: [{ titulo: 'IBM Full Stack Software Developer', lugar: 'IBM · Coursera', fecha: '' }],
    habT: 'Habilidades',
    hab: [
      ['Backend', 'C# / .NET 8, Python, Django, Flask, Node.js, Express, Hono'],
      ['Frontend', 'HTML, CSS, JavaScript, TypeScript, React, Astro'],
      ['Datos', 'PostgreSQL, MongoDB, SQLite, Redis, Kafka'],
      ['Herramientas', 'Git, GitHub, Docker, pnpm, Vitest, Linux'],
    ],
    intT: 'Intereses',
    int: 'Ciberseguridad y pentesting, hardware de computadores y electrónica.',
  },
  en: {
    titulo: 'Junior Full Stack Developer',
    ciudad: 'Medellín, Colombia',
    perfilT: 'Profile',
    perfil:
      'Systems Engineering student at UPB with an IBM professional certificate in full stack development. I have built a production website for a real client and an 11-microservice system in .NET 8. I am interested in backend and security, and I am looking for my first job or internship as a developer.',
    expT: 'Experience',
    exp: [
      {
        rol: 'Web developer · Client project',
        lugar: 'Nadia FX, Caracterización (Madrid, Spain)',
        puntos: [
          'Designed and built the full website: portfolio, services and contact.',
          'Built the appointment booking flow that sends the request through WhatsApp.',
          'Developed a private panel for the client to manage her weekly availability.',
          'TypeScript monorepo with Astro, Hono and Zod; tests with Vitest and architecture checks.',
        ],
      },
    ],
    proyT: 'Projects',
    proy: [
      {
        nombre: 'Veterinary & Pet Store Ecosystem',
        stack: 'C# · .NET 8 · Kafka · PostgreSQL · MongoDB · Redis · Docker',
        desc: '11 microservices with Clean Architecture, DDD and event-driven architecture; one database per service and GoF patterns (Strategy, State, Memento, Factory).',
      },
      {
        nombre: 'Django web app with assessments',
        stack: 'Python · Django · SQLite',
        desc: 'IBM final project: online course platform extended with an assessment module and its relational model.',
      },
      {
        nombre: 'IBM certificate projects',
        stack: 'Node.js · Express · React · Flask · MongoDB',
        desc: 'Book review REST API with Express, a React store and backend services with Flask and MongoDB.',
      },
    ],
    eduT: 'Education',
    edu: [
      { titulo: 'Systems Engineering', lugar: 'Universidad Pontificia Bolivariana, Medellín', fecha: 'In progress' },
    ],
    certT: 'Certifications',
    cert: [{ titulo: 'IBM Full Stack Software Developer', lugar: 'IBM · Coursera', fecha: '' }],
    habT: 'Skills',
    hab: [
      ['Backend', 'C# / .NET 8, Python, Django, Flask, Node.js, Express, Hono'],
      ['Frontend', 'HTML, CSS, JavaScript, TypeScript, React, Astro'],
      ['Data', 'PostgreSQL, MongoDB, SQLite, Redis, Kafka'],
      ['Tools', 'Git, GitHub, Docker, pnpm, Vitest, Linux'],
    ],
    intT: 'Interests',
    int: 'Cybersecurity and pentesting, computer hardware and electronics.',
  },
};

const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;');

function html(t, lang) {
  return `<!doctype html><html lang="${lang}"><head><meta charset="utf-8">
<style>
  @page { size: A4; margin: 14mm 15mm 12mm; }
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { font-family: Inter, "Segoe UI", Arial, sans-serif; color: #111827; font-size: 10pt; line-height: 1.4; }
  header { border-bottom: 2px solid #0000f2; padding-bottom: 10px; margin-bottom: 12px; }
  h1 { font-size: 22pt; letter-spacing: -0.02em; }
  .sub { color: #0000f2; font-weight: 600; font-size: 12pt; margin: 2px 0 6px; }
  .contact { color: #374151; font-size: 9.2pt; display: flex; flex-wrap: wrap; gap: 4px 14px; }
  .contact a { color: inherit; text-decoration: none; }
  h2 { font-size: 10.5pt; text-transform: uppercase; letter-spacing: .08em; color: #0000f2; margin: 13px 0 6px; }
  .row { display: flex; justify-content: space-between; gap: 10px; }
  .t { font-weight: 700; }
  .m { color: #4b5563; font-size: 9.4pt; }
  ul { margin: 4px 0 0 16px; }
  li { margin-bottom: 2px; }
  .item { margin-bottom: 8px; }
  .skills { display: grid; grid-template-columns: 95px 1fr; gap: 3px 10px; }
  .skills b { color: #111827; }
</style></head><body>
<header>
  <h1>${esc(contacto.nombre)}</h1>
  <div class="sub">${esc(t.titulo)}</div>
  <div class="contact">
    <span>${esc(t.ciudad)}</span>
    <a href="mailto:${contacto.correo}">${contacto.correo}</a>
    <a href="https://wa.me/573053679355">${contacto.telefono}</a>
    <a href="${contacto.linkedinUrl}">${esc(contacto.linkedin)}</a>
    <a href="https://${contacto.github}">${contacto.github}</a>
    <a href="https://${contacto.web}">${contacto.web}</a>
  </div>
</header>
<h2>${t.perfilT}</h2><p>${esc(t.perfil)}</p>
<h2>${t.expT}</h2>
${t.exp.map(e => `<div class="item"><div class="t">${esc(e.rol)}</div><div class="m">${esc(e.lugar)}</div><ul>${e.puntos.map(p => `<li>${esc(p)}</li>`).join('')}</ul></div>`).join('')}
<h2>${t.proyT}</h2>
${t.proy.map(p => `<div class="item"><div class="row"><span class="t">${esc(p.nombre)}</span></div><div class="m">${esc(p.stack)}</div><div>${esc(p.desc)}</div></div>`).join('')}
<h2>${t.eduT}</h2>
${t.edu.map(e => `<div class="item row"><div><div class="t">${esc(e.titulo)}</div><div class="m">${esc(e.lugar)}</div></div><div class="m">${esc(e.fecha)}</div></div>`).join('')}
<h2>${t.certT}</h2>
${t.cert.map(e => `<div class="item row"><div><div class="t">${esc(e.titulo)}</div><div class="m">${esc(e.lugar)}</div></div><div class="m">${esc(e.fecha)}</div></div>`).join('')}
<h2>${t.habT}</h2>
<div class="skills">${t.hab.map(([k, v]) => `<b>${esc(k)}</b><span>${esc(v)}</span>`).join('')}</div>
<h2>${t.intT}</h2><p>${esc(t.int)}</p>
</body></html>`;
}

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  for (const [lang, archivo] of [['es', 'Sebastian-Cruz-CV-ES.pdf'], ['en', 'Sebastian-Cruz-CV-EN.pdf']]) {
    await page.setContent(html(textos[lang], lang), { waitUntil: 'load' });
    const salida = path.join(__dirname, '..', 'cv', archivo);
    await page.pdf({ path: salida, format: 'A4', printBackground: true, preferCSSPageSize: true });
    console.log('PDF generado:', salida);
  }
  await browser.close();
})();
